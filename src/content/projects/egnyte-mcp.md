---
title: MCP server for our document store
blurb: A Model Context Protocol server that lets Claude search and read our document store as if it were a filesystem.
order: 5
status: Beta · internal
statusClass: beta
role: Sole builder & operator
for: Personal workflow
since: 2025
category: Internal tooling
stack:
  - Python
  - FastMCP
  - Railway
---

A small Model Context Protocol server that lets Claude search and read our document store the same way it reads my local filesystem. Built so I'd stop screen-sharing folder paths into a chat window. Implements a handful of tools — search, read, list — with auth handled by the document store's OAuth flow and tokens cached server-side. Deployed on Railway because everything else of mine lives there. Building it forced me to read the MCP spec carefully enough to have opinions about it, which turned out to be more valuable than the tool itself.

**Stack:** Python, FastMCP, Railway.
