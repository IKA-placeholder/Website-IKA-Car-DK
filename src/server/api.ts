import { createServerFn } from "@tanstack/react-start";

const API_BASE = process.env.API_BASE_URL || "https://api.xn--autovrdi-n0a.dk"; // FastAPI backend

export type PredictApiResponse = {
  maerke?: string;
  model?: string;
  årgang?: number | string;
  estimated_price?: number;
};

// Frontend server function acting as proxy to FastAPI
export const predictPlate = createServerFn({ method: "POST" })
  .inputValidator((data: { plate: string }) => data)
  .handler(async ({ data }) => {
    const formattedPlate = data.plate.replace(/\s+/g, "");
    try {
      const res = await fetch(
        `${API_BASE}/predict/${encodeURIComponent(formattedPlate)}`,
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "{}");
        const json = JSON.parse(text);
        // Provide specific error messages based on status code
        if (res.status === 429) {
          throw new Error("For mange anmodninger. Vent et øjeblik og prøv igen.");
        }
        if (res.status === 404) {
          throw new Error("Nummerplade ikke fundet. Tjek venligst nummerpladen.");
        }
        throw new Error(json.message || "Kunne ikke hente bildata");
      }
      return (await res.json()) as PredictApiResponse;
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
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json()) as LoginApiResponse;
    if (!res.ok) {
      const message =
        json.detail?.[0]?.msg || json.message || `Login failed (${res.status})`;
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
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json: SignupApiResponse = (await res
      .json()
      .catch(() => ({}))) as SignupApiResponse;
    if (!res.ok) {
      const message =
        json.detail?.[0]?.msg ||
        json.message ||
        `Signup failed (${res.status})`;
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
