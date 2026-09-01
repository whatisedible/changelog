// House-style check for entries/*.md. Em dashes are errors; the rest are warnings.
// Prints GitHub annotations in CI, plain lines locally. Exit 1 on any error.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'entries';
const ci = !!process.env.GITHUB_ACTIONS;
let errors = 0, warnings = 0;

const rules = [
  { level: 'error', re: /—| -- /g, msg: 'em dash: use a comma, a full stop, or brackets' },
  { level: 'warning', re: /\b(leverage[sd]?|utili[sz]e[sd]?|seamless(ly)?|robust|functionalit(y|ies)|solutions?|streamlin(e|ed|ing)|cutting-edge|game-chang\w+)\b/gi, msg: 'jargon: say what it does' },
  { level: 'warning', re: /\b(end[- ])?users?\b/gi, msg: '"users": say operators, venues, diners, or you' },
  { level: 'warning', re: /\b(snapmenu|supabase|cloudflare|\bR2\b|langfuse|sentry|posthog|listmonk|framer|discourse|P-\d+|E-\d+|PR ?#\d+)\b/gi, msg: 'internal name: name the thing by what it does' },
  { level: 'warning', re: /!/g, msg: 'exclamation mark' },
  { level: 'warning', re: /\b(excited|thrilled|delighted) to\b/gi, msg: 'hype' },
  { level: 'warning', re: /\b(color|organize|favorite|center|catalog|behavior)\w*/g, msg: 'British spelling' }
];

function report(level, file, line, msg, snippet) {
  if (level === 'error') errors++; else warnings++;
  if (ci) console.log(`::${level} file=${file},line=${line}::${msg}`);
  else console.log(`${level === 'error' ? 'ERROR  ' : 'warning'} ${file}:${line}  ${msg}  ${snippet}`);
}

let files = [];
try { files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort(); } catch { files = []; }

for (const f of files) {
  const file = join(dir, f);
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const header = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const title = header && /^title:\s*(.*)$/m.exec(header[1]);
  if (title && title[1].trim().length > 70) report('warning', file, 2, `title is ${title[1].trim().length} characters (aim under 70)`, '');
  if (title && /\.$/.test(title[1].trim())) report('warning', file, 2, 'title ends with a full stop', '');
  lines.forEach((line, i) => {
    if (/^---$/.test(line) || /^(topic|apps|date|image):/.test(line)) return;
    for (const r of rules) {
      r.re.lastIndex = 0;
      if (r.re.test(line)) report(r.level, file, i + 1, r.msg, line.trim().slice(0, 80));
    }
  });
}

console.log(`\nstyle: ${files.length} entries, ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
