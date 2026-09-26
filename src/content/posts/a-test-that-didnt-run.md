---
title: A test that never ran looked exactly like a pass
pubDate: 2026-09-26
description: For twelve days my automated checks started no jobs at all, and nothing I had would have said so.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

Before a new version of the deal-pack code runs on real deals, I want to know which checks ran on that exact version. In September I found out I could not answer that. For twelve days the hosted test service had refused every job before its first step because of an account billing limit. Every run failed, and nothing escalated.

My own test runner had a quieter version of the same problem. A file that was skipped, or could not run at all, looked the same in the summary as a file that passed.

The second milestone was a release record. Each project keeps a list of required test files. Everything is required unless an exclusion names a tracked issue that owns removing it. A record step clones the exact commit fresh, runs the list and writes one row per platform into a database table that only accepts new rows. The table itself refuses a verified row if anything failed, was skipped or did not run. Refused attempts are stored too, so a missing record cannot be mistaken for a clean one.

The first real record was refused. Every required file but one had passed. The last one had printed an announcement that some of its checks were skipped, buried in its output.

Two review rounds then argued about how to detect skips reliably in free text. When the second round circled the same rule as the first, I stopped patching. Now any skip the file announces counts as not run unless the required list explicitly allows it.

<aside class="story-evidence" aria-label="Current state of the release record">
<p><strong>STATUS · SEP 26, 2026</strong></p>
<p>Records are written and verified on the Mac. The first Windows record was refused with dozens of failures, including the underwriting contract test.<br>The deal-pack watcher logs the record but does not yet act on it; switching to enforcement has written criteria that are not met.</p>
</aside>

It is a slightly odd thing to be pleased about, but the refused records are the ones I trust. Each one names exactly what did not run.
