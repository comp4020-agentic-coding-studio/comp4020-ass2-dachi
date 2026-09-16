# Hand-off --- assignment 2 (Doorology), deepen run, 100.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete. `git status` clean,
two commits made and pushed this run (`780bf22`, `923bc83`). `pnpm check`
green before and after every commit. Brief re-fetched, unchanged (weights
sum to 100, code stays `SLOP2558`, `related:` edges correctly point at
`crits/06-a2-retro`).

Worked through the prior hand-off's queued sensor list, both came back
clean:

1. **Logic-symmetry pass over this repo's own scripts** (`course-
   config.ts`, `lib/dates.ts`, `scripts/pages-base.ts`, `scripts/check-
   evidence.ts`, `content.config.ts`, `site-config.ts`, `astro.config.ts`)
   --- the first time this project's own code, rather than the vendored
   theme, was the target. No asymmetry found; every real bug so far has
   come from the vendored theme's components (Nav, the mobile menu), not
   this repo's code.
2. **Dark mode, fully live-tested:** toggle flips `data-theme` and
   persists to `localStorage`; a fresh load with no stored preference
   follows `prefers-color-scheme`; a stored preference overrides the
   system scheme on reload; a real `agent-browser a11y --json` sweep in
   dark mode across four page templates came back 0/0.

Went one step further on two self-generated angles once those came back
clean, both also clean:

3. **The project's own focus-visible contrast fix**
   (`src/styles/a11y-fixes.css`) checked by hand in both themes ---
   discovered along the way that neither `getComputedStyle` nor axe can
   resolve an `oklch()`/`light-dark()` colour to sRGB, so had to route
   through a canvas `fillStyle`/`getImageData` round trip instead. Passes
   WCAG 1.4.11's 3:1 non-text floor in both themes. New reusable
   technique, written into global `MEMORY.md`.
4. **Astro's `ClientRouter` soft navigation** (enabled by default,
   unoverridden by this project) had never been exercised by any prior
   check, all of which drove full page loads/reloads. Re-tested all three
   of this project's own `astro.config.ts` integrations (theme
   persistence, Escape-to-close, scroll-lock) across a real soft
   transition, confirmed genuine via a `window.__mark` global surviving
   the nav. All three held up, including the trickiest case (clicking a
   nav link from inside the open mobile menu). New reusable technique,
   also written into global `MEMORY.md`.

Both findings documented in the project's own `CLAUDE.md`
(`780bf22`, `923bc83`).

## Next action

Four consecutive genuinely-new sensor angles this run, zero bugs found ---
a different shape from the prior two runs (each found and fixed one real
bug). Not yet "sensors exhausted" on its own (only one dry run so far,
and ~40% of the week elapsed, well short of the ~60%+ mark that licensed
drafting `PROCESS.md` early on other crits) --- but the obvious next
angles are getting narrower. Not-yet-tried for next run:

- Print stylesheet / `@media print` --- untested on this project, and the
  theme may or may not ship one.
- The pagefind search UI specifically in dark mode (index/results styling,
  not just the toggle) --- tested search functionality and dark mode
  separately, never both together.
- A second full fresh-content read (all 12 sessions, 6 lectures, 4
  assessments, home, policies) hasn't been run since the sixth run logged
  in the project's own `CLAUDE.md` --- worth one more pass given content
  hasn't changed since, mostly to confirm nothing has quietly drifted
  rather than expecting a new find.
- If those come back clean too, treat that as the first real "well
  running dry" signal and consider whether it's time to start thinking
  about `PROCESS.md`'s eventual shape (not draft it yet at ~40% elapsed).
