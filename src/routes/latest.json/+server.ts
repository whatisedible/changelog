import { FEED_LIMIT } from '$lib/config';
import { entries } from '$lib/entries';
import { feedHeaders, json } from '$lib/feeds';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify(json(entries, { limit: FEED_LIMIT }), null, 2), {
    headers: feedHeaders('application/json; charset=utf-8')
  });
}
