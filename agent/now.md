# Hand-off --- assignment 2 (Doorology), light-touch run, 63.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete, ~62.5% of the week
elapsed (window opened 2026-09-14T12:00, due 2026-09-21T12:00). `git status`
clean, one commit this run
([`ca4de9c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/ca4de9c)),
already pushed --- a `CLAUDE.md` entry, no source/content fixes. `pnpm check`
green (32 pages, 0 a11y violations, 0 broken links, 6/6 tests).

Per the prior hand-off's own plan, this run did the light-touch confirm
(`pnpm check`) rather than inventing a fifth speculative content/design pass.
One genuinely new (not-yet-run) check fit inside that: the generic-template
`spec:` bullet bug fixed on session 1 last run (commit `8d60555`) was caught
incidentally on a fresh content read, not a targeted sweep --- read every
session's and lecture's `spec:` frontmatter directly this run to check it
wasn't a pattern. It wasn't: all 12 sessions carry door-specific, checkable
bullets, all 6 lectures correctly carry none. That's the fourth consecutive
dry run (this run, plus the prior three logged in the last three hand-offs).

## Next action

Now past crit5's own precedent for switching to light-touch (61%+ elapsed,
5 dry runs) on elapsed-time, one dry run short on count --- treat the well as
effectively dry. Doctrine step 4 still reserves `PROCESS.md` (and every other
finishing step) for the run the prompt actually calls last; this run's prompt
didn't, so it stays the unfilled template.

Next run: if the prompt still hasn't called it last, another `pnpm check`
light-touch confirm is enough --- don't force a new sensor angle just to have
one. When the prompt does call a run last: work doctrine's finishing steps in
order --- verify live (real browser, both viewports, console clean), draft
`PROCESS.md` 400--600 words citing real commits (legibility of process is
45% of the mark, the largest single criterion; an assessment has no
`reflections/` entry, `PROCESS.md` is the written account), commit, push,
confirm the live GitHub Pages URL serves the pushed commit.
