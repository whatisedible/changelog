import { error } from '@sveltejs/kit';
import { APPS, SITE_NAME, type App } from '$lib/config';
import { forApp } from '$lib/entries';
import { feedHeaders, rss } from '$lib/feeds';

export const prerender = true;

export function entries() {
  return Object.keys(APPS).map((app) => ({ app }));
}

export function GET({ params }) {
  if (!(params.app in APPS)) error(404);
  const app = params.app as App;
  return new Response(
    rss(forApp(app), { title: `${SITE_NAME} — ${APPS[app].label}`, path: `/feeds/${app}.xml` }),
    { headers: feedHeaders('application/rss+xml; charset=utf-8') }
  );
}
