# Hand-off --- assignment 2 (Doorology), deepen run, 87.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete, ~48% of the week
elapsed. `git status` clean, no commits this run --- every sensor tried came
back clean, nothing to fix. `pnpm check` green (32 pages, 0 a11y
violations, 0 broken links, 6/6 tests). `pnpm check:evidence` fails only on
the two expected pre-final-run items (template comment still in
`PROCESS.md`, its two placeholder commit citations) --- deliberately
deferred to the final run per doctrine's finishing steps, not a bug.

Picked up both items the prior hand-off queued, plus three more of my own:

1. **Accessibility-tree landmark/heading walk** (`agent-browser snapshot -c`,
   not axe's static rules) on a session page, a lecture page, and the
   homepage: proper distinct-labelled landmarks (`navigation "Main"`,
   `main`, `complementary "Related"`, `contentinfo`, `navigation "Legal"`)
   and no skipped heading levels (h1→h2→h2... , h1→h2→h3 on the homepage's
   nested cards). Clean.
2. **Fresh full content re-read** (delegated, read-only) of all 12
   sessions and 6 lectures' frontmatter + body, hunting for the same
   scaffold-leakage bug class caught on session 1 last run. Nothing found
   --- every `spec:` bullet is door-specific and would not survive a
   noun-swap; body voice consistent throughout.
3. **Vendored global keyboard shortcuts** (`SearchDialog`'s Cmd/Ctrl+K,
   `FilterableCardGrid`'s `/`): both already guard correctly (skip when
   focus is in `input`/`textarea`/`contenteditable`, or check for an
   existing dialog before acting). Clean --- no fix needed.
4. **Course-level arithmetic**: assessment weights sum to 100 (30+25+20+25);
   each weighted assessment's own component weights sum to 100; field-guide
   confirmed still `mode: holistic` per the project's own documented rule.
   Related-edge duplication (fixed several runs ago) re-checked with a
   script over raw frontmatter --- no regression. Committed images (16K/8K
   PNGs) well under both the 5MB harness cap and the 2560px doctrine cap.
5. **Deck live-interaction check** (not run before): week-1 deck's
   `ArrowRight` advances slides and `Escape` correctly toggles reveal.js's
   own overview mode --- confirms the project's own global
   `nav-escape-to-close` injected script (which fires on every page,
   including deck pages) doesn't fight reveal.js's use of the same key; it
   no-ops correctly since there's no expanded mobile-nav toggle on a deck
   page.

Five independent sensor angles, all clean, in one run --- the first
completely dry run since the last real bug streak. Not yet "well
exhausted" by the calibration in `MEMORY.md` (crit5 needed five straight
dry runs before treating the well as dry); this is one.

## Next action

`PROCESS.md` is still the unfilled template --- correctly untouched, since
doctrine puts it under finishing steps for the final run, not something to
draft early on this deliverable (unlike a crit's `reflections/` entry,
which past calibration has drafted early once sensors ran dry and the week
was well past its midpoint). At ~48% elapsed there's still real runway.

Not-yet-tried for next run, in rough priority order:
- OG/meta-tag correctness across page templates (title/description content,
  not just presence) --- a genuine "does this look considered" check no
  prior run has done.
- Sitemap/robots.txt and the generated `llms.txt`/`llms-full.txt` for
  correctness against the real page set and base path.
- A second full two-viewport screenshot sweep, now that content has had two
  more runs of edits since the last one (2026-09-16) --- due for a repeat,
  not because the last one found anything.
- If those come back clean too, that's two consecutive fully-dry runs;
  start seriously weighing whether the remaining runway is better spent on
  one deliberate content/design deepening pass (per the brief's "response
  to the brief" criterion, 35% of marks) than a sixth sensor invention.
