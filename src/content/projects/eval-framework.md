---
title: Eval framework
blurb: A labeled gold-standard set plus scoring scripts I use to catch regressions before merging prompt or model changes. Primary subject is the off-market deal pipeline's PDF-to-schema extractor — the highest-volume LLM call in my stack.
order: 4
status: Coming soon
statusClass: idle
role: Sole builder & operator
for: My LLM stack — extractors, classifiers, retrievers
since: 2026
category: Internal tooling · evaluation
stack:
  - Python
  - pytest-style runner
  - Anthropic API
  - Postgres
---

A small framework for catching regressions in my LLM systems before they ship. Each eval is a labeled gold-standard set plus a scoring function: for an extractor, field-level exact-match with numeric tolerance; for a classifier, accuracy plus a confusion matrix; for a retriever, Recall@K and Mean Reciprocal Rank. Multiple evals route through the same runner. The accuracy delta after a change is the only gate on whether the change ships.

The primary subject is the PDF-to-schema extractor inside the off-market deal pipeline. It's the highest-volume Anthropic call in my stack — every public filing the pipeline ingests runs through it — and the one most expensive to silently regress, because a wrong field can land the wrong deal on the dashboard. The gold-standard set is roughly two hundred labeled PDFs spanning the edge cases that took me six months to catalogue: co-permittees, single-lot vertical filings, road projects misclassified as residential.

The second eval will be the dwelling-type classifier on the same pipeline — easier to label, faster to run, useful as a sanity check that the framework itself is correct before I trust it on the higher-stakes extractor. After that, the Haven Database retrieval system is next in line.

What I actually want to surface here isn't an accuracy number — those will drift as the systems evolve. It's the workflow: a labeled set, a runner, a regression-catch story, and a rule against shipping prompt or model changes that move the number the wrong way. That's what "evaluation frameworks" actually points at.

**Status:** in build. The harness comes first; the labeled sets get backfilled from the extractor's history of mistakes.

**Stack:** Python, pytest-style runner, Anthropic API, Postgres for eval results.
