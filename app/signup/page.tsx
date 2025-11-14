'use client';
import { useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageProvider';

const TEXT = {
  da: { signup: 'Opret konto', error: 'Der opstod en fejl', success: 'Konto oprettet!' },
  en: { signup: 'Sign up', error: 'An error occurred', success: 'Account created!' },
};

export default function SignupPage() {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    console.log({ username, email, password });
    try {
      const response = await fetch('https://ika-car-dk-api.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // include username
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (err) {
        console.warn('No JSON returned from signup API');
      }

      if (!response.ok) {
        console.error('Signup API response:', data, response.status, response.statusText);
        const message =
          data.detail?.[0]?.msg ||
          data.message ||
          `Signup failed (${response.status} ${response.statusText})`;
        throw new Error(message);
      }

      setSuccess(t.success);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || t.error);
      console.error('Signup error caught:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t.signup}</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="px-3 py-2 border rounded-md"
        />

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
          {isLoading ? 'Loading...' : t.signup}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}
    </div>
  );
}
