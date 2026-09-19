# Process overview

## What I built

Doorology (SLOP2558) is a studio course about doors — one niche object treated
as a lens for signifiers, affordances, trust, and typology, taught as crits and
clinics rather than lectures, across four assessments that build on each other
(audit → redesign → prototype → field guide).

## How I got here

The brief's real constraint wasn't producing twenty pages, it was making them
agree with each other and with the reader's mental model of a course, which is
a much easier bar to fail invisibly than to fail loudly. So the spine of my
process was deciding what "coherence" meant concretely, encoding as much of it
as I could into checkable rules, and treating everything else as a standing
question to re-ask on every pass rather than a one-off task.

The first concrete decision was to reject narrow scope: doors, not "design"
generally, chosen specifically because it's a real physical object with a
paper trail (ISO signage conventions, ADA/AS1428 clearances, a whole genre of
"door snitches" on social media) deep enough to sustain four assessments
without repeating itself. That decision became content rules in `CLAUDE.md`
rather than staying implicit — most directly the `related:` single-declaration
rule and the rule that a session's `spec:` bullet must be checkable, not
aspirational. Both rules turned out to be violated invisibly by the starter
template's own tolerant behaviour: the content graph's dedup logic
(`symmetriseRelated`) silently absorbed a redundant bidirectional edge with no
rendering symptom, caught only by reading raw frontmatter side by side rather
than the rendered pages, and fixed with a matching `spec/` test asserting the
raw edge list has no reversed pair. Session 1's `spec:` bullet turned out to be
an un-replaced generic web-dev claim inherited from the template's own example
content — invisible to `check-evidence.ts` and to every browser sensor, found
only on a fresh content read
([`8d60555`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/8d60555)).

The second class of decision was about verification method, not content. This
starter's own `pnpm check` runs its accessibility gate inside JSDOM, which
can't resolve real layout/paint — so a clean `pnpm check` was never treated as
sufficient evidence of accessible contrast; every contrast claim was
independently re-checked with a real browser (`agent-browser a11y`) and, for
`light-dark()` tokens `getComputedStyle` can't resolve to sRGB, a
canvas-fillStyle round trip computed the ratio by hand. That method caught a
real theme-specific regression: a fix for a light-mode contrast failure on
card titles was only checked against the light theme, and the same flat-hex
colour it introduced failed the dark theme's background once both themes were
deliberately swept
([`4970561`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/4970561)).
The lesson — a hand-picked colour fix is only verified in the theme that
prompted it, unless re-checked in every theme the site ships — is now a
standing rule.

What I deliberately left out: a course catalog page (the brief says building
one isn't required), a sitemap/robots.txt (not asked for), and any visual
restyling beyond the starter's look, since the brief states the artefact
criterion tests function, not aesthetics, and coherent content was the
higher-leverage use of the time budget. A late pass also checked the course's
own positioning against the brief's cited model courses (one idea, stated as
a point of view) and concluded the home page's opening line already carries
that argument, so renaming the settled course code late for a title alone
wasn't worth the churn.

Further detail — the OG/meta-tag audit, the mobile-nav scroll-lock fix, the
`Nav.astro` Escape-to-close gap, the soft-navigation re-check of every custom
`astro.config.ts` integration, and the voice-grep pass — is in this repo's own
`CLAUDE.md`, which grew run by run as each check ran clean or found a fix.
