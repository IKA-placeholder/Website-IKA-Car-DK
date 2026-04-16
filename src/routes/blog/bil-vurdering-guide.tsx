import { BlogArticleLayout } from "@components/BlogArticleLayout";
import { LanguageContext } from "@components/LanguageProvider";
import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/blog/bil-vurdering-guide")({
  component: BilVurderingGuide,
  head: () => ({
    meta: [
      {
        title: "Sådan vurderer du din bil selv | Guide | Autoværdi",
      },
      {
        name: "description",
        content:
          "Lær hvordan du selv kan vurdere din bils værdi. Få tips til at analysere markedet og vurdere din bil korrekt.",
      },
      {
        name: "keywords",
        content: "bil vurdering, vurdere bil selv, bilvurdering guide, bil pris vurdering",
      },
      {
        property: "og:title",
        content: "Sådan vurderer du din bil selv | Guide",
      },
      {
        property: "og:description",
        content: "Lær hvordan du selv kan vurdere din bils værdi.",
      },
      {
        rel: "canonical",
        href: "https://www.xn--autovrdi-n0a.dk/blog/bil-vurdering-guide",
      },
    ],
  }),
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sådan vurderer du din bil selv",
  description:
    "Lær hvordan du selv kan vurdere din bils værdi ved at analysere markedet og tage højde for vigtige faktorer.",
  author: {
    "@type": "Organization",
    name: "Autoværdi",
  },
  publisher: {
    "@type": "Organization",
    name: "Autoværdi",
    logo: {
      "@type": "ImageObject",
      url: "https://www.xn--autovrdi-n0a.dk/favicon.png",
    },
  },
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
};

// Step component
function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-6 pb-12 last:pb-0">
      <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-slate-200 last:hidden" />
      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg">
        <span className="text-2xl font-bold">{number}</span>
      </div>
      <div className="flex-1 pt-2">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// Calculation box
function CalculationBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl bg-slate-900 p-4 font-mono text-sm text-white">{children}</div>
  );
}

