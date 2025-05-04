"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface LanguageContextType {
  language: 'da' | 'en';
  setLanguage: (lang: 'da' | 'en') => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'da',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'da' | 'en'>('da');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 