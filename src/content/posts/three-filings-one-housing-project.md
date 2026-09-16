---
title: "When three filings describe one housing project"
pubDate: 2026-09-15
description: "Counting records is easy. Deciding which records refer to the same development is harder."
project: permit-pipeline
tag: AI
tagClass: ai
---

A housing development can appear in several public-records systems before it delivers a single home. Counting those filings is straightforward. Counting the underlying projects is harder, because the agencies may use different names, identifiers and dates for the same development.

I group supported matches under a canonical project, a common identity that links the source records. The records remain available as separate signals. That preserves the distinction between an early filing, a later approval and another agency's record instead of replacing all of them with one unexplained row.

This invented example shows the intended relationship. The names and records are illustrative, not a real development or a measured match result.

<figure>
<figcaption>Three records, one proposed grouping</figcaption>
<table>
<thead><tr><th scope="col">Source record</th><th scope="col">Name on filing</th><th scope="col">Signal retained</th></tr></thead>
<tbody><tr><td>A</td><td>Juniper Crossing</td><td>Early environmental filing</td></tr><tr><td>B</td><td>Juniper Crossing Phase 1</td><td>Subdivision approval</td></tr><tr><td>C</td><td>Juniper Residential</td><td>Permit record</td></tr></tbody>
</table>
</figure>

Similar names are a starting point, not enough evidence by themselves. The current Phoenix canonicalization code combines normalized names, location and county context to build groups; source identifiers stay with the individual records. I need to inspect both false merges, where separate developments become one, and missed matches, where one development remains duplicated.

Phases make that tradeoff concrete. Two nearby filings with the same developer might describe separate phases whose unit counts should not be collapsed. Conversely, a renamed project can look unrelated even when its site is the same. There is no universally safe rule that “nearby means identical” or “different name means different project.”

The checked evidence for this post is the current grouping implementation and synthetic local examples. No matching-accuracy benchmark or live project audit was run. The current canonical identifiers are also rebuilt with the grouping output; I should not promise that they are permanent external IDs.

That last detail matters to integrations. A client saving a canonical ID forever would need a stronger identity contract than a dashboard that reads the latest grouping. For my supply comparison, I want the common project view and its retained sources together, so I can challenge a surprising count without losing the evidence that produced it.
