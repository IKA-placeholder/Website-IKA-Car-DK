import { createFileRoute, redirect } from "@tanstack/react-router";

import { getStoredToken } from "@/lib/auth";
import { fetchMeWithToken } from "@/server/api";

export const Route = createFileRoute("/admin")({
  ssr: false,
  pendingComponent: () => <div className="p-8 text-slate-500">Loading...</div>,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const token = getStoredToken();
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  loader: async () => {
    if (typeof window === "undefined") {
      return { user: null as { is_admin_user?: boolean } | null };
    }
    const token = getStoredToken();
    if (!token) {
      throw redirect({ to: "/login" });
    }
    const user = await fetchMeWithToken({ data: { token } });
    if (!user.is_admin_user) {
      throw redirect({ to: "/login" });
    }
    return { user };
  },
  component: AdminPage,
});

function AdminPage() {
  const { user } = Route.useLoaderData();

  if (!user) {
    return <div className="p-8 text-slate-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Admin Dashboard</h1>
      <p className="mt-2 text-slate-500">You are authenticated as admin!</p>
    </div>
  );
}
