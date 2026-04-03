import type { ReactNode } from 'react'
import { useState } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from '@components/LanguageProvider'
import Header from '@components/Header'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Bilvurdering - Find din bils værdi',
      },
      {
        name: 'description',
        content:
          'Få en øjeblikkelig vurdering af din bils værdi ved at indtaste dit nummerpladenummer.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
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
            <div className="pt-20">{children}</div>
          </LanguageProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
