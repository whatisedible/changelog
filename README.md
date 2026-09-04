# Edible changelog

What changed in Edible, and when. Published at **https://changelog.whatisedible.com**.

One markdown file per entry, in `entries/`. Merge to `main` and it's live in a couple of minutes.
Everything else — the website, the forum, the apps, the newsletter — reads from here.

## Add or edit an entry

1. Create `entries/YYYY-MM-DD-short-slug.md`. The date is the day it shipped or happened; the slug becomes the web address.
2. Fill in the header and write the body:

   ```markdown
   ---
   title: Published menus are served from the edge
   topic: product
   apps: [menu, builder]
   ---
   Your embedded menu is now served from a published copy held close to your visitors…
   ```

3. Open a pull request (on GitHub: open the folder → *Add file*, or edit an entry → *Propose changes*).
   The build checks the header and a preview link appears on the PR. Merge when the wording is right.

### Header fields

| field     | required | what it is |
|-----------|----------|------------|
| `title`   | yes      | Outcome first, plain words. Colons are fine. |
| `topic`   | yes      | One of `product` · `press` · `policy` · `partnerships` · `milestones` |
| `apps`    | no       | Who it's for: `builder`, `eat-hub`, `menu`, `site`. One or more, e.g. `[builder, menu]`. Leave out for company-wide news. |
| `summary` | no       | One line for the card and the feeds. Defaults to the first paragraph. |
| `image`   | no       | Path to a picture in `static/images/`, e.g. `/images/matrix.png`. |
| `note`    | no       | A short aside from the team, shown in a highlighted box under the entry. |

The body is ordinary markdown, as long or short as you like. Longer thinking belongs on the blog; link to it.

House style is in [STYLE.md](STYLE.md). `npm run style` checks it (em dashes fail the build, the rest warn).

### Tagging rule

Tag by **who should be told**, not where the code lives. A change to the menu diners see is
`menu` + `builder` (the operator's menu changed). Add `eat-hub` only when it touches the diner's own experience.

## Who reads what

| reader | what it uses |
|--------|--------------|
| Visitors | `/` (filter by topic and app, `?topic=product&app=builder` links work), `/<slug>` |
| whatisedible.com | `/latest.json` (Framer Fetch) and a "What's new" link |
| Forum News Feed | `/feeds/forum.xml` (newest 5), polled: each entry becomes a topic to discuss |
| Menu Builder | `/feeds/builder.json` |
| Eat Hub | `/feeds/eat-hub.json` |
| Anyone | `/feed.xml`, `/feeds/<app>.xml`, `/all.json`, `/sitemap.xml` |

The in-app "What's new" shows `product` and `policy` entries for its app; press, partnerships and milestones stay on the site and in the newsletter.
JSON and feeds are served with open CORS and a five-minute cache.

## Weekly routine

Friday: the week's change files across the Edible repos are swept into draft entries and opened as a PR here.
Alex edits the wording and merges. That's the whole process — nothing else to remember.

## Run it locally

```
npm install
npm run dev      # http://localhost:4321
npm run build    # writes ./dist, fails on a bad entry header
```

The site is [Astro](https://astro.build), the house stack for our small sites.

## Deploy

GitHub Actions builds every push and PR. With the `CLOUDFLARE_API_TOKEN` repository secret set, `main` deploys to
production and pull requests get a preview URL (posted as a PR comment). Hosting is Cloudflare Pages, project `changelog`.
