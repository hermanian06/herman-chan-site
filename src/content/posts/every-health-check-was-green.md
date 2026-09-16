---
title: "The dashboard was wrong for two weeks. Every health check was green."
pubDate: 2026-06-10
updatedDate: 2026-09-15
description: "Successful ingestion and scheduled jobs concealed a query refreshing its own stale snapshot."
project: evaluation-framework
tag: AI
tagClass: ai
---

In a June incident, my supply dashboard kept showing plausible numbers while the data behind them was frozen. Ingestion ran, the weekly job finished and the surrounding health checks reported success. A migration had made a database view copy its own stale snapshot instead of refreshing from the underlying records.

That is why model evaluation could not catch this failure. The classifier did not have to give a wrong answer. The error was farther downstream, between stored records and the numbers the dashboard served. I needed to check that part of the journey directly.

I added a comparison between the newest relevant source date and the newest date in the served view. The comparison needs matching source semantics: a late-stage permit feed and an early filing feed can legitimately have different dates. It also needs to handle missing data and implausible future dates, rather than letting either produce a reassuring result.

The database assertion below is the actual checked-in query. It returns violations; no returned rows means that this particular assertion found none.

```sql
select metro, view_latest, arm_latest, lag_days, status
from observability.dashboard_view_freshness
where status is distinct from 'ok'
```

Imagine new source records reaching June 8 while the dashboard remains at May 25. Those dates are synthetic. A successful-job check can still pass because the refresh completed; a comparison of served and source dates can expose that it refreshed the wrong thing.

The first monitoring pass also produced an alarm that was too sensitive. I had to distinguish a real cross-market contamination problem from normal repeated names. That adjustment is recorded in the dated migration. I inspected the incident receipt and assertion code; I did not rerun production queries or reconstruct historical logs.

A later September review found another blind spot: ingestion could continue while classification failed. That did not invalidate the dashboard freshness check; it exposed a different condition the check did not cover. I cannot turn a successful check of one stage into a health claim for the whole pipeline.

I now ask what evidence a green indicator actually examined. Process completion, model quality and the correctness of the number on screen need separate checks. When the dashboard is wrong, I have to follow its data path, even if every nearby job says it finished.
