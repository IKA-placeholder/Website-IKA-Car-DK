import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getLocale } from "@/paraglide/runtime";

import appCss from "../styles.css?url";

// SEO-optimized metadata
const SITE_URL = "https://www.xn--autovrdi-n0a.dk";
const SITE_NAME = "Autoværdi";
const DEFAULT_TITLE = "Hvad er min bil værd? | Gratis bilvurdering → Autoværdi";
const DEFAULT_DESCRIPTION =
  'Vil du vide "hvad er min bil værd"? Få en gratis og øjeblikkelig bilvurdering. Indtast nummerplade og få realistisk pris baseret på markedsværdi. Prøv nu!';
const DEFAULT_KEYWORDS =
  "hvad er min bil værd, bilvurdering, bil værdi, vurdering af bil, pris på bil, brugt bil værdi, nummerplade, bilpris, danmark";

// Structured data for rich snippets (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization structured data
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  sameAs: [
    // Add social media URLs here when available
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Danish", "English"],
  },
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=5",
      },
      {
        title: DEFAULT_TITLE,
      },
      {
        name: "description",
        content: DEFAULT_DESCRIPTION,
      },
      {
        name: "keywords",
        content: DEFAULT_KEYWORDS,
      },
      {
        name: "author",
        content: SITE_NAME,
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow",
      },
      {
        name: "language",
        content: "Danish",
      },
      {
        name: "geo.region",
        content: "DK",
      },
      {
        name: "geo.placename",
        content: "Danmark",
      },
      {
        name: "theme-color",
        content: "#2563eb",
      },
      // Open Graph / Facebook
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        property: "og:title",
        content: DEFAULT_TITLE,
      },
      {
        property: "og:description",
        content: DEFAULT_DESCRIPTION,
      },
      {
        property: "og:site_name",
        content: SITE_NAME,
      },
      {
        property: "og:locale",
        content: "da_DK",
      },
      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: DEFAULT_TITLE,
      },
      {
        name: "twitter:description",
        content: DEFAULT_DESCRIPTION,
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicon for Google Search visibility
      { rel: "icon", type: "image/png", href: "/favicon.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/favicon.png", sizes: "16x16" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      // Apple touch icons
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "180x180" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "152x152" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "144x144" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "120x120" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "114x114" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "76x76" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "72x72" },
      { rel: "apple-touch-icon", href: "/favicon.png", sizes: "57x57" },
      // Web App Manifest
      { rel: "manifest", href: "/manifest.json" },
      // Preconnect for performance
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      // Canonical URL
      {
        rel: "canonical",
        href: SITE_URL,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationData),
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const lang = getLocale();

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
