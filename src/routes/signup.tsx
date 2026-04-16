import { LanguageContext } from "@components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useContext } from "react";

import { signupUser } from "@/server/api";

const TEXT = {
  da: {
    signup: "Opret konto",
    error: "Der opstod en fejl",
    success: "Konto oprettet!",
  },
  en: {
    signup: "Sign up",
    error: "An error occurred",
    success: "Account created!",
  },
};

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];
  const signupFn = useServerFn(signupUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signupFn({ data: { username, email, password } });

      setSuccess(t.success);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error_) {
      const err = error_ as Error;
      setError(err.message || t.error);
      console.error("Signup error caught:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">{t.signup}</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-200/40 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-2 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-200/40 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-200/40 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="relative overflow-hidden rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition-transform before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/25 hover:brightness-110 active:scale-95 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100 disabled:active:scale-100"
        >
          {isLoading ? "Loading..." : t.signup}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}
    </div>
  );
}
