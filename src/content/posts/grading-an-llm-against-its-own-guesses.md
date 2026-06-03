---
title: You can't grade a language model against its own guesses
pubDate: 2026-06-02
description: The fastest way to build a useless eval is to use the model's own output as the answer key.
project: evaluation-framework
tag: AI
tagClass: ai
---

The supply pipeline classifies every public filing by dwelling type — single-family, townhome, or multifamily — and the dashboard turns those labels into a housing-supply estimate (roughly, acreage times a density factor that depends on the type). A wrong label silently corrupts the number someone is making a decision on. So before I touched the classifier's prompt, I wanted an evaluation. My first version of it was worse than useless.

The classifier writes a `dwelling_type` value for each filing. The obvious ground truth was sitting right there: the column the pipeline had already populated. Graded against it, the classifier scored near 100%. Of course it did — I was asking the model whether it agreed with itself. That's circular evaluation, and it's the most common silent failure I see in eval design: the harness lights up green while the system is systematically wrong, because the answer key *is* the system's own output.

Real ground truth has to come from somewhere the model can't see. I rebuilt the gold set from independent sources — a human reading the source document, the developer's own web presence, and a separate county building-permit dataset produced by an entirely different process. Around ninety cases, verified by hand, each stored with the exact model input and the provenance of its label. The score dropped to 76%. But 76% was a number I could trust.

The same reasoning kept a language model out of the grading path entirely. Using a model to judge a model is fast and tempting, but the judge inherits the classifier's blind spots — circular again, one layer up. Comparison stays plain deterministic equality.

An eval is only as trustworthy as the independence of its ground truth. Building the harness is the easy half. Sourcing labels the model had no hand in producing is the half that decides whether the accuracy number means anything at all.
