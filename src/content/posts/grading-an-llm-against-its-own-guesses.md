---
title: "How I built an independent test set for the supply classifier"
pubDate: 2026-06-02
updatedDate: 2026-09-15
description: "The classifier's existing answers could not also be its answer key."
project: evaluation-framework
tag: AI
tagClass: ai
---

A housing-type label is an intermediate result in my supply pipeline. It eventually affects which projects appear in a market comparison. Before changing the classifier, I needed a way to tell whether its new answers were better.

My first evaluation used labels the pipeline had already filled in as the expected answers. That measured agreement with an earlier output. It could detect a change, but it could not establish that either answer was correct. A stable mistake would look like success.

I rebuilt the answer key around evidence outside the classifier's predictions: source documents, developer material and separate permit records. A golden case is a saved input paired with an expected answer and a reason to trust that answer. The comparison itself can be ordinary code. The difficult judgment is deciding what the source actually supports.

<figure>
<figcaption>Illustrative evaluation case, not an actual filing</figcaption>
<table>
<tbody><tr><th scope="row">Input</th><td>A filing describing an apartment building</td></tr><tr><th scope="row">Expected label</th><td>Multifamily</td></tr><tr><th scope="row">Independent support</th><td>A separately reviewed permit document</td></tr><tr><th scope="row">Model prediction</th><td>Kept separate until comparison</td></tr></tbody>
</table>
</figure>

The current evaluation structure distinguishes representative cases from collections built around known failures. Both are useful, but they answer different questions. A targeted set tells me whether a particular weakness remains. It cannot tell me how often that weakness occurs across all incoming filings. Mixing those cases into one headline score would hide the sampling choice.

The source review checked the evaluation policy and stored-case structure. It did not independently reread every underlying document or run a new model evaluation, so I am not presenting a current accuracy score. A field saying that a label was reviewed is a record of a process, not a substitute for the supporting evidence.

An answer key can also contain mistakes. If a source is ambiguous, forcing a specific dwelling type into the expected answer would reward the model for guessing. I need an unknown option and a review trail for changed labels. When a score changes, I want to know whether I changed the model, the sample or my definition of the correct answer.
