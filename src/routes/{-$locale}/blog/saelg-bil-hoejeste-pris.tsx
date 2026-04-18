import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { BlogArticleLayout } from "@/components/BlogArticleLayout";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/{-$locale}/blog/saelg-bil-hoejeste-pris")({
  component: SaelgBilHoejestePris,
  head: () => ({
    meta: [
      {
        title: m.blog_sell_title(),
      },
      {
        name: "description",
        content: m.blog_sell_excerpt(),
      },
    ],
    links: [
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
  headline: m.blog_sell_title(),
  description: m.blog_sell_excerpt(),
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

// Pro tip box
function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-warning bg-warning/10 my-4 rounded-xl border-l-4 p-4">
      <div className="mb-2 flex items-center gap-2">
        <svg
          className="text-warning h-5 w-5"
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
        <span className="text-warning font-semibold">{m.blog_sell_protip_title()}</span>
      </div>
      <p className="text-warning/90">{children}</p>
    </div>
  );
}

function SaelgBilHoejestePris() {
  const language = getLocale();

  const cleanItems = [
    m.blog_sell_clean1(),
    m.blog_sell_clean2(),
    m.blog_sell_clean3(),
    m.blog_sell_clean4(),
    m.blog_sell_clean5(),
  ];

  const repairs = [
    {
      label: m.blog_sell_repair1_label(),
      price: m.blog_sell_repair1_price(),
      impact: m.blog_sell_repair1_impact(),
    },
    {
      label: m.blog_sell_repair2_label(),
      price: m.blog_sell_repair2_price(),
      impact: m.blog_sell_repair2_impact(),
    },
    {
      label: m.blog_sell_repair3_label(),
      price: m.blog_sell_repair3_price(),
      impact: m.blog_sell_repair3_impact(),
    },
  ];

  const docs = [
    m.blog_sell_doc1(),
    m.blog_sell_doc2(),
    m.blog_sell_doc3(),
    m.blog_sell_doc4(),
    m.blog_sell_doc5(),
  ];

  const photoSections = [
    {
      title: m.blog_sell_photo_ext_title(),
      items: [
        m.blog_sell_photo_ext1(),
        m.blog_sell_photo_ext2(),
        m.blog_sell_photo_ext3(),
        m.blog_sell_photo_ext4(),
      ],
    },
    {
      title: m.blog_sell_photo_int_title(),
      items: [
        m.blog_sell_photo_int1(),
        m.blog_sell_photo_int2(),
        m.blog_sell_photo_int3(),
        m.blog_sell_photo_int4(),
      ],
    },
    {
      title: m.blog_sell_photo_det_title(),
      items: [
        m.blog_sell_photo_det1(),
        m.blog_sell_photo_det2(),
        m.blog_sell_photo_det3(),
        m.blog_sell_photo_det4(),
      ],
    },
  ];

  const priceSteps = [
    m.blog_sell_price_step1(),
    m.blog_sell_price_step2(),
    m.blog_sell_price_step3(),
  ];

  const platforms = [
    {
      name: m.blog_sell_platform1_name(),
      desc: m.blog_sell_platform1_desc(),
      best: m.blog_sell_platform1_best(),
    },
    {
      name: m.blog_sell_platform2_name(),
      desc: m.blog_sell_platform2_desc(),
      best: m.blog_sell_platform2_best(),
    },
    {
      name: m.blog_sell_platform3_name(),
      desc: m.blog_sell_platform3_desc(),
      best: m.blog_sell_platform3_best(),
    },
    {
      name: m.blog_sell_platform4_name(),
      desc: m.blog_sell_platform4_desc(),
      best: m.blog_sell_platform4_best(),
    },
  ];

  const viewingTips = [
    m.blog_sell_viewing1(),
    m.blog_sell_viewing2(),
    m.blog_sell_viewing3(),
    m.blog_sell_viewing4(),
    m.blog_sell_viewing5(),
  ];

  const negDonts = [m.blog_sell_neg_dont1(), m.blog_sell_neg_dont2(), m.blog_sell_neg_dont3()];

  const negDos = [m.blog_sell_neg_do1(), m.blog_sell_neg_do2(), m.blog_sell_neg_do3()];

  const closeSteps = [
    m.blog_sell_close1(),
    m.blog_sell_close2(),
    m.blog_sell_close3(),
    m.blog_sell_close4(),
    m.blog_sell_close5(),
  ];

  const checklist = [
    m.blog_sell_check1(),
    m.blog_sell_check2(),
    m.blog_sell_check3(),
    m.blog_sell_check4(),
    m.blog_sell_check5(),
    m.blog_sell_check6(),
    m.blog_sell_check7(),
    m.blog_sell_check8(),
    m.blog_sell_check9(),
    m.blog_sell_check10(),
  ];

  return (
    <>
      <HeadContent />
      <BlogArticleLayout
        title={m.blog_sell_title()}
        excerpt={m.blog_sell_excerpt()}
        date="2026-04-09"
        readTime={m.blog_sell_read_time()}
        breadcrumbs={[
          { label: m.breadcrumb_home(), to: "/" },
          { label: m.breadcrumb_blog(), to: "/blog" },
          { label: m.blog_sell_breadcrumb() },
        ]}
        schema={articleSchema}
        language={language}
      >
        <div className="bg-success text-success-foreground my-8 rounded-2xl p-8 text-center">
          <p className="mb-2 text-3xl font-bold">{m.blog_sell_hero_amount()}</p>
          <p className="text-success-foreground/70">{m.blog_sell_hero_sub()}</p>
        </div>

        <Step number={1} title={m.blog_sell_step1_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step1_desc()}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {cleanItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
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
          <ProTip>{m.blog_sell_step1_tip()}</ProTip>
        </Step>

        <Step number={2} title={m.blog_sell_step2_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step2_desc()}</p>
          <div className="space-y-3">
            {repairs.map((item) => (
              <div
                key={item.label}
                className="border-border bg-muted flex items-center justify-between rounded-lg border p-4"
              >
                <span className="text-foreground font-medium">{item.label}</span>
                <div className="text-right">
                  <span className="text-muted-foreground text-sm">{item.price}</span>
                  <span className="text-success ml-3 text-sm font-medium">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </Step>

        <Step number={3} title={m.blog_sell_step3_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step3_desc()}</p>
          <div className="border-border bg-muted rounded-xl border p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {docs.map((doc) => (
                <div key={doc} className="flex items-center gap-3">
                  <div className="bg-info/10 text-info flex h-8 w-8 items-center justify-center rounded-lg">
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
                  <span className="text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </Step>

        <Step number={4} title={m.blog_sell_step4_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step4_desc()}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {photoSections.map((section) => (
              <div key={section.title} className="border-border bg-card rounded-xl border p-4">
                <h4 className="text-foreground mb-3 font-semibold">{section.title}</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg
                        className="text-info h-4 w-4"
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
          <ProTip>{m.blog_sell_step4_tip()}</ProTip>
        </Step>

        <Step number={5} title={m.blog_sell_step5_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step5_desc()}</p>
          <div className="border-info/20 bg-info/10 rounded-xl border p-6">
            <h4 className="text-info mb-4 font-semibold">{m.blog_sell_price_title()}</h4>
            <ol className="text-foreground space-y-3">
              {priceSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="bg-info/20 text-info flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Step>

        <div className="bg-primary text-primary-foreground my-12 rounded-2xl p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold">{m.blog_sell_cta_title()}</h3>
          <p className="text-primary-foreground/70 mb-6">{m.blog_sell_cta_desc()}</p>
          <Link
            to="/{-$locale}"
            params={(prev) => ({
              ...prev,
              locale: prev.locale === "da" ? undefined : "en",
            })}
            className="bg-background text-foreground inline-flex items-center rounded-xl px-8 py-4 text-lg font-bold transition-transform hover:scale-105"
          >
            {m.blog_sell_cta_button()}
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

        <Step number={6} title={m.blog_sell_step6_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step6_desc()}</p>
          <div className="border-border bg-card rounded-xl border-2 border-dashed p-6">
            <h4 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
              {m.blog_sell_ad_template()}
            </h4>
            <div className="text-foreground space-y-2">
              <p>
                <strong>{m.blog_sell_ad_1()}</strong> {m.blog_sell_ad_1_desc()}
              </p>
              <p>
                <strong>{m.blog_sell_ad_2()}</strong> {m.blog_sell_ad_2_desc()}
              </p>
              <p>
                <strong>{m.blog_sell_ad_3()}</strong> {m.blog_sell_ad_3_desc()}
              </p>
              <p>
                <strong>{m.blog_sell_ad_4()}</strong> {m.blog_sell_ad_4_desc()}
              </p>
              <p>
                <strong>{m.blog_sell_ad_5()}</strong> {m.blog_sell_ad_5_desc()}
              </p>
            </div>
          </div>
        </Step>

        <Step number={7} title={m.blog_sell_step7_title()}>
          <div className="grid gap-4 sm:grid-cols-2">
            {platforms.map((platform) => (
              <div key={platform.name} className="border-border bg-card rounded-xl border p-4">
                <h4 className="text-foreground font-bold">{platform.name}</h4>
                <p className="text-muted-foreground text-sm">{platform.desc}</p>
                <span className="bg-success/10 text-success mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
                  {m.blog_sell_platform_best()} {platform.best}
                </span>
              </div>
            ))}
          </div>
        </Step>

        <Step number={8} title={m.blog_sell_step8_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step8_desc()}</p>
          <div className="border-border bg-muted rounded-xl border p-6">
            <ul className="space-y-3">
              {viewingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="text-info mt-0.5 h-5 w-5"
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
                  <span className="text-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Step>

        <Step number={9} title={m.blog_sell_step9_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step9_desc()}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-destructive/20 bg-destructive/10 rounded-xl border p-4">
              <h4 className="text-destructive mb-2 font-semibold">
                {m.blog_sell_neg_dont_title()}
              </h4>
              <ul className="text-destructive/90 space-y-1 text-sm">
                {negDonts.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="border-success/20 bg-success/10 rounded-xl border p-4">
              <h4 className="text-success mb-2 font-semibold">{m.blog_sell_neg_do_title()}</h4>
              <ul className="text-success/90 space-y-1 text-sm">
                {negDos.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Step>

        <Step number={10} title={m.blog_sell_step10_title()}>
          <p className="text-muted-foreground mb-4">{m.blog_sell_step10_desc()}</p>
          <div className="bg-card border-border rounded-xl border p-6">
            <ul className="space-y-3">
              {closeSteps.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Step>

        {/* Final Summary */}
        <div className="bg-success text-success-foreground mt-12 rounded-2xl p-8">
          <h3 className="mb-6 text-center text-2xl font-bold">{m.blog_sell_checklist_title()}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="border-success-foreground/50 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2">
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
