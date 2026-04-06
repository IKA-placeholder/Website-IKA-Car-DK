import { useState, useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { LanguageContext } from '@components/LanguageProvider'
import AdvancedValuation from '@components/AdvancedValuation'
import { predictPlate } from '@/server/api'

interface CarData {
  make: string
  model: string
  year: number | string
  estimatedValue: number
}

const TEXT = {
  da: {
    label: 'Indtast nummerplade',
    placeholder: 'FX 12 345',
    button: 'Søg',
    loading: 'Søger...',
    error: 'Der opstod en fejl ved søgning. Prøv igen senere.',
    carDetails: 'Biloplysninger',
    make: 'Mærke',
    model: 'Model',
    year: 'Årgang',
    value: 'Estimeret værdi',
    advancedValuation: 'Få avanceret vurdering',
    quickValuation: 'Hurtig vurdering',
    advancedDescription:
      'En mere præcis vurdering baseret på flere detaljer om din bil',
  },
  en: {
    label: 'Enter license plate',
    placeholder: 'e.g. FX 12 345',
    button: 'Search',
    loading: 'Searching...',
    error: 'An error occurred. Please try again later.',
    carDetails: 'Car details',
    make: 'Make',
    model: 'Model',
    year: 'Year',
    value: 'Estimated value',
    advancedValuation: 'Get advanced valuation',
    quickValuation: 'Quick valuation',
    advancedDescription:
      'A more accurate valuation based on additional details about your car',
  },
}

function mapPredictToCarData(data: {
  maerke?: string
  model?: string
  årgang?: number | string
  estimated_price?: number
}): CarData {
  return {
    make: data.maerke || '',
    model: data.model || '',
    year: data.årgang ?? '',
    estimatedValue: data.estimated_price || 0,
  }
}

export default function LicensePlateSearch() {
  const { language } = useContext(LanguageContext)
  const t = TEXT[language]
  const [plateNumber, setPlateNumber] = useState('')
  const companyPlaceholder = 'https://ikacar.vercel.app/'
  const [submittedPlate, setSubmittedPlate] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [animateCard, setAnimateCard] = useState(false)

  const predictPlateFn = useServerFn(predictPlate)

  const {
    data: rawData,
    isLoading,
    isFetching,
    error: queryError,
  } = useQuery({
    queryKey: ['car-predict', submittedPlate],
    queryFn: async () => {
      if (!submittedPlate) throw new Error('No plate')
      return predictPlateFn({ data: { plate: submittedPlate } })
    },
    enabled: Boolean(submittedPlate),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: false, // Don't retry on error - prevents hammering the API
    refetchOnWindowFocus: false, // Don't refetch when user comes back to tab
    refetchOnReconnect: false, // Don't refetch on network reconnect
  })

  const carData: CarData | null = rawData ? mapPredictToCarData(rawData) : null

  useEffect(() => {
    if (queryError) {
      setError(t.error)
    } else {
      setError(null)
    }
  }, [queryError, t.error])

  useEffect(() => {
    if (carData) {
      setTimeout(() => setAnimateCard(true), 100)
    }
  }, [carData])

  useEffect(() => {
    if (carData) {
      setAnimateCard(false)
      setTimeout(() => setAnimateCard(true), 100)
    }
  }, [language, carData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const formattedPlate = plateNumber.replace(/\s+/g, '')
    setSubmittedPlate(formattedPlate)
  }

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  const loading = isLoading || isFetching

  if (showAdvanced) {
    return (
      <AdvancedValuation
        plateNumber={plateNumber}
        onBack={() => setShowAdvanced(false)}
        isLoggedIn={isLoggedIn}
      />
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="plateNumber"
            className="flex items-center text-base font-medium text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM15 5a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM5 5a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1zM15 11a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM5 11a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {t.label}
          </label>
          <div className="relative flex flex-col gap-3 sm:flex-row sm:gap-3">
            <input
              type="text"
              id="plateNumber"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 rounded-xl border border-slate-200/80 bg-white px-5 py-5 font-mono text-lg tracking-wide text-slate-900 shadow-sm ring-1 ring-slate-200/40 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-2"
              required
              pattern="[A-Z0-9 ]{2,8}"
              title={t.label}
            />

            <button
              type="submit"
              disabled={loading}
              className="relative shrink-0 overflow-hidden rounded-xl bg-blue-600 px-8 py-5 text-lg font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition-transform before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/25 hover:brightness-110 active:scale-95 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100 disabled:active:scale-100 sm:px-10"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t.loading}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  {t.button}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mt-5 rounded-xl border border-red-100 bg-red-50/90 p-4 text-red-800 shadow-sm ring-1 ring-red-200/40 animate-fade-in">
          <div className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {carData && (
        <>
          <div
            className={`mt-8 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm ring-1 ring-slate-200/50 transition-all duration-500 md:p-6 ${animateCard ? 'animate-fade-in premium-card' : 'opacity-0'}`}
          >
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {t.carDetails}
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="premium-card rounded-xl border border-slate-200/50 bg-slate-50/50 p-4 ring-1 ring-slate-200/40">
                <span className="mb-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                  {t.make}
                </span>
                <p className="text-lg font-semibold text-slate-900">{carData.make}</p>
              </div>
              <div className="premium-card rounded-xl border border-slate-200/50 bg-slate-50/50 p-4 ring-1 ring-slate-200/40">
                <span className="mb-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                  {t.model}
                </span>
                <p className="text-lg font-semibold text-slate-900">{carData.model}</p>
              </div>
              <div className="premium-card rounded-xl border border-slate-200/50 bg-slate-50/50 p-4 ring-1 ring-slate-200/40">
                <span className="mb-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                  {t.year}
                </span>
                <p className="text-lg font-semibold text-slate-900">{carData.year}</p>
              </div>
            </div>

            <div
              className={`mt-4 rounded-2xl border border-blue-600/20 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm ring-1 ring-slate-900/20 ${animateCard ? 'animate-value-hero-pulse' : ''}`}
            >
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-white/70">
                {t.value}
              </span>
              <p className="text-4xl font-bold tracking-tight md:text-5xl">
                {carData.estimatedValue.toLocaleString(
                  language === 'da' ? 'da-DK' : 'en-GB',
                )}{' '}
                <span className="text-2xl font-semibold text-white/90 md:text-3xl">
                  kr.
                </span>
              </p>
            </div>

            <div className="premium-card mt-4 rounded-xl border border-slate-200/50 bg-white p-4 ring-1 ring-slate-200/40">
              <a
                href={companyPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 underline-offset-4 hover:text-blue-700"
              >
                Få et tilbud fra en lokal forhandler
              </a>
            </div>
          </div>

          <div
            className={`mt-6 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/50 transition-all duration-500 ${animateCard ? 'animate-slide-up premium-card' : 'opacity-0'}`}
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t.advancedValuation}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{t.advancedDescription}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAdvanced(true)}
                className="relative shrink-0 overflow-hidden rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition-transform before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/20 hover:brightness-110 active:scale-95 active:brightness-90"
              >
                {t.advancedValuation}
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleLogin}
              className="text-xs text-slate-400 underline transition-colors hover:text-slate-600"
            >
              {isLoggedIn ? 'Debug: Set logged out' : 'Debug: Set logged in'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
