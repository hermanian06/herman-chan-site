---
title: The dashboard was wrong for two weeks. Every health check was green.
pubDate: 2026-06-10
description: Model evals don't catch a broken data layer. The fix is the same discipline pointed at the database — assertions on the numbers people actually act on.
project: evaluation-framework
tag: AI
tagClass: ai
---

The supply pipeline ends in a dashboard — builder rankings, county totals, supply forecasts that feed real acquisition decisions. Earlier this month I worked out that for roughly two weeks, most of those numbers had been quietly frozen. Ingestion ran fine. The weekly cron logged success. No errors anywhere. A migration had accidentally made a database view circular, so the scheduled "refresh" was copying a snapshot onto itself — and the dashboard kept serving plausible, stale numbers while every health check stayed green.

My model evals were no help, because no model was wrong. That was the lesson: the data layer fails exactly the way a model fails — silently, and plausibly. So I gave the database the same treatment I'd given the classifier: an evaluation suite. Each check is one SQL query written to return *violating rows*, so zero rows is a pass. Seventeen of them now run daily. A tripwire for phantom values — in Postgres, `LEAST(NULL, 2000)` returns 2000, so one missing unit count silently becomes two thousand phantom units in a sum. An identity check — the same builder appearing in two capitalizations splits into two ranking rows and undercounts both. A scope check for one metro's records leaking into another's totals. And a served-versus-ingested freshness check that would have caught the frozen view in a day. Failures land on the same dashboard that tracks model cost and accuracy.

The first run: fifteen passed, two failed, and both failures earned their keep. One caught three corrupted dates — a filing recorded in the year 2879 — that had survived an earlier source-level fix because the bad value was baked into a derived table downstream. The other failure was mine: a contamination canary set too sensitive flagged sixty-six "violations" that were mostly legitimate data shapes. I retuned it until it fires only on the catastrophic class. The first run of any monitor is a calibration pass — an alarm that cries wolf gets ignored, and an ignored alarm is worse than none.

The model is one probabilistic step in a long chain, and every step after it can be confidently wrong too. Eval discipline shouldn't stop at the model's output. It should follow the number all the way to the screen someone acts on.
