import { createFileRoute, HeadContent } from '@tanstack/react-router'
import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'
import { BlogArticleLayout } from '@components/BlogArticleLayout'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/bil-vurdering-guide')({
  component: BilVurderingGuide,
  head: () => ({
    meta: [
      {
        title: 'Sådan vurderer du din bil selv | Guide | Autoværdi',
      },
      {
        name: 'description',
        content: 'Lær hvordan du selv kan vurdere din bils værdi. Få tips til at analysere markedet og vurdere din bil korrekt.',
      },
      {
        name: 'keywords',
        content: 'bil vurdering, vurdere bil selv, bilvurdering guide, bil pris vurdering',
      },
      {
        property: 'og:title',
        content: 'Sådan vurderer du din bil selv | Guide',
      },
      {
        property: 'og:description',
        content: 'Lær hvordan du selv kan vurdere din bils værdi.',
      },
      {
        rel: 'canonical',
        href: 'https://www.xn--autovrdi-n0a.dk/blog/bil-vurdering-guide',
      },
    ],
  }),
})

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sådan vurderer du din bil selv',
  description: 'Lær hvordan du selv kan vurdere din bils værdi ved at analysere markedet og tage højde for vigtige faktorer.',
  author: {
    '@type': 'Organization',
    name: 'Autoværdi',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Autoværdi',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.xn--autovrdi-n0a.dk/favicon.png',
    },
  },
  datePublished: '2026-04-09',
  dateModified: '2026-04-09',
}

