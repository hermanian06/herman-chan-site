# Build notes

Parked items from FDE-review feedback (2026-05-22 / 23) — ship when ready,
not now. This file is dev-facing only; not rendered on the site.

---

## Content to add to the site

- [ ] **Artifacts in project pages.** Each project page is currently a
  *description*, not a *demonstration*. For each, add one of: a representative
  code snippet, a sample prompt, a skill spec excerpt, or a before/after output
  screenshot. Goal: one concrete artifact per project page.

- [ ] **Customer-facing deployment post.** FDE bar wants evidence of working
  *with* people across organizational lines, not just solo or single-team.
  Write about a moment where adapting a tool for someone else's workflow
  surprised you — where your mental model was wrong, or the user did
  something unexpected.

- [x] **Thicken the Writing section.** ~~Current: 2 posts, both filed May 2026.~~
  **Closed 2026-07-30** — 16 posts now, May 2026 through Aug 2026, including a
  four-post arc on the multi-agent build workflow (008–011). The multi-model
  build chain also became project 7, so the "multi-agent workflow" half of this
  item landed as both a project page and its post series. Cadence is real:
  roughly weekly through May–June, then a nine-post run at ~3-day spacing.

- [ ] **Real email in the footer.** Email row was removed from the Elsewhere
  list along with the "What I'm reading" section drop (2026-05-23). Add back
  to [Footer.astro](src/components/Footer.astro) Elsewhere `<ul>` when you
  have a public-facing address you want to publish.

- [ ] **Truthful "Established" date in the home colophon.** Currently
  hard-coded `2026`. If you ever push the site origin earlier (e.g. with
  back-dated posts), update.

---

## Public-facing portfolio (off-site)

- [ ] **Get written manager sign-off** before publishing any work-derived
  code. Two-line Slack/email is enough. Skipping this risks an IP-assignment
  -clause breach — most US employment contracts assign IP for work built
  during work hours / on company resources to the employer regardless of
  whose idea it was.

- [ ] **GitHub Profile README** (`hermanian06/hermanian06` repo with a
  `README.md`). GitHub renders it at the top of the profile page. List
  projects with one-paragraph descriptions, link out to hermanchanai.com.
  Communicates breadth without exposing private code. ~15–30 min to set up.

- [ ] **Open-source the permit-pipeline.** GA EPD NOI data is already
  public; the pipeline architecture has zero Haven IP. Lowest-redaction-
  effort, highest-signal first public repo.

- [ ] **Reference implementation for skills suite.** Rebuild the
  Markdown-spec + Python-tools pattern against a non-real-estate domain
  (a "research assistant" skill, a "meeting notes → action items" skill,
  etc.). Same architecture, zero Haven exposure.

- [ ] **Reference implementation for agent suite.** Toy version with 3
  generic agents demonstrating the routing pattern. Alternative: a blog
  post describing the architecture (sometimes the post is the better
  demonstration than the code).

- [ ] **Tag each project page with its public GitHub repo** once any of
  the above lands. Spec sheet `Sources` slot is empty and could carry a
  `Repository` row.

---

## Reviewer's full feedback (for reference)

See conversation transcript 2026-05-23 — three-persona FDE review
(HR / Hiring Manager / Senior FDE). Verdicts: yes / yes / lean yes.
Three core weaknesses to close: no code-level artifacts, no customer-
facing story, thin writing cadence.
