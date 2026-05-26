# Herman Chan personal site — project-level CLAUDE.md

Inherits from global `CLAUDE.md`. Read this before editing anything in this repo.

---

## The two locations (the "Option A" split, decided 2026-05-25)

| Path | What lives here |
|---|---|
| **`C:\Users\herma\Claude AI Local\AI and SFR website\`** (this repo) | The live Astro source. Builds, deploys, gets committed to git. |
| **`C:\Users\herma\My Drive\Claude AI\AI + SFR website\`** (Drive) | Drafts, brand/voice docs, LinkedIn revisions, planning. Never built. |

The Drive folder has its own [`CLAUDE.md`](file:///C:/Users/herma/My%20Drive/Claude%20AI/AI%20+%20SFR%20website/CLAUDE.md) — same info, mirrored for whichever folder you start a session in.

### Cross-machine sync = git, not Drive

Remote: **`https://github.com/hermanian06/herman-chan-site.git`** on `main`. To work from another machine:

```sh
git clone https://github.com/hermanian06/herman-chan-site.git
cd herman-chan-site
npm install
npm run dev
```

**Do not** try to put this repo under Drive sync.

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
   project: skills-suite                                        # optional — see slugs below
   tag: AI                                                      # optional display label
   tagClass: ai                                                 # optional — enum: ai | cre | notes
   draft: false                                                 # optional, default false
   ---
   ```
3. Body in Markdown below.
4. `npm run dev` → http://localhost:4321/posts/<slug>/ to preview.
5. Commit + push. Netlify auto-deploys on push to `main`.

Schema is enforced by [`src/content.config.ts`](src/content.config.ts) (Zod via Astro content collections). A bad field fails the build — check frontmatter first when `npm run build` errors.

### Valid `project:` slugs
Must match an existing file in `src/content/projects/`:
- `skills-suite`
- `permit-pipeline`
- `permit-pipeline-mcp`
- `agent-suite`
- `egnyte-mcp`

If `project:` matches, the post appears on that project page under "Posts about this." Otherwise archive only.

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

Canonical example: [`src/content/posts/rent-comps-t12-skills.md`](src/content/posts/rent-comps-t12-skills.md).

---

## Redaction checklist — before every post that touches Haven work

The site is publicly auditioning for Anthropic Forward Deployed Engineer roles. **Primary goal stays private** — nothing on the site signals "looking for a job." Builder posture only.

- [ ] **No internal screenshots with real deals, addresses, or financials.** Sample data only.
- [ ] **County Permit Pipeline** is abstracted as *"automated public-records monitoring pipeline for off-market deal flow."* Show architecture + AI classification choices. Hide: specific sources, filter logic, keywords, thresholds, volume specifics.
- [ ] **Agent Suite:** show orchestration pattern + per-task model routing. No internal screenshots with real data.
- [ ] **Skills suite:** code snippets only if completely non-sensitive (no Haven-specific column names, no proprietary scoring).
- [ ] **No mention of specific Haven deals, employees, or financial figures.**
- [ ] **No "I'm looking for a role at X" framing.** Builder portfolio; role-targeting is operational, not visible.
- [ ] **Manager sign-off** (see [`BUILD_NOTES.md`](BUILD_NOTES.md)): two-line Slack/email approval before work-derived code goes public. IP-assignment-clause hygiene.

---

## Editing project pages

`src/content/projects/<slug>.md`. Body = intro paragraph for the project page. Frontmatter (`title`, `blurb`, `order`) drives the project card on landing. Optional rich sections (`stats`, `timeline`, `changelog`, `stack`, etc.) defined in [`src/content.config.ts`](src/content.config.ts) — hidden when absent.

---

## Cadence

- **Internal:** 1 short post/week. Never publicly commit to a cadence on the site — missed weeks read louder than posted weeks.
- **Strength = accumulation.** 6 months ≈ 24 posts = the signal.

---

## Tech notes

- **Stack:** Astro 6 + Tailwind + Node 22.12+. Netlify on push to `main`.
- **Local dev:** `npm install && npm run dev` from this folder.
- **`.gitignore` already covers** `node_modules/`, `dist/`, `.astro/`, `.env`, `.claude/`, `.vscode/`, `.idea/`. Don't commit any of those.
- **No analytics.** If adding, use Plausible (privacy, no cookie banner).

---

## Parked work — don't start without Herman's call

See [`BUILD_NOTES.md`](BUILD_NOTES.md) for FDE-review feedback punch list (project-page artifacts, customer-deployment post, thicker Writing section, GitHub Profile README, open-sourcing the permit-pipeline, etc.).

---

## Related planning docs (in the Drive folder)

Not synced to this repo. Read directly if needed:
- `portfolio-site-plan.md` — master plan: target role, locked decisions, four projects, distribution
- `landing-intro.md` — hero copy variants
- `project-blurbs.md` — project card descriptions
- `linkedin-revisions.md` — LinkedIn profile rewrites
- `post-NNN-<slug>.md` — drafts that haven't been promoted yet
