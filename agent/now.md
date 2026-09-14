# Hand-off --- assignment 2 (Doorology), deepen run, 146.5h to cutoff

## State

`comp4020-ass2-dachi` (Doorology, SLOP2558): twelve sessions, six lectures,
four assessments (weights sum 100%), two people, one real deck,
policies/home pages, no starter placeholders. `git status` clean, two new
commits made and pushed to `origin/main` this run.

Found and fixed one real, previously-unflagged bug: every session/lecture
pair (01, 03, 05, 07, 09, 12) declared its `related:` edge from **both**
sides, violating this project's own `CLAUDE.md` rule ("declared once, on
whichever side is more natural, never both"). Invisible on every rendered
page because `astro-course-university`'s `symmetriseRelated` dedups a
redundant declaration before it can show twice --- found only by reading
raw frontmatter across all twelve session/lecture files side by side and
cross-checking against the library's own dedup logic. Fixed by dropping
the edge from the lecture side of each pair (session side kept, since
sessions already declared all six); confirmed via `dist/api/*.json` and
the built HTML that both pages of a fixed pair still show exactly one
reciprocal "Related" link each, no regression. Added a `spec/` test
(`course-promises.test.ts`, "declares every related: edge on one side
only, never both") against the API's raw `edges` array so this can't
regress silently again. Full detail and the general "grep raw content
against a project's own authoring rule even when rendering looks fine"
lesson recorded in `MEMORY.md`.

**Also hit and fixed a real tooling incident**: the first version of that
new spec test's template-literal separator (a bare space:
`` `${edge.from} ${edge.to}` ``) landed in the file as a literal NUL byte
instead of a space --- invisible to `pnpm check` (vitest didn't care) but
`git show` on the resulting commit read as a binary diff
("Bin 1935 -> 2403 bytes", 0 insertions/deletions), which is what
surfaced it. Rewrote the file with a `->` separator instead, confirmed
clean with `file` (now reads "JavaScript source, ASCII text") and a
Python null-byte scan, and amended the not-yet-pushed commit in place.
Recorded as a general "binary diff stat on a text-content commit is never
a formatter quirk, always check bytes" lesson in `MEMORY.md`.

`PROCESS.md` still the unedited template --- correct, 146.5h out (~87% of
the week still on the clock) is far too early to start it; the working-
style lesson in `MEMORY.md` says writing it early just means rewriting it
once the commit history settles further.

## Next action

Sensor well for this deliverable was already thinning per the prior
hand-off (three clean passes: coherence, browser sweep, voice audit) before
this run found a genuinely new bug by asking a different question (grep raw
`related:` frontmatter directly, rather than re-running a prior sensor) ---
worth continuing that pattern rather than re-running coherence/voice/browser
sweeps that already came back clean twice. Two options not yet tried, still
cheap: (a) grep every collection's frontmatter for any *other*
project-specific authoring rule stated in this repo's `CLAUDE.md` that
might have the same "template tolerates it, so it's invisible" shape (the
"no stock photography" and "spec: is a checkable contract" rules were
already checked in a prior run and confirmed fine; the coherence-of-dates
rule was also already checked); (b) a fresh full read of `src/pages/*.astro`
and the theme's own component source for any other silent-dedup or
silent-fallback behaviour worth grepping content against, the same way
`course-graph.ts` was read this run. Otherwise, hold off and let more of the
week pass before the next verification pass --- 146.5h to cutoff is still
early, not yet the "clock nearly out" condition that would justify starting
`PROCESS.md` or forcing another speculative check.
