---
title: Every source request failed. The loader reported success.
pubDate: 2026-09-26
description: Zero rows can mean no new records, or that the loader never reached its source. My tests needed to tell those apart.
project: permit-pipeline
tag: AI
tagClass: ai
---

My supply database feeds the market counts I use in deal review. Zero new records can be valid: perhaps no new permits were filed. But zero records after every request was denied means the loader never established what was available.

I had already fixed a loader that reported success when every request failed. The fix, it turned out, had landed in code that no longer runs.

I tested the active path with recorded source responses running through the real loaders into a disposable database. Then I replaced the responses with access-denied errors. Roughly a third of one family of sources and about a fifth of another still reported success with zero rows.

This synthetic comparison describes the distinctions I want to demonstrate:

| Source response | Rows | Required interpretation |
|---|---:|---|
| Successful response, no records | 0 | Valid empty result |
| Every request denied | 0 | Collection failed |
| Some requests denied | Some | Incomplete coverage; not an unqualified success |

The partial-failure row is a rule to test, not a claim that every loader already implements the same behavior.

The broader contract found five paths that could report success despite failure; those fixes are deployed. Nine historical fixes are also saved as mutations: tests deliberately restore an old bug in an isolated copy and require the relevant check to catch it for the right reason. A crash somewhere else does not count.

The contract also checks the monitors. One had remained in an error state for 34 days. Replaying that history against a new rule, which flags two consecutive errors, raises the alert on day three. That is replay evidence, not a claim that the original incident was caught sooner.

<aside class="story-evidence" aria-label="What is still unproven">
<p><strong>NOT YET PROVEN · SEP 26, 2026</strong></p>
<p>The fixes are deployed; their first scheduled weekly run is Monday, September 28. A portal that silently truncates its results could still pass, and that case remains open.</p>
</aside>

When a market shows no new supply, I need to know whether collection succeeded before interpreting the count. These checks give me evidence for that distinction, with coverage limits still to resolve.
