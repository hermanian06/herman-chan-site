# Herman Chan personal site — project-level CLAUDE.md

Inherits from global `CLAUDE.md`. Read this before editing anything in this repo.

**Session history → [`CHANGELOG.md`](CHANGELOG.md)** (newest first — read the top 1–3 to
resume; release receipts, live-proof files and SHAs live there, not here). This file carries
rules and architecture only; closeout never appends entries here.

---

## Publishing = a production deploy (Herman's go)

- **A push to `main` IS a Netlify production deploy** (`netlify.toml`: `npm run build` →
  `dist/`). Merging to or pushing `main` needs Herman's explicit go every time (claude-skills
  `_shared/AUTHORITY.md`, row `herman-chan-site`). This repo has no post-commit auto-push, and the
  fleet "finish a bug-fix branch" carve-out does not apply here.
- Work in a fresh Mac worktree off fetched `origin/main`
  (`git worktree add ~/code/worktrees/<slug>-<task> -b <branch> origin/main`), commit there, and
  hand back branch + SHA. Leave other worktrees and the old `redesign/six-tabs` branch alone.
- Docs-only commits carry `[skip netlify]` in the message so the push does not rebuild the site.
- **Publish only from the Mac clone `/Users/hermanchan/code/herman-chan-site`.** It has a real
  `.git` (not a Drive gitdir pointer), so any older copy on another machine can still accept
  commits and diverge silently — never commit or push from one.

## Site architecture

Six tabs: Intro (`/`), Underwriting Agent (`/underwriting-agent/`), Supply Database
(`/supply-database/`), Rent Database (`/rent-database/`), Blog (`/blog/`), About (`/about/`).
Keep `/legacy/`, `/projects/` and `/posts/` resolving. Preserve existing design, typography,
uploads, chats, dashboards and samples unless Herman asks for a change.

- **Underwriting sample** — the subject is "Sample Mesa Apt", never the real asset's name or
  street. The sample fragments and downloads are written only by Portfolio Demo
  `tools/publish_to_site.py`; never hand-edit them.
- **Rent § 03 dashboard** — `src/data/rents/rent-database.json` is written by bfr-rent-tracker
  `tools/export_public_stats.py` (refresh = run it, build, commit the JSON). The hero
  `src/data/rents/portfolio-headline.json` is hand-measured with no exporter: re-measure all of its
  counts together (the SQL is in the 2026-09-30 CHANGELOG entry) and update its `*measured_at` fields.
- **Supply § 03 dashboard** — `src/components/supply/SupplyDashboard.astro` over
  `src/data/supply/supply-database.json`; the Supply hero metrics read the same JSON (no hand-typed
  supply numbers). Written by County Permit Pipeline `tools_local/export_public_supply_stats.py`
  (read-only; refuses when a tracked source has no `access_method`). Refresh = run it, build,
  commit the JSON.
