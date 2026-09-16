---
title: "Where I use language models in the supply pipeline"
pubDate: 2026-05-25
updatedDate: 2026-09-15
description: "Structured fields and ambiguous document text need different kinds of processing."
project: permit-pipeline
tag: AI
tagClass: ai
---

A public housing filing can have clean fields for its date and acreage while describing the project in a sentence that needs interpretation. My supply pipeline has to handle both. I do not want the presence of a language model to turn retrieval, date parsing and storage into model tasks as well.

The boundary is specific to each path. Ordinary code fetches records and reads structured fields. A classifier can then interpret ambiguous project text and return a dwelling-type label. Document extraction is a separate model-assisted task where the source format requires it. The system has several such paths; my earlier description of exactly one model call per document was too broad.

In the current filing classifier, the prompt asks for a constrained label. Code normalizes the answer into an allowed value, including a fallback that looks for known label text inside the response. That is a real boundary, but it is not strict JSON-schema validation. The model can still produce a wrong allowed label.

<figure>
<figcaption>Invented text illustrating interpretation and uncertainty</figcaption>
<table>
<thead><tr><th scope="col">Filing description</th><th scope="col">What needs deciding</th></tr></thead>
<tbody><tr><td>New apartment buildings with shared amenities</td><td>Whether the description supports multifamily</td></tr><tr><td>Residential development and associated infrastructure</td><td>Whether there is enough evidence to name a dwelling type</td></tr></tbody>
</table>
</figure>

Another path applies a curated term-based override after the base classifier. That enriched path still calls the base model first. The override is not evidence that those records bypass the model or avoid its cost. Reading the actual call order changed how I should explain the design.

I checked the current classifier and evaluation policy, then used local stubs to exercise response handling. No live model calls were made and no current accuracy or cost reduction was measured. Extraction accuracy and classification accuracy also need separate answer keys; one successful score cannot stand in for both.

A model is useful here because descriptions vary, not because every step benefits from interpretation. If a source starts supplying a reliable structured dwelling-type field, I would revisit the model step for that source. Until then, I need to evaluate the meaning of its answer as well as whether the returned label is allowed.
