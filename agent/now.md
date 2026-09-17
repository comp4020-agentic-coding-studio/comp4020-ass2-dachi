# Hand-off --- assignment 2 (Doorology), deepen run, 76.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete, ~55% of the week
elapsed. `git status` clean, one commit this run
([`d4a3547`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/d4a3547)),
already pushed --- a `CLAUDE.md` verification-log entry, no source/content
fixes needed since every sensor tried came back clean. `pnpm check` green
(32 pages, 0 a11y violations, 0 broken links, 6/6 tests) at the top of
this run.

Picked up all three items the prior hand-off queued, plus one new
mechanical check:

1. **OG/meta-tag audit** across every distinct page template (home,
   session, lecture, assessment, person, policies, deck): all door-specific
   and accurate, no generic/copy-pasted copy. Investigated an apparent
   title-suffix inconsistency (some pages get " — Slop University", some
   don't) and confirmed it's the starter's own `remark-default-layout`
   mechanism, applied consistently by page-authoring path (custom
   `[slug].astro` routes vs. hand-written `index.mdx` pages) --- not a bug.
2. **Sitemap/robots.txt**: neither exists in `dist/`; the starter ships no
   `@astrojs/sitemap` integration and none is asked for by the brief or
   `check:evidence`. Confirmed absence is by design, not a gap --- didn't
   add one.
3. **Second full two-viewport screenshot sweep**, targeted at every
   template touched since the first sweep (2026-09-16): the six-file
   `light-dark()` contrast fix, plus the session 01/04 content edits.
   Clean --- no overflow, no broken cards, weight/date text still agrees
   with frontmatter everywhere checked.
4. **New: a mechanical `rg` grep across all content** for LLM stock
   phrases, rhetorical questions (any `?` in body text, not just at line
   ends), and generic design-jargon that would fail the project's own
   noun-swap voice test. Zero matches on all three --- a much cheaper
   sensor than another full manual read for the same voice question, now
   logged in both this repo's `CLAUDE.md` and global `MEMORY.md` as a
   standing check worth re-running after any future content addition.

Four sensor angles this run, all clean, following on from five clean
angles last run --- two consecutive dry runs by the calibration in
`MEMORY.md` (crit5 needed five before calling the well dry; this is
weaker evidence, not yet conclusive).

## Next action

`PROCESS.md` is still the unfilled template --- deliberately untouched.
Doctrine's step 4 reserves finishing steps (drafting `PROCESS.md`) for
the run the prompt actually calls last, not something to start early on
elapsed-time-and-dry-sensors arithmetic alone; past crit precedent for
drafting a reflection early needed both signals much further along (61%+
elapsed, 5 straight dry runs) than this run has (55%, 2 dry). Don't draft
it yet.

With bug-hunting sensors two-for-two dry, the more promising next lever
per `MEMORY.md`'s own guidance is a deliberate content/design deepening
pass rather than a further sensor invention --- and unlike crit 4's
"unverifiable creative feel" trap, this is judgeable directly (I can read
prose and check structural coherence; I can't judge audio "feel").
Concretely, not yet tried:

- A close read of all four assessment briefs side by side (door-audit,
  redesign-proposal, prototype-crit, field-guide) specifically asking
  whether the brief's model-course criterion is met: does the arc "hold
  together" the way *Calling Bullshit*/*How to Make (Almost) Anything*/
  *CS 007* do --- one idea carried the whole way, not four separate
  assignments that happen to share a topic. This is different from the
  coherence passes already logged (which checked facts agree, not
  whether the argument itself is sharp).
- Whether the course's own positioning holds a point of view as directly
  as the brief's model courses do (their titles state an argument;
  "Doorology" is more descriptive/neutral) --- worth a considered look,
  not a reflexive rename.
- If that pass also comes back with nothing to change, that's a strong
  signal the site is genuinely settled with real runway still left;
  worth holding at light-touch re-verification (rerun `pnpm check`) each
  subsequent run rather than manufacturing further passes, the way
  crit5's runs 9--16 did once its own well ran dry.
