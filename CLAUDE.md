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
