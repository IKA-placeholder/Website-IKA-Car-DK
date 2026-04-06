import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'

const TEXT = {
  da: {
    forDealers: 'Til bilforhandlere',
    dealersDesc:
      'Vi tilbyder at implementere vores prisvurderingswidget på din hjemmeside, så dine kunder hurtigt kan få et prisoverblik. Derudover har vi et sniping-værktøj, der giver notifikationer om underprisede biler fra danske marketplaces.',
    dealersCta: 'Kontakt os',
    api: 'API',
    apiDesc:
      'Er du udvikler? Du kan få adgang til vores API, som indeholder endpoints til både statistik og ML indenfor brugte biler.',
    apiCta: 'Kontakt os',
    copyright: '© 2025 Autoværdi. Alle rettigheder forbeholdes.',
  },
  en: {
    forDealers: 'For Car Dealers',
    dealersDesc:
      'We offer implementation of our price valuation widget on your website, so your customers can quickly get a price overview. Additionally, we have a sniping tool that provides notifications for underpriced cars from Danish marketplaces.',
    dealersCta: 'Contact us',
    api: 'API',
    apiDesc:
      'Are you a developer? You can get access to our API, which includes endpoints for statistics and ML within used cars.',
    apiCta: 'Contact us',
    copyright: '© 2025 Autoværdi. All rights reserved.',
  },
}

export default function Footer() {
  const { language } = useContext(LanguageContext)
  const t = TEXT[language]

  const handleContactClick = () => {
    window.location.href = 'mailto:jens.bech.lauritsen@gmail.com'
  }

  return (
    <footer className="border-t border-slate-200/60 bg-slate-50/80 px-6 py-16 backdrop-blur-md">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* For Dealers Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t.forDealers}
              </h3>
            </div>
            <p className="leading-relaxed text-slate-600">{t.dealersDesc}</p>
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
            >
              {t.dealersCta}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>

          {/* API Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{t.api}</h3>
            </div>
            <p className="leading-relaxed text-slate-600">{t.apiDesc}</p>
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
            >
              {t.apiCta}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-slate-200/60" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="select-none">
            <span className="text-xl font-black tracking-tighter text-slate-900">
              Autoværdi
            </span>{' '}
            <span className="align-top text-xs font-medium text-slate-400">
              beta
            </span>
          </div>
          <p className="text-sm text-slate-500">{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
