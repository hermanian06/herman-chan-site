# Changelog — hermanchan.ai

Session history, newest first. Architecture, rules, and conventions live in
[`CLAUDE.md`](CLAUDE.md); the parked punch list lives in [`BUILD_NOTES.md`](BUILD_NOTES.md).
This file is the record of what shipped and why — read the newest 1–3 entries to resume.

## Entries (newest first)

<!-- session-closeout: insert new entries directly below this line -->

### What just changed (2026-09-18 — four-tab copy published; session closeout)

**Shipped.** Source `c55fc8faa9785dae37fba964e093e5f5999945dc` rewrites Intro around
Why / How / What changed, including Herman’s approximate four-hour preparation to
thirty-minute human-review account. Underwriting has six points per audience; Supply and
Rent have four each. Draft copy and obsolete planning claims are removed, with rent stats
and existing interactive components preserved. Publication docs `01d2aa4` are also pushed.

**Verification.** The build passed with 51 pages; 47 unrelated HTML pages were unchanged,
and all 32 protected files retained their hashes. Independent committed-diff review was
accepted. All four public URLs returned HTTP 200 with full main content matching reviewed
source. Evidence and final handoff:
`/Users/hermanchan/Documents/Codex/four-tabs-copy-review-20260918/VERIFICATION.md` and
`/Users/hermanchan/Documents/Codex/four-tabs-copy-review-20260918/CLOSEOUT.md`.

**Closeout sweep.** The website ledger contained 0 open/triaged rows, 0 snoozed rows and
0 spool files; 0 rows closed, deferred or written (`closeout-ledger.json` in the receipt
folder). Website main/origin/main and shared claude-skills main were each 0 ahead / 0 behind
after fetch. This builder’s worktree was clean before the documentation update. The other
task’s chat commit, shared skills scratch work and existing worktrees were preserved;
no concurrent changes were merged or published. No deployment queue, current-state file,
session-owned unpublished product changes, unfinished agents, unanswered decisions or
future watch triggers required action. No deal-skill rules changed, so a whole-skills test
sweep was inapplicable to this website-only task.

Memory index: 16,236 bytes / 89 lines, 1,274-byte headroom. All 61 topic files: 0 OVER,
0 NEAR, 24 WARN and 37 OK. No consolidation or new memory entry was needed. No preview
servers were started. The temporary dependency symlink was removed without its target;
raw review/debug material was relocated to `.tmp/`, and durable proof artifacts remain.

**Paid external API spend: $0**, excluding account subscription usage. The failed Claude
CLI attempt used no tokens; the completed review came from a separate fresh agent.
Verification covered website content and delivery, with no interactive submission,
underlying-system runtime audit or fresh data/benchmark claim. This closeout changes only
documentation and uses `[skip netlify]`; application source remains identical to `c55fc8f`.

**Loose ends: none.**



## 2026-09-18 — Shorter Intro and project explanations (published at `c55fc8f`)

Intro now uses Why I built it / How it works / What changed, with the Input / Process /
Output flow inside How. The underwriting outcome uses Herman’s approved account: about four
hours of manual preparation becoming about thirty minutes of human review. Obsolete static
Intro statistics are removed; the rent statistics still come from the existing JSON, with
the required “live floor plans” label.

Underwriting has six ordered points per professional audience. Supply and Rent each have
four, retaining source limitations, human review and the rent comparison rules. The shared
audience component gives all three pages consistent headings and numbered lists. Supply and
Rent draft markers, the obsolete Supply chat planning note, and overbroad hero claims are
removed. Existing sample tabs, downloads, upload, chat, MCP endpoint/tool table, dashboard,
Blog and About are preserved.

