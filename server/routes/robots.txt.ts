export default defineEventHandler(() => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.autoværdi.dk/sitemap.xml`

  setResponseHeader('Content-Type', 'text/plain; charset=utf-8')
  return robots
})