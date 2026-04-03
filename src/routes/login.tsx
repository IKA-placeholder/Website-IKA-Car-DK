import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useContext } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { LanguageContext } from '@components/LanguageProvider'
import { loginUser } from '@/server/api'
import { setStoredToken } from '@/lib/auth'

const TEXT = {
  da: {
    login: 'Login',
    error: 'Der opstod en fejl',
    success: 'Logged ind',
  },
  en: {
    login: 'Login',
    error: 'An error occurred',
    success: 'Logged in',
  },
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { language } = useContext(LanguageContext)
  const t = TEXT[language]
  const navigate = useNavigate()
  const loginFn = useServerFn(loginUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handlelogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const data = await loginFn({ data: { email, password } })

      setSuccess(t.success)
      setEmail('')
      setPassword('')

      if (data.user?.is_admin_user && data.token) {
        setStoredToken(data.token)
        await navigate({ to: '/admin' })
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t.error
      setError(errorMessage)
      console.error('login error caught:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
        {t.login}
      </h1>
      <form onSubmit={handlelogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-200/40 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-200/40 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="relative overflow-hidden rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition-transform before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/25 hover:brightness-110 active:scale-95 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100 disabled:active:scale-100"
        >
          {isLoading ? 'Loading...' : t.login}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}
    </div>
  )
}
