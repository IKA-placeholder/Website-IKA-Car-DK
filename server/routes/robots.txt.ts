export default defineEventHandler(() => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.autovaerdi.dk/sitemap.xml`

  setResponseHeader('Content-Type', 'text/plain; charset=utf-8')
  return robots
})