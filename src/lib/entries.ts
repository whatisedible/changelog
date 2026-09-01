import { marked } from 'marked';
import { APPS, SITE_URL, TOPICS, type App, type Topic } from './config';

export interface Entry {
  slug: string;
  url: string;
  title: string;
  /** YYYY-MM-DD, taken from the file name. */
  date: string;
  topic: Topic;
  apps: App[];
  summary: string;
  image?: string;
  /** Optional aside, rendered as a highlighted note from the team. */
  note?: string;
  html: string;
}

type Header = Record<string, string | string[]>;

/**
 * Tiny header parser. One `key: value` per line; lists as `[a, b]` or
 * indented `- item` lines. Values are taken verbatim (quotes optional), so a
 * colon inside a title is fine.
 */
function parseHeader(raw: string, file: string): { data: Header; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) fail(file, 'missing the --- header block at the top of the file');
  const data: Header = {};
  let lastKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = /^\s+-\s+(.*)$/.exec(line);
    if (item && lastKey) {
      const list = Array.isArray(data[lastKey]) ? (data[lastKey] as string[]) : [];
      list.push(unquote(item[1]));
      data[lastKey] = list;
      continue;
    }
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!kv) fail(file, `can't read header line "${line}" — expected "key: value"`);
    const [, key, value] = kv;
    lastKey = key;
    const v = value.trim();
    if (v === '') data[key] = [];
    else if (v.startsWith('[') && v.endsWith(']'))
      data[key] = v.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter(Boolean);
    else data[key] = unquote(v);
  }
  return { data, body: m[2] };
}

function unquote(s: string): string {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))
    return t.slice(1, -1);
  return t;
}

function fail(file: string, msg: string): never {
  throw new Error(`entries/${file}: ${msg}`);
}

function text(data: Header, key: string): string | undefined {
  const v = data[key];
  if (v === undefined) return undefined;
  if (Array.isArray(v)) return v.length ? v.join(', ') : undefined;
  return v;
}

function list(data: Header, key: string): string[] {
  const v = data[key];
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

/** First paragraph of the body as plain text, trimmed to ~200 chars. */
function firstParagraph(body: string): string {
  const para = body
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('!['));
  if (!para) return '';
  const plain = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= 200) return plain;
  return plain.slice(0, 200).replace(/\s+\S*$/, '') + '…';
}

const files = import.meta.glob('/entries/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function load(): Entry[] {
  const seen = new Map<string, string>();
  const out: Entry[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const file = path.split('/').pop()!;
    const name = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/.exec(file);
    if (!name) fail(file, 'file name must look like 2026-08-21-short-slug.md (lowercase, hyphens)');
    const [, date, slug] = name;
    if (Number.isNaN(Date.parse(`${date}T00:00:00Z`))) fail(file, `"${date}" is not a real date`);
    if (seen.has(slug)) fail(file, `slug "${slug}" is already used by ${seen.get(slug)}`);
    seen.set(slug, file);

    const { data, body } = parseHeader(raw, file);
    const title = text(data, 'title');
    if (!title) fail(file, 'needs a title');
    const headerDate = text(data, 'date');
    if (headerDate && headerDate !== date)
      fail(file, `date in header (${headerDate}) disagrees with the file name (${date}) — the file name wins; drop one`);

    const topic = text(data, 'topic') ?? '';
    if (!(topic in TOPICS))
      fail(file, `topic "${topic}" isn't one of: ${Object.keys(TOPICS).join(', ')}`);

    const apps = list(data, 'apps');
    for (const a of apps)
      if (!(a in APPS)) fail(file, `app "${a}" isn't one of: ${Object.keys(APPS).join(', ')}`);

    const html = marked.parse(body, { async: false }) as string;
    if (!body.trim()) fail(file, 'needs a body — at least one sentence below the header');

    out.push({
      slug,
      url: `${SITE_URL}/${slug}`,
      title,
      date,
      topic: topic as Topic,
      apps: apps as App[],
      summary: text(data, 'summary') ?? firstParagraph(body),
      image: text(data, 'image'),
      note: text(data, 'note'),
      html
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** All entries, newest first. Built once at build time. */
export const entries: Entry[] = load();

export function forApp(app: App): Entry[] {
  return entries.filter((e) => e.apps.includes(app));
}

export function bySlug(slug: string): Entry | undefined {
  return entries.find((e) => e.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
