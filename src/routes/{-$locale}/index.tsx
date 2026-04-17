import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

import BackgroundCars from "@/components/BackgroundCars";
import DenmarkSilhouette from "@/components/DenmarkSilhouette";
import LicensePlateSearch from "@/components/LicensePlateSearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

// Animation constants - use string-based easing names
const EASE_OUT_QUART = "easeOut" as const;

// Animation variants
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const stepContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const lineDrawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.6, ease: "easeOut" as const, delay: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
};

const checkmarkVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

function StepIcon({ index }: { index: number }) {
  const common = "h-7 w-7 text-slate-600";
  if (index === 0) {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 .648-.204 1.25-.58 1.75"
        />
      </svg>
    );
  }
  return (
    <svg
      className={common}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v7.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-7.125ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  );
}

// SEO metadata for this route
const SITE_URL = "https://www.xn--autovrdi-n0a.dk";

// Enhanced FAQ structured data for SEO - targets primary keyword
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hvad er min bil værd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Din bils værdi afhænger af mange faktorer: mærke, model, årgang, kilometerstand, udstyr og stand. Med Autoværdi kan du få en gratis vurdering ved at indtaste din nummerplade. Vi analyserer markedsværdien baseret på faktiske salgspriser fra Danmark.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan finder jeg ud af hvad min bil er værd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Den nemmeste måde at finde ud af hvad din bil er værd, er at bruge en online bilvurderingstjeneste som Autoværdi. Indtast blot din nummerplade, og du får straks en vurdering baseret på aktuelle markedsdata.",
      },
    },
    {
      "@type": "Question",
      name: "Hvor meget er min brugte bil værd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Værdien af en brugt bil varierer meget afhængigt af alder, stand og udstyr. En bil taber typisk 15-20% i værdi det første år og herefter 10-15% årligt. Brug Autoværdis gratis værktøj til at få en præcis vurdering af netop din bil.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan fungerer bilvurdering på Autoværdi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det er simpelt: indtast din nummerplade, så finder vi din bil i databasen og beregner en realistisk markedsværdi baseret på årgang, model og aktuelle markedspriser.",
      },
    },
    {
      "@type": "Question",
      name: "Er bilvurderingen gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, vores online bilvurdering er helt gratis. Du kan få et øjeblikkeligt prisoverslag ved at indtaste din nummerplade.",
      },
    },
    {
      "@type": "Question",
      name: "Hvor præcis er vurderingen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vores vurdering er baseret på machine learning modeller, som er trænet på aktuelle markedsdata fra danske bilmarkeder. Den giver et realistisk estimat af din bils værdi.",
      },
    },
  ],
};

export const Route = createFileRoute("/{-$locale}/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "Hvad er min bil værd? | Gratis bilvurdering → Autoværdi",
      },
      {
        name: "description",
        content:
          'Vil du vide "hvad er min bil værd"? Få en gratis og øjeblikkelig bilvurdering. Indtast nummerplade og få realistisk pris baseret på markedsværdi. Prøv nu!',
      },
      {
        name: "keywords",
        content:
          "hvad er min bil værd, bilvurdering, bil værdi, vurdering af bil, pris på bil, brugt bil værdi, nummerplade",
      },
      {
        property: "og:title",
        content: "Hvad er min bil værd? | Gratis bilvurdering",
      },
      {
        property: "og:description",
        content:
          "Få en øjeblikkelig og gratis vurdering af din bils værdi. Indtast dit nummerpladenummer og få et realistisk prisoverslag.",
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:title",
        content: "Hvad er min bil værd? | Gratis bilvurdering",
      },
      {
        name: "twitter:description",
        content: "Få en øjeblikkelig og gratis vurdering af din bils værdi.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: SITE_URL,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqStructuredData),
      },
    ],
  }),
});

