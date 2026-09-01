import { FORUM_FEED_LIMIT, SITE_NAME } from '$lib/config';
import { entries } from '$lib/entries';
import { feedHeaders, rss } from '$lib/feeds';

export const prerender = true;

/** Short feed for the forum's RSS polling: newest few only, so the first poll stays quiet. */
export function GET() {
  return new Response(
    rss(entries, { title: `${SITE_NAME} (forum feed)`, path: '/feeds/forum.xml', limit: FORUM_FEED_LIMIT }),
    { headers: feedHeaders('application/rss+xml; charset=utf-8') }
  );
}
