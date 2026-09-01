# How we write entries

Short, plain, and about the reader. If a rule here and a sentence disagree, fix the sentence.

## The rules

1. **No em dashes.** Use a comma, a full stop, or brackets instead. (The build check fails on `—`.)
2. **Outcome first.** The first sentence says what changed for the reader. The why, if any, comes after.
3. **Plain words.** Say what the thing does, not what it is. No "leverage", "seamless", "robust", "functionality", "solution", "streamline".
4. **"You", not "users".** Operators, venues, diners, and "you". Never "users" or "end users".
5. **No internal names.** Not snapmenu, Supabase, R2, Cloudflare, Sentry, ticket or PR numbers. Name the thing by what it does for the reader.
6. **British spelling.** Colours, organise, favourite.
7. **No hype.** No exclamation marks, no "excited to announce", no "game-changing".
8. **Short.** Title under 70 characters. Summary is one sentence. Body is one to three short paragraphs.
9. **Product names as written:** Edible, Menu Builder, Eat Hub, whatisedible.com. Allergens in lower case: gluten, tree nuts, crustaceans.
10. **Safety wording is exact.** Never say "safe" about a dish. Say what the menu tracks, and "ask" when it doesn't.

## Alex's rules

_To add. Anything in your back pocket goes here and becomes law._

## Quick check

`npm run style` prints every line that breaks a rule. Em dashes fail; the rest are warnings.