Validation: `npm run build` passed with 51 pages. Generated HTML was read back; only the four
target pages differ from the baseline build, with all 47 other HTML pages byte-identical.
Detailed build, content and preservation receipts are in
`/Users/hermanchan/Documents/Codex/four-tabs-copy-review-20260918/`.
A separate read-only AI review found no actionable issues, and the builder accepted that
result. The coordinating task pushed exact source commit
`c55fc8faa9785dae37fba964e093e5f5999945dc` to `main`. All four public URLs returned HTTP 200;
their complete main content matched the reviewed source. The comparison used a UTC build
to match the hosting environment’s existing rent-dashboard date formatting; product source
did not change. Live proof:
`/Users/hermanchan/Documents/Codex/four-tabs-copy-review-20260918/live-verification.json`.

Concurrent `src/components/chat/AskTheData.astro` work in the original Mac checkout was
preserved and excluded from the copy publication. Publication receipts retain the exact
Git state observed during the push. The builder removed only its temporary dependency
symlink, preserving its target. This follow-up changes documentation only and uses
`[skip netlify]`.


### What just changed (2026-09-16 — website copy published; session closeout)

**Shipped.** Underwriting copy `9d6bcc8c2830cb45c5dc84203b94c0a8621c1f92` gives each
professional audience eight matching chain stages and paragraph headings, preserves the
real-estate meaning, and removes the draft marker. Homepage copy
`2dea4f9bd435589d8138c20a9f628d4095667d80`, published with the concurrent Blog release,
clarifies the introduction, human workflow/verification role, coverage and source labels,
and leasing-platform extraction. Linked project titles replace “Open the tab”. Herman
explicitly retained “live floor plans” and rejected an export date or new CTA.

About is published at `ff0aac7ee43e8b7519d188d3a608e6fe3adcc09e`: the approved headline
and eight paragraphs include 2011–2020 ownership, the late-February-2026 AI start, master's
degree and father/running/HYROX closing line. Obsolete claims and the draft marker are gone.
The concurrent Blog closeout documentation was preserved during the About rebase.

**Verification.** Exact rendered-copy checks, independent committed-diff review and parent
local/live browser checks passed. The About build passed with 51 pages; its homepage source
was unchanged and all 50 other generated pages were byte-identical to the base build.
Publication receipts and detailed proof:
`/Users/hermanchan/Documents/Codex/underwriting-page-approved-copy-receipt-20260915.md` and
`/Users/hermanchan/Documents/Codex/home-about-publication-receipt-20260916.md`.

**Closeout sweep.** The read-only ledger check found 0 open/triaged and 0 snoozed rows for
`herman-chan-site`: 0 closed in-session and 0 deferred; no rows changed. `portfolio-demo`
is a separate backend project. Before this documentation update, site HEAD/main/remote
were aligned and the working tree had no changes or untracked files; there is no
`DEPLOY_QUEUE.md` or `CURRENT_STATE.md`. Task agents and publication work are complete,
with no unanswered decision. Shared claude-skills main was 0 ahead/0 behind after fetch;
its concurrent modified files/review artifacts and the recent CFO/e3-json-fill work were
left untouched. A claude-skills test sweep was outside this website-only session.

Memory index: 17,033 bytes / 89 lines, 477 bytes headroom. All 61 topic files: 0 OVER,
0 NEAR, 24 WARN and 37 OK; consolidation was not triggered and no new memory entry was
needed. The About preview server was stopped. Receipts and `/private/tmp` proof logs are
retained; existing worktrees were preserved without destructive cleanup.

**Paid external API spend: $0**, excluding ChatGPT account usage. No production database
writes or underlying-system runtime audit occurred. This closeout changes documentation
only; application source/configuration stays identical to published `ff0aac7`. Its commit
uses `[skip netlify]` to avoid a new deployment.

**Loose ends: none.**

## 2026-09-16 — Approved About bio (published at `ff0aac7`)

Replaced the draft Now/Before/This site bullets with Herman's approved headline and eight
bio paragraphs. Removed the obsolete lede and draft marker; retained the existing grid,
typography, aside facts and contact links. The aside's operating model now matches the
approved homepage wording.

