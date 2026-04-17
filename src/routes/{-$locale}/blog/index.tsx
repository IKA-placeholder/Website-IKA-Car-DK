import { createFileRoute, HeadContent, Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/{-$locale}/blog/")({
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
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.xn--autovrdi-n0a.dk/blog",
      },
    ],
  }),
});

const blogPosts = [
  {
    route: "/{-$locale}/blog/hvad-er-min-bil-vaerd" as const,
    title: m.blog_post1_title,
    excerpt: m.blog_post1_desc,
    readTime: "5 min",
  },
  {
    route: "/{-$locale}/blog/bil-vurdering-guide" as const,
    title: m.blog_post2_title,
    excerpt: m.blog_post2_desc,
    readTime: "4 min",
  },
  {
    route: "/{-$locale}/blog/saelg-bil-hoejeste-pris" as const,
    title: m.blog_post3_title,
    excerpt: m.blog_post3_desc,
    readTime: "6 min",
  },
];

function BlogIndex() {
  const language = getLocale();

  const getDate = () => {
    if (language === "da") return "9. april 2026";
    return "April 9, 2026";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <HeadContent />

      <nav className="mb-8 text-sm text-slate-500">
        <Link
          to="/{-$locale}"
          params={(prev) => ({
            ...prev,
            locale: prev.locale === "da" ? undefined : "en",
          })}
          className="hover:text-blue-600"
        >
          {m.breadcrumb_home()}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Blog</span>
      </nav>

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {m.blog_title()}
      </h1>

      <p className="mb-12 text-lg text-slate-600">{m.blog_subtitle()}</p>

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.route}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <Link
              to={post.route}
              params={(prev) => ({
                ...prev,
                locale: prev.locale === "da" ? undefined : "en",
              })}
              className="block"
            >
              <div className="mb-3 flex items-center gap-4 text-sm text-slate-500">
                <span>{getDate()}</span>
                <span>•</span>
                <span>
                  {post.readTime} {m.blog_read_time()}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                {post.title()}
              </h2>

              <p className="mb-4 text-slate-600">{post.excerpt()}</p>

              <span className="inline-flex items-center font-medium text-blue-600">
                {m.blog_read_more()}
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
      <div className="mt-12 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 p-8 text-white">
        <h2 className="mb-4 text-2xl font-bold">{m.blog_cta_title()}</h2>
        <p className="mb-6 text-blue-100">{m.blog_cta_desc()}</p>
        <Link
          to="/{-$locale}"
          params={(prev) => ({
            ...prev,
            locale: prev.locale === "da" ? undefined : "en",
          })}
          className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          {m.blog_cta_button()}
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
