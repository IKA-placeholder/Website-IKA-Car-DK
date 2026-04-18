import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { BlogArticleLayout } from "@/components/BlogArticleLayout";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/{-$locale}/blog/bil-vurdering-guide")({
  component: BilVurderingGuide,
  head: () => ({
    meta: [
      {
        title: m.blog_diy_title(),
      },
      {
        name: "description",
        content: m.blog_diy_excerpt(),
      },
    ],
    links: [
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
  headline: m.blog_diy_title(),
  description: m.blog_diy_excerpt(),
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

// Calculation box
function CalculationBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border-border text-card-foreground my-4 rounded-xl border p-4 font-mono text-sm">
      {children}
    </div>
  );
}

function BilVurderingGuide() {
  const language = getLocale();

  const sites = [
    { name: m.blog_diy_site1_name(), desc: m.blog_diy_site1_desc(), theme: "info" as const },
    { name: m.blog_diy_site2_name(), desc: m.blog_diy_site2_desc(), theme: "success" as const },
    { name: m.blog_diy_site3_name(), desc: m.blog_diy_site3_desc(), theme: "warning" as const },
  ];

  const compareItems = [
    m.blog_diy_compare1(),
    m.blog_diy_compare2(),
    m.blog_diy_compare3(),
    m.blog_diy_compare4(),
    m.blog_diy_compare5(),
  ];

  const features = [
    { item: m.blog_diy_feature1(), value: m.blog_diy_feature1_val() },
    { item: m.blog_diy_feature2(), value: m.blog_diy_feature2_val() },
    { item: m.blog_diy_feature3(), value: m.blog_diy_feature3_val() },
    { item: m.blog_diy_feature4(), value: m.blog_diy_feature4_val() },
  ];

  const conditions = [
    {
      label: m.blog_diy_condition1(),
      value: m.blog_diy_condition1_val(),
      theme: "success" as const,
    },
    { label: m.blog_diy_condition2(), value: m.blog_diy_condition2_val(), theme: "muted" as const },
    {
      label: m.blog_diy_condition3(),
      value: m.blog_diy_condition3_val(),
      theme: "warning" as const,
    },
    {
      label: m.blog_diy_condition4(),
      value: m.blog_diy_condition4_val(),
      theme: "destructive" as const,
    },
  ];

  const themeStyles = {
    info: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
    success: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
    warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
    destructive: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
    },
    muted: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" },
  };

  return (
    <>
      <HeadContent />
      <BlogArticleLayout
        title={m.blog_diy_title()}
        excerpt={m.blog_diy_excerpt()}
        date="2026-04-09"
        readTime={m.read_time()}
        breadcrumbs={[
          { label: m.breadcrumb_home(), to: "/" },
          { label: m.breadcrumb_blog(), to: "/blog" },
          { label: m.blog_diy_breadcrumb() },
        ]}
        schema={articleSchema}
        language={language}
      >
        <div className="border-warning/30 bg-warning/10 my-8 rounded-2xl border p-6">
          <div className="flex items-start gap-3">
            <svg
              className="text-warning h-6 w-6 shrink-0"
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
              <h4 className="text-foreground font-semibold">{m.blog_diy_why_title()}</h4>
              <p className="text-muted-foreground">{m.blog_diy_why_desc()}</p>
            </div>
          </div>
        </div>

        <Step number={1} title={m.blog_diy_step1_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_diy_step1_desc()}</p>

          <div className="grid gap-3 sm:grid-cols-3">
            {sites.map((site) => (
              <div
                key={site.name}
                className={`rounded-xl border ${themeStyles[site.theme].border} ${themeStyles[site.theme].bg} p-4 text-center`}
              >
                <p className="text-foreground font-semibold">{site.name}</p>
                <p className="text-muted-foreground text-sm">{site.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-info/20 bg-info/10 mt-4 rounded-xl border p-4">
            <p className="text-info">
              <strong>{m.blog_diy_tip()}</strong> {m.blog_diy_tip_text()}
            </p>
          </div>
        </Step>

        <Step number={2} title={m.blog_diy_step2_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_diy_step2_desc()}</p>

          <div className="space-y-2">
            {compareItems.map((item, i) => (
              <div
                key={i}
                className="border-border bg-muted flex items-center gap-3 rounded-lg border p-3"
              >
                <svg
                  className="text-success h-5 w-5"
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
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={3} title={m.blog_diy_step3_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_diy_step3_desc()}</p>

          <CalculationBox>
            <p className="text-muted-foreground">{m.blog_diy_base_price_label()}</p>
            <p className="text-foreground">{m.blog_diy_base_price_formula()}</p>
            <p className="text-muted-foreground mt-2">{m.blog_diy_base_price_example()}</p>
          </CalculationBox>
        </Step>

        <Step number={4} title={m.blog_diy_step4_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_diy_step4_desc()}</p>

          <div className="border-border overflow-hidden rounded-xl border">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="text-foreground px-4 py-3 font-semibold">
                    {m.blog_diy_km_table_header1()}
                  </th>
                  <th className="text-foreground px-4 py-3 font-semibold">
                    {m.blog_diy_km_table_header2()}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                <tr>
                  <td className="text-foreground px-4 py-3">{m.blog_diy_km_10k()}</td>
                  <td className="text-destructive px-4 py-3">{m.blog_diy_km_adj1()}</td>
                </tr>
                <tr>
                  <td className="text-foreground px-4 py-3">{m.blog_diy_km_20k()}</td>
                  <td className="text-destructive px-4 py-3">{m.blog_diy_km_adj2()}</td>
                </tr>
                <tr>
                  <td className="text-foreground px-4 py-3">{m.blog_diy_km_30k()}</td>
                  <td className="text-destructive px-4 py-3">{m.blog_diy_km_adj3()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Step>

        <Step number={5} title={m.blog_diy_step5_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_diy_step5_desc()}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.item}
                className="border-success/20 bg-success/10 flex justify-between rounded-lg border p-3"
              >
                <span className="text-foreground">{feature.item}</span>
                <span className="text-success font-medium">
                  {feature.value} {m.blog_diy_currency()}
                </span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={6} title={m.blog_diy_step6_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_diy_step6_desc()}</p>

          <div className="space-y-2">
            {conditions.map((condition) => (
              <div
                key={condition.label}
                className={`flex items-center justify-between rounded-lg border ${themeStyles[condition.theme].border} ${themeStyles[condition.theme].bg} p-3`}
              >
                <span className="text-foreground">{condition.label}</span>
                <span className={`font-medium ${themeStyles[condition.theme].text}`}>
                  {condition.value}
                </span>
              </div>
            ))}
          </div>
        </Step>

        <div className="bg-primary text-primary-foreground my-8 rounded-2xl p-8">
          <h3 className="mb-4 text-xl font-bold">{m.blog_diy_formula_title()}</h3>
          <CalculationBox>
            <p className="text-foreground">{m.blog_diy_formula_line1()}</p>
            <p className="text-destructive">{m.blog_diy_formula_line2()}</p>
            <p className="text-success">{m.blog_diy_formula_line3()}</p>
            <p className="text-success">{m.blog_diy_formula_line4()}</p>
            <p className="text-warning">{m.blog_diy_formula_line5()}</p>
          </CalculationBox>
          <p className="text-primary-foreground/80 mt-4">{m.blog_diy_formula_note()}</p>
        </div>

        <div className="bg-success/40 text-foreground mt-8 rounded-2xl p-6 text-center">
          <p className="mb-2 text-lg">{m.blog_diy_cta_title()}</p>
          <p className="text-foreground/70 mb-4">{m.blog_diy_cta_desc()}</p>
          <Link
            to="/{-$locale}"
            params={(prev) => ({
              ...prev,
              locale: prev.locale === "da" ? undefined : "en",
            })}
            className="bg-background text-foreground inline-flex items-center rounded-lg px-6 py-3 font-bold transition-transform hover:scale-105"
          >
            {m.blog_diy_cta_button()}
          </Link>
        </div>

        {/* Related articles */}
        <div className="mt-12">
          <h3 className="text-foreground mb-6 text-xl font-bold">{m.blog_related_title()}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/{-$locale}/blog/hvad-er-min-bil-vaerd"
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
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-foreground group-hover:text-info font-semibold">
                  {m.blog_post_worth_title()}
                </h4>
                <p className="text-muted-foreground text-sm">{m.blog_post_worth_desc()}</p>
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
                  {m.blog_post_price_title()}
                </h4>
                <p className="text-muted-foreground text-sm">{m.blog_post_price_desc()}</p>
              </div>
            </Link>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
