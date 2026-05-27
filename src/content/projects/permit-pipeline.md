---
title: Off-market deal pipeline
blurb: An automated public-records monitoring pipeline for off-market supply intel. Weekly Railway cron scrapes filings across eight Sunbelt MSAs, classifies them with an LLM, dedupes, and surfaces qualifying projects to a dashboard and an auto-refreshed Sheet.
order: 5
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

An automated pipeline that watches public records for signals that something interesting is happening on a parcel, classifies what's there with an LLM, and surfaces a daily list of leads for me to chase. Architecture is boring on purpose: a scheduled Python job pulls and normalizes new records, persists them in Postgres, runs an LLM classification step with a structured output schema, and writes the matches to a Google Sheet I scan with coffee. The hard part was less the model and more the data — figuring out how to deduplicate across re-publishes, how to backfill historic state without re-spending on classification, and how to keep the classification rubric stable enough that yesterday's "match" still means the same thing today.

**Stack:** Python, Postgres on Railway, Anthropic API, Google Sheets API.
