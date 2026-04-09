import { createFileRoute, HeadContent, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { LanguageContext } from '@components/LanguageProvider'

export const Route = createFileRoute('/blog/saelg-bil-hoejeste-pris')({
  component: SaelgBilHoejestePris,
  head: () => ({
    meta: [
      {
        title: 'Sådan får du den højeste pris for din bil | Tips | Autoværdi',
      },
      {
        name: 'description',
        content: 'Få praktiske tips til at maksimere salgsprisen på din bil. Lær om rengøring, udbedring af skader og forhandling.',
      },
      {
        name: 'keywords',
        content: 'sælge bil, højeste pris bil, sælg bil privat, bil salg tips, få mere for bilen',
      },
      {
        property: 'og:title',
        content: 'Sådan får du den højeste pris for din bil',
      },
      {
        property: 'og:description',
        content: 'Praktiske tips til at maksimere salgsprisen på din bil.',
      },
      {
        rel: 'canonical',
        href: 'https://www.xn--autovrdi-n0a.dk/blog/saelg-bil-hoejeste-pris',
      },
    ],
  }),
})

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sådan får du den højeste pris for din bil',
  description: 'Få praktiske tips til at maksimere salgsprisen på din bil - fra rengøring til forhandling.',
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

function SaelgBilHoejestePris() {
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
          <span className="text-slate-900">Get the highest price</span>
        </nav>
        
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          How to Get the Highest Price for Your Car
        </h1>
        
        <p className="mb-8 text-lg text-slate-600">
          Practical tips to maximize the sale price of your car - from cleaning to negotiation.
        </p>

        <div className="prose prose-slate max-w-none">
          <p>
            Selling your car at the best price requires preparation and strategy. Here are the most important steps to get the most money for your car.
          </p>

          <h2>1. Thorough Cleaning</h2>
          <p>
            A clean car signals that it has been well maintained:
          </p>
          <ul>
            <li>Wash and wax the exterior</li>
            <li>Clean wheels and wheel arches</li>
            <li>Shampoo the interior and trunk</li>
            <li>Clean windows inside and out</li>
            <li>Remove all personal items</li>
          </ul>

          <h2>2. Fix Minor Damage</h2>
          <p>
            Small repairs can provide great returns:
          </p>
          <ul>
            <li>Remove stone chips and scratches</li>
            <li>Fix dents (PDR is inexpensive)</li>
            <li>Replace worn wiper blades</li>
            <li>Fix small rust spots</li>
          </ul>

          <h2>3. Good Photos</h2>
          <p>
            Photos are crucial for attracting buyers:
          </p>
          <ul>
            <li>Take photos in daylight</li>
            <li>Choose a neutral background</li>
            <li>Photograph from all angles</li>
            <li>Remember interior and engine bay</li>
            <li>Show any damage honestly</li>
          </ul>

          <div className="my-8 rounded-2xl bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-blue-900">Know Your Car's Value</h3>
            <p className="mb-4 text-blue-800">
              Get a free valuation to know your starting point before selling.
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
        <span className="text-slate-900">Sælg bil til højeste pris</span>
      </nav>
      
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Sådan får du den højeste pris for din bil
      </h1>
      
      <p className="mb-8 text-lg text-slate-600">
        Få praktiske tips til at maksimere salgsprisen på din bil - fra rengøring til forhandling.
      </p>

      <div className="prose prose-slate max-w-none">
        <p className="lead text-xl text-slate-600">
          At sælge sin bil til den bedste pris kræver forberedelse og strategi. Her er de vigtigste skridt til at få mest muligt ud af dit bilsalg.
        </p>

        <h2>1. Grundig rengøring</h2>
        <p>
          En ren bil signalerer at den er blevet passet godt på. Invester tid i:
        </p>
        <ul>
          <li><strong>Udvendig vask:</strong> Brug voks for ekstra glans</li>
          <li><strong>Fælge:</strong> Rengør grundigt i hjulbuer og på fælge</li>
          <li><strong>Interiør:</strong> Støvsug, shampooney sæder og gulvtæpper</li>
          <li><strong>Ruder:</strong> Puds alle ruder indvendigt og udvendigt</li>
          <li><strong>Motorrum:</strong> En let aftørring gør underværker</li>
          <li><strong>Bagagerum:</strong> Tøm helt og rengør</li>
        </ul>
        <p>
          Overvej en professionel bilvask (kr. 500-1.000) - det kan øge salgsprisen med flere tusinde kroner.
        </p>

        <h2>2. Udbedring af mindre skader</h2>
        <p>
          Små reparationer kan give stor afkast:
        </p>
        <ul>
          <li><strong>Stenslag og ridser:</strong> Lakstift eller professionel lakering (kr. 200-2.000)</li>
          <li><strong>Små buler:</strong> PDR (Paintless Dent Removal) koster kr. 300-800 pr. bue</li>
          <li><strong>Viskerblade:</strong> Nye koster kr. 100-300 og giver et godt indtryk</li>
          <li><strong>Pærer:</strong> Skift udbrændte pærer</li>
          <li><strong>Små rustpletter:</strong> Behandles inden de vokser</li>
        </ul>

        <h2>3. Forberedelse af dokumentation</h2>
        <p>
          Gennemsigtighed skaber tillid:
        </p>
        <ul>
          <li><strong>Servicebog:</strong> Saml alle servicebilag kronologisk</li>
          <li><strong>Synrapporter:</strong> Vis at bilen er godkendt</li>
          <li><strong>Regninger:</strong> Dokumenter nye dæk, bremser eller reparationer</li>
          <li><strong>Brugermanual:</strong> Find alle nøgler og manualer frem</li>
          <li><strong>Udstyrsliste:</strong> Lav en oversigt over ekstraudstyr</li>
        </ul>

        <h2>4. Professionelle billeder</h2>
        <p>
          Gode billeder er afgørende for at tiltrække købere:
        </p>
        <ul>
          <li><strong>Lys:</strong> Tag billeder i dagslys, helst på en skyet dag</li>
          <li><strong>Baggrund:</strong> Vælg en neutral baggrund uforstyrret</li>
          <li><strong>Vinkler:</strong> Forfra, bagfra, sider, skråt forfra og bagfra</li>
          <li><strong>Interiør:</strong> Føresæde, bagsæde, instrumentbræt, bagagerum</li>
          <li><strong>Detaljer:</strong> Fælge, lygter, eventuelle skader (ærlighed betaler sig)</li>
        </ul>

        <h2>5. Prissætning og annoncering</h2>
        <p>
          Den rigtige pris er afgørende:
        </p>
        <ul>
          <li><strong>Vurder først:</strong> Brug vores gratis værktøj til at finde markedsværdi</li>
          <li><strong>Sæt højere pris:</strong> Læg 5-10% oveni til forhandling</li>
          <li><strong>Sammenlign:</strong> Se hvad lignende biler sælges for</li>
          <li><strong>Vær realistisk:</strong> En for høj pris skræmmer købere væk</li>
        </ul>

        <h2>6. Skriv en god annoncetekst</h2>
        <p>
          En god annonce sælger:
        </p>
        <ul>
          <li>Start med de vigtigste facts: mærke, model, årgang, km</li>
          <li>Nævn nylige reparationer og nye dele</li>
          <li>Beskriv udstyret kort og præcist</li>
          <li>Vær ærlig om fejl og mangler</li>
          <li>Inkluder årsagen til salget (fremstår troværdigt)</li>
        </ul>

        <h2>7. Forberedelse til fremvisning</h2>
        <p>
          Gør bilen klar til køberen:
        </p>
        <ul>
          <li><strong>Tank op:</strong> En fuld tank viser overskud</li>
          <li><strong>Varm motor:</strong> Start bilen 10 min. inden fremvisning</li>
          <li><strong>Rens:</strong> En hurtig aftørring af støv</li>
          <li><strong>Luft ud:</strong> Undgå lugte fra mad eller rygning</li>
          <li><strong>Parker godt:</strong> Et pænt sted med plads til prøvekørsel</li>
        </ul>

        <h2>8. Forhandling</h2>
        <p>
          Når køberen kommer:
        </p>
        <ul>
          <li><strong>Vær høflig:</strong> Lyt til køberens eventuelle bekymringer</li>
          <li><strong>Fremhæv:</strong> Nævn servicehistorik og nyere dele</li>
          <li><strong>Vær ærlig:</strong> Vedkend kendte fejl</li>
          <li><strong>Kend din bundpris:</strong> Beslut på forhånd hvor lavt du vil gå</li>
          <li><strong>Tilbud:</strong> "Hvis du køber i dag, kan vi gøre det til X kr."</li>
        </ul>

        <h2>9. Salgskanaler</h2>
        <p>
          Vælg den rigtige platform:
        </p>
        <ul>
          <li><strong>bilbasen.dk:</strong> Størst publikum, kræver betaling</li>
          <li><strong>dba.dk:</strong> God til privat salg, rimelig pris</li>
          <li><strong>guloggratis.dk:</strong> Lokalt salg, ofte gratis</li>
          <li><strong>Facebook Marketplace:</strong> Hurtigt og nemt</li>
          <li><strong>Forhandler:</strong> Hurtigst men lavere pris</li>
        </ul>

        <h2>10. Afslutning af handlen</h2>
        <p>
          Når prisen er på plads:
        </p>
        <ul>
          <li>Skriv en købskontrakt (find skabelon online)</li>
          <li>Sørg for sikker betaling (bankoverførsel er bedst)</li>
          <li>Udfyld registreringsattest sammen</li>
          <li>Giv alle nøgler og dokumenter fra dig</li>
          <li>Skift forsikring og nummerplader</li>
        </ul>

        <div className="my-8 rounded-2xl bg-blue-50 p-6">
          <h3 className="mb-4 text-xl font-semibold text-blue-900">Start med at kende din bils værdi</h3>
          <p className="mb-4 text-blue-800">
            Få en gratis og øjeblikkelig vurdering af din bil. Det er første skridt mod at få den bedste pris.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Få vurdering nu
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <h2>Checkliste før salg</h2>
        <ul>
          <li>☐ Bilen er vasket og rengjort indvendigt og udvendigt</li>
          <li>☐ Småskader er udbedret</li>
          <li>☐ Alle dokumenter er samlet</li>
          <li>☐ Gode billeder er taget</li>
          <li>☐ Markedsværdi er undersøgt</li>
          <li>☐ Pris er sat med plads til forhandling</li>
          <li>☐ Annonce er skrevet</li>
          <li>☐ Købskontrakt er klar</li>
        </ul>

        <h2>Konklusion</h2>
        <p>
          At få den højeste pris for sin bil kræver indsats, men det kan betale sig godt. En velforberedt bil kan sagtens sælges for 5.000-15.000 kr. mere end en der "bare sættes til salg". Brug tid på forberedelsen og vær tålmodig med at finde den rigtige køber.
        </p>

        <h2>Relaterede artikler</h2>
        <ul>
          <li><Link to="/blog/hvad-er-min-bil-værd" className="text-blue-600 hover:underline">Hvad er min bil værd? Den komplette guide</Link></li>
          <li><Link to="/blog/bil-vurdering-guide" className="text-blue-600 hover:underline">Sådan vurderer du din bil selv</Link></li>
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </article>
  )
}
