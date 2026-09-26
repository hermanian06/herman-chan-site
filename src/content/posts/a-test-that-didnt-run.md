---
title: A skipped test counted as a pass
pubDate: 2026-09-26
description: A release record now distinguishes passing checks from required checks that never ran, on each code revision and platform.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

Before new deal-pack code runs on real deals, I want to know which checks ran on that version. In September I found two different gaps in that evidence.

For twelve days, the hosted test service refused every job before execution because of an account billing limit. Those runs visibly failed, but nothing escalated them. Separately, my local runner could summarize a skipped test as though it had passed. A failure without follow-up and a misleading summary both left me unable to establish what had been checked.

I added a release record tied to an exact code revision and platform. Each project keeps a list of required tests. An exclusion must name a tracked issue that owns removing it. The record step checks out that revision fresh, runs the list and stores the result in a database table that only accepts new rows.

The first real record was refused. Every required file but one had passed; the last had announced a skip in its output. Now an unapproved skip leaves the revision unverified, even when every test that actually ran passed. Refused attempts are stored too.

This synthetic record shows the distinction:

```text
Revision: example-revision
Platform: Windows

Workbook reader       PASS
Model writer          PASS
Source-to-model test  NOT RUN — dependency missing

Verdict: REFUSED
```

The platform is part of the evidence. A passing Mac result does not establish that the same check works with Windows dependencies or Excel automation. I need a record from the machine that will run the work.

<aside class="story-evidence" aria-label="Current state of the release record">
<p><strong>STATUS · SEP 26, 2026</strong></p>
<p>Records are written and verified on the Mac. The first Windows record was refused with dozens of failures, including the underwriting contract test. The deal-pack watcher logs the record but does not yet block execution based on it; the written criteria for enforcement are not met.</p>
</aside>

That leaves an operational gap to close. For now, I have a record that names what failed or did not run, instead of a summary that can make missing evidence look reassuring.
