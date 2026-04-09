import { createFileRoute, HeadContent, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'

export const Route = createFileRoute('/blog/hvad-er-min-bil-vaerd')({
  component: HvadErMinBilVaerd,
  head: () => ({
    meta: [
      {
        title: 'Hvad er min bil værd? Den komplette guide 2026 | Autoværdi',
      },
      {
        name: 'description',
        content: 'Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.',
      },
      {
        name: 'keywords',
        content: 'hvad er min bil værd, bilvurdering guide, bil værdi, vurdering af bil, sælge bil, brugt bil pris',
      },
      {
        property: 'og:title',
        content: 'Hvad er min bil værd? Den komplette guide 2026',
      },
      {
        property: 'og:description',
        content: 'Komplet guide til bilvurdering. Lær hvad der påvirker din bils værdi og hvordan du får den bedste pris.',
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        name: 'twitter:title',
        content: 'Hvad er min bil værd? Den komplette guide 2026',
      },
      {
        name: 'twitter:description',
        content: 'Komplet guide til bilvurdering. Lær hvad der påvirker din bils værdi.',
      },
      {
        rel: 'canonical',
        href: 'https://www.autovaerdi.dk/blog/hvad-er-min-bil-vaerd',
      },
    ],
  }),
})

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hvad er min bil værd? Den komplette guide 2026',
  description: 'Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.',
  image: 'https://www.autovaerdi.dk/favicon.png',
  author: {
    '@type': 'Organization',
    name: 'Autoværdi',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Autoværdi',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.autovaerdi.dk/favicon.png',
    },
  },
  datePublished: '2026-04-09',
  dateModified: '2026-04-09',
}

