import type { ReactNode } from 'react'
import { useState } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@components/LanguageProvider'
import Header from '@components/Header'
import Footer from '@components/Footer'

import appCss from '../styles.css?url'

// SEO-optimized metadata
const SITE_URL = 'https://www.autoværdi.dk'
const SITE_NAME = 'Autoværdi'
const DEFAULT_TITLE = 'Bilvurdering - Find din bils værdi | Autoværdi'
const DEFAULT_DESCRIPTION = 'Få en øjeblikkelig og gratis vurdering af din bils værdi. Indtast dit nummerpladenummer og få et realistisk prisoverslag baseret på markedsværdi, årgang og stand. Danmarks nemmeste bilvurdering.'
const DEFAULT_KEYWORDS = 'bilvurdering, bilværdi, brugtbil, nummerplade, bilpris, vurder bil, bilvurdering danmark, hvad er min bil værd'

// Structured data for rich snippets (JSON-LD)
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

// Organization structured data
const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  sameAs: [
    // Add social media URLs here when available
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Danish', 'English']
  }
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        title: DEFAULT_TITLE,
      },
      {
        name: 'description',
        content: DEFAULT_DESCRIPTION,
      },
      {
        name: 'keywords',
        content: DEFAULT_KEYWORDS,
      },
      {
        name: 'author',
        content: SITE_NAME,
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      {
        name: 'language',
        content: 'Danish',
      },
      {
        name: 'geo.region',
        content: 'DK',
      },
      {
        name: 'geo.placename',
        content: 'Danmark',
      },
      {
        name: 'theme-color',
        content: '#2563eb',
      },
      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: SITE_URL,
      },
      {
        property: 'og:title',
        content: DEFAULT_TITLE,
      },
      {
        property: 'og:description',
        content: DEFAULT_DESCRIPTION,
      },
      {
        property: 'og:site_name',
        content: SITE_NAME,
      },
      {
        property: 'og:locale',
        content: 'da_DK',
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: DEFAULT_TITLE,
      },
      {
        name: 'twitter:description',
        content: DEFAULT_DESCRIPTION,
      },
      // Canonical URL
      {
        rel: 'canonical',
        href: SITE_URL,
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      // Preconnect for performance
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationData),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="da">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
          </LanguageProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}