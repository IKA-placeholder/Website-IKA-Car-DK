"use client";

import { Link } from "@tanstack/react-router";
import { Globe, Moon, Sun } from "lucide-react";
import { easeOut, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import { m } from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

// Animation constants
const EASE_OUT_QUART = "cubic-bezier(0.165, 0.84, 0.44, 1)";

export default function Header() {
  const locale = getLocale();
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme with animation
  const handleThemeToggle = () => {
    setIsThemeAnimating(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setIsThemeAnimating(false), 200);
  };

  // Toggle language
  const handleLanguageToggle = () => {
    setLocale(locale === "da" ? "en" : "da");
  };

  // Toggle mobile menu
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [locale]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className={`bg-background/80 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md transition-all duration-250 ease-out ${
          isScrolled ? "border-border/60 py-2 shadow-sm" : "border-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/{-$locale}"
            params={(prev) => ({ ...prev, locale: prev.locale === "da" ? undefined : "en" })}
            className="group inline-block select-none"
          >
            <span className="text-foreground group-hover:text-primary relative text-2xl font-black tracking-tighter transition-colors duration-200 ease-out">
              Autoværdi
              <span
                className="bg-primary absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 md:flex">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted relative h-9 w-9 transition-all duration-150 ease-out active:scale-95"
              onClick={handleThemeToggle}
              aria-label={m.theme_toggle()}
            >
              <span
                className={`transition-all duration-200 ease-out ${
                  isThemeAnimating ? "scale-75 rotate-180" : "scale-100 rotate-0"
                }`}
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </span>
            </Button>

            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              className="group hover:bg-muted gap-2 transition-all duration-150 ease-out active:scale-95"
              onClick={handleLanguageToggle}
              aria-label={m.lang_switch()}
            >
              <Globe className="h-4 w-4 transition-transform duration-200 ease-out group-hover:rotate-15" />
              <span className="text-sm font-medium">{locale === "da" ? "EN" : "DA"}</span>
            </Button>

            {/* User Menu (conditional) */}
            {isLoggedIn ? (
              <Menu>
                <MenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-muted gap-2 transition-all duration-150 ease-out"
                    >
                      <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium">
                        U
                      </div>
                      <span className="hidden sm:inline">{m.header_user()}</span>
                    </Button>
                  }
                />
                <MenuPopup align="end" sideOffset={8} className="animate-dropdown w-48">
                  <MenuItem
                    className="transition-all duration-150 ease-out data-highlighted:translate-x-0.5"
                    closeOnClick
                  >
                    {m.header_profile()}
                  </MenuItem>
                  <MenuItem
                    className="transition-all duration-150 ease-out data-highlighted:translate-x-0.5"
                    closeOnClick
                    onClick={() => setIsLoggedIn(false)}
                  >
                    {m.header_logout()}
                  </MenuItem>
                </MenuPopup>
              </Menu>
            ) : (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-muted transition-all duration-150 ease-out active:scale-95"
                >
                  {m.header_login()}
                </Button>
                <Button size="sm" className="transition-all duration-150 ease-out active:scale-95">
                  {m.header_signup()}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 md:hidden"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`bg-background/80 absolute inset-0 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className={`border-border bg-background absolute top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-sm border-l p-6 shadow-lg transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{
            transitionTimingFunction: EASE_OUT_QUART,
          }}
        >
          <div className="flex flex-col gap-4">
            {/* Mobile Theme Toggle */}
            <Button
              variant="outline"
              className="w-full justify-between transition-all duration-150 ease-out active:scale-[0.98]"
              onClick={handleThemeToggle}
            >
              <span className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {theme === "dark" ? m.theme_dark() : m.theme_light()}
              </span>
            </Button>

            {/* Mobile Language Switcher */}
            <Button
              variant="outline"
              className="w-full justify-between transition-all duration-150 ease-out active:scale-[0.98]"
              onClick={handleLanguageToggle}
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {locale === "da" ? m.lang_en() : m.lang_da()}
              </span>
            </Button>

            {isLoggedIn ? (
              <>
                <div className="bg-border my-2 h-px" />
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-150 ease-out active:scale-[0.98]"
                >
                  {m.header_profile()}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-150 ease-out active:scale-[0.98]"
                  onClick={() => setIsLoggedIn(false)}
                >
                  {m.header_logout()}
                </Button>
              </>
            ) : (
              <>
                <div className="bg-border my-2 h-px" />
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-150 ease-out active:scale-[0.98]"
                >
                  {m.header_login()}
                </Button>
                <Button className="w-full transition-all duration-150 ease-out active:scale-[0.98]">
                  {m.header_signup()}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes headerSlideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-dropdown {
          animation: dropdownFadeIn 200ms ${EASE_OUT_QUART} forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Disable hover animations on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .group:hover .group-hover\\:w-full {
            width: 0;
          }
          .group:hover .group-hover\\:rotate-\\[15deg\\] {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </>
  );
}

// Animated hamburger icon that morphs to X
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative h-4 w-4">
      <span
        className={`absolute top-0.5 left-0 h-0.5 w-4 transform bg-current transition-all duration-300 ease-in-out ${
          isOpen ? "top-2 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute top-1.75 left-0 h-0.5 w-4 bg-current transition-all duration-300 ease-in-out ${
          isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      />
      <span
        className={`absolute top-3.5 left-0 h-0.5 w-4 transform bg-current transition-all duration-300 ease-in-out ${
          isOpen ? "top-2 -rotate-45" : ""
        }`}
      />
    </div>
  );
}
