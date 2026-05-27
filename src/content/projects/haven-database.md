---
title: Haven Database
blurb: A hybrid retrieval system over my deal-document store. Postgres for the structured slice, vector embeddings for the semantic slice, a router that picks SQL, vector, or both per query.
order: 6
status: In production
statusClass: live
role: Sole builder & operator
for: Personal deal research workflow
since: 2026
category: Internal tooling · retrieval
stack:
  - Python
  - ChromaDB
  - Voyage embeddings
  - Postgres
  - Anthropic API
---

A retrieval system over the document store my team has built up across years of deals — offering memorandums, deal memos, broker emails, internal notes. Single interface, two underlying stores: Postgres for the structured slice (deal IDs, dates, financials, locations) and a vector index for the semantic slice (memo prose, email bodies, free-text notes).

The interesting part is the router. Claude classifies the question on the way in and picks the retrieval mode — SQL when the query is precise ("show me deals over 250 units in Phoenix where we exited in 2023"), vector when it's paraphrased ("what was that townhome portfolio that came in from a Texas broker last year"), and both when it's hybrid ("what did the memo say about the 168-unit Pasco deal"). Pure vector misses the exact-match queries; pure SQL misses the paraphrased ones. The router is the part that earns its keep.

Roughly two thousand indexed chunks today across the document corpus. Embeddings are Voyage; the structured index is generated from the deal-folder layout my team already uses, so adding a deal to the database is a side effect of putting it in the right folder.

The next thing to add is an eval — a labeled set of around fifty real questions with their expected sources, scored by Recall@5 and MRR, run before every change to the router prompt or the chunking strategy. That's how I'll know whether "let me try a reranker" is an actual improvement or just a vibe. The harness for that eval lives in its own project on this site.

**Stack:** Python, ChromaDB, Voyage embeddings, Postgres, Anthropic API.
