---
title: "Why a rent range is not a list of observed rents"
pubDate: 2026-09-15
description: "Minimum and maximum prices lose the distribution a rent benchmark needs."
tag: AI
tagClass: ai
---

When I compare rents, I often care about the low end of the available inventory. A community's advertised minimum and maximum cannot tell me the average of its lowest five observed rents. They have already discarded the prices in between.

That distinction changed the data contract, the shape of the record each reader must return. Readers preserve actual unit observations, including repeated prices. If two available homes both ask the same rent, those are two observations. Removing duplicates would change the weight of that price in the comparison.

Consider these invented sets of five available homes. Both have the same advertised range, but they produce different averages.

<figure>
<figcaption>Same range, different observed inventory</figcaption>
<table>
<thead><tr><th scope="col">Community</th><th scope="col">Observed asking rents</th><th scope="col">Average</th></tr></thead>
<tbody><tr><td>A</td><td>1,800; 1,800; 1,800; 1,800; 2,200</td><td>1,880</td></tr><tr><td>B</td><td>1,800; 2,200; 2,200; 2,200; 2,200</td><td>2,120</td></tr></tbody>
</table>
</figure>

Both ranges say 1,800–2,200. Creating a fake observation at each endpoint would make the two communities look identical and invent a sample size. It would also erase the repeated prices that explain the difference.

The tracker therefore leaves the observed-rent list absent when a source supplies only a range. A range-only record can still tell me an advertised starting price or broad price band. It cannot support the same calculation as a list of available units. The current comparison falls back to the advertised minimum when observations are absent. That is a different basis from an observed average and should be read that way.

The local contract checks cover preserved repeated observations and the separation between range fields and observation lists. The small example above is synthetic arithmetic, not scraped inventory. It demonstrates why the distinction matters without pretending to measure a market.

The model-output guard catches a particular two-endpoint reconstruction, not every invented distribution. Observed rents have their own limits. Availability can change after collection, and an advertised unit is not a signed lease. I still need collection dates and source context. But when the input really is a set of observed units, I can explain what went into the benchmark; when it is only a range, the record tells me that too.
