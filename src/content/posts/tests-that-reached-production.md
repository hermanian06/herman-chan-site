---
title: A passing test wrote to my production database
pubDate: 2026-09-26
description: The test checked its result, but nothing stopped it from writing fake rows into the live bug queue.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

My underwriting and supply tools rely on live databases, including the queue where I track bugs. One test wrote fake rows into that production queue. It passed because its assertions checked the result, not whether it had reached a live service.

Other tests had crossed the same boundary: a scratch script ran a rewritten database change against production, and a unit test started a paid scrape of leasing sites. I had treated tests as a safe place to experiment without making that separation real.

I added a guard that loads before the application code in Python tests. It blocks the covered network, database and model API paths and removes credentials, including ones a settings file tries to restore during a run. Tests that need a database use a disposable one built from the project's schema files.

A guard needs its own evidence. Each project replays an old incident against a harmless stand-in for production. The unguarded run has to reach the stand-in; the guarded run has to stop before it does.

This synthetic replay illustrates the two checks:

| Controlled replay | Required result |
|---|---|
| Guard disabled | Stand-in receives the attempted operation |
| Guard enabled | Isolation error; stand-in receives nothing |

An error by itself would not prove the guard worked. The script might have crashed before attempting the operation. The unguarded run establishes that the test can reach the point the guard is meant to stop.

Review also found a route around the guard when a proxy was configured. That was a useful reminder to check how a library connects, not just its usual path.

<aside class="story-evidence" aria-label="What the guard covers">
<p><strong>SCOPE · SEP 26, 2026</strong></p>
<p>The mechanism covers the guarded sockets, database drivers and model API paths inside Python test processes. Separate programs, including browser automation, require additional controls and are blocked by policy instead. The Windows test path had not been run when this was merged.</p>
</aside>

I can now replay those incidents without borrowing the live systems I depend on for deal work. The scope still matters whenever I add another way to connect.
