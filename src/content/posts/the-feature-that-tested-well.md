---
title: The feature that tested +7.5 points and changed almost nothing
pubDate: 2026-06-08
description: How the eval caught a leaked metric — and then told me how to make the feature actually useful.
project: evaluation-framework
tag: AI
tagClass: ai
---

I built an enrichment layer for the classifier: a lookup of developers I'd seen before, so that when a filing's developer was one I knew built apartments, the classifier would lean multifamily. I ran the eval. Accuracy jumped from 82.8% to 90.3% — +7.5 points for an afternoon's work. I almost shipped it.

Then I looked at where the developer lookup came from. I'd built it out of the same labeled cases the eval grades against. Of course it scored higher: it had effectively memorized the answer key. That's a leaked metric — the +7.5 was measuring memorization, not skill — so I threw the number out.

The honest test was fresh data: 160 production filings the lookup had never been tuned on. The real impact was that it changed **1.9% of rows**, and on the first pass every change was a cosmetic single-family-to-townhome flip of debatable correctness. The eval had stopped me from shipping a feature that demoed beautifully and did essentially nothing.

But the same cost lens I'd built earlier told me how to fix it. I restricted the layer to fire only when its override would cross the for-sale-to-rental boundary — never on cosmetic flips. Re-measured on fresh rows: still about 1.9% changed, but now every change crossed the line that actually matters. It caught two apartment complexes the base model had labeled single-family, and corrected one filing it had wrongly called multifamily. A churny feature became a surgical safety-net.

One quieter decision made all of this legible: I force `temperature=0` for eval runs, even though production runs at the default. Before I did, two runs over the same gold set landed 76% then 78% — about ±2% of pure sampling noise, more than enough to manufacture or mask a +7.5 swing. You can't interrogate a number you can't reproduce.

If you tune on your test set, you measure memorization, not generalization. The discipline that exposed the vanity metric — hold the data out, weight errors by cost, make the run deterministic — turned out to be the same discipline that told me how to make a near-useless feature genuinely useful.
