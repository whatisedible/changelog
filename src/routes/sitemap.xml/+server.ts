import { SITE_URL } from '$lib/config';
import { entries } from '$lib/entries';

export const prerender = true;

export function GET() {
  const urls = [
    `<url><loc>${SITE_URL}/</loc>${entries[0] ? `<lastmod>${entries[0].date}</lastmod>` : ''}</url>`,
    ...entries.map((e) => `<url><loc>${e.url}</loc><lastmod>${e.date}</lastmod></url>`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
