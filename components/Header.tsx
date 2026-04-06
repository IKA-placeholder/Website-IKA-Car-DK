import { useContext, useState } from 'react'
import { LanguageContext } from '@components/LanguageProvider'

const TEXT = {
  da: {
    login: 'Log ind',
    signup: 'Opret konto',
    profile: 'Profil',
    logout: 'Log ud',
  },
  en: {
    login: 'Log in',
    signup: 'Sign up',
    profile: 'Profile',
    logout: 'Log out',
  },
}

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext)
  const t = TEXT[language]

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-30 w-full border-b border-slate-200/60 bg-white/70 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="select-none">
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Autoværdi
          </span>{' '}
          <span className="text-2xl font-light text-slate-900">
            {' '}
            <span className="align-top text-xs font-medium text-slate-400">
              beta
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-600 transition-colors hover:bg-slate-100"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-medium text-white">
                  U
                </div>
                <span>User</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 z-40 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm ring-1 ring-slate-200/50">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    {t.profile}
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-slate-600 transition-colors hover:bg-slate-50"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center rounded-lg bg-slate-100/90 p-1 ring-1 ring-slate-200/50">
            {['da', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  language === lang
                    ? 'bg-blue-600 text-white shadow-sm hover:brightness-110 active:brightness-90'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
                onClick={() => setLanguage(lang as 'da' | 'en')}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
