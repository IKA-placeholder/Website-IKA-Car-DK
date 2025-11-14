'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("https://ika-car-dk-api.onrender.com/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const user = await res.json();
        if (!user.is_admin_user) throw new Error("Forbidden");

        setAuthorized(true);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <div>Unauthorized</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>You are authenticated as admin!</p>
    </div>
  );
}
