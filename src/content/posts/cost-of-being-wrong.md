---
title: '"92% accurate" is meaningless without the cost of being wrong'
pubDate: 2026-06-05
description: Not all classification errors cost the same. The eval reports two numbers and ranks every failure by business impact.
project: evaluation-framework
tag: AI
tagClass: ai
---

The classifier sorts housing filings into single-family, townhome, and multifamily. Confusing the first two costs me nothing — both are for-sale product, and nothing downstream changes. Confusing either with multifamily is a different matter entirely: multifamily is rental supply, and rental supply is the metric the dashboard exists to track. Identical accuracy hit, wildly different cost.

So the comparator never reports one accuracy number. It reports two. **Strict accuracy** scores all classes exactly. **Business-bucket accuracy** collapses single-family and townhome into a single "for-sale" bucket and only counts an error when the model crosses the for-sale-to-rental line. On the gold set that's 82.8% strict but 87.1% business-bucket — and the gap between those two numbers is exactly the pile of mistakes that don't matter.

Every failure also gets ranked. A *cosmetic miss* stays inside a bucket — single-family called townhome — so it's logged, not alarming. A *business miss* crosses the for-sale-to-rental boundary; that's the one that escalates to critical. A third tier, *overcommit*, is when the model confidently labels a filing a human expert genuinely couldn't classify. The pipeline's data discipline is null-and-flag, never guess — a missing value beats a wrong one — so a confident wrong answer is a real failure even though it looks like a good-faith attempt. That tier measures whether the model knows what it doesn't know.

Reporting a single number would have hidden all of this. A prompt change could lift strict accuracy while quietly trading harmless errors for boundary-crossing ones: the score goes up, the dashboard gets *less* trustworthy.

"92% accurate" tells a customer almost nothing. The number that matters is accuracy on the errors that change a decision — and you only get that by defining, up front and with the person who relies on the output, which mistakes actually cost something.
