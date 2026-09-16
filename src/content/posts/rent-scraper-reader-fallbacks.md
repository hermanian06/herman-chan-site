---
title: "Why the rent scraper tries more than one platform reader"
pubDate: 2026-09-15
description: "A platform signal on a leasing page does not guarantee its reader can retrieve the rents."
tag: AI
tagClass: ai
---

A leasing website can advertise one software platform while loading its availability from another. That matters when I collect rent comparables: recognizing a vendor's name on the page does not prove that its reader can retrieve the rents.

My scraper separates those two questions. It first fetches the page and finds the platform readers whose detection rules match. It then tries those readers in priority order. A reader that returns neither rent nor availability does not prevent a later matching reader from trying. The model fallback comes after that chain.

That is a different contract from “detect a platform, then scrape it.” Detection is a list of candidates. Successful extraction is the evidence that a candidate worked for this page. A usable group can contain rent or availability; that does not establish that its prices are correct.

<figure class="story-flow">
<figcaption>Simplified control flow, using synthetic results</figcaption>
<ol><li><strong>Two readers match</strong>The page contains signals for both platforms.</li><li><strong>The first returns nothing</strong>The scraper continues to the next candidate.</li><li><strong>The second returns rents</strong>The result is accepted without using the model fallback.</li></ol>
</figure>

The local dispatch tests supply a page with two vendor signals and confirm that both candidates survive in priority order. They also check fetch-failure diagnostics. The continuation loop was inspected in source; the full scraper was not executed. They do not measure how often a real leasing site is recovered by the second attempt.

There is also a reporting limit worth keeping visible. A failed page fetch and a page with no matching platform are distinguished in logs, but both can return an empty list to the caller. Someone looking only at that return value cannot tell which happened. A richer result could carry the failure reason through the same interface as the rents.

Trying another reader costs time, and shared detection rules can become stale when a vendor changes its site. I would measure recovery and latency before adding more attempts. For now, the useful decision is to let an observed extraction result settle the choice of reader, instead of treating a platform hint as certainty.