Validation: `npm run build` passed (51 pages); generated HTML matches all eight paragraphs
and the headline exactly after whitespace normalization. The homepage source is unchanged,
and all 50 other generated HTML pages are byte-identical to the base build. Independent
committed-diff review and local/live browser verification passed. Publication receipt:
`/Users/hermanchan/Documents/Codex/home-about-publication-receipt-20260916.md`.

### What just changed (2026-09-16 — twenty-four Blog stories published; session closeout)

**Shipped.** Herman approved publication with “make it live.” Commit `4cab4fe97aea386ec05e52cf29b142e4430316df` is live at https://hermanchan.ai/blog/: 24 full decision stories across six topics, plus seven archive articles, for 31 articles in total. Fourteen new URLs and five rewrites complete the remaining nineteen outlines; all 17 earlier article URLs, the approved first five bodies and seven archive bodies are preserved. Each story uses one Markdown source for its inline and permanent-page versions. Concurrent approved homepage changes were integrated without changing the reviewed Blog content.

**Verification.** The production build passed with 51 pages. HTML checks passed for titles, dates, word limits, every local link, inline/permanent agreement and source preservation; publication scan: zero findings. Desktop, phone and keyboard review passed. A separate read-only AI review found no actionable issues. After publication, HTTP 200 and an exact comparison of the complete live Blog body and three permanent article bodies matched the reviewed build; an in-app browser confirmed the live page. Receipts: `/Users/hermanchan/Documents/Codex/blog-complete-review/VERIFICATION.md`, `INDEPENDENT_REVIEW.md` and `deployment.json` in that directory.

The stories distinguish dated incidents, inspected implementation and executed local proof. Parser, cadence, classifier, storage, estimate, PKCE, market-client and mocked Excel checks support their stated mechanisms. They do not establish current production health, model accuracy, user adoption, full OAuth security or a completed engine migration. The website deployment was verified; underlying production systems were not exercised for the writing pass.

**Closeout sweep.** No website-owned ledger rows were found: 0 closed in-session, 0 deferred, 0 open and 0 snoozed. Existing backend watches belong to their own project and were not changed. Other sessions' recent branches and worktrees were left intact. Memory index: 16,993 bytes / 89 lines, with 517 bytes of headroom; 61 topic files: 0 OVER, 0 NEAR, 24 WARN and 37 OK. The consolidation trigger was not reached. Temporary synthetic fixtures and the draft generator are retained under the review directory's `.tmp/`; proof scripts and receipts remain available.

**Paid external API spend: $0**, excluding ChatGPT account usage. This closeout changes documentation only; application source and configuration remain identical to the published `4cab4fe`. Its commit carries `[skip netlify]` to avoid a redundant build.

**Loose ends: none.**

## 2026-09-15 — Complete the twenty-four Blog stories (local)

Expanded the remaining nineteen accepted entries into 200–400-word decision stories, using five existing article URLs and fourteen new Markdown files. All twenty-four stories now render in place on the Blog tab and at permanent post URLs. The approved first five and seven archive articles are unchanged. No other tab implementation changed.

The writing uses current source and local evidence: parser and cadence checks, synthetic classifier cases, storage fallback and budget-stop stubs, source grouping, estimate labels, PKCE checks and a localhost market-service fixture. Historical incidents remain dated accounts; source inspection, local checks and unverified live behavior are distinguished. The Blog count hides the outlines count when none remain.

Validation: production build; full-post, title, URL, metadata, word-count and first-five/archive preservation checks; local desktop/mobile review. Final receipts and independent review are recorded in `/Users/hermanchan/Documents/Codex/blog-complete-review/VERIFICATION.md`. This entry records local work, not a deployment.


## Blog: first five full decision stories (2026-09-15 — local preview, not deployed)

The first five Blog entries now expand into complete stories: reusable skills, separate AI
planning/building/review, a failing test before a fix, separate Git worktrees, and column
mapping versus numeric extraction. Four existing article URLs and publication dates are
preserved with September 15 update dates; one new article is dated September 15. A shared
renderer uses the same Markdown on the Blog and each permanent article page. The remaining
nineteen outlines and all earlier article links remain available across six topics.

