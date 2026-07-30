---
title: Multi-model build chain
blurb: The process that builds every other tool on this page. One model writes the implementation plan, a second writes the code, and a third — from a different vendor — reviews each finished diff cold. Findings come back as claims to adjudicate, not fixes to trust, and every confirmed bug becomes a regression test before the work merges.
order: 7
status: In production
statusClass: live
seriesPosts: true
role: Designer & operator
for: Every build on this site
since: 2026
category: Internal tooling · process
stack:
  - Claude Code
  - OpenAI Codex CLI
  - Git worktrees
---

The process that builds every other tool on this page. I direct the work, but the work itself moves through three models with three separate jobs. A planning model reads the task and writes an implementation plan I can argue with before any code exists. A building model writes the code against that plan, milestone by milestone. And a reviewing model, from a different vendor entirely, reads each finished diff cold and tries to break it.

The cross-vendor split is the deliberate part. A model reviewing its own output brings the same assumptions to the review that it brought to the writing — the bugs it catches are mostly the ones it already avoided. Putting review across a vendor line buys real independence: the reviewer has no memory of what the code was meant to do, only what it says. In its first weeks the gate caught a pattern-matching bug that had a Texas address tagged with a New York postal code — code the builder had written, self-reviewed, and pronounced clean.

Findings come back to me as claims, not automatic fixes. I rule on what's real, the builder applies the accepted ones, and anything confirmed lands as a regression test before the work merges. When more than one build runs at once, each session works in its own isolated copy of the project so two agents can't step on each other's files — a rule that exists because of the day one of them deleted work that wasn't its own.

What changed in practice: I stopped being the reviewer of first resort. My review time moved up a level, from reading diffs line by line to ruling on disagreements between two machines that read every line.

**Status:** in production — the default path for every substantive build since mid-2026.

**Stack:** Claude Code with planner and builder roles pinned to different Claude models, OpenAI's Codex CLI as the cross-vendor reviewer, isolated git working copies for parallel sessions.
