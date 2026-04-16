import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";

import { BlogArticleLayout } from "@/components/BlogArticleLayout";
import { LanguageContext } from "@/components/LanguageProvider";

export const Route = createFileRoute("/blog/hvad-er-min-bil-værd")({
  component: HvadErMinBilVaerd,
  head: () => ({
    meta: [
      {
        title: "Hvad er min bil værd? Den komplette guide 2026 | Autoværdi",
      },
      {
        name: "description",
        content:
          "Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.",
      },
      {
        name: "keywords",
        content:
          "hvad er min bil værd, bilvurdering guide, bil værdi, vurdering af bil, sælge bil, brugt bil pris",
      },
      {
        property: "og:title",
        content: "Hvad er min bil værd? Den komplette guide 2026",
      },
      {
        property: "og:description",
        content:
          "Komplet guide til bilvurdering. Lær hvad der påvirker din bils værdi og hvordan du får den bedste pris.",
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        rel: "canonical",
        href: "https://www.xn--autovrdi-n0a.dk/blog/hvad-er-min-bil-værd",
      },
    ],
  }),
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hvad er min bil værd? Den komplette guide 2026",
  description:
    "Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris for din bil.",
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

// Info box
function InfoBox({
  title,
  children,
  color = "blue",
}: {
  title: string;
  children: React.ReactNode;
  color?: "blue" | "green" | "amber";
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    green: "bg-green-50 border-green-200 text-green-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
  };

  return (
    <div className={`my-4 rounded-xl border p-4 ${colors[color]}`}>
      <h4 className="mb-2 font-semibold">{title}</h4>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

function HvadErMinBilVaerd() {
  const { language } = useContext(LanguageContext);

  if (language === "en") {
    return (
      <>
        <HeadContent />
        <BlogArticleLayout
          title="What is My Car Worth?"
          excerpt="The complete guide to understanding your car's value in 2026. Learn what factors matter and how to get the best price."
          date="2026-04-09"
          readTime="5 min"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: "Car Value Guide" },
          ]}
          schema={articleSchema}
          language={language}
        >
          <div className="my-8 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 p-8 text-center text-white">
            <p className="mb-2 text-lg text-blue-100">Most cars lose</p>
            <p className="mb-2 text-4xl font-bold">15-20%</p>
            <p className="text-blue-100">of their value in the first year</p>
          </div>

          <Step number={1} title="Understand Depreciation">
            <p className="mb-4 text-slate-600">
              Cars lose value over time. Here's the typical pattern:
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { year: "Year 1", loss: "15-20%", icon: "📉" },
                { year: "Years 2-3", loss: "10-15%/year", icon: "📊" },
                { year: "Years 4-5", loss: "8-12%/year", icon: "📈" },
                { year: "After 5 years", loss: "5-10%/year", icon: "🔄" },
              ].map((item) => (
                <div key={item.year} className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.year}</p>
                    <p className="text-sm text-slate-600">{item.loss} value loss</p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox title="Good to know" color="green">
              Electric cars and luxury vehicles may have different depreciation curves. EVs often
              hold value better due to high demand.
            </InfoBox>
          </Step>

          <Step number={2} title="Brand & Model Matter">
            <p className="mb-4 text-slate-600">Some brands hold value better than others:</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
                <span className="font-medium text-slate-900">High value retention</span>
                <span className="text-green-700">BMW, Mercedes, Audi, Toyota</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
                <span className="font-medium text-slate-900">Average retention</span>
                <span className="text-amber-700">VW, Ford, Hyundai, Kia</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
                <span className="font-medium text-slate-900">Lower retention</span>
                <span className="text-red-700">French brands, some budget cars</span>
              </div>
            </div>
          </Step>

          <Step number={3} title="Mileage Impact">
            <p className="mb-4 text-slate-600">Every kilometer affects value. Here's how much:</p>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900">Above average km</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">Value reduction</th>
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

          <Step number={4} title="Equipment Adds Value">
            <p className="mb-4 text-slate-600">Popular features that increase value:</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { item: "Navigation/GPS", value: "+3,000-8,000 kr." },
                { item: "Leather seats", value: "+5,000-15,000 kr." },
                { item: "Parking sensors/camera", value: "+2,000-5,000 kr." },
                { item: "Panoramic sunroof", value: "+5,000-10,000 kr." },
                { item: "Climate control", value: "+5,000-10,000 kr." },
                { item: "Alloy wheels", value: "+2,000-5,000 kr." },
              ].map((feature) => (
                <div
                  key={feature.item}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                >
                  <span className="text-slate-700">{feature.item}</span>
                  <span className="font-medium text-green-600">{feature.value}</span>
                </div>
              ))}
            </div>
          </Step>

          <Step number={5} title="Get Your Valuation">
            <p className="mb-4 text-slate-600">The easiest way to know your car's value:</p>

            <div className="rounded-xl bg-blue-50 p-6">
              <ol className="space-y-3">
                {[
                  "Enter your license plate on Autoværdi",
                  "We find your car in the database",
                  "Get instant market-based valuation",
                  "Use it as starting point for your sale",
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="my-6 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 p-6 text-center text-white">
              <p className="mb-4">Get your free valuation in 10 seconds</p>
              <Link
                to="/"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition-transform hover:scale-105"
              >
                Start Valuation
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </Step>

          <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white">
            <h3 className="mb-6 text-xl font-bold">Quick Formula</h3>
            <div className="rounded-lg bg-slate-800 p-4 font-mono text-sm">
              <p className="text-slate-400">Car Value =</p>
              <p>Market average for similar cars</p>
              <p className="text-green-400">+ Equipment value</p>
              <p className="text-green-400">+ Service history bonus</p>
              <p className="text-green-400">+ Good condition bonus</p>
              <p className="text-red-400">- High mileage penalty</p>
              <p className="text-red-400">- Damage/wear penalty</p>
            </div>
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
        title="Hvad er min bil værd?"
        excerpt="Den komplette guide til at forstå din bils værdi i 2026. Lær hvilke faktorer der betyder noget og hvordan du får den bedste pris."
        date="2026-04-09"
        readTime="5 min"
        breadcrumbs={[
          { label: "Forside", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "Bilvurdering guide" },
        ]}
        schema={articleSchema}
        language={language}
      >
        <div className="my-8 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 p-8 text-center text-white">
          <p className="mb-2 text-lg text-blue-100">De fleste biler mister</p>
          <p className="mb-2 text-4xl font-bold">15-20%</p>
          <p className="text-blue-100">af værdien det første år</p>
        </div>

        <Step number={1} title="Forstå værditabet">
          <p className="mb-4 text-slate-600">
            Biler mister værdi over tid. Sådan ser mønsteret typisk ud:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { year: "År 1", loss: "15-20%", icon: "📉" },
              { year: "År 2-3", loss: "10-15%/år", icon: "📊" },
              { year: "År 4-5", loss: "8-12%/år", icon: "📈" },
              { year: "Efter 5 år", loss: "5-10%/år", icon: "🔄" },
            ].map((item) => (
              <div key={item.year} className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900">{item.year}</p>
                  <p className="text-sm text-slate-600">{item.loss} værditab</p>
                </div>
              </div>
            ))}
          </div>

          <InfoBox title="Godt at vide" color="green">
            Elbiler og luksusbiler kan have anderledes afskrivningskurver. Elbiler holder typisk
            bedre på værdien pga. høj efterspørgsel.
          </InfoBox>
        </Step>

        <Step number={2} title="Mærke & model betyder noget">
          <p className="mb-4 text-slate-600">Nogle mærker holder bedre på værdien end andre:</p>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
              <span className="font-medium text-slate-900">Høj værdibevarelse</span>
              <span className="text-green-700">BMW, Mercedes, Audi, Toyota</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
              <span className="font-medium text-slate-900">Gennemsnitlig</span>
              <span className="text-amber-700">VW, Ford, Hyundai, Kia</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
              <span className="font-medium text-slate-900">Lavere bevarelse</span>
              <span className="text-red-700">Franske mærker, nogle budgetbiler</span>
            </div>
          </div>
        </Step>

        <Step number={3} title="Kilometerstandens betydning">
          <p className="mb-4 text-slate-600">
            Hver kilometer påvirker værdien. Så meget betyder det:
          </p>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-900">Over gennemsnit</th>
                  <th className="px-4 py-3 font-semibold text-slate-900">Værdinedgang</th>
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

        <Step number={4} title="Udstyr giver mere værdi">
          <p className="mb-4 text-slate-600">Populære features der øger værdien:</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { item: "Navigation/GPS", value: "+3.000-8.000 kr." },
              { item: "Lædersæder", value: "+5.000-15.000 kr." },
              { item: "Parkeringsensor/kamera", value: "+2.000-5.000 kr." },
              { item: "Panorama soltag", value: "+5.000-10.000 kr." },
              { item: "Klimaanlæg", value: "+5.000-10.000 kr." },
              { item: "Alufælge", value: "+2.000-5.000 kr." },
            ].map((feature) => (
              <div
                key={feature.item}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <span className="text-slate-700">{feature.item}</span>
                <span className="font-medium text-green-600">{feature.value}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={5} title="Få din vurdering">
          <p className="mb-4 text-slate-600">Den nemmeste måde at kende din bils værdi:</p>

          <div className="rounded-xl bg-blue-50 p-6">
            <ol className="space-y-3">
              {[
                "Indtast din nummerplade på Autoværdi",
                "Vi finder din bil i databasen",
                "Få øjeblikkelig markedsværdi",
                "Brug den som udgangspunkt for dit salg",
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="my-6 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 p-6 text-center text-white">
            <p className="mb-4">Få din gratis vurdering på 10 sekunder</p>
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition-transform hover:scale-105"
            >
              Start vurdering
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </Step>

        <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white">
          <h3 className="mb-6 text-xl font-bold">Hurtig formel</h3>
          <div className="rounded-lg bg-slate-800 p-4 font-mono text-sm">
            <p className="text-slate-400">Bilværdi =</p>
            <p>Markedspris for lignende biler</p>
            <p className="text-green-400">+ Udstyrsværdi</p>
            <p className="text-green-400">+ Servicehistorik bonus</p>
            <p className="text-green-400">+ God stand bonus</p>
            <p className="text-red-400">- Høj km straf</p>
            <p className="text-red-400">- Skade/slid straf</p>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-bold text-slate-900">Læs også</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/blog/bil-vurdering-guide"
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">
                  Sådan vurderer du selv
                </h4>
                <p className="text-sm text-slate-600">Lær at vurdere som en pro</p>
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
