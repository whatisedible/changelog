import { entries } from '$lib/entries';
import { feedHeaders, json } from '$lib/feeds';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify(json(entries), null, 2), {
    headers: feedHeaders('application/json; charset=utf-8')
  });
}
