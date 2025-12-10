"use client";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "./LanguageProvider";

const TEXT = {
  da: {
    login: "Log ind",
    signup: "Opret konto",
    profile: "Profil",
    logout: "Log ud",
  },
  en: {
    login: "Log in",
    signup: "Sign up",
    profile: "Profile",
    logout: "Log out",
  },
};

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = TEXT[language];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-30 transition-all duration-300 ${
        hasScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-gradient-to-r from-blue-50/80 via-white/80 to-blue-50/80 backdrop-blur-sm"
      }`}
    >
      <div className="text-2xl font-extrabold text-blue-700 select-none">
        IKA{" "}
        <span className="text-gray-900">
          Car <span className="text-gray-400 text-sm align-top">beta</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Sign-in and Sign-up removed completely */}
        {isLoggedIn && (
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                U
              </div>
              <span>User</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-40">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                  {t.profile}
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsLoggedIn(false)}
                >
                  {t.logout}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {["da", "en"].map((lang) => (
            <button
              key={lang}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                language === lang
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setLanguage(lang as "da" | "en")}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
