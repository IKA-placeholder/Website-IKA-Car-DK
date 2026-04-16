import { BlogArticleLayout } from "@components/BlogArticleLayout";
import { LanguageContext } from "@components/LanguageProvider";
import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/blog/saelg-bil-hoejeste-pris")({
  component: SaelgBilHoejestePris,
  head: () => ({
    meta: [
      {
        title: "Sådan får du den højeste pris for din bil | 10 nemme trin | Autoværdi",
      },
      {
        name: "description",
        content:
          "Få 5.000-15.000 kr. mere for din bil med vores 10 nemme trin. Lær hvordan du gør bilen klar til salg og får den bedste pris.",
      },
      {
        name: "keywords",
        content: "sælge bil, højeste pris bil, sælg bil privat, bil salg tips, få mere for bilen",
      },
      {
        property: "og:title",
        content: "Sådan får du den højeste pris for din bil - 10 nemme trin",
      },
      {
        property: "og:description",
        content: "Få 5.000-15.000 kr. mere for din bil med vores simple guide.",
      },
      {
        rel: "canonical",
        href: "https://www.xn--autovrdi-n0a.dk/blog/saelg-bil-hoejeste-pris",
      },
    ],
  }),
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sådan får du den højeste pris for din bil - 10 nemme trin",
  description:
    "Få 5.000-15.000 kr. mere for din bil med vores 10 nemme trin. Lær hvordan du gør bilen klar til salg og får den bedste pris.",
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

// Step component for visual appeal
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
      {/* Timeline line */}
      <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-slate-200 last:hidden" />

      {/* Number circle */}
      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg">
        <span className="text-2xl font-bold">{number}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// Pro tip box
function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        <span className="font-semibold text-amber-900">Pro tip</span>
      </div>
      <p className="text-amber-800">{children}</p>
    </div>
  );
}

