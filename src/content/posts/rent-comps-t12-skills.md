---
title: Why I moved my rent-benchmark and income-statement workflows out of Claude chat into Skills
pubDate: 2026-05-22
description: Three problems running spreadsheet workflows in Claude chat that pushed me to build dedicated skills.
project: skills-suite
tag: AI
tagClass: ai
---

Every single-family rental deal comes with two repetitive Excel exercises: pulling rent benchmarks against nearby similar properties for the floor-plan mix, and recategorizing the property's trailing twelve-month income statement line by line. Both used to take me an hour each. Then I started pasting the workbooks into Claude.ai's chat and asking for help. That dropped each to about 20 minutes — but it left me with three problems I didn't expect.

The first was **drift**. Each session I'd phrase the question slightly differently, and Claude would categorize "Maintenance — Plumbing" as Repairs on one deal and Maintenance on the next. Both technically right; just not *consistent*. When you're stacking profit-and-loss statements across three comparable properties to build a projected income statement, that kills you.

The second was **formatting**. Pasting Excel into chat strips the formulas. I'd get a beautifully reasoned answer back as text and then re-type it into cells — at which point I'd lost half the speed-up.

The third was **API access**. The rent-benchmark data comes from an API I subscribe to. There's no version of "use my API key" that works in chat. I'd run the export manually, paste the CSV in, get the analysis, copy it back. Three round-trips where there should be one.

So I built two Claude Code skills — one for the rent benchmarks, one for the income statement. Each is a Markdown spec describing the workflow plus a folder of Python tools that handle the deterministic work: hitting the API directly, filtering comparable properties by year-built and unit count, computing twelve-month and three-month sums in fixed rows, building the profit-and-loss rollup by category. Claude orchestrates — picks which comparable properties fit, writes the categories — but it does it through tools that always produce the same formatted output.

Category drift went away because the skill carries a fixed list of buckets. The formatting problem went away because the tool writes the `.xlsx` directly. The API problem went away because the tool calls the API directly.

The speed-up from an hour to five minutes is the headline number. The bigger win was getting the *same* output every time. That's the move I keep coming back to: deterministic where you can, probabilistic where you have to — and the boundary between the two is the actual design decision.
