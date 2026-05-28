---
title: The one place the LLM lives in my data pipeline
pubDate: 2026-05-25
description: Dozens of Python tools, exactly one LLM call per document. The boundary is the design decision.
project: permit-pipeline
tag: AI
tagClass: ai
---

I monitor public-records sources across several Sunbelt markets to catch new build-to-rent housing supply weeks before it shows up in commercial datasets. The pipeline has dozens of Python tools and exactly one language-model call per document.

That one call is where the model lives. Everything else — pagination, session navigation, UPSERTs, dedup, rule-based classification, dashboard rendering — is deterministic Python. The LLM sits at the single step where structure-from-unstructured is genuinely hard: a free-text scanned form, with handwritten overrides, alias parentheticals, and dates in any of four formats, becoming roughly thirty schema-typed fields.

This isn't aesthetic. The math forces it. If each step in a chain is 90% reliable, five steps compound to ~59%. Pushing as much of the pipeline as possible into deterministic code keeps the probabilistic layer focused on the one job it's actually best at. A regex can normalize a county name. Only a model can pull a properly-cased LLC out of a flat-rendered scan labeled "Owner (Permittee)" with handwritten margin notes.

The common failure mode I see in AI portfolios is the inverse: throw it all at the model. Let it handle pagination *and* field extraction *and* validation *and* downstream classification, then watch error rates compound. It's faster to demo and slower to trust.

The real design decision in any LLM-augmented pipeline isn't "what model" or "what prompt." It's the boundary — which steps stay deterministic, and which step gets the model. For me, that boundary lives at PDF-to-schema. The pipeline became reliable the day I stopped trying to extend the model's footprint upstream into navigation or downstream into business logic.

Identifying that single step is where the engineering judgment goes. The model itself is the easy part.
