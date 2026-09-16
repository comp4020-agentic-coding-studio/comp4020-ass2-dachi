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
  policies, the week-1 deck) came back 0 violations/0 incomplete; a follow-up
  run the same day swept all 12 session and 6 lecture `[slug]` pages
  individually (a superset of the one-per-template pass), also 0/0 — real
  confirmation, not a restatement of the build's own jsdom-based pass.
- Live-tested pagefind search (2026-09-15): a real query returns correctly
  excerpted results linking to the right page, a nonsense query shows "No
  results," clearing to empty hides all status — all confirmed with
  `agent-browser` against a served `dist/` build. Note for future reference,
  not something reproduced as a live bug: `SearchDialog.astro`'s dynamic
  `import()` of the pagefind index sets a permanent `loadFailed` flag on any
  failure, with no retry and no console diagnostic — a fragile failure mode
  in the vendored component, worth knowing about if search ever looks
  silently broken with nothing in the console to explain it.
- This site builds with `base: "/comp4020-ass2-dachi/"` (a GitHub Pages
  project site), so every asset/script reference in the built HTML is an
  absolute path under that prefix. Serving `dist/` at the web root (e.g.
  `python3 -m http.server -d dist`) 404s every script — axe-core a11y
  checks still come back clean because they don't depend on client JS, but
  any check of actual page behaviour (the dark-mode toggle, search) will
  silently no-op and look like a bug that isn't one. Serve `dist/` from a
  directory one level up with a symlink named `comp4020-ass2-dachi` pointing
  at it, so requests resolve at the real base path, before trusting any
  live JS-behaviour check against a local build.
- The deck's own `src/decks/theme.css` only imports
  `astro-theme-university/styles/deck.css` — deck pages don't load the
  site's `base.css`, so they miss its blanket `prefers-reduced-motion`
  override, and reveal.js's bundled CSS (the nav-arrow bounce, fragment/
  slide transitions) ships with no reduced-motion handling of its own.
  Confirmed live (forced `reduced-motion: reduce`, polled every element's
  computed `animationDuration`/`transitionDuration`) and fixed by adding
  the same zero-duration `!important` override scoped to `.reveal *` in
  `theme.css` (commit `ef03259`).
- `astro-theme-university`'s `Nav.astro` wires its mobile menu toggle to
  clicks only — no `Escape` handler — while its sibling `SearchDialog`
  already closes on `Escape`. Not a WCAG failure (the toggle button itself
  still closes the menu on a second Enter/Space, so there's no keyboard
  trap), but a real, verified asymmetry between two components that should
  agree on keyboard convention. Confirmed live with `agent-browser`:
  `Tab` to the toggle, `Enter` to open (`aria-expanded="true"`), `Escape`
  left it open before the fix, closed it after. `Nav.astro` lives in
  `node_modules` (a vendored dependency, not a file this repo owns), so
  the fix is a small Astro integration in `astro.config.ts` using
  `injectScript("page", ...)` to add the missing document-level listener,
  rather than a node_modules edit that `pnpm install` would discard
  (commit `be03362`).
- Dark mode fully live-tested (2026-09-17): the footer toggle flips
  `data-theme` and persists to `localStorage`; a fresh page load with no
  stored preference correctly follows `prefers-color-scheme`; a stored
  preference correctly overrides the system scheme on reload; a real
  `agent-browser a11y --json` sweep in dark mode across four distinct page
  templates (home, a session, policies, the deck) came back 0 violations/0
  incomplete. Also checked the project's own `.at-footer-theme-toggle:focus-
  visible` fix (`src/styles/a11y-fixes.css`) in both themes by hand: axe/
  `getComputedStyle` can't resolve an `oklch()`/`light-dark()` colour to
  sRGB for a contrast calculation (both returned the un-evaluated
  color-function string, not rgb), so the outline colour vs. background was
  each resolved to sRGB via a 1×1 canvas `fillStyle`/`getImageData` round
  trip, then checked against the WCAG 3:1 non-text-contrast floor by hand —
  passes in both themes (~5.8:1 dark, ~3.5:1 light). A logic-symmetry pass
  over this repo's own scripts (`course-config.ts`, `lib/dates.ts`,
  `scripts/pages-base.ts`, `scripts/check-evidence.ts`, `content.config.ts`,
  `site-config.ts`, `astro.config.ts`) — the first time this project's own
  code, rather than the vendored theme, was the target — found no
  asymmetry; everything so far has come from the theme's vendored
  components (Nav, the mobile menu), not this repo's code.
- A full two-viewport screenshot sweep (all 32 pages), a desktop keyboard
  walkthrough, and the 320px reflow check all came back clean (2026-09-16).
  The one real finding, from the resize-mid-interaction check on the mobile
  nav: `.at-nav` is `position: sticky`, so the open mobile menu stays pinned
  at the top while the page scrolls underneath it — nothing locked
  background scroll. Confirmed live against a real mouse-wheel gesture
  (`agent-browser mouse wheel`, not `scrollBy` — CSS `overflow: hidden`
  blocks real wheel/touch input but not a scripted `scrollTo`/`scrollBy`,
  so that's the wrong sensor to prove a lock actually works). Also confirmed
  `document.scrollingElement === documentElement` on this page, so the lock
  has to target `documentElement`, not `body`. Fixed with a third
  `injectScript("page", ...)` integration (`nav-scroll-lock`) using a
  MutationObserver on the toggle's `aria-expanded` attribute rather than a
  click listener, so it also reacts to the Escape handler above and to the
  desktop breakpoint switch (which leaves `aria-expanded="true"` untouched
  even once the toggle itself becomes `display: none` — confirmed by the
  resize check, so the lock logic checks toggle visibility too, not just
  the attribute) (commit `6b72d6b`).

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
