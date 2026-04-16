import { LanguageContext } from "@components/LanguageProvider";
import { createFileRoute, HeadContent, Link } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      {
        title: "Blog om bilvurdering | Tips og guides | Autoværdi",
      },
      {
        name: "description",
        content:
          "Læs vores guides og artikler om bilvurdering. Lær hvad din bil er værd og hvordan du får den bedste pris.",
      },
      {
        property: "og:title",
        content: "Blog om bilvurdering | Tips og guides",
      },
      {
        property: "og:description",
        content: "Guides og artikler om bilvurdering. Lær hvad din bil er værd.",
      },
      {
        rel: "canonical",
        href: "https://www.xn--autovrdi-n0a.dk/blog",
      },
    ],
  }),
});

const blogPostsDa = [
  {
    slug: "hvad-er-min-bil-værd",
    title: "Hvad er min bil værd? Den komplette guide 2026",
    excerpt:
      "Vil du vide hvad din bil er værd? Læs vores komplette guide om bilvurdering og find ud af hvordan du får den bedste pris.",
    date: "9. april 2026",
    readTime: "5 min",
  },
  {
    slug: "bil-vurdering-guide",
    title: "Sådan vurderer du din bil selv",
    excerpt:
      "Lær hvordan du selv kan vurdere din bils værdi ved at analysere markedet og tage højde for vigtige faktorer.",
    date: "9. april 2026",
    readTime: "4 min",
  },
  {
    slug: "saelg-bil-hoejeste-pris",
    title: "Sådan får du den højeste pris for din bil",
    excerpt:
      "Få praktiske tips til at maksimere salgsprisen på din bil - fra rengøring til forhandling.",
    date: "9. april 2026",
    readTime: "6 min",
  },
];

const blogPostsEn = [
  {
    slug: "hvad-er-min-bil-vaerd",
    title: "What is my car worth? The Complete Guide 2026",
    excerpt:
      "Want to know what your car is worth? Read our complete guide to car valuation and learn how to get the best price.",
    date: "April 9, 2026",
    readTime: "5 min",
  },
];

function BlogIndex() {
  const { language } = useContext(LanguageContext);
  const posts = language === "da" ? blogPostsDa : blogPostsEn;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <HeadContent />

      <nav className="mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-blue-600">
          {language === "da" ? "Forside" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Blog</span>
      </nav>

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {language === "da" ? "Blog om bilvurdering" : "Car Valuation Blog"}
      </h1>

      <p className="mb-12 text-lg text-slate-600">
        {language === "da"
          ? "Guides, tips og råd om bilvurdering og salg af brugte biler."
          : "Guides, tips and advice on car valuation and selling used cars."}
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <Link to={`/blog/${post.slug}`} className="block">
              <div className="mb-3 flex items-center gap-4 text-sm text-slate-500">
                <span>{post.date}</span>
                <span>•</span>
                <span>
                  {post.readTime} {language === "da" ? "læsetid" : "read"}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                {post.title}
              </h2>

              <p className="mb-4 text-slate-600">{post.excerpt}</p>

              <span className="inline-flex items-center font-medium text-blue-600">
                {language === "da" ? "Læs mere" : "Read more"}
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </span>
            </Link>
          </article>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
        <h2 className="mb-4 text-2xl font-bold">
          {language === "da" ? "Få en gratis bilvurdering" : "Get a free car valuation"}
        </h2>
        <p className="mb-6 text-blue-100">
          {language === "da"
            ? "Indtast din nummerplade og få en øjeblikkelig vurdering af din bils værdi."
            : "Enter your license plate and get an instant valuation of your car."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          {language === "da" ? "Få vurdering nu" : "Get valuation now"}
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
    </div>
  );
}
