---
title: Claude Code skills suite
blurb: Markdown-defined skills plus Python tools that compress repetitive underwriting tasks into one prompt.
order: 1
---

A collection of Claude Code skills I built to compress the most repetitive parts of underwriting a deal — one-page deal summary, financial model, rent comps, rent roll, T-12. Each skill is a Markdown file describing the steps and a folder of Python tools that do the deterministic work. The split is the whole point: the LLM handles judgment and orchestration, the Python handles arithmetic, file I/O, and anything that needs to be reproducible. Output is a finished workbook or a populated cell range, ready to drop into the deal folder. Built originally to save my own time; now used to standardize outputs across the team.

**Stack:** Claude Code, Python (`openpyxl`, `pandas`, `requests`), Anthropic API.
