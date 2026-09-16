---
title: "Making the rent schedule and freshness checks agree"
pubDate: 2026-09-15
description: "A market that is not due this week should not look like a failed collection run."
tag: AI
tagClass: ai
---

A rent observation gets older even when its collection job runs exactly as designed. Once markets follow different collection cycles, “nothing arrived this week” can mean a missed run or an intentional off-week. A monitor that ignores the schedule cannot distinguish them.

I put the cadence rules in a shared module used by collection and freshness checks. Cadence is simply when a market is due. The runner uses that decision to select work; the monitor uses it to judge whether the missing work is actually late. Keeping separate copies of the schedule would create another place for the two systems to disagree.

One detail is easy to miss in the language: every four weeks is not once per calendar month. Four-week intervals repeat after twenty-eight days and drift through month boundaries. Calling that “monthly” in a monitor can produce an incorrect expectation even if the collection code has no bug.

<figure>
<figcaption>Questions a freshness check needs to answer</figcaption>
<table>
<thead><tr><th scope="col">Schedule and run evidence</th><th scope="col">Interpretation</th></tr></thead>
<tbody><tr><td>The market is not due</td><td>An off-week is expected</td></tr><tr><td>Due, an attempt failed</td><td>A known collection failure</td></tr><tr><td>Due, no run started</td><td>A missing scheduled attempt</td></tr></tbody>
</table>
</figure>

The local schedule tests use fixed dates rather than the wall clock. That makes week selection and boundary cases repeatable. Freshness checks can then ask what should have run on that date before inspecting what actually ran. A test that merely expects “recent data” would miss the product decision encoded in the collection interval.

This still leaves two separate concerns. A scheduler can correctly choose a market and its reader can return stale or empty data. Conversely, valid older observations may be the intended output of a slower schedule. Job timing does not establish source quality, and a green scheduling check should not imply that it does.

A longer interval reduces collection frequency while giving me older comparables between runs. That is a tradeoff I need to choose for the investment question. Shared schedule logic makes the expectation consistent; it does not make an infrequent observation fresh.
