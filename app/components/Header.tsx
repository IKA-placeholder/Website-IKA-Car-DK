'use client';
import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from './LanguageProvider';

const TEXT = {
  da: {
    login: 'Log ind',
    signup: 'Opret konto',
    loggedInAs: 'Logget ind som',
    logout: 'Log ud',
    profile: 'Profil'
  },
  en: {
    login: 'Log in',
    signup: 'Sign up',
    loggedInAs: 'Logged in as',
    logout: 'Log out',
    profile: 'Profile'
  }
};

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = TEXT[language];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Demo: toggle login state (for development purposes)
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-30 transition-all duration-300 ${
      hasScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md' 
        : 'bg-gradient-to-r from-blue-50/80 via-white/80 to-blue-50/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-center">
        <div className="text-2xl font-extrabold tracking-tight text-blue-700 select-none relative">
          IKA{' '}
          <span className="text-gray-900">Car</span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Auth buttons */}
        {!isLoggedIn ? (
          <div className="hidden sm:flex items-center gap-2 mr-3">
            <button 
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={toggleLogin} /* In a real app, this would open a login modal */
            >
              {t.login}
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={toggleLogin} /* In a real app, this would navigate to signup */
            >
              {t.signup}
            </button>
          </div>
        ) : (
          <div className="hidden sm:block relative mr-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                U
              </div>
              <span>User</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-40">
                <div className="py-2">
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {t.profile}
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={toggleLogin}
                  >
                    {t.logout}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Language switcher */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            className={`px-3 py-1 rounded-md font-medium transition-colors ${language === 'da' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`}
            onClick={() => setLanguage('da')}
          >
            DK
          </button>
          <button
            className={`px-3 py-1 rounded-md font-medium transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>

        {/* Mobile menu button (only shows auth on mobile) */}
        <button className="sm:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
} 