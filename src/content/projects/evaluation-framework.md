---
title: Evaluation framework
blurb: A labeled gold-standard set plus scoring scripts I use to catch regressions before merging prompt or model changes. Primary subject is the document-extraction step inside my supply pipeline — the highest-volume call to a language model in my stack.
order: 5
status: Coming soon
statusClass: idle
role: Sole builder & operator
for: My language-model stack — extractors, classifiers, retrievers
since: 2026
category: Internal tooling · evaluation
stack:
  - Python
  - pytest-style runner
  - Anthropic API
  - Postgres
---

A small framework for catching regressions in my language-model systems before they ship. Each evaluation is a labeled gold-standard set plus a scoring function: for an extractor, field-level exact-match with numeric tolerance; for a classifier, accuracy plus a confusion matrix; for a retriever, how many of the right sources land in the top five results and how high up the list. Multiple evaluations route through the same runner. The accuracy delta after a change is the only gate on whether the change ships.

The primary subject is the document-extraction step inside the off-market and supply pipeline. It's the highest-volume call to a language model in my stack — every public filing the pipeline ingests runs through it — and the one most expensive to silently regress, because a wrong field can land the wrong deal on the dashboard. The gold-standard set is roughly two hundred labeled documents spanning the edge cases that took me six months to catalogue: co-permittees, single-lot vertical filings, road projects that were misclassified as residential.

The second evaluation will be a property-type classifier on the same pipeline — easier to label, faster to run, useful as a sanity check that the framework itself is correct before I trust it on the higher-stakes extractor. After that, the deal-document search system is next in line.

What I actually want to surface here isn't an accuracy number — those will drift as the systems evolve. It's the workflow: a labeled set, a runner, a regression-catch story, and a rule against shipping prompt or model changes that move the number the wrong way. That's what "evaluation frameworks" actually points at as a discipline.

**Status:** in build. The harness comes first; the labeled sets get backfilled from the extractor's history of mistakes.

**Stack:** Python, pytest-style runner, Anthropic API, Postgres for evaluation results.
