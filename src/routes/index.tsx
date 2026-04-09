import { createFileRoute, HeadContent, Link } from '@tanstack/react-router'
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
    heroTitle: 'Hvad er min bil værd? Få en gratis bilvurdering',
    heroDesc:
      'Få en gratis og øjeblikkelig bilvurdering baseret på markedsværdi. Indtast din nummerplade og se hvad din bil er værd.',
    howTitle: 'Så nemt er det',
    steps: [
      {
        title: 'Indtast nummerplade',
        desc: 'Skriv din nummerplade i feltet – det tager 2 sekunder.',
      },
      {
        title: 'Vi finder din bil',
        desc: 'Vi slår din bil op og henter de vigtigste oplysninger.',
      },
      {
        title: 'Få din vurdering',
        desc: 'Autoværdi regner på det og giver dig et realistisk bud på, hvad din bil er værd lige nu.',
      },
    ],
    seoTitle: 'Hvad er min bil værd? | Gratis bilvurdering → Autoværdi',
    seoDescription: 'Vil du vide "hvad er min bil værd"? Få en gratis og øjeblikkelig bilvurdering. Indtast nummerplade og få realistisk pris baseret på markedsværdi. Prøv nu!',
    keywords: 'hvad er min bil værd, bilvurdering, bil værdi, vurdering af bil, pris på bil, brugt bil værdi, nummerplade',
  },

  en: {
    heroTitle: "What is my car worth? Get a free valuation",
    heroDesc: 'Get a free instant car valuation based on market value. Enter your license plate and see what your car is worth.',
    howTitle: 'How it works',
    steps: [
      {
        title: 'Enter your plate',
        desc: 'Just type in your license plate – takes two seconds.',
      },
      {
        title: 'We find your car',
        desc: 'We pull up your car and gather the key details.',
      },
      {
        title: 'Get your estimate',
        desc: 'Autoværdi crunches the numbers and gives you a realistic idea of what your car is worth right now.',
      },
    ],
    seoTitle: 'What is my car worth? | Free Car Valuation → Autoværdi',
    seoDescription: 'Want to know what your car is worth? Get a free instant car valuation. Enter your license plate and get a realistic price based on market value. Try now!',
    keywords: 'what is my car worth, car valuation, car value, value my car, car price, used car value, license plate',
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

// SEO metadata for this route
const SITE_URL = 'https://www.xn--autovrdi-n0a.dk'

// Enhanced FAQ structured data for SEO - targets primary keyword
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hvad er min bil værd?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Din bils værdi afhænger af mange faktorer: mærke, model, årgang, kilometerstand, udstyr og stand. Med Autoværdi kan du få en gratis vurdering ved at indtaste din nummerplade. Vi analyserer markedsværdien baseret på faktiske salgspriser fra Danmark."
      }
    },
    {
      "@type": "Question",
      "name": "Hvordan finder jeg ud af hvad min bil er værd?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Den nemmeste måde at finde ud af hvad din bil er værd, er at bruge en online bilvurderingstjeneste som Autoværdi. Indtast blot din nummerplade, og du får straks en vurdering baseret på aktuelle markedsdata."
      }
    },
    {
      "@type": "Question",
      "name": "Hvor meget er min brugte bil værd?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Værdien af en brugt bil varierer meget afhængigt af alder, stand og udstyr. En bil taber typisk 15-20% i værdi det første år og herefter 10-15% årligt. Brug Autoværdis gratis værktøj til at få en præcis vurdering af netop din bil."
      }
    },
    {
      "@type": "Question",
      "name": "Hvordan fungerer bilvurdering på Autoværdi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Det er simpelt: indtast din nummerplade, så finder vi din bil i databasen og beregner en realistisk markedsværdi baseret på årgang, model og aktuelle markedspriser."
      }
    },
    {
      "@type": "Question",
      "name": "Er bilvurderingen gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, vores online bilvurdering er helt gratis. Du kan få et øjeblikkeligt prisoverslag ved at indtaste din nummerplade."
      }
    },
    {
      "@type": "Question",
      "name": "Hvor præcis er vurderingen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vores vurdering er baseret på avancerede algoritmer og aktuelle markedsdata fra danske bilmarkeder. Den giver et realistisk estimat af din bils værdi."
      }
    }
  ]
}

