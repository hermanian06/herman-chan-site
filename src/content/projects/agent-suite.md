---
title: Deal-pack agent
blurb: An orchestration agent that watches my broker-email intake. When a deal flips to "ready to underwrite," it pulls the OM, T-12, and rent roll into a fresh folder, chains the underlying skills in the right order, and drafts a summary email back to me.
order: 1
status: Coming soon
statusClass: idle
role: Sole builder & operator
for: Personal & team underwriting workflow
since: 2026
category: Internal tooling · agent
stack:
  - Claude Agent SDK
  - Python
  - Supabase
  - Railway
  - Anthropic API
---

An orchestration agent that sits on top of two of the other projects on this site — the broker-email intake pipeline and the Claude Code skills suite. The story is the choreography. A deal email lands in my inbox, an upstream extractor pulls the structured deal facts (broker, units, price guidance, OM link) into a Supabase row, I triage in a small dashboard, and when I flip a row to "ready to underwrite" the agent picks it up.

From there it does the work I'd otherwise do by hand. It downloads the OM, T-12, and rent roll into a fresh folder; chains the rent-roll, T-12, and 1-page-summary skills in the right order (T-12 and rent roll first — the 1-pager depends on their outputs); pulls a rent-comp set from a third-party API; and drafts a short summary email to me with the cap rate, in-place rent vs comps, and direct links to each output file.

The interesting design choice is where the model lives. The skills underneath are mostly Python — file I/O, arithmetic, formatting. The agent layer is mostly Claude — deciding what to run given what's in the folder, handling the case where the rent roll is missing, drafting the summary email. The model's job is routing and synthesis. The deterministic work stays in Python where it belongs.

**Status:** in build. Roughly twenty hours of work across the agent itself and the upstream intake wiring it depends on. This page will be filled out as the pieces ship.

**Stack:** Claude Agent SDK, Python, Supabase, Railway, Anthropic API.
