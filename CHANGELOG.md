# Changelog — hermanchan.ai

Session history, newest first. Architecture, rules, and conventions live in
[`CLAUDE.md`](CLAUDE.md); the parked punch list lives in [`BUILD_NOTES.md`](BUILD_NOTES.md).
This file is the record of what shipped and why — read the newest 1–3 entries to resume.

## Entries (newest first)

<!-- session-closeout: insert new entries directly below this line -->

### What just changed (2026-07-30 — project 7 + posts 008–016)

**Shipped** — commit `890bf60`, pushed to `main`, Netlify auto-deployed and verified in a
live browser (landing shows `all 16 posts`, header `UPDATED 2026-07-30`, RSS carries 16
`<item>` elements, the three new URLs return 200).

- **New project page:** `src/content/projects/multi-model-build-chain.md` — order 7,
  "In production", `seriesPosts: true`. The build process itself: a planning model, a
  building model, and a cross-vendor reviewing model, with findings adjudicated rather than
  auto-applied and isolated working copies for parallel sessions.
- **Nine new posts,** `pubDate` 2026-07-29 → 2026-08-22 at ~3-day spacing:
  008 `three-models-three-jobs` · 009 `the-reviewer-cant-be-the-author` ·
  010 `a-test-that-was-never-red` · 011 `work-that-wasnt-its-own` ·
  012 `two-copies-of-one-behavior` · 013 `the-failure-a-human-cant-miss` ·
  014 `docker-without-admin` · 015 `last-weeks-code` · 016 `deployed-is-not-redeployable`.
  008–011 carry `project: multi-model-build-chain`; 012–013 carry `project: skills-suite`;
  014–016 are archive-only.
- **Maintenance forced by the above:** landing hero "Four production tools … two more in
  build" → "Six production tools … another in build"; `permit-pipeline` blurb "eight
  Sunbelt metros" → "nine"; the `CLAUDE.md` valid-`project:`-slug list refreshed (it still
  listed a nonexistent `agent-suite` and omitted four real ones).

**Editorial decision (Herman's question was "new project, or individual posts?").** Both,
weighted to posts. The projects section reads as *tools shipped to teammates* — every card
has a user other than Herman — so a catch-all "LLM setup" card would have been the only one
without one, and a category rather than a system. Only the multi-model build chain cleared
that bar. Everything else from the week (red-test-first discipline, the concurrent-session
git incident, Mac/Windows twin drift, the Excel single-instance watchdog, containers over
empty mounts, cache-stale deploys, deployed-vs-redeployable) is one-incident/one-lesson
material, which is exactly the existing post format. The arc: 001–007 were "how I make an
LLM *pipeline* trustworthy"; 008+ is "how I make an agent that *builds* trustworthy."

**Verification.** `npm run build` green (27 pages). Bodies word-counted against the repo's
hard 200–400 ceiling: 302–327 words, all nine inside. Redaction checklist applied — no metro
names, deal names, thresholds or volumes in the posts; the one eval-adjacent number is a
story number, not a score. Post-deploy check was a real browser render, not curl alone.

**Paid-API spend:** $0 (local build; Netlify auto-deploy on push).

**Caveats (inherent, not loose ends).** The site has **no future-date filter** — listings and
RSS gate on `draft` only, so all nine posts including the 2026-08-22 one are publicly visible
*today*. The staggered dates change the byline, not the visibility. Real scheduled publishing
would need a pubDate filter plus a scheduled rebuild; not built, deliberately.

**Loose ends: ACTION — you:** (1) The `underwriting-agent` card still reads "Coming soon /
in build" though the agent has been live since 2026-07-10, and its page describes a
dashboard-row-flip trigger that the real Gmail-label watcher replaced — an honest fix is a
body rewrite, not a status flip, so it needs your call on how much of the watcher to
describe. (2) `BUILD_NOTES.md` still has **manager sign-off** unticked for publishing
work-derived material; this session tripled the published surface, so it's worth closing.
**Also open, from the concurrent migration session** (commits `564f32b`, `689f4f1`): rename
`C:\Users\herma\Claude AI Local\AI and SFR website` → `_STALE_AI and SFR website` on Windows
— rename, never delete — until then the two clones can silently diverge.
