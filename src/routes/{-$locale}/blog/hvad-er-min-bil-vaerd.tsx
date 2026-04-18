import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { BlogArticleLayout } from "@/components/BlogArticleLayout";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/{-$locale}/blog/hvad-er-min-bil-vaerd")({
  component: HvadErMinBilVaerd,
  head: () => ({
    meta: [
      {
        title: m.blog_worth_title(),
      },
      {
        name: "description",
        content: m.blog_worth_excerpt(),
      },
    ],
    links: [
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
  headline: m.blog_worth_title(),
  description: m.blog_worth_excerpt(),
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
      <div className="bg-border absolute top-16 bottom-0 left-8 w-0.5 last:hidden" />
      <div className="bg-primary text-primary-foreground relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg">
        <span className="text-2xl font-bold">{number}</span>
      </div>
      <div className="flex-1 pt-2">
        <h2 className="text-foreground mb-3 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// Info box
function InfoBox({
  title,
  children,
  theme = "info",
}: {
  title: string;
  children: React.ReactNode;
  theme?: "info" | "success" | "warning";
}) {
  const themeStyles = {
    info: "bg-info/10 border-info/20 text-info",
    success: "bg-success/10 border-success/20 text-success",
    warning: "bg-warning/10 border-warning/20 text-warning",
  };

  return (
    <div className={`my-4 rounded-xl border p-4 ${themeStyles[theme]}`}>
      <h4 className="mb-2 font-semibold">{title}</h4>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

function HvadErMinBilVaerd() {
  const language = getLocale();

  const depreciationItems = [
    {
      year: m.blog_worth_dep1_year(),
      loss: m.blog_worth_dep1_loss(),
      icon: m.blog_worth_dep1_icon(),
    },
    {
      year: m.blog_worth_dep2_year(),
      loss: m.blog_worth_dep2_loss(),
      icon: m.blog_worth_dep2_icon(),
    },
    {
      year: m.blog_worth_dep3_year(),
      loss: m.blog_worth_dep3_loss(),
      icon: m.blog_worth_dep3_icon(),
    },
    {
      year: m.blog_worth_dep4_year(),
      loss: m.blog_worth_dep4_loss(),
      icon: m.blog_worth_dep4_icon(),
    },
  ];

  const brandRetention = [
    {
      label: m.blog_worth_brand_high(),
      value: m.blog_worth_brand_high_list(),
      theme: "success" as const,
    },
    {
      label: m.blog_worth_brand_avg(),
      value: m.blog_worth_brand_avg_list(),
      theme: "warning" as const,
    },
    {
      label: m.blog_worth_brand_low(),
      value: m.blog_worth_brand_low_list(),
      theme: "destructive" as const,
    },
  ];

  const kmTable = [
    { km: m.blog_worth_km_10k(), val: m.blog_worth_km_10k_val() },
    { km: m.blog_worth_km_20k(), val: m.blog_worth_km_20k_val() },
    { km: m.blog_worth_km_30k(), val: m.blog_worth_km_30k_val() },
  ];

  const features = [
    { item: m.blog_worth_feat1(), value: m.blog_worth_feat1_val() },
    { item: m.blog_worth_feat2(), value: m.blog_worth_feat2_val() },
    { item: m.blog_worth_feat3(), value: m.blog_worth_feat3_val() },
    { item: m.blog_worth_feat4(), value: m.blog_worth_feat4_val() },
    { item: m.blog_worth_feat5(), value: m.blog_worth_feat5_val() },
    { item: m.blog_worth_feat6(), value: m.blog_worth_feat6_val() },
  ];

  const valSteps = [
    m.blog_worth_val_step1(),
    m.blog_worth_val_step2(),
    m.blog_worth_val_step3(),
    m.blog_worth_val_step4(),
  ];

  const themeStyles = {
    success: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
    warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
    destructive: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
    },
  };

  return (
    <>
      <HeadContent />
      <BlogArticleLayout
        title={m.blog_worth_title()}
        excerpt={m.blog_worth_excerpt()}
        date="2026-04-09"
        readTime={m.blog_worth_read_time()}
        breadcrumbs={[
          { label: m.breadcrumb_home(), to: "/" },
          { label: m.breadcrumb_blog(), to: "/blog" },
          { label: m.blog_worth_breadcrumb() },
        ]}
        schema={articleSchema}
        language={language}
      >
        <div className="bg-primary text-primary-foreground my-8 rounded-2xl p-8 text-center">
          <p className="text-primary-foreground/70 mb-2 text-lg">{m.blog_worth_hero_stat()}</p>
          <p className="mb-2 text-4xl font-bold">{m.blog_worth_hero_percent()}</p>
          <p className="text-primary-foreground/70">{m.blog_worth_hero_sub()}</p>
        </div>

        <Step number={1} title={m.blog_worth_step1_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_worth_step1_desc()}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {depreciationItems.map((item) => (
              <div
                key={item.year}
                className="border-border bg-muted flex items-center gap-4 rounded-xl border p-4"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-foreground font-semibold">{item.year}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.loss} {m.blog_worth_dep_suffix()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <InfoBox title={m.blog_worth_infobox_title()} theme="success">
            {m.blog_worth_infobox_content()}
          </InfoBox>
        </Step>

        <Step number={2} title={m.blog_worth_step2_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_worth_step2_desc()}</p>

          <div className="space-y-3">
            {brandRetention.map((brand) => (
              <div
                key={brand.label}
                className={`flex items-center justify-between rounded-xl border ${themeStyles[brand.theme].border} ${themeStyles[brand.theme].bg} p-4`}
              >
                <span className="text-foreground font-medium">{brand.label}</span>
                <span className={themeStyles[brand.theme].text}>{brand.value}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={3} title={m.blog_worth_step3_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_worth_step3_desc()}</p>

          <div className="border-border overflow-hidden rounded-xl border">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="text-foreground px-4 py-3 font-semibold">
                    {m.blog_worth_km_header1()}
                  </th>
                  <th className="text-foreground px-4 py-3 font-semibold">
                    {m.blog_worth_km_header2()}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {kmTable.map((row) => (
                  <tr key={row.km}>
                    <td className="text-foreground px-4 py-3">{row.km}</td>
                    <td className="text-destructive px-4 py-3">{row.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Step>

        <Step number={4} title={m.blog_worth_step4_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_worth_step4_desc()}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.item}
                className="border-border bg-muted flex items-center justify-between rounded-lg border p-3"
              >
                <span className="text-foreground">{feature.item}</span>
                <span className="text-success font-medium">{feature.value}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={5} title={m.blog_worth_step5_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_worth_step5_desc()}</p>

          <div className="border-info/20 bg-info/10 rounded-xl border p-6">
            <ol className="space-y-3">
              {valSteps.map((step, i) => (
                <li key={i} className="text-foreground flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-primary text-primary-foreground my-6 rounded-xl p-6 text-center">
            <p className="mb-4">{m.blog_worth_cta_text()}</p>
            <Link
              to="/{-$locale}"
              params={(prev) => ({
                ...prev,
                locale: prev.locale === "da" ? undefined : "en",
              })}
              className="bg-background text-foreground inline-flex items-center rounded-lg px-6 py-3 font-bold transition-transform hover:scale-105"
            >
              {m.blog_worth_cta_button()}
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

        <div className="bg-card border-border mt-12 rounded-2xl border p-8">
          <h3 className="text-foreground mb-6 text-xl font-bold">{m.blog_worth_formula_title()}</h3>
          <div className="bg-muted border-border rounded-lg border p-4 font-mono text-sm">
            <p className="text-muted-foreground">{m.blog_worth_formula_label()}</p>
            <p className="text-foreground">{m.blog_worth_formula_base()}</p>
            <p className="text-success">{m.blog_worth_formula_plus1()}</p>
            <p className="text-success">{m.blog_worth_formula_plus2()}</p>
            <p className="text-success">{m.blog_worth_formula_plus3()}</p>
            <p className="text-destructive">{m.blog_worth_formula_minus1()}</p>
            <p className="text-destructive">{m.blog_worth_formula_minus2()}</p>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-12">
          <h3 className="text-foreground mb-6 text-xl font-bold">{m.blog_worth_related_title()}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/{-$locale}/blog/bil-vurdering-guide"
              params={(prev) => ({
                ...prev,
                locale: prev.locale === "da" ? undefined : "en",
              })}
              className="group border-border bg-card hover:border-info/50 hover:bg-info/5 flex items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <div className="bg-info/10 text-info flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
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
                <h4 className="text-foreground group-hover:text-info font-semibold">
                  {m.blog_worth_related1_title()}
                </h4>
                <p className="text-muted-foreground text-sm">{m.blog_worth_related1_desc()}</p>
              </div>
            </Link>
            <Link
              to="/{-$locale}/blog/saelg-bil-hoejeste-pris"
              params={(prev) => ({
                ...prev,
                locale: prev.locale === "da" ? undefined : "en",
              })}
              className="group border-border bg-card hover:border-success/50 hover:bg-success/5 flex items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <div className="bg-success/10 text-success flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
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
                <h4 className="text-foreground group-hover:text-success font-semibold">
                  {m.blog_worth_related2_title()}
                </h4>
                <p className="text-muted-foreground text-sm">{m.blog_worth_related2_desc()}</p>
              </div>
            </Link>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
