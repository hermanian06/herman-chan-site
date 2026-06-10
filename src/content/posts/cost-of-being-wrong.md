---
title: '"92% accurate" is meaningless without the cost of being wrong'
pubDate: 2026-06-05
description: Not all classification errors cost the same. The eval reports two numbers and ranks every failure by business impact.
project: evaluation-framework
tag: AI
tagClass: ai
---

The classifier sorts housing filings into single-family, townhome, and multifamily. Mixing up the first two costs me nothing — both are for-sale product, and nothing downstream changes. Mislabeling either one as multifamily is a real problem, because multifamily is rental supply, and rental supply is the number the whole dashboard exists to track. The same size of error on a test sheet, a completely different size of error in the business.

That's why my eval reports two scores instead of one. The strict score counts every miss. The second score collapses single-family and townhome into one for-sale bucket and only counts a miss when the model crosses from for-sale to rental. On my hand-verified answer set the model is 82.8% strict and 87.1% on the bucketed score, and the gap between those two numbers is exactly the pile of mistakes I don't care about.

Each individual failure gets sorted too. A miss inside the bucket — single-family called townhome — gets logged and ignored. A miss that crosses the rental line gets flagged loudly. And there's a third kind I track separately: filings where a person reading the same document genuinely couldn't tell, but the model answered anyway, confidently. House rule in this pipeline is that a missing value beats a wrong one. So a confident guess on an unanswerable case counts as a failure, even though it looks like a good-faith effort. It's a rough measure of whether the model knows what it doesn't know.

A single accuracy number would hide all of this. You can change a prompt, watch the headline score go up, and never notice you traded harmless misses for boundary-crossing ones. The score improves while the dashboard quietly gets worse.

So when someone tells me a model is "92% accurate," my question now is: accurate on which errors? The ones that change a decision, or the ones nobody would ever notice? You only get that answer by sitting down with whoever uses the output and deciding which mistakes actually cost something.
