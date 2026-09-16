---
title: "Showing estimated supply without making it look measured"
pubDate: 2026-09-15
description: "A reported unit count, an acreage-based estimate and an unknown count carry different evidence."
project: permit-pipeline
tag: AI
tagClass: ai
---

A public filing can tell me that a housing project exists without telling me how many homes it contains. Some records report lots or units. Others give only disturbed acreage, the land area affected by construction. Treating those records as equally precise would make the supply comparison look more certain than its sources.

My published methodology distinguishes source-reported counts from estimates. When acreage is the available input, the estimate multiplies that area by an assumed density for the dwelling type. The dashboard also caps an acreage-based estimate at 300 units: 80 acres at an illustrative six units per acre produces 300, not the uncapped 480. The result depends on those rules. It is not a count somebody measured on the site.

These invented records show the three cases I want a reader to distinguish. The density below is illustrative, not a recommended planning assumption.

<figure>
<figcaption>Three different bases for a unit count</figcaption>
<table>
<thead><tr><th scope="col">Source evidence</th><th scope="col">Displayed interpretation</th></tr></thead>
<tbody><tr><td>The filing reports 72 proposed units</td><td>72, source-reported</td></tr><tr><td>12 acres × an assumed 4 units per acre</td><td>48, estimated</td></tr><tr><td>No usable count or acreage</td><td>Count unavailable</td></tr></tbody>
</table>
</figure>

A missing count must not quietly become zero. Zero says there are no units; unavailable says the record cannot support a count. Likewise, a reported proposed count is not evidence of completed delivery. The project can change after the filing, or never reach construction.

The checked dashboard code carries an estimate flag into the “(est.)” badge, and its CSV export includes the count basis. The public methodology explains the density calculation but omits the cap. It is not a fresh audit of every live dashboard row or a calibration study comparing estimates with eventual deliveries.

There is useful sensitivity in making the assumption explicit. In the example, changing density from four to five units per acre moves the estimate from 48 to 60 without any new source evidence. A reader who sees only “60 units” cannot tell that the change came from an assumption.

I use estimates to screen where to investigate, then verify a count that matters to an acquisition decision. The estimate extends what I can compare, but I need its basis to remain visible when the number leaves the source record and enters a chart or export.