function HvadErMinBilVaerd() {
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
          <span className="text-slate-900">What is my car worth?</span>
        </nav>
        
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          What is My Car Worth? The Complete Guide 2026
        </h1>
        
        <p className="mb-8 text-lg text-slate-600">
          Want to know what your car is worth? Read our complete guide to car valuation and learn how to get the best price for your car.
        </p>

        <div className="prose prose-slate max-w-none">
          <p>
            When it is time to sell your car, one of the first questions you ask yourself is: <strong>What is my car worth?</strong> The answer depends on many factors, and in this guide we will go through everything you need to know.
          </p>

          <h2>Factors That Affect Your Car's Value</h2>
          
          <h3>1. Brand and Model</h3>
          <p>
            Some brands hold their value better than others. German brands like BMW, Mercedes and Audi typically have high resale values, while French cars often depreciate faster.
          </p>

          <h3>2. Year and Mileage</h3>
          <p>
            A car loses 15-20% of its value in the first year. After that, it typically loses 10-15% per year. High mileage also affects the value significantly.
          </p>

          <h3>3. Equipment Level</h3>
          <p>
            Cars with extra equipment such as navigation, leather seats, parking sensors and climate control are worth more than base models.
          </p>

          <h3>4. Condition</h3>
          <p>
            The car's condition is crucial. Scratches, rust damage, and worn interior reduce the value. A well-maintained car with service records achieves the best price.
          </p>

          <h2>How to Find Out What Your Car is Worth</h2>
          
          <p>There are several ways to get a car valuation:</p>
          
          <ul>
            <li><strong>Online valuation tools:</strong> Use our free tool at Autoværdi - just enter your license plate</li>
            <li><strong>Dealer valuation:</strong> Get a valuation from a car dealer</li>
            <li><strong>Market analysis:</strong> Check what similar cars are selling for on bilbasen.dk or dba.dk</li>
          </ul>

          <h2>How to Get the Best Price for Your Car</h2>
          
          <ol>
            <li><strong>Clean the car thoroughly</strong> - both inside and out</li>
            <li><strong>Fix minor defects</strong> - scratches and stone chips</li>
            <li><strong>Gather all documentation</strong> - service records, inspection reports</li>
            <li><strong>Take good photos</strong> - in daylight from multiple angles</li>
            <li><strong>Set a realistic price</strong> - based on actual market data</li>
          </ol>

          <div className="my-8 rounded-2xl bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-blue-900">Get a Free Valuation Now</h3>
            <p className="mb-4 text-blue-800">
              Try our free valuation tool and get an instant price estimate for your car.
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
        <span className="text-slate-900">Hvad er min bil værd?</span>
      </nav>
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Hvad er min bil værd? Den komplette guide 2026
      </h1>
      
      <p className="mb-8 text-lg text-slate-600">
        Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.
      </p>

      <div className="prose prose-slate max-w-none">
        <p className="lead text-xl text-slate-600">
          Når det er tid til at sælge din bil, er et af de første spørgsmål du stiller dig selv: <strong>Hvad er min bil værd?</strong> Svaret afhænger af mange faktorer, og i denne guide gennemgår vi alt hvad du behøver at vide.
        </p>

        <h2>Faktorer der påvirker din bils værdi</h2>
        
        <h3>1. Mærke og model</h3>
        <p>
          Nogle mærker holder bedre på værdien end andre. Tyske mærker som BMW, Mercedes og Audi har typisk høje gensalgsværdier, mens franske biler ofte falder hurtigere i pris.
        </p>

        <h3>2. Årgang og kilometerstand</h3>
        <p>
          En bil mister 15-20% af sin værdi det første år. Herefter falder den typisk 10-15% om året. Høj kilometerstand påvirker også værdien betydeligt.
        </p>

        <h3>3. Udstyrsniveau</h3>
        <p>
          Biler med ekstraudstyr som navigation, lædersæder, parkeringssensorer og klimaanlæg er mere værd end basismodeller.
        </p>

        <h3>4. Stand</h3>
        <p>
          Bilens stand er afgørende. Ridser, rustskader og slidt interiør sænker værdien. En velholdt bil med servicebog opnår den bedste pris.
        </p>

        <h2>Sådan finder du ud af hvad din bil er værd</h2>
        
        <p>Der er flere måder at få en bilvurdering på:</p>
        
        <ul>
          <li><strong>Online bilvurdering:</strong> Brug vores gratis værktøj på Autoværdi - indtast blot din nummerplade</li>
          <li><strong>Forhandlervurdering:</strong> Få en vurdering hos en bilforhandler</li>
          <li><strong>Markedsanalyse:</strong> Tjek hvad lignende biler sælges for på bilbasen.dk eller dba.dk</li>
        </ul>

        <h2>Sådan får du den bedste pris for din bil</h2>
        
        <ol>
          <li><strong>Rengør bilen grundigt</strong> - både inde og ude</li>
          <li><strong>Udbedr mindre skader</strong> - ridser og stenslag</li>
          <li><strong>Saml al dokumentation</strong> - servicebog, synrapporter</li>
          <li><strong>Tag gode billeder</strong> - i dagslys fra flere vinkler</li>
          <li><strong>Sæt en realistisk pris</strong> - baseret på faktiske markedsdata</li>
        </ol>

        <h2>Hvor meget falder en bil i værdi?</h2>
        
        <p>
          Bilens værditab følger typisk denne kurve:
        </p>
        
        <ul>
          <li><strong>Første år:</strong> 15-20% værditab</li>
          <li><strong>År 2-3:</strong> 10-15% pr. år</li>
          <li><strong>År 4-5:</strong> 8-12% pr. år</li>
          <li><strong>Efter 5 år:</strong> 5-10% pr. år</li>
        </ul>

        <p>
          Bemærk at luksusbiler og elbiler kan have anderledes afskrivningskurver. Elbiler holder typisk bedre på værdien i øjeblikket på grund af høj efterspørgsel.
        </p>

        <h2>Konklusion</h2>
        
        <p>
          At finde ud af <strong>hvad din bil er værd</strong> behøver ikke at være kompliceret. Med de rette værktøjer og viden om markedet kan du hurtigt få en realistisk vurdering. Brug vores gratis online værktøj til at få en øjeblikkelig vurdering baseret på aktuelle markedsdata.
        </p>

        <div className="my-8 rounded-2xl bg-blue-50 p-6">
          <h3 className="mb-4 text-xl font-semibold text-blue-900">Få en gratis vurdering nu</h3>
          <p className="mb-4 text-blue-800">
            Prøv vores gratis vurderingsværktøj og få et øjeblikkeligt prisoverslag på din bil.
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

        <h2>Relaterede artikler</h2>
        <ul>
          <li><Link to="/blog/bil-vurdering-guide" className="text-blue-600 hover:underline">Sådan vurderer du din bil selv</Link></li>
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
