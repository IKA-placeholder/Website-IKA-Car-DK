import { createFileRoute } from '@tanstack/react-router'
import LicensePlateSearch from '@components/LicensePlateSearch'
import FloatingCTA from '@components/FloatingCTA'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { LanguageContext } from '@components/LanguageProvider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackgroundCars from '@components/BackgroundCars'
import DenmarkSilhouette from '@components/DenmarkSilhouette'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TEXT = {
  da: {
    heroTitle: 'Find din bils værdi med ét klik',
    heroDesc:
      'Indtast dit nummerpladenummer og få øjeblikkelig vurdering af din bils værdi',
    howTitle: 'Sådan fungerer det',
    steps: [
      {
        title: 'Indtast nummerplade',
        desc: 'Indtast dit nummerpladenummer i søgefeltet',
      },
      {
        title: 'Vi finder din bil',
        desc: 'Vi henter oplysninger om din bil fra det officielle register',
      },
      {
        title: 'Få din vurdering',
        desc: 'Vores machine learning model laver et estimat på hvad du kan forvente at bilen er værd',
      },
    ],
  },
  en: {
    heroTitle: "Find your car's value instantly",
    heroDesc: 'Enter your license plate and get an instant car value estimate',
    howTitle: 'How it works',
    steps: [
      {
        title: 'Enter license plate',
        desc: 'Type your license plate number in the search field',
      },
      {
        title: 'We find your car',
        desc: 'We fetch your car details from the official register',
      },
      {
        title: 'Get your valuation',
        desc: "Receive an accurate estimate of your car's value",
      },
    ],
  },
}

function StepIcon({ index }: { index: number }) {
  const common = 'h-7 w-7 text-slate-600'
  if (index === 0) {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 .648-.204 1.25-.58 1.75" />
      </svg>
    )
  }
  return (
    <svg className={common} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v7.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-7.125ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { language } = useContext(LanguageContext)
  const t = TEXT[language]
  const heroRef = useRef(null)
  const howRef = useRef<HTMLElement>(null)

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('app_authenticated')
      if (stored === 'true') setAuthenticated(true)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!heroRef.current || !authenticated) return

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.from('.hero-title', {
      y: 36,
      opacity: 0,
      duration: 0.95,
      delay: 0.06,
    })
      .from(
        '.hero-description',
        {
          y: 22,
          opacity: 0,
          duration: 0.72,
        },
        '-=0.5',
      )
      .from(
        '.license-search',
        {
          y: 28,
          opacity: 0,
          duration: 0.82,
        },
        '-=0.42',
      )

    return () => {
      tl.kill()
    }
  }, [authenticated])

  useEffect(() => {
    if (!howRef.current || !authenticated) return

    const section = howRef.current
    const ctx = gsap.context(() => {
      gsap.from('.how-heading-st', {
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.how-step', {
        y: 56,
        opacity: 0,
        duration: 0.95,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
    }, howRef)

    return () => ctx.revert()
  }, [authenticated])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-white to-slate-50 pb-24 pt-20 text-slate-900">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-50/80 to-transparent"
        aria-hidden
      />
      <DenmarkSilhouette />

      <div
        className="pointer-events-none absolute left-1/4 top-40 -z-10 h-72 w-72 rounded-full bg-blue-600/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-24 right-1/4 -z-10 h-80 w-80 rounded-full bg-slate-400/[0.06] blur-3xl"
        aria-hidden
      />

      <section
        ref={heroRef}
        className="relative mt-8 flex flex-col items-center justify-center overflow-hidden px-4 py-20 md:py-28"
      >
        <BackgroundCars />
        <div className="relative z-[1] w-full max-w-3xl space-y-10 text-center">
          <h1 className="hero-title text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl md:leading-[1.08]">
            {t.heroTitle}
          </h1>
          <p className="hero-description mx-auto max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl">
            {t.heroDesc}
          </p>

          <div id="license-plate-search" className="license-search relative mx-auto w-full max-w-xl">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-blue-600/10 blur-3xl"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-white/50 bg-white/80 p-6 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-xl md:p-8">
              <LicensePlateSearch />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={howRef}
        className="how-section border-t border-slate-200/60 px-4 py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="how-heading-st mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              {t.howTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              {language === 'da'
                ? 'Tre enkle trin fra nummerplade til vurdering.'
                : 'Three simple steps from plate to valuation.'}
            </p>
          </div>

          <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-center md:gap-0">
            {t.steps.map((step, i) => (
              <Fragment key={step.title}>
                <div className="how-step relative flex flex-1 flex-col items-center text-center md:px-4">
                  <span
                    className="pointer-events-none absolute -left-4 -top-10 -z-10 select-none text-8xl font-bold leading-none text-slate-100"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/60 bg-white shadow-sm ring-1 ring-slate-200/40">
                    <StepIcon index={i} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                    {step.desc}
                  </p>
                </div>
                {i < 2 && (
                  <div
                    className="hidden items-center justify-center self-center md:flex md:min-h-[8rem] md:w-10 md:shrink-0 md:pt-10"
                    aria-hidden
                  >
                    <div className="h-px w-full min-w-[2.5rem] border-t border-dashed border-slate-200/90 lg:min-w-[4rem]" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <FloatingCTA />
    </main>
  )
}
