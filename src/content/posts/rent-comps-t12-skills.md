---
title: Why I moved rent comps and T-12 out of Claude chat into Skills
pubDate: 2026-05-22
description: Three problems with running rent comps and T-12 in Claude chat that pushed me to build dedicated skills.
project: skills-suite
tag: AI
tagClass: ai
---

Every SFR deal comes with two repetitive Excel exercises: pull rent comps for the floor-plan mix, and recategorize a T-12 line by line. Both used to take me an hour each. Then I started pasting the workbooks into Claude.ai's chat and asking for help. That dropped each to about 20 minutes — but it left me with three problems I didn't expect.

The first was **drift**. Each session I'd phrase the question slightly differently, and Claude would categorize "Maintenance — Plumbing" as Repairs on one deal and Maintenance on the next. Both technically right; just not *consistent*. When you're stacking P&Ls across three comps to build a pro forma, that kills you.

The second was **formatting**. Pasting Excel into chat strips the formulas. I'd get a beautifully reasoned answer back as text and then re-type it into cells — at which point I'd lost half the speed-up.

The third was **API access**. Rent comps come from a data API I subscribe to. There's no version of "use my API key" that works in chat. I'd run the export manually, paste the CSV in, get the analysis, copy it back. Three round-trips where there should be one.

So I built two Claude Code skills — one for rent comps, one for T-12. Each is a Markdown spec describing the workflow plus a folder of Python tools that handle the deterministic work: hitting the API directly, filtering comps by year-built and unit count, computing T-12 and T-3 sums in fixed rows, building the P&L rollup by category. Claude orchestrates — picks which comps fit, writes the categories — but it does it through tools that always produce the same formatted output.

Category drift went away because the skill carries a fixed list of buckets. The formatting problem went away because the tool writes the `.xlsx` directly. The API problem went away because the tool calls the API directly.

The speed-up from an hour to five minutes is the headline number. The bigger win was getting the *same* output every time. That's the move I keep coming back to: deterministic where you can, probabilistic where you have to — and the boundary between the two is the actual design decision.
