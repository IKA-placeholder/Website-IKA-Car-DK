# Implementation summary: Next.js → TanStack Start

This document records what was implemented per `implementation_instructions.md`: migrating the former Next.js 15 app to a **TanStack Start** (Vite-based) application with TanStack Router, server functions, React Query, and the requested auth and routing behavior.

## 1. Project initialization

- Replaced the Next.js toolchain with **Vite 7**, **@tanstack/react-start**, **@tanstack/react-router**, **@tanstack/router-plugin**, and **nitro** (via `npm:nitro-nightly`, matching current TanStack Start defaults).
- Added dependencies: **@tanstack/react-query**, **gsap**, **jwt-decode** (removed unused **jsonwebtoken** from the old stack).
- Configured **Tailwind CSS 4** using **`@tailwindcss/vite`** in `vite.config.ts` (no separate PostCSS pipeline).
- Migrated global styles into **`src/styles.css`**: Tailwind import, Inter font (replacing `next/font`), and the previous `app/globals.css` rules (animations, utilities, variables, scrollbar, body gradient).

## 2. Routing migration

- **File-based routes** under `src/routes/`:
  - `src/routes/__root.tsx` — shell layout: `<html>`, `<head>` (`HeadContent`), stylesheet link via `?url`, `<body>`, **`QueryClientProvider`**, **`LanguageProvider`**, **`Header`**, main content area with `pt-20`, **`Scripts`**.
  - `src/routes/index.tsx` — former `app/page.tsx` (home).
  - `src/routes/login.tsx` — former `app/login/page.tsx`.
  - `src/routes/signup.tsx` — former `app/signup/page.tsx`.
  - `src/routes/admin.tsx` — former `app/admin/page.tsx`.
- **`src/router.tsx`** wires `createRouter({ routeTree, ... })` to generated **`src/routeTree.gen.ts`** (produced by the TanStack Router Vite plugin on build/dev).

## 3. Data fetching and state

- **`src/server/api.ts`** — `createServerFn` from `@tanstack/react-start`:
  - **`predictPlate`** — POST, body `{ plate }`, server `fetch` to `https://ika-car-dk-api.onrender.com/predict/...`.
  - **`loginUser`** — POST credentials to `/auth/login`.
  - **`signupUser`** — POST to `/auth/signup`.
  - **`fetchMeWithToken`** — POST `{ token }`, `Authorization` to `/auth/me`.
- **`components/LicensePlateSearch.tsx`** — uses **`useServerFn(predictPlate)`** with **`useQuery`** (`queryKey: ['car-predict', submittedPlate]`, `staleTime` / `gcTime` for caching). Manual `fetch` removed from the component.
- **`src/routes/login.tsx`** and **`src/routes/signup.tsx`** — call **`loginUser`** / **`signupUser`** via **`useServerFn`**, replacing inline `fetch`.
- **Language** — kept a normal React **`LanguageContext`** in **`components/LanguageProvider.tsx`** (no URL search-param sync; the instructions allowed either approach).

## 4. Authentication and security

- **`src/lib/auth.ts`** — helpers: **`getStoredToken`**, **`setStoredToken`**, **`clearStoredToken`**, **`decodeJwtPayload`**, **`isTokenExpired`** (JWT via **`jwt-decode`**), keyed as **`token`** in `localStorage` (same as before).
- **`/admin`** — **`ssr: false`** (localStorage-only token). Protection uses:
  - **`beforeLoad`** — requires a stored token; otherwise **`redirect({ to: '/login' })`**.
  - **`loader`** — calls **`fetchMeWithToken`** and **`redirect`s** if **`is_admin_user`** is not true (API-validated, not only JWT payload).
- Login success still stores the token and navigates to **`/admin`** when **`user.is_admin_user`** is true.

## 5. UI and components

- All former **`app/components/`** files live under **`components/`** at the repo root (as requested).
- **GSAP** on the home route and **`BackgroundCars`** remain driven by **`useEffect`** (and `typeof window` guard for plugin registration), suitable for SSR/hydration.
- **`denmark.js`** replaced by typed **`components/denmark.tsx`**; **`DenmarkSilhouette`** imports it with the **`@components/*`** alias (Vite-compatible).
- **`app/components/denmark.svg`** is no longer required for the silhouette (SVG is inlined in `denmark.tsx`).

## 6. Cleanup

- Removed Next-specific usage: **`next/link`**, **`next/navigation`**, **`next/font`**, **`app/`** layout and pages, **`next.config.ts`**, **`postcss.config.mjs`** (Tailwind now via Vite plugin), and the old **`eslint.config.mjs`** (replaced by a flat **`eslint.config.js`** for TypeScript).
- Navigation uses **`@tanstack/react-router`** (`useNavigate`, **`redirect`**, file routes).

## 7. Configuration files (reference)

| File | Role |
|------|------|
| `vite.config.ts` | `nitro()`, `vite-tsconfig-paths`, `@tailwindcss/vite`, `tanstackStart()`, `@vitejs/plugin-react` |
| `tsconfig.json` | `paths`: `@/*` → `src/*`, `@components/*` → `components/*` |
| `package.json` | Scripts: `dev` / `build` / `preview` / `lint` |
| `src/vite-env.d.ts` | Vite client types |

## 8. Verification

- **`npm run build`** completes successfully (client + SSR + Nitro server bundle).
- **`npm run lint`** passes with the new ESLint flat config.

## 9. Follow-ups (optional)

- Add **`Link`** components in **`Header`** or elsewhere if you want in-app navigation to `/login` / `/signup`.
- If you need **`authenticated`** hero animations on the home page, set **`sessionStorage.setItem('app_authenticated', 'true')`** somewhere (legacy behavior was never wired to a PIN in the snippet).
