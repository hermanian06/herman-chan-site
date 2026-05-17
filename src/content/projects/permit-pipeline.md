---
title: Off-market deal pipeline
blurb: Automated public-records monitoring with LLM classification, surfacing daily leads for off-market deal flow.
order: 2
---

An automated pipeline that watches public records for signals that something interesting is happening on a parcel, classifies what's there with an LLM, and surfaces a daily list of leads for me to chase. Architecture is boring on purpose: a scheduled Python job pulls and normalizes new records, persists them in Postgres, runs an LLM classification step with a structured output schema, and writes the matches to a Google Sheet I scan with coffee. The hard part was less the model and more the data — figuring out how to deduplicate across re-publishes, how to backfill historic state without re-spending on classification, and how to keep the classification rubric stable enough that yesterday's "match" still means the same thing today.

**Stack:** Python, Postgres on Railway, Anthropic API, Google Sheets API.
