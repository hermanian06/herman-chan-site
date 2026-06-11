---
title: Why I moved my rent-benchmark and income-statement workflows out of Claude chat into Skills
pubDate: 2026-05-22
description: Three problems running spreadsheet workflows in Claude chat that pushed me to build dedicated skills.
project: skills-suite
tag: AI
tagClass: ai
---

Every single-family rental deal comes with two repetitive Excel exercises: benchmarking rents against similar properties nearby, and recategorizing the property's trailing twelve-month income statement line by line. Each used to take me about an hour. When I started pasting the workbooks into Claude chat and asking for help, each dropped to maybe twenty minutes. That felt like a win until I noticed three problems.

The first was drift. Part of the rent work is calculating the property's in-place rent and its recently-leased rent — the spread between them tells you where rents are heading. Ask in chat, and each session interprets that calculation a little differently: how many months counts as "recent," whether renewals count, what to do with units showing zero rent. Every version is defensible on its own. But if the definition moves between deals, the comparison across deals is worthless.

Formatting was the second. Chat shapes the output differently every time — different columns, different layout — and pasting Excel into chat strips the formulas anyway, so I'd end up re-typing the answer into my own workbook. Half the speed-up gone right there.

And the benchmark data comes from an API I pay for. There's no way to hand a chat window your API key, so every deal meant pulling the export myself and copy-pasting it in by hand.

So I moved both workflows into Claude Code skills: a written spec of the workflow plus small Python tools for the mechanical parts. The calculations are pinned in the spec, so "recent" means the same lookback on every deal. The output lands in an Excel workbook template, so every deal comes out in the same shape, formulas intact. And the tools call the API directly, key and all — the manual copy-paste step just disappeared.

That last part opened a door I hadn't planned on. Once the tools could hold credentials, I started wiring in other sources the same way: the Census API for income and population around a property, and my email, so a skill can pull deal-specific details and pricing straight out of the broker's thread.

An hour down to five minutes is the headline. The real win is that two deals processed a month apart now come out calculated and formatted the same way.
