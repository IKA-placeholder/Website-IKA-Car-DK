import { createFileRoute, HeadContent, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'

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

  if (language === 'en') {
    return (
      <article className="mx-auto max-w-4xl px-4 py-12">
        <HeadContent />
        <nav className="mb-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Car valuation guide</span>
        </nav>
        
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          How to Value Your Car Yourself
        </h1>
        
        <p className="mb-8 text-lg text-slate-600">
          Learn how to value your car yourself by analyzing the market and taking important factors into account.
        </p>

        <div className="prose prose-slate max-w-none">
          <p>
            Valuing your car yourself requires insight into the market and understanding of the factors that affect price. Here is a step-by-step guide to doing it right.
          </p>

          <h2>Step 1: Research the Market</h2>
          <p>
            Start by searching for similar cars on:
          </p>
          <ul>
            <li>bilbasen.dk - Denmark's largest car marketplace</li>
            <li>dba.dk - private sales</li>
            <li>guloggratis.dk - local listings</li>
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
          <ul>
            <li><strong>High mileage:</strong> Subtract 1-2% per 10,000 km over average</li>
            <li><strong>Extra equipment:</strong> Add 5-15% for navigation, leather, etc.</li>
            <li><strong>Condition:</strong> Subtract 5-20% for scratches, rust, or interior wear</li>
            <li><strong>Service history:</strong> Add 5-10% for complete documentation</li>
          </ul>

          <div className="my-8 rounded-2xl bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-blue-900">Quick and Easy Valuation</h3>
            <p className="mb-4 text-blue-800">
              Use our free tool for an instant market-based valuation.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get Valuation
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </article>
    )
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <HeadContent />
      <nav className="mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-blue-600">Forside</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Bil vurdering guide</span>
      </nav>
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Sådan vurderer du din bil selv
      </h1>
      
      <p className="mb-8 text-lg text-slate-600">
        Lær hvordan du selv kan vurdere din bils værdi ved at analysere markedet og tage højde for vigtige faktorer.
      </p>

      <div className="prose prose-slate max-w-none">
        <p className="lead text-xl text-slate-600">
          At vurdere sin bil selv kræver indsigt i markedet og forståelse for de faktorer der påvirker prisen. Her er en trin-for-trin guide til at gøre det rigtigt.
        </p>

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
        
        <h3>Kilometerstand</h3>
        <ul>
          <li>10.000 km over gennemsnit: -1 til -2%</li>
          <li>20.000 km over gennemsnit: -3 til -5%</li>
          <li>30.000+ km over gennemsnit: -5 til -10%</li>
        </ul>

        <h3>Udstyr</h3>
        <ul>
          <li>Navigation: +3.000-8.000 kr.</li>
          <li>Lædersæder: +5.000-15.000 kr.</li>
          <li>Parkeringsensor/kamera: +2.000-5.000 kr.</li>
          <li>Panorama soltag: +5.000-10.000 kr.</li>
          <li>Klimaanlæg: +5.000-10.000 kr.</li>
        </ul>

        <h3>Stand</h3>
        <ul>
          <li>Som ny/særdeles velholdt: +5 til +15%</li>
          <li>Normal stand: 0%</li>
          <li>Småskader/ikke synet: -5 til -15%</li>
          <li>Store skader/rust: -15 til -30%</li>
        </ul>

        <h3>Servicehistorik</h3>
        <ul>
          <li>Komplet servicebog: +5 til +10%</li>
          <li>Manglende service: -5 til -15%</li>
          <li>Nylig stort service: +2.000-5.000 kr.</li>
        </ul>

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
        <ul>
          <li>Gennemsnitspris på markedet: 180.000 kr.</li>
          <li>Ekstra udstyr (navigation + læder): +10.000 kr.</li>
          <li>Komplet servicebog: +8.000 kr.</li>
          <li>Velholdt stand: +5.000 kr.</li>
          <li><strong>Anbefalet pris: 203.000 kr.</strong></li>
        </ul>

        <div className="my-8 rounded-2xl bg-blue-50 p-6">
          <h3 className="mb-4 text-xl font-semibold text-blue-900">Få en præcis vurdering på sekunder</h3>
          <p className="mb-4 text-blue-800">
            Brug vores gratis værktøj til en øjeblikkelig vurdering baseret på markedsværdi. Indtast blot din nummerplade.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
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
        <ul>
          <li><Link to="/blog/hvad-er-min-bil-vaerd" className="text-blue-600 hover:underline">Hvad er min bil værd? Den komplette guide</Link></li>
          <li><Link to="/blog/saelg-bil-hoejeste-pris" className="text-blue-600 hover:underline">Sådan får du den højeste pris for din bil</Link></li>
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </article>
  )
}