export const Route = createFileRoute('/')({
  component: Home,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: 'Hvad er min bil værd? | Gratis bilvurdering → Autoværdi',
      },
      {
        name: 'description',
        content: 'Vil du vide "hvad er min bil værd"? Få en gratis og øjeblikkelig bilvurdering. Indtast nummerplade og få realistisk pris baseret på markedsværdi. Prøv nu!',
      },
      {
        name: 'keywords',
        content: 'hvad er min bil værd, bilvurdering, bil værdi, vurdering af bil, pris på bil, brugt bil værdi, nummerplade',
      },
      {
        property: 'og:title',
        content: 'Hvad er min bil værd? | Gratis bilvurdering',
      },
      {
        property: 'og:description',
        content: 'Få en øjeblikkelig og gratis vurdering af din bils værdi. Indtast dit nummerpladenummer og få et realistisk prisoverslag.',
      },
      {
        property: 'og:url',
        content: SITE_URL,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:title',
        content: 'Hvad er min bil værd? | Gratis bilvurdering',
      },
      {
        name: 'twitter:description',
        content: 'Få en øjeblikkelig og gratis vurdering af din bils værdi.',
      },
      {
        rel: 'canonical',
        href: SITE_URL,
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: SITE_URL,
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(faqStructuredData),
      },
    ],
  }),
})

