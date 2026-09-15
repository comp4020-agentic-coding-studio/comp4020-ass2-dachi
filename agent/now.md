# Hand-off --- assignment 2 (Doorology), deepen run, 135.0h to cutoff

## State

`comp4020-ass2-dachi` (Doorology, SLOP2558) remains structurally complete.
`git status` clean, two commits made and pushed this run (`ef03259`,
`8b00337`). `pnpm check` and tests green before and after both commits.

This run invented two genuinely new sensors the prior hand-off had flagged
as not-yet-tried (dark-mode a11y, deck reduced-motion) and found one real
methodology trap plus one real bug:

1. **Dark-mode a11y sweep.** Confirmed the site's dark theme is a real
   distinct colour-token switch (`astro-theme-university/styles/tokens.css`),
   not just a CSS variable no-op, then ran `agent-browser a11y --json`
   against seven page templates (home, a session, a lecture, an assessment,
   people, policies, the deck) with `data-theme="dark"` forced. 0
   violations/0 incomplete everywhere --- clean.

2. **A real methodological trap, found trying to click the dark-mode
   toggle to set up test (1).** Serving `dist/` at the web root
   (`python3 -m http.server -d dist`) made the toggle look broken ---
   clicking did nothing, real CDP click included. Root cause: this site
   builds with `base: "/comp4020-ass2-dachi/"`, so every script `src` in
   the built HTML is an absolute path under that prefix, which 404s
   against a server rooted at `/`. This silently kills *all* client JS
   while leaving axe-core's a11y results completely unaffected (it mostly
   audits static DOM/CSS, not JS-driven behaviour) --- so the same sweep
   from (1), run against the wrongly-served build, would have looked
   identically clean and given false confidence. Fixed the serving setup
   (symlink `dist/` under a `comp4020-ass2-dachi` name one level up, serve
   the parent), re-confirmed the toggle works for real. Recorded in both
   this project's `CLAUDE.md` and global `MEMORY.md` --- this generalises
   to any future deliverable with a non-root `base:` path.

3. **Deck reduced-motion check --- a real bug, fixed.** With serving fixed,
   forced `prefers-reduced-motion: reduce` and polled every element's
   computed `animationDuration`/`transitionDuration` on the week-1 deck.
   The nav-arrow bounce animation and eight slide/fragment transitions were
   still fully live. Cause: `src/decks/theme.css` only imports
   `astro-theme-university/styles/deck.css` (decks deliberately skip the
   site's `base.css`, per that file's own doc comment), so they also miss
   `base.css`'s blanket reduced-motion override --- and the underlying
   deck framework (astromotion/reveal.js) ships with no reduced-motion
   handling of its own anywhere. Fixed by adding the same zero-duration
   `!important` technique, scoped to `.reveal *`, to `theme.css` (commit
   `ef03259`). Rebuilt, re-served correctly, re-confirmed live: only two
   trivial 0.1s whiteboard-toolbar-swatch transitions remain (outside
   `.reveal`, a colour-picker hover state, not the kind of large-scale
   motion the media feature targets) --- left alone deliberately.

`PROCESS.md` still the unedited template --- correct, 135h to cutoff is
~80% of the week still on the clock.

## Next action

Two real, verified findings landed this run (a fixed bug, a fixed
methodology gap), so the sensor well is not dry — don't read this as
"time to stop inventing checks." Genuinely not-yet-tried angles for the
next run:

- The deck's reduced-motion fix was only checked on the one existing deck
  (week 1). If a future run adds a second deck, re-run the same live
  animation-duration poll against it too rather than assuming the CSS fix
  (scoped to `.reveal`, not a per-deck class) automatically covers it ---
  it should, but hasn't been confirmed against a second instance.
- The dark-mode a11y sweep and the original light-mode sweep were both run
  against only 7 of 32 built pages (one per template). Same low-priority
  backlog item as before: the untouched pages are the remaining 8 session
  and 4 lecture `[slug]` pages, cheap to extend if the well runs dry again.
- Search (pagefind) and any other client-JS-driven interaction haven't
  been live-tested at all yet, and now that the base-path serving trap is
  known and fixed, a real live test of search actually returning results
  is a cheap, genuinely new sensor worth trying next.
- Otherwise, hold off on new speculative sensor invention only once a
  couple of these have also come back clean or fixed --- 135h out is still
  firmly inside "deepen," not "finish."
