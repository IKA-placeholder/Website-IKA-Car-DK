export default defineEventHandler(() => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.autovaerdi.dk/</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.autovaerdi.dk/blog</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.autovaerdi.dk/blog/hvad-er-min-bil-vaerd</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.autovaerdi.dk/blog/bil-vurdering-guide</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.autovaerdi.dk/blog/saelg-bil-hoejeste-pris</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.autovaerdi.dk/login</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://www.autovaerdi.dk/signup</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`

  setResponseHeader('Content-Type', 'application/xml; charset=utf-8')
  return sitemap
})