function SaelgBilHoejestePris() {
  const { language } = useContext(LanguageContext);

  if (language === "en") {
    return (
      <>
        <HeadContent />
        <BlogArticleLayout
          title="How to Get the Highest Price for Your Car"
          excerpt="Follow these 10 simple steps to get 5,000-15,000 kr. more when selling your car."
          date="2026-04-09"
          readTime="6 min"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: "Get the best price" },
          ]}
          schema={articleSchema}
          language={language}
        >
          <div className="my-8 rounded-2xl bg-linear-to-br from-green-500 to-green-600 p-8 text-center text-white">
            <p className="mb-2 text-3xl font-bold">5.000 - 15.000 kr.</p>
            <p className="text-green-100">extra you can get by following these steps</p>
          </div>

          <Step number={1} title="Clean Your Car Thoroughly">
            <p className="mb-4 text-slate-600">
              First impressions matter. A clean car signals that it has been well cared for.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Wash and wax exterior",
                "Clean wheels and arches",
                "Shampoo interior",
                "Clean all windows",
                "Empty trunk",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
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
            <ProTip>
              A professional detailing (500-1,000 kr.) can increase your selling price by several
              thousand kroner.
            </ProTip>
          </Step>

          <Step number={2} title="Fix Minor Damage">
            <p className="mb-4 text-slate-600">
              Small repairs provide great returns. Fix these issues:
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Stone chips & scratches",
                  price: "200-2,000 kr.",
                  impact: "+3,000-5,000 kr. value",
                },
                {
                  label: "Small dents (PDR)",
                  price: "300-800 kr.",
                  impact: "+2,000-4,000 kr. value",
                },
                {
                  label: "New wiper blades",
                  price: "100-300 kr.",
                  impact: "Better first impression",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
                >
                  <span className="font-medium text-slate-900">{item.label}</span>
                  <div className="text-right">
                    <span className="text-sm text-slate-500">{item.price}</span>
                    <span className="ml-3 text-sm font-medium text-green-600">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </Step>

          <Step number={3} title="Gather Documentation">
            <p className="mb-4 text-slate-600">
              Complete documentation builds trust and justifies a higher price.
            </p>
            <div className="rounded-xl bg-slate-50 p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Service records",
                  "Inspection reports",
                  "Receipts for new parts",
                  "All keys",
                  "Owner's manual",
                ].map((doc) => (
                  <div key={doc} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Step>

          <Step number={4} title="Take Great Photos">
            <p className="mb-4 text-slate-600">
              Photos are your most important sales tool. Take at least 10-15 photos:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Exterior", items: ["Front angle", "Rear angle", "Both sides", "Wheels"] },
                { title: "Interior", items: ["Dashboard", "Front seats", "Rear seats", "Trunk"] },
                {
                  title: "Details",
                  items: ["Engine bay", "Mileage", "Any damage", "Extra equipment"],
                },
              ].map((section) => (
                <div key={section.title} className="rounded-xl border border-slate-200 p-4">
                  <h4 className="mb-3 font-semibold text-slate-900">{section.title}</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ProTip>
              Take photos on a cloudy day or in the "golden hour" (just after sunrise or before
              sunset) for the best lighting.
            </ProTip>
          </Step>

          <Step number={5} title="Set the Right Price">
            <p className="mb-4 text-slate-600">Research the market to price your car correctly.</p>
            <div className="rounded-xl bg-blue-50 p-6">
              <h4 className="mb-4 font-semibold text-blue-900">Price Strategy:</h4>
              <ol className="space-y-3 text-blue-800">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 text-sm font-bold">
                    1
                  </span>
                  <span>Get a free valuation from Autoværdi</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 text-sm font-bold">
                    2
                  </span>
                  <span>Check similar cars on bilbasen.dk</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 text-sm font-bold">
                    3
                  </span>
                  <span>Set your price 5-10% above your minimum to allow for negotiation</span>
                </li>
              </ol>
            </div>
          </Step>

          <div className="my-12 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-8 text-center text-white">
            <h3 className="mb-3 text-2xl font-bold">Ready to sell?</h3>
            <p className="mb-6 text-blue-100">
              Get a free valuation first to know exactly what your car is worth.
            </p>
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-600 transition-transform hover:scale-105"
            >
              Get Free Valuation
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

          <Step number={6} title="Write a Compelling Ad">
            <p className="mb-4 text-slate-600">
              Your ad text should be honest but highlight the best features.
            </p>
            <div className="rounded-xl border-2 border-dashed border-slate-300 p-6">
              <h4 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Template Structure:
              </h4>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>1. Headline:</strong> Year + Brand + Model + Key feature
                </p>
                <p>
                  <strong>2. Key facts:</strong> Mileage, service history, recent repairs
                </p>
                <p>
                  <strong>3. Equipment:</strong> List important features
                </p>
                <p>
                  <strong>4. Condition:</strong> Be honest about any issues
                </p>
                <p>
                  <strong>5. Why selling:</strong> Brief explanation (creates trust)
                </p>
              </div>
            </div>
          </Step>

          <Step number={7} title="Choose Where to Sell">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "bilbasen.dk", desc: "Largest audience, paid listing", best: "Most cars" },
                { name: "dba.dk", desc: "Good for private sales", best: "Popular models" },
                { name: "guloggratis.dk", desc: "Often free, local buyers", best: "Budget cars" },
                { name: "Dealer", desc: "Fastest sale, lower price", best: "Quick sale needed" },
              ].map((platform) => (
                <div key={platform.name} className="rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-slate-900">{platform.name}</h4>
                  <p className="text-sm text-slate-600">{platform.desc}</p>
                  <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Best for: {platform.best}
                  </span>
                </div>
              ))}
            </div>
          </Step>

          <Step number={8} title="Prepare for Viewings">
            <p className="mb-4 text-slate-600">Make your car shine during viewings:</p>
            <div className="rounded-xl bg-slate-50 p-6">
              <ul className="space-y-3">
                {[
                  "Fill up the tank (shows you care)",
                  "Warm up the engine 10 min before arrival",
                  "Have all documents ready",
                  "Choose a nice location with space for test drive",
                  "Be honest about any issues",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-500"
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
                    <span className="text-slate-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Step>

          <Step number={9} title="Negotiate Smart">
            <p className="mb-4 text-slate-600">Be prepared for negotiation:</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-red-50 p-4">
                <h4 className="mb-2 font-semibold text-red-900">Don't:</h4>
                <ul className="space-y-1 text-sm text-red-800">
                  <li>• Reveal your minimum price</li>
                  <li>• Accept the first offer</li>
                  <li>• Seem desperate to sell</li>
                </ul>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <h4 className="mb-2 font-semibold text-green-900">Do:</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Know your bottom price</li>
                  <li>• Highlight recent repairs</li>
                  <li>• Offer "today only" deals</li>
                </ul>
              </div>
            </div>
          </Step>

          <Step number={10} title="Close the Deal Safely">
            <p className="mb-4 text-slate-600">Protect yourself when completing the sale:</p>
            <div className="rounded-xl bg-slate-900 p-6 text-white">
              <ul className="space-y-3">
                {[
                  "Use a written contract (find templates online)",
                  "Accept bank transfer only (no cash)",
                  "Complete registration papers together",
                  "Keep copies of all documents",
                  "Cancel your insurance after sale is complete",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Step>

          {/* Final Summary */}
          <div className="mt-12 rounded-2xl bg-linear-to-br from-green-500 to-green-600 p-8 text-white">
            <h3 className="mb-6 text-center text-2xl font-bold">Quick Checklist</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Car cleaned inside & out",
                "Minor damage fixed",
                "Documents organized",
                "Photos taken (10-15)",
                "Price researched",
                "Ad written",
                "Platform chosen",
                "Viewing prepared",
                "Bottom price set",
                "Contract ready",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-white/50">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
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
        title="Sådan får du den højeste pris for din bil"
        excerpt="Følg disse 10 simple trin og få 5.000-15.000 kr. mere når du sælger din bil."
        date="2026-04-09"
        readTime="6 min"
        breadcrumbs={[
          { label: "Forside", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "Få højeste pris" },
        ]}
        schema={articleSchema}
        language={language}
      >
        <div className="my-8 rounded-2xl bg-linear-to-br from-green-500 to-green-600 p-8 text-center text-white">
          <p className="mb-2 text-3xl font-bold">5.000 - 15.000 kr.</p>
          <p className="text-green-100">ekstra du kan få ved at følge disse trin</p>
        </div>

        <Step number={1} title="Rengør bilen grundigt">
          <p className="mb-4 text-slate-600">
            Førstehåndsindtrykket betyder alt. En ren bil signalerer at den er blevet passet godt
            på.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Vask og voks udvendigt",
              "Rengør fælge og hjulbuer",
              "Shampooney interiør",
              "Puds alle ruder",
              "Tøm bagagerum",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
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
          <ProTip>
            En professionel bilvask (500-1.000 kr.) kan øge salgsprisen med flere tusinde kroner.
          </ProTip>
        </Step>

        <Step number={2} title="Udbedr mindre skader">
          <p className="mb-4 text-slate-600">
            Små reparationer giver stor afkast. Fix disse problemer:
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Stenslag & ridser",
                price: "200-2.000 kr.",
                impact: "+3.000-5.000 kr. værdi",
              },
              { label: "Små buler (PDR)", price: "300-800 kr.", impact: "+2.000-4.000 kr. værdi" },
              { label: "Nye viskerblade", price: "100-300 kr.", impact: "Bedre første indtryk" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
              >
                <span className="font-medium text-slate-900">{item.label}</span>
                <div className="text-right">
                  <span className="text-sm text-slate-500">{item.price}</span>
                  <span className="ml-3 text-sm font-medium text-green-600">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </Step>

        <Step number={3} title="Saml dokumentation">
          <p className="mb-4 text-slate-600">
            Komplet dokumentation skaber tillid og retfærdiggør en højere pris.
          </p>
          <div className="rounded-xl bg-slate-50 p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Servicehistorik",
                "Synrapporter",
                "Regninger for nye dele",
                "Alle nøgler",
                "Brugermanual",
              ].map((doc) => (
                <div key={doc} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </Step>

        <Step number={4} title="Tag gode billeder">
          <p className="mb-4 text-slate-600">
            Billeder er dit vigtigste salgsværktøj. Tag mindst 10-15 billeder:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Udvendigt", items: ["Front vinkel", "Bag vinkel", "Begge sider", "Fælge"] },
              { title: "Interiør", items: ["Instrumentbræt", "Førersæde", "Bagsæde", "Bagagerum"] },
              {
                title: "Detaljer",
                items: ["Motorrum", "Kilometerstand", "Eventuelle skader", "Ekstraudstyr"],
              },
            ].map((section) => (
              <div key={section.title} className="rounded-xl border border-slate-200 p-4">
                <h4 className="mb-3 font-semibold text-slate-900">{section.title}</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ProTip>
            Tag billeder på en skyet dag eller i "gyldne time" (lige efter solopgang eller før
            solnedgang) for det bedste lys.
          </ProTip>
        </Step>

        <Step number={5} title="Sæt den rigtige pris">
          <p className="mb-4 text-slate-600">Undersøg markedet for at prissætte din bil korrekt.</p>
          <div className="rounded-xl bg-blue-50 p-6">
            <h4 className="mb-4 font-semibold text-blue-900">Prisstrategi:</h4>
            <ol className="space-y-3 text-blue-800">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 text-sm font-bold">
                  1
                </span>
                <span>Få en gratis vurdering fra Autoværdi</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 text-sm font-bold">
                  2
                </span>
                <span>Tjek lignende biler på bilbasen.dk</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 text-sm font-bold">
                  3
                </span>
                <span>Sæt din pris 5-10% over minimum for at have plads til forhandling</span>
              </li>
            </ol>
          </div>
        </Step>

        <div className="my-12 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-8 text-center text-white">
          <h3 className="mb-3 text-2xl font-bold">Klar til at sælge?</h3>
          <p className="mb-6 text-blue-100">
            Få en gratis vurdering først, så du ved præcis hvad din bil er værd.
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-600 transition-transform hover:scale-105"
          >
            Få gratis vurdering
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

        <Step number={6} title="Skriv en god annonce">
          <p className="mb-4 text-slate-600">
            Din annoncetekst skal være ærlig men fremhæve de bedste egenskaber.
          </p>
          <div className="rounded-xl border-2 border-dashed border-slate-300 p-6">
            <h4 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
              Skabelon:
            </h4>
            <div className="space-y-2 text-slate-700">
              <p>
                <strong>1. Overskrift:</strong> Årgang + Mærke + Model + vigtigste feature
              </p>
              <p>
                <strong>2. Nøgletal:</strong> Kilometer, servicehistorik, nylige reparationer
              </p>
              <p>
                <strong>3. Udstyr:</strong> List vigtige features
              </p>
              <p>
                <strong>4. Stand:</strong> Vær ærlig om eventuelle problemer
              </p>
              <p>
                <strong>5. Årsag til salg:</strong> Kort forklaring (skaber tillid)
              </p>
            </div>
          </div>
        </Step>

        <Step number={7} title="Vælg salgskanal">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "bilbasen.dk",
                desc: "Størst publikum, betalt annonce",
                best: "De fleste biler",
              },
              { name: "dba.dk", desc: "God til privat salg", best: "Populære modeller" },
              { name: "guloggratis.dk", desc: "Ofte gratis, lokale købere", best: "Billige biler" },
              {
                name: "Forhandler",
                desc: "Hurtigst, lavere pris",
                best: "Hvis du skal sælge hurtigt",
              },
            ].map((platform) => (
              <div key={platform.name} className="rounded-xl border border-slate-200 p-4">
                <h4 className="font-bold text-slate-900">{platform.name}</h4>
                <p className="text-sm text-slate-600">{platform.desc}</p>
                <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Bedst til: {platform.best}
                </span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={8} title="Forbered fremvisning">
          <p className="mb-4 text-slate-600">Gør din bil klar til fremvisning:</p>
          <div className="rounded-xl bg-slate-50 p-6">
            <ul className="space-y-3">
              {[
                "Tank fuld (viser du passer på bilen)",
                "Varm motor op 10 min før ankomst",
                "Have alle dokumenter klar",
                "Vælg et pænt sted med plads til prøvekørsel",
                "Vær ærlig om eventuelle problemer",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 text-blue-500"
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
                  <span className="text-slate-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Step>

        <Step number={9} title="Forhandl klogt">
          <p className="mb-4 text-slate-600">Vær forberedt på forhandling:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-red-50 p-4">
              <h4 className="mb-2 font-semibold text-red-900">Undgå:</h4>
              <ul className="space-y-1 text-sm text-red-800">
                <li>• Afslør din minimumspris</li>
                <li>• Accepter første bud</li>
                <li>• Virk desperat</li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">Gør i stedet:</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Kend din bundpris</li>
                <li>• Fremhæv nye dele/reparationer</li>
                <li>• Tilbyd "kun i dag"-pris</li>
              </ul>
            </div>
          </div>
        </Step>

        <Step number={10} title="Afslut handlen sikkert">
          <p className="mb-4 text-slate-600">Beskyt dig selv når handlen skal gennemføres:</p>
          <div className="rounded-xl bg-slate-900 p-6 text-white">
            <ul className="space-y-3">
              {[
                "Brug skriftlig kontrakt (find skabeloner online)",
                "Accepter kun bankoverførsel (ikke kontanter)",
                "Udfyld registreringsattest sammen",
                "Behold kopier af alle dokumenter",
                "Opsig forsikring når salget er gennemført",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Step>

        {/* Final Summary */}
        <div className="mt-12 rounded-2xl bg-linear-to-br from-green-500 to-green-600 p-8 text-white">
          <h3 className="mb-6 text-center text-2xl font-bold">Huskeliste</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Bilen er vasket indvendigt & udvendigt",
              "Mindre skader udbedret",
              "Dokumenter organiseret",
              "Billeder taget (10-15 stk)",
              "Pris undersøgt",
              "Annonce skrevet",
              "Salgskanal valgt",
              "Fremvisning forberedt",
              "Bundpris besluttet",
              "Kontrakt klar",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-white/50">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
