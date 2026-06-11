---
title: You can't grade a language model against its own guesses
pubDate: 2026-06-02
description: The fastest way to build a useless eval is to use the model's own output as the answer key.
project: evaluation-framework
tag: AI
tagClass: ai
---

The pipeline classifies every public filing by dwelling type — single-family, townhome, or multifamily — and the dashboard turns those labels into a housing-supply estimate. A wrong label quietly corrupts a number somebody uses to make a decision. So before touching the classifier's prompt, I wanted a way to measure it. My first attempt at one was worse than useless.

Here's the mistake. The classifier writes a dwelling-type value for each filing, and the obvious source of "correct answers" was the column the pipeline had already filled in. I graded the model against it and got a score close to 100%. Which, in hindsight, is obvious: I was asking the model whether it agreed with itself. A test like that can't fail. The scoreboard stays green no matter how wrong the system is, because the answer key came from the system.

Real answers have to come from somewhere the model never touched. I rebuilt the answer set by hand — about ninety filings where I read the source document myself, checked the developer's own website, or matched against a separate county building-permit dataset produced by a completely different process. Each answer is stored with where it came from, so I can defend any label. Graded against that, the score landed in the mid-seventies.

Honestly, mid-seventies stung a little after seeing a near-perfect score. But it was a real number. The fake one would have told me the classifier needed no work; the real one told me exactly where it was weak.

The same logic kept me from the fast, popular option of having a second model do the grading. A judge model shares blind spots with the model it's judging — the same circle, one level up. My comparisons stay dumb on purpose: does the label match, yes or no.

Building the test harness took an afternoon. Finding answers the model had no hand in producing took much longer, and that's the part that makes the score worth anything.
