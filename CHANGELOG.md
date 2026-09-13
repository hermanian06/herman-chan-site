# Changelog — hermanchan.ai

Session history, newest first. Architecture, rules, and conventions live in
[`CLAUDE.md`](CLAUDE.md); the parked punch list lives in [`BUILD_NOTES.md`](BUILD_NOTES.md).
This file is the record of what shipped and why — read the newest 1–3 entries to resume.

## Entries (newest first)

<!-- session-closeout: insert new entries directly below this line -->

### What just changed (2026-09-12/13 — /demo/rent-database/, the rent database as a public page)

**Shipped: `/demo/rent-database/` is live at https://hermanchan.ai/demo/rent-database/** — a
six-section public page over the bfr-rent-tracker scrape. §01 how it's built (11 platform
adapters ahead of a 29% LLM tail, batched overnight) · §02 coverage by metro · §03 vintage /
unit mix / product · §04 concessions and net-effective rent · §05 the last thirty days · §06 a
20-per-metro sample of community names. Commits `c6f3114` (page) and `02d6914` (breakpoint
fix); project card at `order: 1`, the seven non-demo projects shifted down one so the sort key
stays whole integers.

**Every number is read at build time** from `src/data/rents/rent-database.json`, which
bfr-rent-tracker's `tools/export_public_stats.py` (`4211bc7`) regenerates from the live
database. Nothing on the page is typed by hand, so it cannot claim a figure the database does
not hold. Refresh is one command; it is not wired to anything (ledger #1285 carries the
decision).

**Herman's calls, 2026-09-12:** aggregates only but with ~20 named communities per metro so a
reader can see what is in the database · FDE audience first, capital second · a page inside
this repo rather than a standalone site · baked JSON over a live endpoint. He authorised the
push/deploy explicitly.

**The honesty constraints are the design, and each one is a way the page could have overstated
itself.** Tracked and live-plans are separate columns — DFW reads 2,702 tracked against 466
live plans because it is mid-first-pass. Medians over fewer than 400 live plans are greyed and
labelled provisional. There is no rent index: fleet-wide collection only reached full coverage
in August, so §05 reports direction of travel over a measured 27-day average gap and says so.
Vintage keeps its Unknown bar (1,099 communities, almost all BFR — leasing pages for
delivering SFR communities do not state a year built) rather than dropping it. No rents are
shown against any named community.

**Two defects found and fixed, both by measuring rather than looking:**
- Mobile: a bare `1fr` grid track is `minmax(auto, 1fr)`, so the tables set a min-content floor
  and the whole page scrolled sideways at 375px (`docScrollW 484` vs `clientWidth 375`).
  `minmax(0, 1fr)` restored `375 / 375`.
- 1024px: the paired §03 columns left the unit-type table `clientW 440` against `scrollW 464` —
  it scrolled, but a 24px clip reads as a broken table. Stacking moved from 900px to 1080px;
  after, all four `.tablewrap`s measure `927 / 927, clipped: false`, 375px unchanged.

**Verification.** `npm run build` clean at every step (30 pages). The deployed HTML was checked
directly — 91,306 bytes, all six headings, current figures, real metro names, and the landing
page links the card once. The full-page visual pass could NOT run on 2026-09-12: the Browser
pane was hidden, and a hidden pane returns the previous paint instead of erroring, so scrolled
screenshots came back blank or stale. It ran on 2026-09-13 once the pane reopened, end to end,
and that pass is what found the 1024px clip — the geometry check had reported it as a working
scroll container. Recorded as memory shape 30j.

**Paid-API spend: $0** — Supabase reads only, no model calls.

**Loose ends: ACTION — you:** push `02d6914` to ship the 1024px fix (`git -C ~/code/herman-chan-site push origin HEAD`) — this repo deploys on push, so it is your call, and the live page carries the clip until then. **ACTION — you:** the site's own redaction checklist asks for two-line manager sign-off before work-derived material goes public; the page is aggregates plus ~440 sampled names with no Haven branding anywhere, but the gate is yours.

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
