# Doorology (SLOP2558)

A studio course on doors, run as crits and clinics rather than lectures. One
niche object, four assessments, no generic curriculum padding.

## Content rules

- Every `related:` edge is declared once, on whichever side of the pair is
  more natural, never both — the graph renders it on both pages regardless.
- Session/lecture slugs referenced by an assessment's `related:` are fixed by
  that assessment; write the assessment first if a slug needs to be locked
  in, then match it exactly when writing the corresponding session/lecture.
- A session or lecture's `spec:` must be a contract a reader can check
  without asking the person who wrote it — "you can name X" not "you
  understand X."
- No stock photography. Illustrations are two-ink risograph flat shapes in
  the theme's own gold/black tokens (read `--at-primary`/`--at-secondary`
  from `astro-theme-slop`'s CSS before picking a colour), generated with
  Python PIL since no image-gen tool is available in this environment.
  Dropping a placeholder image entirely (no replacement) is a valid design
  choice `check-evidence.ts` accepts — used for the people page.
- A blanket policy claim ("every X is due at Y") has to be checked against
  every entry it covers, not assumed true by pattern — the field guide is
  genuinely due after the closing crit, not at it, and the policies page
  said otherwise until a coherence pass caught it. When writing a rule that
  generalises across all four assessments or all twelve sessions, grep the
  actual frontmatter dates rather than trusting the pattern the other three
  established.

## Verification

- `pnpm check`'s own accessibility gate (`astro-theme-university`'s
  `a11y-checker.ts`) runs axe-core inside JSDOM, not a real browser — it can
  report "no accessibility violations" while still being structurally blind
  to `color-contrast` failures, which need real layout/paint to resolve.
  A clean `pnpm check` is not sufficient evidence of accessible contrast;
  confirm separately with `agent-browser a11y <url> --json` against a served
  `dist/` build. Run 2026-09-15 across all distinct page templates (home,
  both listing and `[slug]` pages for sessions/lectures/assessments/people,
  policies, the week-1 deck) came back 0 violations/0 incomplete — real
  confirmation, not a restatement of the build's own jsdom-based pass.

## Voice

Second person, addressed to the student, plain and specific. No rhetorical
questions, no "unlock"/"journey"/"dive in." A paragraph earns its place by
saying something only true of doors, not of "design thinking" in general —
if a sentence would survive with every mention of "door" swapped for
another object, cut it.

## Marking

Both `weighted` and `holistic` marking modes are used deliberately: the
capstone (Field Guide) is holistic because it's judged as a finished whole,
not a checklist; everything upstream of it is weighted because the criteria
that matter are known in advance and worth naming separately.
