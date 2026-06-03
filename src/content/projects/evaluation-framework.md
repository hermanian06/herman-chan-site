---
title: Evaluation framework
blurb: A labeled gold-standard set plus scoring scripts to catch regressions before merging prompt or model changes. Built first for the property-type classifier in my supply pipeline — independently-labeled goldens, cost-sensitive scoring, deterministic runs — and extending to the higher-volume document-extraction step.
order: 5
status: In production
statusClass: live
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

The first evaluation I built grades the property-type classifier inside the off-market and supply pipeline — the step that sorts each filing into single-family, townhome, or multifamily and feeds the dashboard's housing-supply estimate. A wrong label silently corrupts that number. Its gold set is built from sources independent of the model — a human reading the source document, the developer's own web presence, and a separate county building-permit dataset — because grading the classifier against its own output is circular: it scores near-perfect while the system is quietly wrong. Scoring is cost-sensitive — an error that crosses the for-sale-to-rental line counts for more than one that stays inside it — and deterministic, so a change reads as signal rather than sampling noise. Baselined across two markets so far.

Next is the higher-stakes target: the document-extraction step that turns each filing's PDF into roughly thirty structured fields. It's the highest-volume language-model call in the stack and the most expensive to silently regress, scored on field-level exact match with numeric tolerance. After that, the deal-document search system is next in line.

What I actually want to surface here isn't an accuracy number — those will drift as the systems evolve. It's the workflow: a labeled set, a runner, a regression-catch story, and a rule against shipping prompt or model changes that move the number the wrong way. That's what "evaluation frameworks" actually points at as a discipline.

**Status:** live. The classifier eval is built — independently-labeled gold set, cost-sensitive scoring, deterministic runs, persisted to Postgres, regression-aware — and baselined on two markets. The document-extraction eval is the next build.

**Stack:** Python, pytest-style runner, Anthropic API, Postgres for evaluation results.
