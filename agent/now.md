# Hand-off --- assignment 2 (Doorology), deepen run, 159h to cutoff

## State

`comp4020-ass2-dachi` (Doorology, SLOP2558) is unchanged from the prior
hand-off's description: twelve sessions, six lectures, four assessments
(weights sum 100%), two people, one real deck, policies/home pages, no
starter placeholders. `git status` clean, nothing to commit or push this
run --- every sensor tried came back clean, no bugs found.

Ran two genuinely new checks this run (not repeats of the prior run's
coherence pass or browser sweep):

1. A subagent voice-compliance audit of all 22 content files (12 sessions, 6
   lectures, 4 assessments, plus policies/home/index pages) against this
   project's own `CLAUDE.md` "Voice" rules (no rhetorical questions, no
   "unlock"/"journey"/"dive in", no sentence that would survive a
   door-for-another-noun swap). Zero findings --- prose is genuinely clean.
2. Investigated an apparent gap: this project's `CLAUDE.md` says "a session
   or lecture's `spec:` must be a checkable contract," but only sessions
   have populated `spec:` frontmatter (all 12); no lecture does, and
   `spec/course-promises.test.ts` only asserts non-empty `spec` for
   sessions. Read `astro-course-university`'s own `schemas.ts` doc comment
   before treating this as a bug: it says explicitly "declare [spec] on
   anything that gets a mark ... leave it empty elsewhere" --- lectures
   aren't graded, sessions (with concrete studio outcomes like "you have
   photographed a door") are the right place for it. Not a bug; design as
   intended. Recorded the general technique in `MEMORY.md` (check a
   third-party template's own doc comments before flagging a project's
   self-authored rule as unmet).

Also spot-checked word counts across all session/lecture/assessment bodies
(182--372 words, no stub-length outliers) --- fine.

**Made one mistake this run, caught and reverted before it stuck**: nearly
wrote this hand-off directly to the deliverable repo's `agent/now.md`
(harness-owned, never edit) instead of here. Caught via `git diff` showing
the whole file replaced, reverted with `git checkout -- agent/now.md`. Same
class of near-miss as the one logged for crit 5 above --- worth continuing
to double-check the target path is `agents/dachi/memory/`, not a same-named
file inside whichever deliverable repo the prompt names.

`PROCESS.md` still the unedited template --- correct, 159h out is far too
early to start it.

## Next action

Sensor well is thinning fast for this deliverable (three clean passes now:
coherence, browser sweep, voice audit) with 159h still on the clock ---
early in the week, not yet at the "clock nearly out" condition, so don't
force a fourth speculative check next run. A next run's best options, in
rough priority: (a) if any further content edits happen, re-run the
coherence subagent afterward (cheap, well-suited to this deliverable's
failure class); (b) consider adding one or two more custom `spec/` checks
protecting course-specific promises not yet covered (e.g. that every
assessment's `related:` session/lecture slugs actually resolve, or that no
`related:` edge is declared redundantly on both sides per this project's own
content rule) --- neither investigated yet, both cheap; (c) otherwise hold
off and let real time pass before the next verification pass, rather than
inventing speculative creative/content changes with no way to check them
(this deliverable is prose/structure, not the crit series' aesthetic-"feel"
problem, so this caveat is lower-risk here, but there's still no marker
feedback loop yet to react to).
