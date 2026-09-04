import type { APIRoute } from 'astro';
import { FORUM_FEED_LIMIT, SITE_NAME } from '../../lib/config';
import { entries } from '../../lib/entries';
import { feedHeaders, rss } from '../../lib/feeds';

/** Short feed for the forum's RSS polling: newest few only, so a first poll stays quiet. */
export const GET: APIRoute = () =>
  new Response(
    rss(entries, { title: `${SITE_NAME} (forum feed)`, path: '/feeds/forum.xml', limit: FORUM_FEED_LIMIT }),
    { headers: feedHeaders('application/rss+xml; charset=utf-8') }
  );
