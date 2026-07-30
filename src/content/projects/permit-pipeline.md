---
title: Off-market and supply pipeline
blurb: An automated pipeline that watches public records across nine Sunbelt metros for two signals — new rental-housing supply heading into the market, and off-market deals that haven't hit commercial datasets yet. Each new filing gets classified by a language model into a structured schema and surfaced to a dashboard.
order: 3
status: In production
statusClass: live
role: Sole builder & operator
for: Acquisitions team
since: 2024
category: Pipeline · data ingest
stack:
  - Python
  - Postgres
  - Railway
  - Anthropic API
  - Google Sheets
---

An automated pipeline that watches public records for two kinds of signal: new rental-housing supply heading into the markets I work in, and off-market deals that haven't hit commercial datasets yet. The pipeline classifies each new filing with a language model, normalizes it into a structured schema, and surfaces a daily list of leads for me to chase. Architecture is boring on purpose: a scheduled Python job pulls and normalizes new records, persists them in Postgres, runs an LLM classification step with a structured output schema, and writes the matches to a Google Sheet I scan with coffee. The hard part was less the model and more the data — figuring out how to deduplicate across re-publishes, how to backfill historic state without re-spending on classification, and how to keep the classification rubric stable enough that yesterday's "match" still means the same thing today.

**Stack:** Python, Postgres on Railway, Anthropic API, Google Sheets API.
