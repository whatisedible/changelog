import type { APIRoute } from 'astro';
import { APPS, SITE_NAME, type App } from '../../lib/config';
import { forApp } from '../../lib/entries';
import { feedHeaders, rss } from '../../lib/feeds';

export function getStaticPaths() {
  return Object.keys(APPS).map((app) => ({ params: { app } }));
}

export const GET: APIRoute = ({ params }) => {
  const app = params.app as App;
  return new Response(
    rss(forApp(app), { title: `${SITE_NAME} — ${APPS[app].label}`, path: `/feeds/${app}.xml` }),
    { headers: feedHeaders('application/rss+xml; charset=utf-8') }
  );
};
