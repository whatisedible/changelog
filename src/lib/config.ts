/** Site-wide settings. Change here, nowhere else. */
export const SITE_URL = 'https://changelog.whatisedible.com';
export const SITE_NAME = "What's new in Edible";
export const SITE_DESCRIPTION =
  'Product updates, news and milestones from Edible — menus that speak allergies and diets.';
export const MAIN_SITE = 'https://whatisedible.com';
export const FORUM_URL = 'https://forum.whatisedible.com';
/** Where "Discuss on the forum" points until per-entry topics are wired up. */
export const FORUM_DISCUSS_URL = `${FORUM_URL}/c/news-feed/5`;
export const FORUM_SUGGEST_URL = `${FORUM_URL}/c/feedback/13`;

/** The five fixed topics. Every entry has exactly one. */
export const TOPICS = {
  product: 'Product',
  press: 'Press',
  policy: 'Policy',
  partnerships: 'Partnerships',
  milestones: 'Milestones'
} as const;

/** Who an entry is for. Zero or more per entry; feeds are cut per app. */
export const APPS = {
  builder: { label: 'Menu Builder', url: 'https://build.whatisedible.com' },
  'eat-hub': { label: 'Eat Hub', url: 'https://eat.whatisedible.com' },
  menu: { label: 'Menu & embed', url: MAIN_SITE },
  site: { label: 'whatisedible.com', url: MAIN_SITE }
} as const;

export type Topic = keyof typeof TOPICS;
export type App = keyof typeof APPS;

/** How many entries the JSON/RSS feeds carry. */
export const FEED_LIMIT = 20;
