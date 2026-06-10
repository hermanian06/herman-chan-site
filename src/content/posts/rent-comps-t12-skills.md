---
title: Why I moved my rent-benchmark and income-statement workflows out of Claude chat into Skills
pubDate: 2026-05-22
description: Three problems running spreadsheet workflows in Claude chat that pushed me to build dedicated skills.
project: skills-suite
tag: AI
tagClass: ai
---

Every single-family rental deal comes with two repetitive Excel exercises: benchmarking rents against similar properties nearby, and recategorizing the property's trailing twelve-month income statement line by line. Each used to take me about an hour. When I started pasting the workbooks into Claude chat and asking for help, each dropped to maybe twenty minutes. That felt like a win until I noticed three problems.

The categories drifted. I'd phrase the request a little differently each session, and "Maintenance — Plumbing" would land under Repairs on one deal and under Maintenance on the next. Neither is wrong. But when you're stacking income statements from three comparable properties to project a new one, inconsistent buckets quietly ruin the comparison.

Formatting was the second problem. Pasting Excel into chat strips out the formulas, so I'd get a well-reasoned answer back as plain text and then spend ten minutes re-typing it into cells. Half the speed-up gone right there.

And the rent data comes from an API I pay for. There's no good way to hand a chat window your API key, so every run meant exporting the data manually, pasting it in, and copying the analysis back out. Three round-trips for what should be one step.

So I moved both workflows into Claude Code skills. A skill is just a written spec of the workflow plus a folder of small Python tools for the mechanical parts — calling the API, filtering comparables by year built and unit count, summing the trailing periods, writing the Excel file directly. Claude still makes the judgment calls, like which comps fit and which category a line belongs in, but it makes them through tools that produce the same formatted output every time. The drift stopped because the skill carries a fixed category list; the formulas survive because the tool writes the spreadsheet itself; the API runs inside the tool, key and all.

An hour down to five minutes is the number I'd put on a slide. The thing I actually care about is quieter: two deals processed a month apart now come out looking identical.
