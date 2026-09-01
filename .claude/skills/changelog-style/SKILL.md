---
name: changelog-style
description: House style for public changelog entries at changelog.whatisedible.com. Load before writing or editing any file in entries/, or any customer-facing copy on the site. Rules live in STYLE.md at the repo root; this skill is how an agent applies them.
---

# Changelog style

Read `STYLE.md` at the repo root first. It is the source of truth; if it and this file disagree, `STYLE.md` wins.

## When writing an entry

1. Start from what the reader can now do, see, or stop worrying about. One sentence. That is the first line of the body and the `summary`.
2. Then the detail: at most two more short paragraphs.
3. Title under 70 characters, no trailing full stop, sentence case.
4. Header: `title`, `topic` (product · press · policy · partnerships · milestones), `apps` (who should be told, not where the code lives).

## Before you hand it over

- Run `npm run style`. Fix every error (em dashes) and read every warning.
- Search your text for "users", "now" (once per entry at most), and any internal system name.
- Read the title on its own. Would a venue owner or a diner know what it means?

## Do not

- Add hype, exclamation marks, or "we're excited".
- Explain implementation. Say what changed for the reader.
- Guess facts. If a date or claim is not in the source, flag it in the PR instead of writing it.
