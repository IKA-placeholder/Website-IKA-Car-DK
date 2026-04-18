import { createFileRoute, HeadContent, Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/{-$locale}/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      {
        title: m.blog_title(),
      },
      {
        name: "description",
        content: m.blog_subtitle(),
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
    readTime: m.blog_worth_read_time(),
  },
  {
    route: "/{-$locale}/blog/bil-vurdering-guide" as const,
    title: m.blog_post2_title,
    excerpt: m.blog_post2_desc,
    readTime: m.read_time(),
  },
  {
    route: "/{-$locale}/blog/saelg-bil-hoejeste-pris" as const,
    title: m.blog_post3_title,
    excerpt: m.blog_post3_desc,
    readTime: m.blog_sell_read_time(),
  },
];

function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <HeadContent />

      <nav className="text-muted-foreground mb-8 text-sm">
        <Link
          to="/{-$locale}"
          params={(prev) => ({ ...prev, locale: prev.locale === "da" ? undefined : "en" })}
          className="hover:text-primary transition-colors"
        >
          {m.breadcrumb_home()}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{m.breadcrumb_blog()}</span>
      </nav>

      <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        {m.blog_title()}
      </h1>

      <p className="text-muted-foreground mb-12 text-lg">{m.blog_subtitle()}</p>

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.route}
            className="group border-border bg-card rounded-2xl border p-6 transition-shadow hover:shadow-lg"
          >
            <Link
              to={post.route}
              params={(prev) => ({ ...prev, locale: prev.locale === "da" ? undefined : "en" })}
              className="block"
            >
              <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                <span>{m.blog_index_date()}</span>
                <span>•</span>
                <span>
                  {post.readTime} {m.blog_read_time()}
                </span>
              </div>

              <h2 className="text-foreground group-hover:text-info mb-3 text-2xl font-semibold transition-colors">
                {post.title()}
              </h2>

              <p className="text-muted-foreground mb-4">{post.excerpt()}</p>

              <span className="text-info inline-flex items-center font-medium">
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
      <div className="bg-primary text-primary-foreground mt-12 rounded-2xl p-8">
        <h2 className="mb-4 text-2xl font-bold">{m.blog_cta_title()}</h2>
        <p className="text-primary-foreground/70 mb-6">{m.blog_cta_desc()}</p>
        <Link
          to="/{-$locale}"
          params={(prev) => ({ ...prev, locale: prev.locale === "da" ? undefined : "en" })}
          className="bg-background text-foreground hover:bg-muted hover:text-muted-foreground inline-flex items-center rounded-xl px-6 py-3 font-semibold transition-colors"
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
