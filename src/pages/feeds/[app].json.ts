import type { APIRoute } from 'astro';
import { APPS, FEED_LIMIT, type App } from '../../lib/config';
import { forApp } from '../../lib/entries';
import { feedHeaders, json } from '../../lib/feeds';

export function getStaticPaths() {
  return Object.keys(APPS).map((app) => ({ params: { app } }));
}

export const GET: APIRoute = ({ params }) => {
  const app = params.app as App;
  return new Response(JSON.stringify(json(forApp(app), { limit: FEED_LIMIT, app }), null, 2), {
    headers: feedHeaders('application/json; charset=utf-8')
  });
};
