import { createFileRoute, HeadContent } from '@tanstack/react-router'
import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'
import { BlogArticleLayout } from '@components/BlogArticleLayout'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/hvad-er-min-bil-værd')({
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
        href: 'https://www.xn--autovrdi-n0a.dk/blog/hvad-er-min-bil-værd',
      },
    ],
  }),
})

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hvad er min bil værd? Den komplette guide 2026',
  description: 'Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.',
  image: 'https://www.xn--autovrdi-n0a.dk/favicon.png',
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

function HvadErMinBilVaerd() {
  const { language } = useContext(LanguageContext)

  const content = language === 'en' ? (
    <>
      <p className="lead">
        When it is time to sell your car, one of the first questions you ask yourself is: <strong>What is my car worth?</strong> The answer depends on many factors, and in this guide we will go through everything you need to know.
      </p>

      <div className="my-8 rounded-xl bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">Quick Summary</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>A car loses 15-20% of its value in the first year</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Brand, model, and equipment level affect the price significantly</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>You can get a free online valuation in seconds</span>
          </li>
        </ul>
      </div>

      <h2>Factors That Affect Your Car&apos;s Value</h2>
      
      <h3>1. Brand and Model</h3>
      <p>
        Some brands hold their value better than others. German brands like BMW, Mercedes and Audi typically have high resale values, while French cars often depreciate faster.
      </p>

      <h3>2. Year and Mileage</h3>
      <p>
        A car loses 15-20% of its value in the first year. After that, it typically loses 10-15% per year. High mileage also affects the value significantly.
      </p>

      <div className="my-8 overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900">Age</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Typical Value Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3">First year</td>
              <td className="px-4 py-3">15-20%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Year 2-3</td>
              <td className="px-4 py-3">10-15% per year</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Year 4-5</td>
              <td className="px-4 py-3">8-12% per year</td>
            </tr>
            <tr>
              <td className="px-4 py-3">After 5 years</td>
              <td className="px-4 py-3">5-10% per year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Equipment Level</h3>
      <p>
        Cars with extra equipment such as navigation, leather seats, parking sensors and climate control are worth more than base models.
      </p>

      <h3>4. Condition</h3>
      <p>
        The car&apos;s condition is crucial. Scratches, rust damage, and worn interior reduce the value. A well-maintained car with service records achieves the best price.
      </p>

      <h2>How to Find Out What Your Car is Worth</h2>
      
      <p>There are several ways to get a car valuation:</p>
      
      <ul>
        <li><strong>Online valuation tools:</strong> Use our free tool at Autoværdi - just enter your license plate</li>
        <li><strong>Dealer valuation:</strong> Get a valuation from a car dealer</li>
        <li><strong>Market analysis:</strong> Check what similar cars are selling for on bilbasen.dk or dba.dk</li>
      </ul>

      <div className="my-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
        <h3 className="mb-3 text-xl font-bold">Get a Free Valuation Now</h3>
        <p className="mb-6 text-blue-100">
          Try our free valuation tool for an instant market-based valuation.
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

      <h2>How to Get the Highest Price for Your Car</h2>
      
      <ol>
        <li><strong>Thorough cleaning</strong> - both inside and out</li>
        <li><strong>Fix minor defects</strong> - scratches and stone chips</li>
        <li><strong>Gather all documentation</strong> - service records, inspection reports</li>
        <li><strong>Take good photos</strong> - in daylight from multiple angles</li>
        <li><strong>Set a realistic price</strong> - based on actual market data</li>
      </ol>

      <h2>Related Articles</h2>
      <div className="grid gap-4 not-prose">
        <Link to="/blog/bil-vurdering-guide" className="group flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">How to Value Your Car Yourself</h4>
            <p className="text-sm text-slate-600">Learn the step-by-step process</p>
          </div>
        </Link>
      </div>
    </>
  ) : (
    <>
      <p className="lead text-xl">
        Når det er tid til at sælge din bil, er et af de første spørgsmål du stiller dig selv: <strong>Hvad er min bil værd?</strong> Svaret afhænger af mange faktorer, og i denne guide gennemgår vi alt hvad du behøver at vide.
      </p>

      <div className="my-8 rounded-xl bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">Hurtig opsummering</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>En bil mister 15-20% af sin værdi det første år</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Mærke, model og udstyr påvirker prisen markant</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Du kan få en gratis online vurdering på sekunder</span>
          </li>
        </ul>
      </div>

      <h2>Faktorer der påvirker din bils værdi</h2>
      
      <h3>1. Mærke og model</h3>
      <p>
        Nogle mærker holder bedre på værdien end andre. Tyske mærker som BMW, Mercedes og Audi har typisk høje gensalgsværdier, mens franske biler ofte falder hurtigere i pris.
      </p>

      <h3>2. Årgang og kilometerstand</h3>
      <p>
        En bil mister 15-20% af sin værdi det første år. Herefter falder den typisk 10-15% om året. Høj kilometerstand påvirker også værdien betydeligt.
      </p>

      <div className="my-8 overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900">Alder</th>
              <th className="px-4 py-3 font-semibold text-slate-900">Typisk værditab</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3">Første år</td>
              <td className="px-4 py-3">15-20%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">År 2-3</td>
              <td className="px-4 py-3">10-15% pr. år</td>
            </tr>
            <tr>
              <td className="px-4 py-3">År 4-5</td>
              <td className="px-4 py-3">8-12% pr. år</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Efter 5 år</td>
              <td className="px-4 py-3">5-10% pr. år</td>
            </tr>
          </tbody>
        </table>
      </div>

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

      <div className="my-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
        <h3 className="mb-3 text-xl font-bold">Få en gratis vurdering nu</h3>
        <p className="mb-6 text-blue-100">
          Prøv vores gratis værktøj til en øjeblikkelig vurdering baseret på markedsværdi.
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

      <h2>Sådan får du den bedste pris for din bil</h2>
      
      <ol>
        <li><strong>Grundig rengøring</strong> - både inde og ude</li>
        <li><strong>Udbedring af mindre skader</strong> - ridser og stenslag</li>
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

      <h2>Relaterede artikler</h2>
      <div className="grid gap-4 not-prose">
        <Link to="/blog/bil-vurdering-guide" className="group flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">Sådan vurderer du din bil selv</h4>
            <p className="text-sm text-slate-600">Lær trin-for-trin processen</p>
          </div>
        </Link>
        <Link to="/blog/saelg-bil-hoejeste-pris" className="group flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">Sådan får du den højeste pris for din bil</h4>
            <p className="text-sm text-slate-600">10 tips til at maksimere salgsprisen</p>
          </div>
        </Link>
      </div>
    </>
  )

  return (
    <>
      <HeadContent />
      <BlogArticleLayout
        title={language === 'da' ? 'Hvad er min bil værd? Den komplette guide 2026' : 'What is My Car Worth? The Complete Guide 2026'}
        excerpt={language === 'da' ? 'Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.' : 'Want to know what your car is worth? Read our complete guide to car valuation and learn how to get the best price for your car.'}
        date="2026-04-09"
        readTime="5 min"
        breadcrumbs={[
          { label: language === 'da' ? 'Forside' : 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: language === 'da' ? 'Hvad er min bil værd?' : 'What is my car worth?' },
        ]}
        schema={articleSchema}
        language={language}
      >
        {content}
      </BlogArticleLayout>
    </>
  )
}
