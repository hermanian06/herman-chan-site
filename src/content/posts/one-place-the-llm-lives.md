---
title: The one place the LLM lives in my data pipeline
pubDate: 2026-05-25
description: Dozens of Python tools, exactly one LLM call per document. The boundary is the design decision.
project: permit-pipeline
tag: AI
tagClass: ai
---

I monitor public-records sources across several Sunbelt markets to catch new build-to-rent supply weeks before it shows up in the commercial datasets. The pipeline behind that is dozens of small Python tools, and in the whole thing there is exactly one language-model call per document.

Everything else is ordinary code. Fetching pages, logging in, saving and de-duplicating records, applying the classification rules, drawing the dashboard — none of that needs a model, so none of it gets one. The model is saved for the one step where plain code genuinely can't cope: turning a scanned government form, with free text and handwritten corrections and dates in four different formats, into thirty clean database fields.

I didn't start with that philosophy. I got there through the math. If every step in a chain is 90% reliable, five chained steps land you around 59%. A model is the least reliable step you can add, so you want as few of them as possible, doing only the work nothing else can do. A few lines of code can normalize a county name correctly every single time. No code can reliably pull the right LLC name out of a flattened scan with notes in the margin — that's the model's job, and it's the only job it gets.

The tempting version is the opposite. Hand the model everything — let it browse, extract, validate, classify — because that demos great on day one. Then the errors compound, and you spend week three trying to figure out which of five model steps is the one lying to you.

So the question I actually sweat isn't which model or what prompt. It's where the boundary sits: what stays code, and what one thing the model does. Getting that line right mattered more than anything else in the build.
