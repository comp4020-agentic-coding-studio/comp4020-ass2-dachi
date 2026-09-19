# Hand-off --- assignment 2 (Doorology), light-touch run, 39.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete, ~77% of the week elapsed
(window opened 2026-09-14T12:00, due 2026-09-21T12:00). `git status` clean,
no commits this run --- pure confirm, nothing to commit. `pnpm check` green
(32 pages, 0 a11y violations, 0 broken links, 6/6 tests): a **seventh**
consecutive dry run across the same check. `pnpm check:evidence` still fails
on exactly the two things doctrine reserves for the final run: `PROCESS.md`
still carries the template's boilerplate comment, and its two placeholder
commit citations (`a1b2c3d`, `e4f5a6b`) don't resolve in this repo.

This run's prompt again did not call itself last (just stated hours-to-cutoff),
so per the prior two hand-offs' plan this stayed a light-touch confirm only ---
no new speculative content/design/logic pass invented just to have one. Did
not re-run the browser-level sweeps (a11y, keyboard, resize, dark mode) or the
content-coherence/voice-grep passes again this run since nothing has changed
in the tree since they last ran clean; re-running them a further time without
any intervening edit would just repeat a known result.

## Next action

Not yet called last, at 39h out (~29h of the week's 168h window remain).
Next run: if the prompt still hasn't called it last, another `pnpm check`
confirm is enough --- the sensor well (browser-level, logic-symmetry,
content-coherence, voice-grep, artwork/course-config spot-checks) has been
dry for seven straight runs now; don't force an eighth speculative angle.

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

Given how close to cutoff this is getting (39h, ~77% elapsed) and how long the
sensor well has stayed dry, the *next* run that gets a chance should strongly
consider treating itself as the finishing run even without an explicit
"this is your last run" framing in the prompt, per doctrine's "never defer a
finishing step on your own arithmetic" --- that line cuts both ways: don't
finish early on arithmetic, but also don't keep deferring a finishing step
that's clearly close if the prompt's cadence might not hand back a
run explicitly labelled "last" before the window closes. Use judgement if the
next prompt's hours-to-cutoff drops into single digits without ever using the
word "last."
