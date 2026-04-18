import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { getClientIP, checkRateLimit } from "./rateLimit";

const API_BASE = process.env.API_BASE_URL || "https://api.xn--autovrdi-n0a.dk"; // FastAPI backend

export type PredictApiResponse = {
  maerke?: string;
  model?: string;
  årgang?: number | string;
  estimated_price?: number;
  min_price?: number;
  max_price?: number;
  price_range?: string;
  kilometers?: number;
};

export const plateSearch = createServerFn({ method: "POST" })
  .inputValidator((data: { plate: string }) => data)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const ip = getClientIP(headers);
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      throw new Error(rateLimitResult.message);
    }

    const formattedPlate = data.plate.replace(/\s+/g, "");

    let url = `https://www.tjekbil.dk/api/v3/dmr/regnrquery/${formattedPlate}?amount=1`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error("Kunne ikke hente data fra tjekbil.dk");
    }
    const d = await res.json();
    if (d.length === 0) {
      return { success: "false" };
    }
    return { success: "true" };
  });

// Frontend server function acting as proxy to FastAPI
export const predictPlate = createServerFn({ method: "POST" })
  .inputValidator((data: { plate: string; kilometers?: number }) => data)
  .handler(async ({ data }) => {
    // Rate limiting check
    const headers = getRequestHeaders();
    const ip = getClientIP(headers);
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      throw new Error(rateLimitResult.message);
    }

    const formattedPlate = data.plate.replace(/\s+/g, "");

    // Build URL with optional kilometers parameter
    let url = `${API_BASE}/predict/${encodeURIComponent(formattedPlate)}`;
    if (data.kilometers && data.kilometers > 0) {
      url += `?kilometers=${data.kilometers}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text().catch(() => "{}");
        let errorMessage = "Kunne ikke hente bildata";

        // Try to parse JSON, but handle non-JSON responses gracefully
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || errorMessage;
        } catch {
          // Response is not JSON (e.g., HTML error page)
          // Use HTTP status code to determine error message
          errorMessage = text.slice(0, 100).trim(); // Get first 100 chars for debugging
        }

        // Provide specific error messages based on status code
        if (res.status === 429) {
          throw new Error("For mange anmodninger. Vent et øjeblik og prøv igen.");
        }
        if (res.status === 404) {
          throw new Error("Nummerplade ikke fundet. Tjek venligst nummerpladen.");
        }
        if (res.status >= 500) {
          throw new Error("Serverfejl. Prøv igen senere.");
        }
        throw new Error(errorMessage || "Kunne ikke hente bildata");
      }

      const json = await res.json();

      // Check if the response contains an error status from the backend
      if (json.status === "error") {
        throw new Error(json.message || "Der opstod en fejl");
      }

      return json as PredictApiResponse;
    } catch (error) {
      // Re-throw network errors with user-friendly message
      if (error instanceof Error && error.message.includes("fetch")) {
        throw new Error("Kunne ikke forbinde til serveren. Prøv igen senere.");
      }
      throw error;
    }
  });

type LoginBody = { email: string; password: string };

export type LoginApiResponse = {
  token?: string;
  user?: { is_admin_user?: boolean };
  detail?: { msg: string }[];
  message?: string;
};

export const loginUser = createServerFn({ method: "POST" })
  .inputValidator((data: LoginBody) => data)
  .handler(async ({ data }) => {
    // Rate limiting for login attempts (stricter: 10 per minute)
    const headers = getRequestHeaders();
    const ip = getClientIP(headers);
    const rateLimitResult = checkRateLimit(ip, 10); // 10 attempts per minute

    if (!rateLimitResult.allowed) {
      throw new Error(rateLimitResult.message);
    }
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json()) as LoginApiResponse;
    if (!res.ok) {
      const message = json.detail?.[0]?.msg || json.message || `Login failed (${res.status})`;
      throw new Error(message);
    }
    return json;
  });

type SignupBody = { username: string; email: string; password: string };

export type SignupApiResponse = {
  message?: string;
  detail?: { msg: string }[];
};

export const signupUser = createServerFn({ method: "POST" })
  .inputValidator((data: SignupBody) => data)
  .handler(async ({ data }) => {
    // Rate limiting for signup attempts (stricter: 5 per minute)
    const headers = getRequestHeaders();
    const ip = getClientIP(headers);
    const rateLimitResult = checkRateLimit(ip, 5); // 5 attempts per minute

    if (!rateLimitResult.allowed) {
      throw new Error(rateLimitResult.message);
    }
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json: SignupApiResponse = (await res.json().catch(() => ({}))) as SignupApiResponse;
    if (!res.ok) {
      const message = json.detail?.[0]?.msg || json.message || `Signup failed (${res.status})`;
      throw new Error(message);
    }
    return json;
  });

export type MeResponse = {
  is_admin_user?: boolean;
};

export const fetchMeWithToken = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return (await res.json()) as MeResponse;
  });