Stories include a role diagram, an archived formula-review example tied to fix `235a1e5`, a
clearly labeled synthetic red/green demonstration, a worktree diagram, and synthetic rent
rows with a shortened mapping. They distinguish source-level/local evidence from live Excel
or model execution and state the remaining limits. No current scale, accuracy or savings
metrics are introduced. Scoped story styles keep figures, code and tables readable without
new dependencies. Other project tabs are unchanged.

`npm run build` passed (37 pages). Independent generated-HTML checks verify five full bodies,
nineteen three-bullet outlines, all twenty-four accepted titles, all seventeen published
article routes, preserved dates, 200–400 prose words per story and identical inline/permalink
content. Desktop/mobile browser QA and committed-diff review are recorded by the parent task.


## Blog: 24 short build notes (2026-09-15 — local implementation, not deployed)

The Blog tab now has six topics with four notes each: Building with AI, Underwriting agent,
Supply database, Rent database, Evals & reliability, and MCP & integration. Each title opens
three short bullets inline; a contents navigation keeps the full set browsable on one tab.
Existing full articles retain their URLs and dates, with original-post links in matching notes
and every remaining article (including the site introduction) listed in the archive section.
Short-note counts and published-article counts are separate. The draft-copy marker is removed
from Blog; other tabs, shared styles and article bodies are unchanged.

Content preserves the incomplete engine migration, historical desktop incident, tool-coverage
limits and differences between observations, estimates and validation. No new current scale,
accuracy, cost or adoption metrics are claimed. `npm run build` passed (36 pages). Generated
HTML checks passed: six groups, 24 exact accepted titles, 72 bullets, all 16 published URLs
linked exactly once, valid local routes and unique IDs. Browser QA and independent committed-diff
review follow in the parent task.


## Sample set re-restaged (2026-09-14, night — reconciliation PASS, sanity checks, T-3 series, duplicates)

`53d890c` on main, Netlify live: the same 14 fragments and downloads, re-published from the refooted sample
materials and one new pipeline run. The rent-roll audit trail reads `Reconciliation: PASS — units off by 0,
market rent off by $0` (it read MISMATCH by exactly 5% before — a stale totals row in the perturbed roll);
the T-12 tabs carry four statement sanity checks and the trailing T-3 series; six duplicate rows are
disclosed. Verified live by curl (public page) and the pack download (124 KB). No page code changed.


### What just changed (2026-09-14 — six-tab redesign LIVE; Intro + Underwriting tabs in Herman's words; the sample is a real deal, perturbed)

**Live.** `main` fast-forwarded to `redesign/six-tabs` and pushed (`8ed506b..8ecfa75`), Netlify
deployed; curl of hermanchan.ai, /underwriting-agent/ and /about/ returns the new pages. Tabs 3–6
still show the "Draft copy" marker in public — Herman's call to push.

**Intro** rewritten from Herman's edits: team framing, six months, the T-12 wording, a person as the
final QC, "4 h → 15 + 30 min per deal, 4–6 deals a week", supply "Out" = a 10-mile radius search, a
"200+ public-record sources" stat (258 registry rows, 230 on cron), rent stats floored from the JSON
(16,000+ / 47,000+). RSS, the colophon and the CC BY line removed site-wide; Source Serif stays.

**Underwriting tab:** the real-estate column is Herman's seven bullets (property-tax and audit-trail
lines written to spec, 192 manifest fields); the sample section carries the four workbooks and a
jump link to the upload form; consent box and every "deleted within the hour" line removed; the
form says uploads are kept for review.

**The sample deal** (built in Portfolio Demo, see its CHANGELOG 2026-09-14): the showcase asset's
statements perturbed by Herman's rule, at 2151 E Southern Ave, Mesa (illustrative), market tabs
pulled for that address, name/seller/brokerage withheld, pricing illustrative. Published through
`publish_to_site.py --allow-real`; the server fixture swapped and deployed (`05f50e3a`); a live
sample run on production returns "Southern Avenue Sample". A verification upload on production
was kept on the new Railway volume (`/data/uploads/<run_id>`), proven from the deploy log.

