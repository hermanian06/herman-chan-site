---
title: "Tracking model cost and failures across my systems"
pubDate: 2026-09-15
description: "Consistent call records make usage comparable; different failures need different responses."
project: evaluation-framework
tag: AI
tagClass: ai
---

Model calls happen in several parts of my underwriting and data workflows. A total bill tells me that money was spent. It does not tell me which feature spent it, which calls failed or whether a change made one step slower.

I use a shared call wrapper to record system and feature labels alongside usage, latency and errors. A wrapper is a common entry point around the model request. It gives calls from different tools the same reporting shape without requiring every tool to invent its own logging format.

The important operating decision is what happens when that reporting breaks. If primary telemetry storage fails, the storage router tries a local SQLite database. If both destinations fail, it emits a warning and drops the record. A failure to store a metric should not, by itself, discard a useful model response or interrupt the main workflow.

<figure>
<figcaption>Separate failures with different consequences</figcaption>
<table>
<thead><tr><th scope="col">Failure</th><th scope="col">Response</th></tr></thead>
<tbody><tr><td>Primary metrics write fails</td><td>Try the local fallback database.</td></tr><tr><td>Both metric stores fail</td><td>Warn and lose the record; preserve the call's result.</td></tr><tr><td>A budget breach is recognized</td><td>Stop the request before making the model call.</td></tr></tbody>
</table>
</figure>

The budget check is separate because its purpose is to prevent spending. A recognized budget breach intentionally raises an error that stops the call. But an unexpected failure while checking the budget can fail open, allowing the request to proceed. That distinction matters: this is not a guarantee that every spending limit survives every infrastructure failure.

Ten local storage tests passed using fake primary writers and temporary SQLite files. They covered primary success, local fallback and the case where both writes fail. These checks exercise storage behavior without contacting the model provider or the production database. A separate stubbed call check covers the recognized-budget-stop path.

Keeping work running through a telemetry outage leaves gaps in the very dashboard I use to understand it. Local fallback helps, but I still need to notice missing records and inspect warnings. I can choose to tolerate a lost metric more readily than an unnecessary failed underwriting run; I should not then mistake the remaining cost chart for a complete accounting of every call.
