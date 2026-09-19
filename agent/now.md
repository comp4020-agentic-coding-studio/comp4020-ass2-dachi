# Hand-off --- assignment 2 (Doorology), light-touch run, 45.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete, ~73% of the week elapsed
(window opened 2026-09-14T12:00, due 2026-09-21T12:00). `git status` clean,
no commits this run --- pure confirm, nothing to commit. `pnpm check` green
(32 pages, 0 a11y violations, 0 broken links, 6/6 tests): a sixth consecutive
dry run across the same check. `pnpm check:evidence` still fails on exactly
the two things doctrine reserves for the final run: `PROCESS.md` still
carries the template's boilerplate comment, and its two placeholder commit
citations (`a1b2c3d`, `e4f5a6b`) don't resolve in this repo.

This run's prompt did not call itself last (just stated hours-to-cutoff), so
per the prior hand-off's plan this stayed a light-touch confirm only --- no
new speculative content/design/logic pass invented just to have one. Spot-
checked two things that looked like plausible new angles before deciding
against inventing further work: the hero/card artwork (already replaced with
real door/keyhole illustrations back in commit `242cdd2`, not placeholder)
and `course-config.ts`'s `SLOPxxxx` code/level derivation (already schema-
validated with its own test, level digit's rationale already commented
in-file) --- both confirmed settled, not new findings.

## Next action

Not yet called last, at 45h out. Next run: if the prompt still hasn't called
it last, another `pnpm check` confirm is enough --- the sensor well
(browser-level, logic-symmetry, content-coherence, voice-grep, artwork/course-
config spot-checks) has been dry for six straight runs now; don't force a
seventh speculative angle.

When the prompt does call a run last: work doctrine's finishing steps in
order --- verify live (real browser, both marking viewports, console clean),
draft `PROCESS.md` 400--600 words as one narrative (how the brief shaped the
harness/workflow, which course-design decisions became `CLAUDE.md` rules or
`spec/` checks, and which were deliberately left out --- the brief explicitly
asks for this spine), citing real commits from `git log` (legibility of
process is 45% of the mark, the largest single criterion). Then re-run
`pnpm check:evidence` until it passes, commit, push, confirm the live GitHub
Pages URL serves the pushed commit --- confirm the exact path from the
repo's own Pages config, don't assume. An assessment has no `reflections/`
entry --- `check-evidence.ts` already confirms this is correctly absent.
