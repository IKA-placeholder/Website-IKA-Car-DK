import { createFileRoute, redirect } from "@tanstack/react-router";

import { getStoredToken } from "@/lib/auth";
import { m } from "@/paraglide/messages";
import { fetchMeWithToken } from "@/server/api";

export const Route = createFileRoute("/{-$locale}/auth/admin")({
  ssr: false,
  pendingComponent: () => <div className="p-8 text-slate-500">{m.admin_loading()}</div>,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const token = getStoredToken();
    if (!token) {
      throw redirect({
        to: "/{-$locale}/auth/login",
        params: (prev) => ({ locale: prev.locale === "da" ? undefined : "en" }),
      });
    }
  },
  loader: async () => {
    if (typeof window === "undefined") {
      return { user: null as { is_admin_user?: boolean } | null };
    }
    const token = getStoredToken();
    if (!token) {
      throw redirect({
        to: "/{-$locale}/auth/login",
        params: (prev) => ({ locale: prev.locale === "da" ? undefined : "en" }),
      });
    }
    const user = await fetchMeWithToken({ data: { token } });
    if (!user.is_admin_user) {
      throw redirect({
        to: "/{-$locale}/auth/login",
        params: (prev) => ({ locale: prev.locale === "da" ? undefined : "en" }),
      });
    }
    return { user };
  },
  component: AdminPage,
});

function AdminPage() {
  const { user } = Route.useLoaderData();

  if (!user) {
    return <div className="p-8 text-slate-500">{m.admin_loading()}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{m.admin_title()}</h1>
      <p className="mt-2 text-slate-500">{m.admin_auth()}</p>
    </div>
  );
}
