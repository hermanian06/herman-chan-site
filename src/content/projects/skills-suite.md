---
title: Claude Code skills suite
blurb: Five skills I run on most deals — a one-page deal summary from the broker's pitch document, an underwriting financial model, rent benchmarks against comparable nearby properties, a unit-by-unit rent-roll summary, and categorization of the trailing twelve-month income statement. Each is a Markdown spec plus a folder of Python tools; Claude orchestrates, Python does the deterministic work. The deal-summary skill went from ~2 hours of manual work to ~15 minutes.
order: 1
status: In production
statusClass: live
role: Sole builder & operator
for: Personal underwriting workflow, used across the team
since: 2025
category: Internal tooling
stack:
  - Claude Code
  - Python
  - openpyxl
  - pandas
  - Anthropic API
---

A collection of Claude Code skills I built to compress the most repetitive parts of preparing a deal for review — a one-page deal summary from the broker's pitch document, an underwriting financial model, rent benchmarking (what comparable nearby properties charge in rent), a rent-roll summary (the unit-by-unit lease list, rolled up by floor plan), and categorization of the property's trailing twelve-month income statement into a consistent profit-and-loss layout. Each skill is a Markdown file describing the steps and a folder of Python tools that do the deterministic work. The split is the whole point: the language model handles judgment and orchestration; the Python handles arithmetic, file I/O, and anything that needs to be reproducible. Output is a finished workbook or a populated cell range, ready to drop into the deal folder. Built originally to save my own time; now used to standardize outputs across the team.

**Stack:** Claude Code, Python (`openpyxl`, `pandas`, `requests`), Anthropic API.