function BilVurderingGuide() {
  const { language } = useContext(LanguageContext);

  if (language === "en") {
    return (
      <>
        <HeadContent />
        <BlogArticleLayout
          title="How to Value Your Car Yourself"
          excerpt="Step-by-step guide to valuing your car like a professional. Learn market analysis and price adjustments."
          date="2026-04-09"
          readTime="4 min"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: "DIY Valuation" },
          ]}
          schema={articleSchema}
          language={language}
        >
          <div className="my-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 shrink-0 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-amber-900">Why do it yourself?</h4>
                <p className="text-amber-800">
                  Understanding your car's value helps you negotiate better and avoid accepting low
                  offers.
                </p>
              </div>
            </div>
          </div>

          <Step number={1} title="Find Similar Cars">
            <p className="mb-4 text-slate-600">Search for cars like yours on these platforms:</p>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { name: "bilbasen.dk", desc: "Largest selection", color: "blue" },
                { name: "dba.dk", desc: "Private sales", color: "green" },
                { name: "guloggratis.dk", desc: "Local deals", color: "amber" },
              ].map((site) => (
                <div key={site.name} className={`rounded-xl bg-${site.color}-50 p-4 text-center`}>
                  <p className="font-semibold text-slate-900">{site.name}</p>
                  <p className="text-sm text-slate-600">{site.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 p-4">
              <p className="text-blue-900">
                <strong>Tip:</strong> Look at 5-10 similar cars to get a good price range.
              </p>
            </div>
          </Step>

          <Step number={2} title="What to Compare">
            <p className="mb-4 text-slate-600">Make sure you're comparing apples to apples:</p>

            <div className="space-y-2">
              {[
                "Same year and model generation",
                "Similar mileage (±10,000 km)",
                "Same fuel type (petrol/diesel/electric)",
                "Similar equipment level",
                "Comparable condition",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </Step>

          <Step number={3} title="Calculate the Base Price">
            <p className="mb-4 text-slate-600">Take the average of the prices you found:</p>

            <CalculationBox>
              <p className="text-slate-400">Base Price =</p>
              <p>(Price 1 + Price 2 + Price 3 + ... + Price N) ÷ N</p>
              <p className="mt-2 text-slate-400">
                Example: (180k + 185k + 175k + 182k + 178k) ÷ 5 = 180,000 kr.
              </p>
            </CalculationBox>
          </Step>

          <Step number={4} title="Adjust for Mileage">
            <p className="mb-4 text-slate-600">Higher mileage means lower value:</p>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Above average km</th>
                    <th className="px-4 py-3 font-semibold">Adjust price by</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3">10,000 km</td>
                    <td className="px-4 py-3 text-red-600">-1% to -2%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">20,000 km</td>
                    <td className="px-4 py-3 text-red-600">-3% to -5%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">30,000+ km</td>
                    <td className="px-4 py-3 text-red-600">-5% to -10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Step>

          <Step number={5} title="Add Equipment Value">
            <p className="mb-4 text-slate-600">Extra features add to the value:</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { item: "Navigation", value: "+3,000-8,000" },
                { item: "Leather seats", value: "+5,000-15,000" },
                { item: "Parking sensors", value: "+2,000-5,000" },
                { item: "Sunroof", value: "+5,000-10,000" },
              ].map((feature) => (
                <div key={feature.item} className="flex justify-between rounded-lg bg-green-50 p-3">
                  <span className="text-slate-700">{feature.item}</span>
                  <span className="font-medium text-green-700">{feature.value} kr.</span>
                </div>
              ))}
            </div>
          </Step>

          <Step number={6} title="Adjust for Condition">
            <p className="mb-4 text-slate-600">Your car's condition affects price:</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                <span className="text-slate-700">Like new condition</span>
                <span className="font-medium text-green-700">+5% to +15%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-slate-700">Normal wear</span>
                <span className="font-medium text-slate-600">0% (base)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                <span className="text-slate-700">Minor issues</span>
                <span className="font-medium text-amber-700">-5% to -15%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                <span className="text-slate-700">Major damage</span>
                <span className="font-medium text-red-700">-15% to -30%</span>
              </div>
            </div>
          </Step>

          <div className="my-8 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-8 text-white">
            <h3 className="mb-4 text-xl font-bold">Final Formula</h3>
            <CalculationBox>
              <p>Your Price = Base Price</p>
              <p className="text-red-400">- Mileage penalty</p>
              <p className="text-green-400">+ Equipment bonus</p>
              <p className="text-green-400">+ Condition bonus</p>
              <p className="text-amber-400">+ 5-10% for negotiation</p>
            </CalculationBox>
            <p className="mt-4 text-blue-100">
              Always add 5-10% to your minimum price so you have room to negotiate.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-green-500 p-6 text-center text-white">
            <p className="mb-2 text-lg">Want an instant valuation?</p>
            <p className="mb-4 text-green-100">Get market-based price in 10 seconds</p>
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-bold text-green-600 transition-transform hover:scale-105"
            >
              Get Free Valuation
            </Link>
          </div>
        </BlogArticleLayout>
      </>
    );
  }

  // Danish version
  return (
    <>
      <HeadContent />
      <BlogArticleLayout
        title="Sådan vurderer du din bil selv"
        excerpt="Trin-for-trin guide til at vurdere din bil som en professionel. Lær markedsanalyse og prisjusteringer."
        date="2026-04-09"
        readTime="4 min"
        breadcrumbs={[
          { label: "Forside", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "Selvvurdering" },
        ]}
        schema={articleSchema}
        language={language}
      >
        <div className="my-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 shrink-0 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-amber-900">Hvorfor gøre det selv?</h4>
              <p className="text-amber-800">
                At forstå din bils værdi hjælper dig med at forhandle bedre og undgå at acceptere
                for lave bud.
              </p>
            </div>
          </div>
        </div>

        <Step number={1} title="Find lignende biler">
          <p className="mb-4 text-slate-600">Søg efter biler som din på disse platforme:</p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { name: "bilbasen.dk", desc: "Størst udvalg", color: "blue" },
              { name: "dba.dk", desc: "Privat salg", color: "green" },
              { name: "guloggratis.dk", desc: "Lokale handler", color: "amber" },
            ].map((site) => (
              <div key={site.name} className={`rounded-xl bg-${site.color}-50 p-4 text-center`}>
                <p className="font-semibold text-slate-900">{site.name}</p>
                <p className="text-sm text-slate-600">{site.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-blue-50 p-4">
            <p className="text-blue-900">
              <strong>Tip:</strong> Kig på 5-10 lignende biler for at få et godt prisspænd.
            </p>
          </div>
        </Step>

        <Step number={2} title="Hvad skal du sammenligne">
          <p className="mb-4 text-slate-600">Sørg for at sammenligne æbler med æbler:</p>

          <div className="space-y-2">
            {[
              "Samme årgang og modelgeneration",
              "Lignende km-stand (±10.000 km)",
              "Samme brændstoftype (benzin/diesel/el)",
              "Lignende udstyrsniveau",
              "Sammenlignelig stand",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={3} title="Beregn basisprisen">
          <p className="mb-4 text-slate-600">Tag gennemsnittet af de priser du har fundet:</p>

          <CalculationBox>
            <p className="text-slate-400">Basispris =</p>
            <p>(Pris 1 + Pris 2 + Pris 3 + ... + Pris N) ÷ N</p>
            <p className="mt-2 text-slate-400">
              Eksempel: (180k + 185k + 175k + 182k + 178k) ÷ 5 = 180.000 kr.
            </p>
          </CalculationBox>
        </Step>

        <Step number={4} title="Juster for kilometer">
          <p className="mb-4 text-slate-600">Højere km-stand betyder lavere værdi:</p>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Over gennemsnit</th>
                  <th className="px-4 py-3 font-semibold">Juster pris med</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3">10.000 km</td>
                  <td className="px-4 py-3 text-red-600">-1% til -2%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">20.000 km</td>
                  <td className="px-4 py-3 text-red-600">-3% til -5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">30.000+ km</td>
                  <td className="px-4 py-3 text-red-600">-5% til -10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Step>

        <Step number={5} title="Læg udstyr til">
          <p className="mb-4 text-slate-600">Ekstraudstyr giver mere værdi:</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { item: "Navigation", value: "+3.000-8.000" },
              { item: "Lædersæder", value: "+5.000-15.000" },
              { item: "Parkeringsensor", value: "+2.000-5.000" },
              { item: "Soltag", value: "+5.000-10.000" },
            ].map((feature) => (
              <div key={feature.item} className="flex justify-between rounded-lg bg-green-50 p-3">
                <span className="text-slate-700">{feature.item}</span>
                <span className="font-medium text-green-700">{feature.value} kr.</span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={6} title="Juster for stand">
          <p className="mb-4 text-slate-600">Din bils stand påvirker prisen:</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
              <span className="text-slate-700">Som ny stand</span>
              <span className="font-medium text-green-700">+5% til +15%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-slate-700">Normal slitage</span>
              <span className="font-medium text-slate-600">0% (basis)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
              <span className="text-slate-700">Mindre problemer</span>
              <span className="font-medium text-amber-700">-5% til -15%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
              <span className="text-slate-700">Store skader</span>
              <span className="font-medium text-red-700">-15% til -30%</span>
            </div>
          </div>
        </Step>

        <div className="my-8 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-8 text-white">
          <h3 className="mb-4 text-xl font-bold">Endelig formel</h3>
          <CalculationBox>
            <p>Din pris = Basispris</p>
            <p className="text-red-400">- Kilometer straf</p>
            <p className="text-green-400">+ Udstyrsbonus</p>
            <p className="text-green-400">+ Stand bonus</p>
            <p className="text-amber-400">+ 5-10% til forhandling</p>
          </CalculationBox>
          <p className="mt-4 text-blue-100">
            Læg altid 5-10% oveni din minimumspris, så du har plads til at forhandle.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-green-500 p-6 text-center text-white">
          <p className="mb-2 text-lg">Vil du have en hurtig vurdering?</p>
          <p className="mb-4 text-green-100">Få markedspris på 10 sekunder</p>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-bold text-green-600 transition-transform hover:scale-105"
          >
            Få gratis vurdering
          </Link>
        </div>

        {/* Related articles */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-bold text-slate-900">Læs også</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/blog/hvad-er-min-bil-værd"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">
                  Hvad er min bil værd?
                </h4>
                <p className="text-sm text-slate-600">Komplet guide til bilværdi</p>
              </div>
            </Link>
            <Link
              to="/blog/saelg-bil-hoejeste-pris"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">
                  Få højeste pris
                </h4>
                <p className="text-sm text-slate-600">10 trin til bedre pris</p>
              </div>
            </Link>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