function Home() {
  const locale = getLocale();
  const shouldReduceMotion = useReducedMotion();

  // Split title into words for stagger animation
  const titleWords = m.heroTitle().split(" ");

  // FAQ texts
  const faqTexts: Record<string, { faqTitle: string; questions: { q: string; a: string }[] }> = {
    da: {
      faqTitle: "Ofte stillede spørgsmål",
      questions: [
        {
          q: "Hvad er min bil værd?",
          a: "Din bils værdi afhænger af mange faktorer: mærke, model, årgang, kilometerstand, udstyr og stand. Med Autoværdi kan du få en gratis vurdering ved at indtaste din nummerplade. Vi analyserer markedsværdien baseret på faktiske salgspriser fra Danmark.",
        },
        {
          q: "Hvordan finder jeg ud af hvad min bil er værd?",
          a: "Den nemmeste måde at finde ud af hvad din bil er værd, er at bruge en online bilvurderingstjeneste som Autoværdi. Indtast blot din nummerplade, og du får straks en vurdering baseret på aktuelle markedsdata.",
        },
        {
          q: "Hvor meget er min brugte bil værd?",
          a: "Værdien af en brugt bil varierer meget afhængigt af alder, stand og udstyr. En bil taber typisk 15-20% i værdi det første år og herefter 10-15% årligt. Brug Autoværdis gratis værktøj til at få en præcis vurdering af netop din bil.",
        },
      ],
    },
    en: {
      faqTitle: "Frequently Asked Questions",
      questions: [
        {
          q: "How does car valuation work on Autoværdi?",
          a: "It is simple: enter your license plate, we find your car in the database and calculate a realistic market value based on year, model and current market prices.",
        },
        {
          q: "Is the car valuation free?",
          a: "Yes, our online car valuation is completely free. You can get an instant price estimate by entering your license plate.",
        },
        {
          q: "How accurate is the valuation?",
          a: "Our valuation is based on advanced algorithms and current market data from Danish car markets. It provides a realistic estimate of your car's value.",
        },
      ],
    },
  };

  const steps = [
    {
      title: m.step_1_title,
      description: m.step_1_desc,
    },
    {
      title: m.step_2_title,
      description: m.step_2_desc,
    },
    {
      title: m.step_3_title,
      description: m.step_3_desc,
    },
  ];

  const currentFaq = faqTexts[locale];

  // SEO content checkmarks
  const seoFeatures = [
    locale === "da"
      ? "Helt gratis bilvurdering uden skjulte gebyrer"
      : "Completely free car valuation with no hidden fees",
    locale === "da"
      ? "Resultat på få sekunder baseret på markedsværdi"
      : "Results in seconds based on market value",
    locale === "da"
      ? "Databaseret på reelle salgspriser fra danske bilmarkeder"
      : "Data based on real sales prices from Danish car markets",
    locale === "da"
      ? "Modeller der tager højde for årgang, model og stand"
      : "Advanced algorithms that account for year, model, and condition",
  ];

  return (
    <>
      <main className="from-background to-muted/30 text-foreground relative min-h-screen overflow-x-hidden bg-linear-to-b pt-16 pb-24">
        <div
          className="from-muted/50 pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b to-transparent"
          aria-hidden
        />
        <DenmarkSilhouette />

        <div
          className="bg-primary/[0.07] pointer-events-none absolute top-40 left-1/4 -z-10 h-72 w-72 rounded-full blur-3xl"
          aria-hidden
        />
        <div
          className="bg-muted-foreground/5 pointer-events-none absolute right-1/4 bottom-24 -z-10 h-80 w-80 rounded-full blur-3xl"
          aria-hidden
        />

        {/* Hero Section */}
        <section className="relative mt-4 flex flex-col items-center justify-center overflow-hidden px-4 py-16 md:py-24">
          {/* BackgroundCars - hidden on mobile */}
          <div className="hidden md:block">
            <BackgroundCars />
          </div>

          <motion.div
            className="relative z-1 w-full max-w-3xl space-y-10 text-center"
            initial="hidden"
            animate="visible"
            variants={shouldReduceMotion ? undefined : heroContainerVariants}
          >
            {/* Animated Title */}
            <h1 className="hero-title text-foreground text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.08]">
              {shouldReduceMotion ? (
                m.heroTitle()
              ) : (
                <>
                  {titleWords.map((word, i) => (
                    <>
                      <motion.span key={i} className="inline-block" variants={wordVariants}>
                        {word}
                      </motion.span>
                      {i < titleWords.length - 1 && " "}
                    </>
                  ))}
                </>
              )}
            </h1>

            {/* Description */}
            <motion.p
              className="hero-description text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed md:text-xl"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              {m.heroDesc()}
            </motion.p>

            {/* Search Box */}
            <motion.div
              id="license-plate-search"
              className="license-search relative mx-auto w-full max-w-xl"
              variants={shouldReduceMotion ? undefined : scaleUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <div
                className="bg-primary/10 pointer-events-none absolute -inset-6 rounded-4xl blur-3xl"
                aria-hidden
              />
              <div className="border-border/50 bg-background/80 ring-border/50 relative rounded-2xl border p-6 shadow-sm ring-1 backdrop-blur-xl md:p-8">
                {typeof window !== "undefined" && <LicensePlateSearch />}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <motion.section
          className="how-section border-border/60 border-t px-4 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={shouldReduceMotion ? undefined : stepContainerVariants}
        >
          <div className="mx-auto max-w-5xl">
            <motion.div
              className="how-heading-st mb-16 text-center"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
            >
              <h2 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
                {m.howTitle()}
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-lg">
                {locale === "da"
                  ? "Tre enkle trin fra nummerplade til vurdering."
                  : "Three simple steps from plate to valuation."}
              </p>
            </motion.div>

            <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-center md:gap-0">
              {steps.map((step, i) => (
                <Fragment key={step.title()}>
                  <motion.div
                    className="how-step relative flex flex-1 flex-col items-center text-center md:px-4"
                    variants={shouldReduceMotion ? undefined : stepVariants}
                  >
                    {/* Step number background */}
                    <motion.span
                      className="text-muted/20 pointer-events-none absolute -top-10 -left-4 -z-10 text-8xl leading-none font-bold select-none"
                      aria-hidden
                      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2 }}
                    >
                      {i + 1}
                    </motion.span>

                    {/* Icon with bounce animation */}
                    <motion.div
                      className="border-border/60 bg-background ring-border/40 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm ring-1"
                      variants={shouldReduceMotion ? undefined : iconVariants}
                    >
                      <StepIcon index={i} />
                    </motion.div>

                    <h3 className="text-foreground mb-2 text-lg font-semibold tracking-tight">
                      {step.title()}
                    </h3>
                    <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                      {step.description()}
                    </p>
                  </motion.div>

                  {/* Connector Line with draw animation */}
                  {i < 2 && (
                    <div
                      className="hidden items-center justify-center self-center md:flex md:min-h-32 md:w-10 md:shrink-0 md:pt-10"
                      aria-hidden
                    >
                      <svg
                        className="h-px w-full min-w-10 lg:min-w-16"
                        viewBox="0 0 100 2"
                        preserveAspectRatio="none"
                      >
                        <motion.line
                          x1="0"
                          y1="1"
                          x2="100"
                          y2="1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="text-border/90"
                          variants={shouldReduceMotion ? undefined : lineDrawVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SEO Content Section */}
        <motion.section
          className="border-border/60 bg-background border-t px-4 py-16"
          aria-labelledby="seo-heading"
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
        >
          <div className="mx-auto max-w-4xl">
            <h2
              id="seo-heading"
              className="seo-content-item text-foreground mb-6 text-2xl font-semibold tracking-tight md:text-3xl"
            >
              {locale === "da" ? "Hvad er min bil værd?" : "What is my car worth?"}
            </h2>
            <div className="seo-content-item prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {locale === "da"
                  ? 'Når du spørger "hvad er min bil værd?", er svaret ikke altid lige til. Bilens værdi afhænger af flere faktorer: mærke, model, årgang, kilometerstand, udstyrsniveau og ikke mindst bilens generelle stand. Hos Autoværdi gør vi det nemt at få svar på netop det spørgsmål. Vores avancerede modeller analyserer aktuelle markedsværdier fra danske bilforhandlere og privat salg, så du får et realistisk bud på din bils værdi.'
                  : "When you ask \"what is my car worth?\", the answer is not always straightforward. The value of your car depends on several factors: make, model, year, mileage, equipment level, and not least the car's overall condition. At Autoværdi, we make it easy to get an answer to exactly that question. Our advanced algorithm analyzes current market values from Danish car dealers and private sales, so you get a realistic estimate of your car's value."}
              </p>
              <h3 className="seo-content-item text-foreground mt-8 mb-4 text-xl font-semibold">
                {locale === "da"
                  ? "Sådan finder du ud af hvad din bil er værd"
                  : "How to find out what your car is worth"}
              </h3>
              <p className="seo-content-item text-muted-foreground mb-4 leading-relaxed">
                {locale === "da"
                  ? "Det tager kun 10 sekunder at få en gratis vurdering. Indtast din nummerplade i feltet ovenfor, og vores system finder automatisk alle oplysninger om din bil. Herefter beregner vi en præcis vurdering baseret på tusindvis af sammenlignelige bilsalg i Danmark."
                  : "It only takes 10 seconds to get a free valuation. Enter your license plate in the field above, and our system automatically finds all information about your car. Then we calculate an accurate valuation based on thousands of comparable car sales in Denmark."}
              </p>
              <h3 className="seo-content-item text-foreground mt-8 mb-4 text-xl font-semibold">
                {locale === "da"
                  ? "Hvorfor vælge Autoværdi til din bilvurdering?"
                  : "Why choose Autoværdi for your car valuation?"}
              </h3>
              <motion.ul
                className="seo-content-item text-muted-foreground space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={
                  shouldReduceMotion
                    ? undefined
                    : { visible: { transition: { staggerChildren: 0.1 } } }
                }
              >
                {seoFeatures.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    variants={
                      shouldReduceMotion
                        ? undefined
                        : { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                    }
                  >
                    <svg
                      className="text-primary mt-0.5 h-5 w-5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        variants={shouldReduceMotion ? undefined : checkmarkVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section with Accordion */}
        <motion.section
          className="border-border/60 bg-muted/30 border-t px-4 py-16"
          aria-labelledby="faq-heading"
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-auto max-w-4xl">
            <motion.h2
              id="faq-heading"
              className="text-foreground mb-8 text-center text-2xl font-semibold tracking-tight md:text-3xl"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
            >
              {currentFaq.faqTitle}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={
                shouldReduceMotion
                  ? undefined
                  : { visible: { transition: { staggerChildren: 0.1 } } }
              }
            >
              <Accordion className="space-y-4">
                {currentFaq.questions.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={
                      shouldReduceMotion
                        ? undefined
                        : {
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.4, ease: EASE_OUT_QUART },
                            },
                          }
                    }
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-border/60 bg-background rounded-xl border shadow-sm"
                    >
                      <AccordionTrigger className="text-foreground px-4 py-4 text-left font-medium hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground px-4 pb-4 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </motion.section>

        {/* Blog Links Section */}
        <motion.section
          className="border-border/60 bg-background border-t px-4 py-16"
          aria-labelledby="guides-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? undefined : cardContainerVariants}
        >
          <div className="mx-auto max-w-4xl">
            <motion.h2
              id="guides-heading"
              className="text-foreground mb-4 text-center text-2xl font-semibold tracking-tight md:text-3xl"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
            >
              {locale === "da" ? "Lær mere om bilvurdering" : "Learn more about car valuation"}
            </motion.h2>

            <motion.p
              className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
            >
              {locale === "da"
                ? "Læs vores guides og artikler for at blive klogere på bilvurdering og salg af brugte biler."
                : "Read our guides and articles to learn more about car valuation and selling used cars."}
            </motion.p>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  to: "/{-$locale}/blog/hvad-er-min-bil-vaerd",
                  icon: (
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
                  ),
                  title: locale === "da" ? "Hvad er min bil værd?" : "What is my car worth?",
                  description:
                    locale === "da"
                      ? "Komplet guide til bilvurdering og faktorer der påvirker prisen."
                      : "Complete guide to car valuation and factors affecting price.",
                },
                {
                  to: "/{-$locale}/blog/bil-vurdering-guide",
                  icon: (
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
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  ),
                  title: locale === "da" ? "Sådan vurderer du selv" : "How to value your car",
                  description:
                    locale === "da"
                      ? "Lær hvordan du selv kan vurdere din bil ved at analysere markedet."
                      : "Learn how to value your car by analyzing the market.",
                },
                {
                  to: "/{-$locale}/blog/saelg-bil-hoejeste-pris",
                  icon: (
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
                  ),
                  title: locale === "da" ? "Få højeste pris" : "Get the best price",
                  description:
                    locale === "da"
                      ? "Tips til at maksimere salgsprisen på din bil."
                      : "Tips for maximizing your car sale price.",
                },
              ].map((post, i) => (
                <motion.div key={i} variants={shouldReduceMotion ? undefined : cardVariants}>
                  <Link
                    to={post.to}
                    params={{ locale }}
                    className="group border-border bg-muted/30 hover:border-primary/30 hover:bg-muted/50 block rounded-2xl border p-6 transition-all duration-200 hover:shadow-md"
                  >
                    <motion.div
                      className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {post.icon}
                    </motion.div>
                    <h3 className="text-foreground group-hover:text-primary mb-2 font-semibold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{post.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
            >
              <Link
                to="/{-$locale}/blog"
                params={{ locale }}
                className="group text-primary hover:text-primary/80 inline-flex items-center font-medium transition-colors"
              >
                {locale === "da" ? "Se alle artikler" : "See all articles"}
                <motion.svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
