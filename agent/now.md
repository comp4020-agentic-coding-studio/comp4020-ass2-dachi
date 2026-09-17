# Hand-off --- assignment 2 (Doorology), deepen run, 93.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete, ~45% of the week
elapsed. `git status` clean, four commits made and pushed this run
(`4970561`, `8d60555`, `22f0789`, `7325129`). `pnpm check` green before and
after every commit. Brief re-fetched, unchanged.

Picked up the prior hand-off's queued sensor list. Two came back genuinely
clean (no bug):

1. **Print stylesheet.** `astro-theme-university`'s `base.css` hides
   nav/sidebar/footer under `@media print`; confirmed live by exporting a
   real PDF (`agent-browser pdf`) of a session page and `pdftotext`-checking
   none of the nav/footer text made it in. The deck's own print mode
   (`?print-pdf`, reveal.js's export view) is vendored/tested machinery in
   `astromotion`, out of this project's scope; an ordinary (non-`?print-pdf`)
   PDF export of a live deck page renders sensibly, no broken state.
2. **Pagefind search in dark mode.** Real query, no-results state, and the
   dialog's own styling all confirmed clean and legible in dark mode via
   `agent-browser`.

But running a real `agent-browser a11y --json` sweep with dark mode
deliberately forced (not just "whatever theme happened to be active," which
is how every prior sweep worked) turned up a genuine, new WCAG AA
`color-contrast` violation: the `.at-card-title`/`.related-content h2` fix
from an earlier run (swapping in `--at-secondary` to clear a light-mode
failure) was never re-checked against the dark theme, where the same flat
hex colour reads only 3.5:1 (needs 4.5:1). Fixed with
`light-dark(var(--at-secondary), var(--at-primary))` across all six sites
that had the old fix, re-confirmed 0 violations in both themes afterwards
(`4970561`). Full detail and the general lesson (verify a per-theme colour
fix in *every* theme, not just the one that prompted it) written into both
the project's own `CLAUDE.md` and global `MEMORY.md`.

Also ran the queued third item, a fresh full content read (delegated to a
subagent for a clean-eyes pass), which found two real, small bugs neither
build checks nor any browser sensor could see:

3. Session 1's `spec:` had a leftover `astro-course-university` scaffold
   bullet ("your dev environment runs the course's toolchain") --- out of
   universe for Doorology, replaced with a door-specific checkable claim
   (`8d60555`).
4. Callum Reyes's bio says he marks the Door Audit and the Redesign
   Proposal; the redesign crit (week 8) already lists him for that reason,
   but the audit crit (week 4) didn't, despite the same audit being due
   there. Added him plus a sentence explaining why, matching week 8's
   established pattern (`22f0789`).

## Next action

Four sensor angles this run: two clean, two real bugs found and fixed (one
CSS, two content). Not yet "sensors exhausted" --- this is the third
consecutive run to find something, a different shape from the run before it
(four straight clean angles). `PROCESS.md` is still the unfilled template;
too early to draft it (~45% elapsed, well short of the ~60%+ mark that has
licensed early drafting on other deliverables), and there's still real
building/deepening runway left. Not-yet-tried for next run:

- No live sensor has yet tested the site with a screen reader's actual
  landmark/heading navigation (as opposed to axe's static rule checks or a
  plain Tab walkthrough) --- worth trying `agent-browser snapshot`'s
  accessibility tree against the expected heading hierarchy on a session
  and a lecture page.
- The `astro-course-university` template-scaffold-leakage bug class (found
  on session 1's spec) is worth one more targeted grep pass across the
  other 11 sessions and 6 lectures' `spec:`/body text for similar leftover
  generic-course language that a fresh full read might have skimmed past
  the same way it did on session 1 the first six times.
- If those come back clean, that's the point to treat the well as
  genuinely running dry and start thinking about `PROCESS.md`'s eventual
  shape (not draft it yet at ~45% elapsed).
