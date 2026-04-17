import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { m } from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

export default function Header() {
  const language = getLocale();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-30 w-full border-b border-slate-200/60 bg-white/70 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/{-$locale}"
          params={(prev) => ({ locale: prev.locale === "da" ? undefined : "en" })}
          className="select-none"
        >
          <span className="text-2xl font-black tracking-tighter text-slate-900 transition-colors hover:text-blue-600">
            Autoværdi
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-slate-600 transition-colors hover:bg-slate-100"
            onClick={() => setLocale(language === "da" ? "en" : "da")}
          >
            {language === "da" ? m.lang_en() : m.lang_da()}
          </button>
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
                <span>{m.header_user()}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 z-40 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm ring-1 ring-slate-200/50">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    {m.header_profile()}
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-slate-600 transition-colors hover:bg-slate-50"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    {m.header_logout()}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