function Home() {
  const { language } = useContext(LanguageContext)
  const t = TEXT[language]
  const heroRef = useRef(null)
  const howRef = useRef<HTMLElement>(null)
  const seoRef = useRef<HTMLElement>(null)

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

  // SEO content animation
  useEffect(() => {
    if (!seoRef.current || !authenticated) return

    const section = seoRef.current
    const ctx = gsap.context(() => {
      gsap.from('.seo-content-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, seoRef)

    return () => ctx.revert()
  }, [authenticated])

  // FAQ texts
  const faqTexts = {
    da: {
      faqTitle: 'Ofte stillede spørgsmål',
      questions: [
        {
          q: 'Hvad er min bil værd?',
          a: 'Din bils værdi afhænger af mange faktorer: mærke, model, årgang, kilometerstand, udstyr og stand. Med Autoværdi kan du få en gratis vurdering ved at indtaste din nummerplade. Vi analyserer markedsværdien baseret på faktiske salgspriser fra Danmark.'
        },
        {
          q: 'Hvordan finder jeg ud af hvad min bil er værd?',
          a: 'Den nemmeste måde at finde ud af hvad din bil er værd, er at bruge en online bilvurderingstjeneste som Autoværdi. Indtast blot din nummerplade, og du får straks en vurdering baseret på aktuelle markedsdata.'
        },
        {
          q: 'Hvor meget er min brugte bil værd?',
          a: 'Værdien af en brugt bil varierer meget afhængigt af alder, stand og udstyr. En bil taber typisk 15-20% i værdi det første år og herefter 10-15% årligt. Brug Autoværdis gratis værktøj til at få en præcis vurdering af netop din bil.'
        }
      ]
    },
    en: {
      faqTitle: 'Frequently Asked Questions',
      questions: [
        {
          q: 'How does car valuation work on Autoværdi?',
          a: 'It is simple: enter your license plate, we find your car in the database and calculate a realistic market value based on year, model and current market prices.'
        },
        {
          q: 'Is the car valuation free?',
          a: 'Yes, our online car valuation is completely free. You can get an instant price estimate by entering your license plate.'
        },
        {
          q: 'How accurate is the valuation?',
          a: 'Our valuation is based on advanced algorithms and current market data from Danish car markets. It provides a realistic estimate of your car\'s value.'
        }
      ]
    }
  }

  const currentFaq = faqTexts[language]

  return (
    <>
      <HeadContent />
      <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-white to-slate-50 pb-24 pt-16 text-slate-900">
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
        className="relative mt-4 flex flex-col items-center justify-center overflow-hidden px-4 py-16 md:py-24"
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

      {/* SEO Content Section - targets primary keyword */}
      <section 
        ref={seoRef}
        className="border-t border-slate-200/60 px-4 py-16 bg-white"
        aria-labelledby="seo-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="seo-heading" className="seo-content-item text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl mb-6">
            {language === 'da' ? 'Hvad er min bil værd?' : 'What is my car worth?'}
          </h2>
          <div className="seo-content-item prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-4">
              {language === 'da' 
                ? 'Når du spørger "hvad er min bil værd?", er svaret ikke altid lige til. Bilens værdi afhænger af flere faktorer: mærke, model, årgang, kilometerstand, udstyrsniveau og ikke mindst bilens generelle stand. Hos Autoværdi gør vi det nemt at få svar på netop det spørgsmål. Vores avancerede algoritme analyserer aktuelle markedsværdier fra danske bilforhandlere og privat salg, så du får et realistisk bud på din bils værdi.'
                : 'When you ask "what is my car worth?", the answer is not always straightforward. The value of your car depends on several factors: make, model, year, mileage, equipment level, and not least the car\'s overall condition. At Autoværdi, we make it easy to get an answer to exactly that question. Our advanced algorithm analyzes current market values from Danish car dealers and private sales, so you get a realistic estimate of your car\'s value.'
              }
            </p>
            <h3 className="seo-content-item text-xl font-semibold text-slate-900 mt-8 mb-4">
              {language === 'da' ? 'Sådan finder du ud af hvad din bil er værd' : 'How to find out what your car is worth'}
            </h3>
            <p className="seo-content-item text-slate-600 leading-relaxed mb-4">
              {language === 'da'
                ? 'Det tager kun 10 sekunder at få en gratis vurdering. Indtast din nummerplade i feltet ovenfor, og vores system finder automatisk alle oplysninger om din bil. Herefter beregner vi en præcis vurdering baseret på tusindvis af sammenlignelige bilsalg i Danmark.'
                : 'It only takes 10 seconds to get a free valuation. Enter your license plate in the field above, and our system automatically finds all information about your car. Then we calculate an accurate valuation based on thousands of comparable car sales in Denmark.'
              }
            </p>
            <h3 className="seo-content-item text-xl font-semibold text-slate-900 mt-8 mb-4">
              {language === 'da' ? 'Hvorfor vælge Autoværdi til din bilvurdering?' : 'Why choose Autoværdi for your car valuation?'}
            </h3>
            <ul className="seo-content-item space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{language === 'da' ? 'Helt gratis bilvurdering uden skjulte gebyrer' : 'Completely free car valuation with no hidden fees'}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{language === 'da' ? 'Resultat på få sekunder baseret på markedsværdi' : 'Results in seconds based on market value'}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{language === 'da' ? 'Databaseret på reelle salgspriser fra danske bilmarkeder' : 'Data based on real sales prices from Danish car markets'}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{language === 'da' ? 'Avancerede algoritmer der tager højde for årgang, model og stand' : 'Advanced algorithms that account for year, model, and condition'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FloatingCTA />
      
      {/* FAQ Section */}
      <section className="border-t border-slate-200/60 px-4 py-16 bg-slate-50/50" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl text-center mb-8">
            {currentFaq.faqTitle}
          </h2>
          <div className="space-y-4">
            {currentFaq.questions.map((faq, index) => (
              <details key={index} className="group bg-white rounded-xl border border-slate-200/60 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left font-medium text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="px-4 pb-4 text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Links Section - Internal Linking for SEO */}
      <section className="border-t border-slate-200/60 px-4 py-16 bg-white" aria-labelledby="guides-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="guides-heading" className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl text-center mb-4">
            {language === 'da' ? 'Lær mere om bilvurdering' : 'Learn more about car valuation'}
          </h2>
          <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
            {language === 'da' 
              ? 'Læs vores guides og artikler for at blive klogere på bilvurdering og salg af brugte biler.'
              : 'Read our guides and articles to learn more about car valuation and selling used cars.'
            }
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to="/blog/hvad-er-min-bil-vaerd" 
              className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all"
            >
              <div className="mb-4 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {language === 'da' ? 'Hvad er min bil værd?' : 'What is my car worth?'}
              </h3>
              <p className="text-sm text-slate-500">
                {language === 'da' 
                  ? 'Komplet guide til bilvurdering og faktorer der påvirker prisen.'
                  : 'Complete guide to car valuation and factors affecting price.'
                }
              </p>
            </Link>

            <Link 
              to="/blog/bil-vurdering-guide" 
              className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all"
            >
              <div className="mb-4 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {language === 'da' ? 'Sådan vurderer du selv' : 'How to value your car'}
              </h3>
              <p className="text-sm text-slate-500">
                {language === 'da' 
                  ? 'Lær hvordan du selv kan vurdere din bil ved at analysere markedet.'
                  : 'Learn how to value your car by analyzing the market.'
                }
              </p>
            </Link>

            <Link 
              to="/blog/saelg-bil-hoejeste-pris" 
              className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all"
            >
              <div className="mb-4 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {language === 'da' ? 'Få højeste pris' : 'Get the best price'}
              </h3>
              <p className="text-sm text-slate-500">
                {language === 'da' 
                  ? 'Tips til at maksimere salgsprisen på din bil.'
                  : 'Tips for maximizing your car sale price.'
                }
              </p>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/blog"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              {language === 'da' ? 'Se alle artikler' : 'See all articles'}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
    </main>
    </>
  )
}