- **Ask-the-databases chat** — client in `src/components/chat/chat-stream.ts` (streams from the
  backend's `/chat/stream`, falls back to `/chat` on 404).
- `src/data/project-metrics.ts` holds dated build-time snapshots — recheck their sources before
  making any new quantitative claim.

---

## The two locations (the "Option A" split, decided 2026-05-25)

| Path | What lives here |
|---|---|
| **`~/code/herman-chan-site/`** on the **Mac** (this repo) | The live Astro source. Builds, deploys, gets committed to git. |
| **`~/My Drive/Claude AI/AI + SFR website/`** (Drive) | Drafts (`post-NNN-<slug>.md`), brand/voice notes, LinkedIn revisions, planning. Never built. |

The Drive folder's `CLAUDE.md` is a stub pointing here; this file is canonical for both.

### Cross-machine sync = git, not Drive

Remote: **`https://github.com/hermanian06/herman-chan-site.git`**. Fresh checkout:
`git clone …` then **`npm ci`** (never `npm install`, never copy `node_modules/` between
machines — Rollup/esbuild ship per-OS native binaries) then `npm run dev`.

### Why this repo is not in Drive — don't undo the split

The question "why not just move the repo into Drive so it's all in one place?" was asked + answered on 2026-05-25:

| Problem | Why |
|---|---|
| **`node_modules` is hostile to Drive sync** | ~30-50k small files. Drive's file watcher fires on every save → `npm install` becomes 10-50x slower. Drive's `.tmp.drivedownload` + lock files cause random `EBUSY` / `ENOENT` errors mid-build. |
| **`.git` directory races with Drive sync** | Git writes to `.git/index`, `.git/HEAD`, packfiles. Drive reads them mid-write → `index.lock` errors, corrupted refs, lost commits. |
| **Windows MAX_PATH (260 chars)** | Drive base path is ~55 chars before you start. Deep `node_modules` nesting routinely adds 200+ chars. `npm install` partial-fails silently. |
| **`+` and spaces in path** | `AI + SFR website` has both. Some Rust-backed plugins (sharp, lightningcss, swc) occasionally choke. |
| **Vite HMR needs reliable file watching** | Drive's overlay interferes with ReadDirectoryChangesW. Hot reload becomes flaky. |
| **Drive "Stream Files" mode** | If files are "online only," every read = network fetch. `npm install` becomes hours. |
| **`dist/` and `.astro/` thrash sync** | Every build re-writes 100-1000+ files. Drive uploads all of them every time. |

Source code with a build step belongs in git. Drafts and plans without a build step belong in Drive. Each tool for what it's good at.

---

## Adding a post

1. New file at `src/content/posts/<slug>.md`. **Filename = URL slug.** No `post-NNN-` prefix.
2. Frontmatter:
   ```yaml
   ---
   title: Why I split the underwriting agent into two prompts   # required
   pubDate: 2026-05-24                                          # required, ISO date
   description: One-liner shown under the title on archive + landing.  # always include
   project: skills-suite                                        # optional — see "project: slugs" below
   tag: AI                                                      # optional display label
   tagClass: ai                                                 # optional — enum: ai | cre | notes
   draft: false                                                 # optional, default false
   ---
   ```
3. Body in Markdown below. Run the Redaction checklist below if it touches Haven work.
4. `npm run dev` → http://localhost:4321/posts/<slug>/ to preview; `npm run build` must pass.
5. Commit on your worktree branch. **Publishing (merge/push to `main`) is a Netlify production
   deploy and waits for Herman's go** — see "Publishing" above.

Schema is enforced by [`src/content.config.ts`](src/content.config.ts) (Zod via Astro content collections). A bad field fails the build — check frontmatter first when `npm run build` errors.

### RULE — every published post stays listed (Herman, 2026-06-10)

Never cap, slice, or curate a post listing. `/legacy/` § 03 Writing renders every published post,
newest first (`src/pages/legacy/index.astro`); Blog shows each post either as a story in
`src/data/blog-outline.ts` or in its archive (`src/pages/blog/index.astro`). When adding a post,
verify it appears on both before calling the publish done. A cap is Herman's call only.

### Valid `project:` slugs — derive, don't copy

A slug is a filename in `src/content/projects/` (minus `.md`). A post appears under that project's
page only when the project has a detail page — not `draft: true` and no `href:`. List the slugs
that qualify on the branch you are publishing from:

```sh
grep -L -e '^draft: true' -e '^href:' src/content/projects/*.md
```

Any other `project:` value builds fine but the post lives in the Blog archive only.

---

## Voice + length rules

- **200–400 words.** Hard ceiling. If it doesn't fit, cut — don't expand.
- **One specific insight per post.** Not a tour, not a recap.
- **Bridge framing — one post serves both AI and CRE readers:**
  - **Opener (1-2 sentences):** ground in CRE workflow. *"OM-to-summary used to take me 2 hours. Splitting the agent into two prompts dropped it to 15 minutes — here's why."*
  - **Body:** technical detail, no apology for it. Lead with what was hard, not what was built.
  - **Closer:** tie back to the business outcome.
- **Title is specific.** *"Why I split the underwriting agent into two prompts"* ✓ — *"AI in BFR"* ✗
- **"I built / I learned"** — never "Haven does / our team uses." Builder voice, not company voice.
- **Human voice, not essay-polish (site-wide tone pass, 2026-06-10 — Herman's call).** Hold every post to these:
  1. **No engraved aphorism closers.** End plain and personal ("two deals processed a month apart now come out looking identical"), not on a maxim ("The model itself is the easy part.").
  2. **No listicle scaffolding** ("The first was **drift**. The second was…") — write through in prose.
  3. **Break perfect parallelism.** Three identically-shaped sentences in a row reads machine-made; fold or vary them.
  4. **Jargon at Herman's level** (the persona is "I direct the build, Claude writes the code"): translate code literals and insider terms to plain words — `temperature=0` → "runs are pinned so the model answers the same way every time"; `LEAST(NULL,2000)` → describe the behavior.
  4b. **Precise scores → ranges (Herman, 2026-06-10).** Never publish exact accuracy/eval decimals (82.8%, 76%, 90.3%) — Herman won't recall them under interview questioning, and an unrecallable precise number is a liability, not evidence. Use ranges that carry the concept: "mid-seventies," "low eighties," "about two percent of rows," "roughly seven points." **Story numbers he actually remembers are fine** (the year-2879 filing, 17 checks, fifteen passed / two failed, two weeks frozen). Test: would he reproduce the number cold in an interview? If not, range it.
  5. **Allow first-person texture** ("Honestly, 76% stung a little", "Which, in hindsight, is obvious", "The other failure was mine") — and go easy on em-dashes.
- **Evidence-backed claims only.** Every number or capability on the site must trace to a source you re-checked before publishing (an exporter JSON, a query, the code) — see the `project-metrics.ts` note above.

Canonical example: [`src/content/posts/rent-comps-t12-skills.md`](src/content/posts/rent-comps-t12-skills.md).

---

## Redaction checklist — before every post that touches Haven work

The site is publicly auditioning for Anthropic Forward Deployed Engineer roles. **Primary goal stays private** — nothing on the site signals "looking for a job." Builder posture only.

- [ ] **No internal screenshots with real deals, addresses, or financials.** Sample data only.
- [ ] **County Permit Pipeline** is abstracted as *"automated public-records monitoring pipeline for off-market deal flow."* Show architecture + AI classification choices. Hide: specific sources, filter logic, keywords, thresholds, volume specifics.
- [ ] **Underwriting agent (formerly "Agent Suite"):** show orchestration pattern + per-task model routing. No internal screenshots with real data.
- [ ] **Skills suite:** code snippets only if completely non-sensitive (no Haven-specific column names, no proprietary scoring).
- [ ] **No mention of specific Haven deals, employees, or financial figures.**
- [ ] **No "I'm looking for a role at X" framing.** Builder portfolio; role-targeting is operational, not visible.
- [ ] **Manager sign-off** (see [`BUILD_NOTES.md`](BUILD_NOTES.md)): two-line Slack/email approval before work-derived code goes public. IP-assignment-clause hygiene.

---

## Editing project pages

`src/content/projects/<slug>.md`. Body = intro paragraph for the project page. Frontmatter (`title`, `blurb`, `order`) drives the project card. An `href:` sends the card to that URL and suppresses the detail page; `draft: true` hides the entry. Optional rich sections (`stats`, `timeline`, `changelog`, `stack`, etc.) are defined in [`src/content.config.ts`](src/content.config.ts) — hidden when absent.

---

## Cadence

- **Internal:** 1 short post/week. Never publicly commit to a cadence on the site — missed weeks read louder than posted weeks.
- **Strength = accumulation.** 6 months ≈ 24 posts = the signal.

---

## Tech notes

- **Stack:** Astro 6 + Tailwind; Node per `package.json` `engines`.
- **Local dev:** `npm ci && npm run dev` from this folder; `npm test` runs `tests/**/*.test.ts`.
- **`.gitignore` already covers** `node_modules/`, `dist/`, `.astro/`, `.env`, `.claude/`, `.vscode/`, `.idea/`. Don't commit any of those.
- **No analytics.** If adding, use Plausible (privacy, no cookie banner).
- **Rows written by an inline `<script>` get no Astro scope attribute**, so a component's scoped table rules never reach them. Style them with `:global(...)` pinned to the table or tbody id (the rent and supply dashboard sample tables both do).

---

## Parked work — don't start without Herman's call

See [`BUILD_NOTES.md`](BUILD_NOTES.md) for FDE-review feedback punch list (project-page artifacts, customer-deployment post, thicker Writing section, GitHub Profile README, open-sourcing the permit-pipeline, etc.).

---

## Related planning docs (in the Drive folder)

Not synced to this repo. Read directly if needed: `portfolio-site-plan.md` (master plan),
`landing-intro.md`, `project-blurbs.md`, `linkedin-revisions.md`, and unpromoted
`post-NNN-<slug>.md` drafts.
