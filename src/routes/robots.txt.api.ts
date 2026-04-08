import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/robots.txt')({
  GET: async () => {
    const robots = `User-agent: *
Allow: /

Sitemap: https://www.autoværdi.dk/sitemap.xml`

    return new Response(robots, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  },
})