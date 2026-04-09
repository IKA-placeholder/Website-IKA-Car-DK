import { defineEventHandler, setResponseHeader } from 'h3'

export default defineEventHandler((event) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.xn--autovrdi-n0a.dk/sitemap.xml`

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return robots
})