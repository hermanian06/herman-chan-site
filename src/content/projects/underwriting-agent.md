---
title: Underwriting agent
blurb: An orchestration agent that takes a deal from broker email to a finished analysis pack. When a deal lands in my inbox, the agent gathers the source files into a fresh folder, runs the underlying analysis skills in the right order, and drafts a one-paragraph summary back to me.
order: 2
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

An orchestration agent that sits on top of two of the other projects on this site — the broker-email intake pipeline and the Claude Code skills suite. The story is the choreography. A deal email lands in my inbox, an upstream extractor pulls the structured deal facts (broker, units, price guidance, pitch-document link) into a database row, I triage in a small dashboard, and when I flip a row to "ready to analyze" the agent picks it up.

From there it does the work I'd otherwise do by hand. It downloads the source documents — the offering memorandum (the broker's pitch document), the property's trailing twelve-month income statement, and the rent roll (the unit-by-unit lease list) — into a fresh folder. Then it chains my analysis skills in the right order (rent roll and income statement first; the deal summary depends on their outputs). It pulls a set of rent benchmarks from a third-party API to compare against nearby comparable properties, and drafts a short summary email back to me with the implied yield, in-place rents versus the benchmark set, and direct links to each output file.

The interesting design choice is where the model lives. The skills underneath are mostly Python — file operations, arithmetic, formatting. The agent layer is mostly Claude — deciding what to run given what's in the folder, handling the case where the rent roll is missing, drafting the summary email. The model's job is routing and synthesis. The deterministic work stays in Python where it belongs.

**Status:** in build. Roughly twenty hours of work across the agent itself and the upstream intake wiring it depends on. This page will be filled out as the pieces ship.

**Stack:** Claude Agent SDK, Python, Supabase, Railway, Anthropic API.
