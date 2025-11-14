'use client';
import { useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageProvider';
import { useRouter } from 'next/navigation';

const TEXT = {
  da: { login: 'Login', error: 'Der opstod en fejl', success: 'Logged ind' },
  en: { login: 'Login', error: 'An error occurred', success: 'Logged in' },
};

type LoginResponse = {
  token?: string;
  user?: { is_admin_user?: boolean };
  detail?: { msg: string }[];
  message?: string;
};

export default function LoginPage() {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlelogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://ika-car-dk-api.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        const message =
          data.detail?.[0]?.msg ||
          data.message ||
          `login failed (${response.status} ${response.statusText})`;
        throw new Error(message);
      }

      setSuccess(t.success);
      setEmail('');
      setPassword('');

      if (data.user?.is_admin_user) {
        localStorage.setItem('token', data.token!);
        router.push('/admin');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t.error;
      setError(errorMessage);
      console.error('login error caught:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t.login}</h1>
      <form onSubmit={handlelogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isLoading ? 'Loading...' : t.login}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}
    </div>
  );
}
