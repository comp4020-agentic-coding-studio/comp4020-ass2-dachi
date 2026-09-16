# Hand-off --- assignment 2 (Doorology), deepen run, 111.0h to cutoff

## State

`comp4020-ass2-dachi` remains structurally complete. `git status` clean, two
commits made and pushed this run (`6b72d6b`, `eee9136`). `pnpm check` green
before and after every commit. Brief re-fetched and unchanged from what's
already reflected in the repo (weights sum to 100, code stays `SLOP2558`,
`related:` edges correctly point at `crits/06-a2-retro`).

Worked through the prior hand-off's queued sensor list:

1. **Delegated (background agent):** full two-viewport screenshot sweep
   across all 32 pages, a desktop (1920×1080) `Tab`-through-everything
   keyboard walkthrough, a resize-mid-interaction check on the mobile nav
   (open at 390px, resize past 640px without reload), and the 320px reflow
   check on six representative pages. Screenshot sweep, keyboard walkthrough,
   and reflow check all came back clean (visible focus outline throughout,
   sensible tab order, no horizontal overflow anywhere).

2. **One real finding, verified by hand before fixing:** the resize check
   surfaced that nothing locks background scroll while the mobile nav menu
   is open. `.at-nav` is `position: sticky`, so the open menu stays visually
   pinned at the top while the rest of the page scrolls underneath it ---
   confirmed live with a genuine `agent-browser mouse wheel` gesture (not
   `scrollBy`, which still moves the page even under `overflow: hidden` ---
   CSS `overflow: hidden` only blocks real wheel/touch input, a lesson worth
   keeping for any future scroll-lock verification). Also had to target
   `document.documentElement`, not `body`, since `document.scrollingElement`
   is `documentElement` on this page. Fixed with a third `injectScript`
   integration in `astro.config.ts` (`nav-scroll-lock`, a MutationObserver on
   the toggle's `aria-expanded` attribute so it also reacts to the existing
   Escape handler and to the desktop-breakpoint switch) --- commit `6b72d6b`,
   documented in the project's own `CLAUDE.md` in `eee9136`.

The subagent that found this initially mischaracterised the menu as a "fixed
overlay" --- it isn't (it's an in-flow grid-row expand that pushes content
down, confirmed via a screenshot and `getComputedStyle(...).position ===
"static"`). The real bug is the sticky *nav bar* staying pinned while
content scrolls past underneath it, not a classic modal-over-content pattern
--- worth being precise about this distinction if it comes up again, since
the fix (lock scroll) turned out to be the right response either way.

`PROCESS.md` still the unedited template --- correct, 111h to cutoff (~34%
of the week elapsed) is still deep in "deepen," not "finish."

## Next action

Sensor well still not dry --- this is the second consecutive run to find and
fix a real bug after a browser-level sensor sweep. Genuinely not-yet-tried
angles for next run:

- A logic-symmetry pass has never been run on this project's own scripts
  (course-graph generation, the a11y-fixes CSS, astromotion deck config) ---
  everything found so far has come from the vendored theme's components, not
  this repo's own code. Worth checking whether the project's *own* JS/TS
  (mostly `astro.config.ts`, `scripts/pages-base.ts`, `src/course-config.ts`)
  has any asymmetry the way the crit series repeatedly found in game/
  instrument `main.ts` files.
- Dark mode: no live check of the theme toggle (persistence across reload,
  `prefers-color-scheme` respect, contrast in dark mode specifically) has
  been run yet on this project, despite `agent-browser set media dark`
  being a known-good technique from the crit series.
- If those come back clean too, 111h is still comfortably over half the
  week --- hold off on drafting `PROCESS.md` until much closer to the final
  run; two consecutive real-bug-finding runs is not yet the "sensors
  exhausted" signal that licenses drafting evidence files early.
