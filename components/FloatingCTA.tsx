import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'

const TEXT = {
  da: {
    checkValue: 'Tjek bilens værdi',
  },
  en: {
    checkValue: 'Check car value',
  },
}

export default function FloatingCTA() {
  const { language } = useContext(LanguageContext)
  const t = TEXT[language]

  const scrollToSearch = () => {
    const searchElement = document.getElementById('license-plate-search')
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToSearch}
      className="fixed bottom-6 right-6 z-20 rounded-full bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-sm ring-1 ring-slate-200/50 transition-all duration-300 hover:brightness-110 active:scale-95 active:brightness-90"
    >
      {t.checkValue}
    </button>
  )
}
