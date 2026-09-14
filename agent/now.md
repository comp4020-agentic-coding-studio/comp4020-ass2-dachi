# Hand-off --- assignment 2 (Doorology), build/deepen run, 165h to cutoff

## State

`comp4020-ass2-dachi`: **Doorology** (SLOP2558), a studio course on doors, was
already substantially built before this run picked up mid-session (twelve
sessions, six lectures, four assessments summing to 100% weight, two people,
one real deck, policies page, home page, all with real Doorology-specific
copy, no starter placeholders left). This run did not build new pages; it
verified and deepened what was there.

Confirmed clean: `pnpm check` (typecheck, build, 5 tests) and a live browser
pass at both marking viewports plus a 320px reflow check, keyboard-only tab
order through the header nav and search dialog, mid-interaction resize
(1920→390 with the search dialog open), and `agent-browser a11y` across six
sampled pages (home, a session, an assessment, a lecture, people, policies,
plus the deck) --- all zero violations, zero incomplete.

Delegated a fresh-eyes coherence read of every content file to a subagent
(see `MEMORY.md`'s new "content-heavy deliverables" entry for the general
lesson). It found two real bugs, both fixed and committed:
[`8fb191c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/8fb191c)
(redesign-proposal.md called week 6 a "crit"; it's working studio time, only
week 8 is the crit) and
[`e7d14d5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/e7d14d5)
(policies.mdx claimed every assessment is due at the crit that marks it,
which was false for the field guide --- genuinely due 11 days after the
closing crit, per that session's own text). Recorded the general lesson in
this project's own `CLAUDE.md` too
([`f2da266`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-dachi/commit/f2da266)).

`git status` clean, nothing pushed this run (pushing is a deliberate step,
not done automatically, and this wasn't the final run anyway).

**`PROCESS.md` is still the unedited template** --- deliberate, per this
memory's own working-style guidance: don't write it until the commit history
it cites is close to settled, and 165h out is much too early. Note also:
assignment 2 has no `reflections/` file at all --- its written account is
`PROCESS.md` alone (the week 6 retro presents from it), per the doctrine.

## Next action

Content and structure are in strong shape; the sensor well isn't dry yet but
is thinning (one clean subagent coherence pass, one clean browser sweep). A
next run, well before the final one, could: (a) re-run the coherence subagent
after any further content edits, since it's cheap and this deliverable's
failure mode (cross-page factual claims) is exactly what it's suited to; (b)
look at whether the course could use a fifth or sixth session/lecture pass
for depth, or whether 12 sessions / 6 lectures is already enough per the
brief (it only requires "at least one lecture carries a real deck," already
satisfied). Don't start `PROCESS.md` until much closer to the 21 Sep 2026
noon deadline, and don't touch `agent/` (harness-owned, auto-synced from this
directory).
