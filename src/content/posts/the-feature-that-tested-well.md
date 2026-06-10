---
title: The feature that tested +7.5 points and changed almost nothing
pubDate: 2026-06-08
description: How the eval caught a leaked metric — and then told me how to make the feature actually useful.
project: evaluation-framework
tag: AI
tagClass: ai
---

I built what looked like an easy win for the classifier: a lookup of developers I'd seen before, so that when a filing came from a developer I knew builds apartments, the model would lean multifamily. I ran the eval and accuracy jumped from 82.8% to 90.3%. Seven and a half points for an afternoon of work. I came very close to shipping it.

What stopped me was checking where the lookup list had come from. I'd built it out of the same labeled filings the eval grades against. So of course the score jumped — the feature had already seen the answer key. The test wasn't measuring whether the lookup helps on new filings; it was measuring how well it memorized old ones. The +7.5 wasn't real, and I threw it out.

The honest test was data the lookup had never seen: 160 fresh filings out of production. On those, the feature changed 1.9% of rows — and when I read every changed row, each one was a single-family-to-townhome flip you could argue either way. The eval had just stopped me from shipping a feature that demoed beautifully and did basically nothing.

Here's the part I didn't expect. The cost-of-errors framing I'd set up earlier told me how to salvage it. I restricted the lookup so it only fires when its override would cross the for-sale-to-rental line — the boundary that matters — and never on the cosmetic flips. Re-tested on fresh rows: still about 1.9% changed, but now the changes were two apartment complexes the base model had called single-family, plus one filing wrongly called multifamily, corrected. A noisy feature turned into a narrow safety net.

One small habit made these comparisons possible at all: eval runs are pinned so the model answers the same way every time. Before that, the same test scored 76% on one run and 78% on the next — two points of pure noise, plenty to fake or hide a real change.

Tune a feature on your test set and you're grading memorization. Fresh data, errors weighted by what they cost, runs you can reproduce — that combination caught a vanity metric, then showed me what the feature was actually for.