function BilVurderingGuide() {
  const { language } = useContext(LanguageContext)

  const content = language === 'en' ? (
    <>
      <p className="lead">
        Valuing your car yourself requires insight into the market and understanding of the factors that affect price. Here is a step-by-step guide to doing it right.
      </p>

      <div className="my-8 rounded-xl bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">In this guide you will learn:</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>How to research the market for similar cars</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>What factors to compare</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>How to adjust the price for differences</span>
          </li>
        </ul>
      </div>

      <h2>Step 1: Research the Market</h2>
      <p>
        Start by searching for similar cars on:
      </p>
      <ul>
        <li><strong>bilbasen.dk</strong> - Denmark&apos;s largest car marketplace</li>
        <li><strong>dba.dk</strong> - private sales</li>
        <li><strong>guloggratis.dk</strong> - local listings</li>
      </ul>

      <h2>Step 2: Compare Correctly</h2>
      <p>
        Look for cars with similar:
      </p>
      <ul>
        <li>Year and model</li>
        <li>Mileage (±10,000 km)</li>
        <li>Equipment level</li>
        <li>Condition</li>
      </ul>

      <h2>Step 3: Adjust the Price</h2>
      <p>
        Consider adjustments for:
      </p>
      
      <div className="my-8 space-y-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">High Mileage</h4>
          <p className="text-slate-600">Subtract 1-2% per 10,000 km over average</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Extra Equipment</h4>
          <p className="text-slate-600">Add 5-15% for navigation, leather, etc.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Condition</h4>
          <p className="text-slate-600">Subtract 5-20% for scratches, rust, or interior wear</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Service History</h4>
          <p className="text-slate-600">Add 5-10% for complete documentation</p>
        </div>
      </div>

      <div className="my-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
        <h3 className="mb-3 text-xl font-bold">Quick and Easy Valuation</h3>
        <p className="mb-6 text-blue-100">
          Use our free tool for an instant market-based valuation.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Get Valuation
          <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </>
  ) : (
    <>
      <p className="lead text-xl">
        At vurdere sin bil selv kræver indsigt i markedet og forståelse for de faktorer der påvirker prisen. Her er en trin-for-trin guide til at gøre det rigtigt.
      </p>

      <div className="my-8 rounded-xl bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">I denne guide lærer du:</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Hvordan du undersøger markedet for lignende biler</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Hvilke faktorer du skal sammenligne</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Hvordan du justerer prisen for forskelle</span>
          </li>
        </ul>
      </div>

      <h2>Trin 1: Undersøg markedet</h2>
      <p>
        Start med at søge efter lignende biler på:
      </p>
      <ul>
        <li><strong>bilbasen.dk</strong> - Danmarks største bilportal</li>
        <li><strong>dba.dk</strong> - privat salg</li>
        <li><strong>guloggratis.dk</strong> - lokal handel</li>
      </ul>
      <p>
        Kig efter biler med samme mærke, model, årgang og lignende kilometerstand. Noter priserne på de 5-10 mest relevante annoncer.
      </p>

      <h2>Trin 2: Sammenlign korrekt</h2>
      <p>
        Når du sammenligner, skal du kigge på:
      </p>
      <ul>
        <li>Årgang og model (samme generation)</li>
        <li>Kilometerstand (±10.000 km)</li>
        <li>Udstyrsniveau (basismodel vs. fuld udstyr)</li>
        <li>Stand (fremstår den velholdt?)</li>
        <li>Drivmiddel (benzin, diesel, el, hybrid)</li>
      </ul>

      <h2>Trin 3: Justér prisen</h2>
      <p>
        Nu skal du justere baseret på forskelle:
      </p>
      
      <div className="my-8 space-y-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Kilometerstand</h4>
          <ul className="mt-2 text-sm text-slate-600 space-y-1">
            <li>10.000 km over gennemsnit: -1 til -2%</li>
            <li>20.000 km over gennemsnit: -3 til -5%</li>
            <li>30.000+ km over gennemsnit: -5 til -10%</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Udstyr</h4>
          <ul className="mt-2 text-sm text-slate-600 space-y-1">
            <li>Navigation: +3.000-8.000 kr.</li>
            <li>Lædersæder: +5.000-15.000 kr.</li>
            <li>Parkeringsensor/kamera: +2.000-5.000 kr.</li>
            <li>Panorama soltag: +5.000-10.000 kr.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Stand</h4>
          <ul className="mt-2 text-sm text-slate-600 space-y-1">
            <li>Som ny/særdeles velholdt: +5 til +15%</li>
            <li>Normal stand: 0%</li>
            <li>Småskader/ikke synet: -5 til -15%</li>
            <li>Store skader/rust: -15 til -30%</li>
          </ul>
        </div>
      </div>

      <h2>Trin 4: Beregn din pris</h2>
      <p>
        Tag gennemsnitsprisen fra dine sammenligninger og juster op eller ned baseret på ovenstående punkter. Husk at:
      </p>
      <ul>
        <li>Forhandlerpriser er typisk 10-20% højere end privatpriser</li>
        <li>Prisen på bilbasen er ofte til forhandling</li>
        <li>Sæt din pris 5-10% over minimumsprisen, så der er plads til forhandling</li>
      </ul>

      <h2>Eksempel</h2>
      <p>
        Lad os sige du har en VW Golf fra 2019 med 80.000 km:
      </p>
      <div className="my-6 rounded-lg bg-slate-50 p-6">
        <ul className="space-y-2">
          <li className="flex justify-between"><span>Gennemsnitspris på markedet:</span> <span className="font-mono">180.000 kr.</span></li>
          <li className="flex justify-between"><span>Ekstra udstyr (navigation + læder):</span> <span className="font-mono text-green-600">+10.000 kr.</span></li>
          <li className="flex justify-between"><span>Komplet servicebog:</span> <span className="font-mono text-green-600">+8.000 kr.</span></li>
          <li className="flex justify-between"><span>Velholdt stand:</span> <span className="font-mono text-green-600">+5.000 kr.</span></li>
          <li className="flex justify-between border-t pt-2 font-semibold"><span>Anbefalet pris:</span> <span className="font-mono text-blue-600">203.000 kr.</span></li>
        </ul>
      </div>

      <div className="my-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
        <h3 className="mb-3 text-xl font-bold">Få en præcis vurdering på sekunder</h3>
        <p className="mb-6 text-blue-100">
          Brug vores gratis værktøj til en øjeblikkelig vurdering baseret på markedsværdi. Indtast blot din nummerplade.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Få vurdering
          <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      <h2>Konklusion</h2>
      <p>
        At vurdere sin bil selv kræver research og indsigt i markedet. Ved at følge denne guide kan du komme tæt på den rigtige pris. Husk dog at markedet ændrer sig, så det er en god idé at holde sig opdateret.
      </p>

      <h2>Relaterede artikler</h2>
      <div className="grid gap-4 not-prose">
        <Link to="/blog/hvad-er-min-bil-værd" className="group flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">Hvad er min bil værd? Komplet guide</h4>
            <p className="text-sm text-slate-600">Alt du behøver at vide om bilvurdering</p>
          </div>
        </Link>
      </div>
    </>
  )

  return (
    <>
      <HeadContent />
      <BlogArticleLayout
        title={language === 'da' ? 'Sådan vurderer du din bil selv' : 'How to Value Your Car Yourself'}
        excerpt={language === 'da' ? 'Lær hvordan du selv kan vurdere din bils værdi ved at analysere markedet og tage højde for vigtige faktorer.' : 'Learn how to value your car yourself by analyzing the market and taking important factors into account.'}
        date="2026-04-09"
        readTime="4 min"
        breadcrumbs={[
          { label: language === 'da' ? 'Forside' : 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: language === 'da' ? 'Sådan vurderer du selv' : 'How to value yourself' },
        ]}
        schema={articleSchema}
        language={language}
      >
        {content}
      </BlogArticleLayout>
    </>
  )
}
