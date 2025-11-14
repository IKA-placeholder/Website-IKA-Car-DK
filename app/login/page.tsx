'use client';
import { useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageProvider';
import { useRouter } from 'next/navigation';
const TEXT = {
  da: { login: 'Login', error: 'Der opstod en fejl', success: 'Logged ind' },
  en: { login: 'Login', error: 'An error occurred', success: 'Logged in' },
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
  const [isAdmin, setIsAdmin] = useState(false);
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


    let data: any = {};
    try {
      data = await response.json();
    } catch (err) {
      console.warn('No JSON returned from login API');
    }

    if (!response.ok) {
      console.error('login API response:', data, response.status, response.statusText);
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
      // save token in memory or localStorage
      localStorage.setItem("token", data.token);
      router.push("/admin");
    } else {

      console.log("User is not admin");
    }

  } catch (err: any) {
    setError(err.message || t.error);
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
          className="px-3 py-2 border rounded // ✅ crucial for cookies-md"
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
      {success && <p className="text-green-600 mt-3">{error}</p>}
    </div>
  );
}
