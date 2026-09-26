---
title: What my data loaders said when every request was refused
pubDate: 2026-09-26
description: I blocked every source in a test, and a large share of loaders still reported success.
project: permit-pipeline
tag: AI
tagClass: ai
---

My supply database is fed by an automated public-records monitoring pipeline. If a source quietly stops returning data, the supply count for that market goes stale while the job still looks healthy. I had already fixed one version of that: a loader that reported success when every request failed. The fix, it turned out, had landed in a loader that no longer runs.

For the supply milestone, recorded responses from real sources go through the real loaders into a throwaway database built from the project's own schema files, and the tools that read those tables are checked afterward. Nine historical fixes are saved as mutations. Each one puts the old behavior back into an isolated copy, and the named check has to fail for that incident's reason, not because something crashed.

The variant that taught me the most was simple: answer every request with an access-denied response. Roughly a third of one family of sources and about a fifth of another still reported success, with zero rows. It was the largest of five fail-open paths the milestone found, and all five are fixed.

The contract also covers the monitors. A new check flags any check that finishes in error twice in a row. Replayed against the real history of the 34-day monitor incident from the isolation post, it fires on day three.

Two findings came from outside the test. A live check found a source that had been returning nothing since at least the end of August while reporting OK. And one table the loaders write to had no creation statement in any schema file; it existed only because it had been made by hand.

<aside class="story-evidence" aria-label="What is still unproven">
<p><strong>NOT YET PROVEN</strong></p>
<p>The fixes are deployed; the first scheduled weekly run with them is Monday, Sep 28. A portal that silently truncates its results could still pass, and that case is tracked as open.</p>
</aside>

The rent tracker and the public demo went through the same recipe afterward. In each case the test that mattered most was the one that removed the input and checked what the system claimed.
