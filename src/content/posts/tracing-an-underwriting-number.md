---
title: "Tracing an underwriting number back to its source"
pubDate: 2026-09-15
description: "A review output needs to explain where a value came from and what was checked."
project: underwriting-agent
tag: AI
tagClass: ai
---

When an underwriting number looks wrong, my first question is where it came from. A plausible total is hard to investigate if the output only gives me the final answer. I need to see the source, the calculation and the limits of the check.

The deal record carries provenance: information about where a value came from and how it was produced. A directly read field can point to a document and location. A derived field records the inputs it depends on. The review output then exposes those references beside the calculation, instead of making me reconstruct the chain from a model's explanation.

The current public sample provides a concrete example. Its audit trail identifies the summary's unit count as derived from the uploaded rent-roll rows. The Rent roll analysis → Audit trail compares the resulting 334 units with the source's stated 334. That confirms one reconciliation, not every choice made while reading the roll.

<figure class="story-flow">
<figcaption>A trace visible in the public sample</figcaption>
<ol><li><strong>Source rent roll</strong>Unit rows and the export's stated count.</li><li><strong>Derived count</strong>Repeated unit rows are resolved before counting.</li><li><strong>Review output</strong>The calculated count and source count appear together.</li></ol>
</figure>

The same sample explains why checking a total is not enough. A unit can appear twice during turnover. If both rows carry the same market rent, keeping the wrong lease row can leave the market-rent total unchanged while changing in-place rent. A separate row-choice check is needed to catch that error.

The rendered output also defines `NOT CHECKED` for a total the source never stated. That result must remain visible: there is no source total to reconcile against. It should not be counted as a successful comparison simply because the calculation finished.

For this post, I traced the rendered sample and its provenance fields; I did not independently re-underwrite the original deal. You can inspect the same evidence in the [underwriting sample](/underwriting-agent/#sample).

A source location makes review possible. It does not prove the selected column has the right meaning, or that the document itself is accurate. My aim is to make the next question specific: which source cell, which interpretation or which calculation needs checking?