**Paid-API spend:** $0.62 (local live run) + one production verification upload (8 model calls,
under $1) on the demo's own key.

### What just changed (2026-09-13 — six-tab redesign scaffolded, branch `redesign/six-tabs`, NOT pushed)

**Herman's brief:** re-arrange the site into six tabs — Intro · Underwriting Agent · Supply
Database · Rent Database · Blog · About — with ~30-second bullet copy per section that he will
rewrite, one dedicated session per tab. This session built the skeleton only; the old tabs are
removed from the nav but their files are kept.

- **Nav** (`src/components/Header.astro`): six tabs replace Index / Projects / Writing / RSS.
  RSS stays in the footer. Mobile: the bar wraps to three lines at 375px, no horizontal scroll.
- **Intro** (`/`): hero + three `ProjectBrief` blocks (what / why / result bullets, an in → runs →
  out flow strip as the first infographic pass, and a stat row). Rent numbers read from
  `src/data/rents/rent-database.json` at build time. Old landing moved to `/legacy/`.
- **Underwriting Agent**: two-audience bullets, the baked sample previews (same `OutputTabs`
  + HTML as `/demo/underwriting/`), ONE download (deal-summary workbook), and the `UploadForm`
  with a second, prefixed `OutputTabs` for the run. `UploadForm.fillPanels` now fills only
  panels inside `[data-uf-results]` when that container exists, so a live run cannot overwrite
  the sample; `OutputTabs` gained an optional `prefix` prop so two instances have unique ids.
  Both changes are no-ops on the two existing demo pages.
- **Supply Database**: two-audience bullets, an address / radius / product / stage / window
  search form (disabled — needs a public read endpoint; today only the OAuth MCP exists), and
  the MCP section (endpoint, connect steps, 11-tool table).
- **Rent Database**: two-audience bullets, then the dashboard. The body of
  `/demo/rent-database/` was extracted verbatim into `src/components/rents/RentDashboard.astro`
  (top padding moved to the page head); both routes render it from the same JSON.
- **Blog**: `src/data/blog-outline.ts` condenses all 16 posts to 3–4 bullets each, grouped
  underwriting-agent (3) · supply-database (8) · rent-database (0, with candidate topics) ·
  how-i-build (4 process posts — my call, fold in if unwanted). `what-this-site-is` moved to
  About. Any post not in the outline renders under "Unfiled".
- **About**: bio bullets from the 2026-05-29 résumé + the old intro post. No phone/email, no
  job-search signal. Location written as "Bay Area" because the résumé says San Jose and the
  meta strip says San Mateo.
- **Shared components:** `src/components/tabs/{TabHead,TwoAudiences,ProjectBrief}.astro`.

**Verification.** `npm run build` clean, 36 pages. Dev server driven in the Browser pane: all
six tabs render at the top of page; DOM checks — no duplicate element ids on the underwriting
tab, 13 run panels scoped, sample panels carry content; rent tab 6 stats / 4 tables / 20 sample
rows; blog groups 3/8/0/4 with no unfiled posts; `/legacy/` and `/demo/rent-database/` still
render; page width 1009/1009 desktop and 375/375 mobile (no sideways scroll). Scrolled
screenshots came back blank (the hidden-pane paint issue recorded 2026-09-13), so below-the-fold
proof is DOM-level, not visual. The one console error is the upload form probing
`localhost:8000` on dev — expected.

**Paid-API spend: $0.**

**Loose ends: ACTION — you:** (1) merge/push is yours — it deploys draft copy. (2) Tab-2 session:
uploads without the email step means flipping the Portfolio Demo API's `access_mode` (it
answers `email` today); the form follows `/api/meta`. (3) Tab-3 session: decide whether the
address search gets a public read endpoint or stays a documented MCP. (4) `mcp_server.py` also
carries a `debt_maturities` tool from the retired Capital Stack work; the table lists the 11
in `CLAUDE.md`, not it.

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
