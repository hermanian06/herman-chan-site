---
title: MCP server for the off-market deal pipeline
blurb: A read-only MCP server fronting the deal pipeline as nine tools for Claude. My team logs into claude.ai, asks things like "what's been filed in this submarket in the last 30 days" in plain English, and the server queries Postgres and returns a clean answer.
order: 2
status: In production
statusClass: live
role: Sole builder & operator
for: Acquisitions team
since: 2025
category: Internal tooling
stack:
  - Python
  - FastMCP
  - OAuth 2.1
  - Railway
---

A Model Context Protocol server fronting the off-market deal pipeline as a small set of read-only tools — find recent filings, look up a subdivision, check builder activity. My team logs into claude.ai, asks in plain English, and the server queries Postgres and returns a clean answer.

More coming soon.

**Stack:** Python, FastMCP, OAuth 2.1, Railway.
