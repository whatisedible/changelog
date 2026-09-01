import { APPS, FEED_LIMIT, SITE_DESCRIPTION, SITE_NAME, SITE_URL, TOPICS } from './config';
import type { Entry } from './entries';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rss(items: Entry[], opts: { title: string; path: string; limit?: number }): string {
  const now = new Date().toUTCString();
  const body = items
    .slice(0, opts.limit ?? FEED_LIMIT)
    .map(
      (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${e.url}</link>
      <guid isPermaLink="true">${e.url}</guid>
      <pubDate>${new Date(`${e.date}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(TOPICS[e.topic])}</category>${e.apps
        .map((a) => `\n      <category>${esc(APPS[a].label)}</category>`)
        .join('')}
      <description><![CDATA[${e.html}]]></description>
    </item>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(opts.title)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}${opts.path}" rel="self" type="application/rss+xml" />
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
${body}
  </channel>
</rss>
`;
}

export function json(items: Entry[], opts: { limit?: number; app?: string } = {}) {
  const limited = opts.limit ? items.slice(0, opts.limit) : items;
  return {
    site: SITE_NAME,
    url: SITE_URL,
    app: opts.app ?? null,
    generated: new Date().toISOString(),
    count: limited.length,
    entries: limited.map((e) => ({
      slug: e.slug,
      url: e.url,
      title: e.title,
      date: e.date,
      topic: e.topic,
      apps: e.apps,
      summary: e.summary,
      image: e.image ?? null,
      html: e.html
    }))
  };
}

export const feedHeaders = (type: string) => ({
  'Content-Type': type,
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=300'
});
