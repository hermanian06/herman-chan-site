---
title: The dashboard was wrong for two weeks. Every health check was green.
pubDate: 2026-06-10
description: Model evals don't catch a broken data layer. The fix is the same discipline pointed at the database — checks on the numbers people actually act on.
project: evaluation-framework
tag: AI
tagClass: ai
---

The supply pipeline ends in a dashboard: builder rankings, county totals, supply forecasts that feed real acquisition decisions. Earlier this month I figured out that for roughly two weeks, most of those numbers had been quietly frozen. Ingestion ran fine. The weekly job logged success. No errors anywhere. A migration had accidentally pointed a database view at its own snapshot, so the scheduled "refresh" was copying stale data onto itself — and the dashboard kept serving plausible, outdated numbers the whole time.

What bothered me most is that my model evals were no help, because no model was wrong. The data layer had failed the same way a model fails: silently, with answers that look fine. So I gave the database the same treatment I'd given the classifier — an evaluation suite. Each check is one SQL query written so that any row it returns is a violation; zero rows means pass. Seventeen of them now run every day. One watches for phantom values — the database's version of "cap this at 2,000" quietly treats a missing unit count as 2,000, so a single blank field can add two thousand fake units to a sum. One catches the same builder appearing under two capitalizations, which splits it into two ranking rows and undercounts both. One checks whether one metro's records are leaking into another's totals. And one compares the newest date the dashboard is showing against the newest date actually ingested — the check that would have caught the frozen view in a day instead of two weeks.

The first run came back fifteen passed, two failed, and both failures taught me something. One had caught three corrupted dates, including a filing recorded in the year 2879, that survived an earlier fix because the bad value had been copied into a downstream table. The other failure was mine: I'd set a contamination alarm so sensitive it flagged sixty-six "violations" that were mostly normal data. I retuned it until it only fires on the catastrophic kind. The first run of a new monitor mostly measures the monitor, not the data.

The model turned out to be just one step that can be confidently wrong. Every step between it and the screen can be too. So now the evals don't stop at the model's output — they follow the number all the way to the page someone acts on.
