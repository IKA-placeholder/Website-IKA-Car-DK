'use client';

import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';

const TEXT = {
  da: {
    checkValue: 'Tjek bilens værdi'
  },
  en: {
    checkValue: 'Check car value'
  }
};

export default function FloatingCTA() {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];

  const scrollToSearch = () => {
    const searchElement = document.getElementById('license-plate-search');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToSearch}
      className="fixed bottom-6 right-6 px-6 py-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 text-lg font-medium"
    >
      {t.checkValue}
    </button>
  );
} 