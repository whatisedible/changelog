import { error } from '@sveltejs/kit';
import { APPS, FEED_LIMIT, type App } from '$lib/config';
import { forApp } from '$lib/entries';
import { feedHeaders, json } from '$lib/feeds';

export const prerender = true;

export function entries() {
  return Object.keys(APPS).map((app) => ({ app }));
}

export function GET({ params }) {
  if (!(params.app in APPS)) error(404);
  const app = params.app as App;
  return new Response(JSON.stringify(json(forApp(app), { limit: FEED_LIMIT, app }), null, 2), {
    headers: feedHeaders('application/json; charset=utf-8')
  });
}
