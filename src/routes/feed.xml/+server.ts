import { SITE_NAME } from '$lib/config';
import { entries } from '$lib/entries';
import { feedHeaders, rss } from '$lib/feeds';

export const prerender = true;

export function GET() {
  return new Response(rss(entries, { title: SITE_NAME, path: '/feed.xml' }), {
    headers: feedHeaders('application/rss+xml; charset=utf-8')
  });
}
