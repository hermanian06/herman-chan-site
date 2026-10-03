---
title: MCP server for the off-market and supply pipeline
blurb: A read-only Model Context Protocol server fronting the supply, rent and demand databases as a small set of tools for Claude. I connect it to claude.ai, ask something like "what's been filed in this part of town in the last 30 days" in plain English, and the server queries the underlying database and returns a clean answer.
order: 5
status: In production
statusClass: live
role: Sole builder & operator
for: My acquisitions work
since: 2026
category: Internal tooling
stack:
  - Python
  - FastMCP
  - OAuth 2.1
  - Railway
---

A Model Context Protocol server fronting the off-market and supply pipeline as a small set of read-only tools — find recent filings, look up a subdivision, check builder activity. I connect it to claude.ai, ask in plain English, and the server queries Postgres and returns a clean answer. The chat box on the Supply Database tab runs on the same tools.

More coming soon.

**Stack:** Python, FastMCP, OAuth 2.1, Railway.
