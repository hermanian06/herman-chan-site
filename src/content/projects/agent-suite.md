---
title: Multi-agent deal-workflow app
blurb: A single-page HTML app fronting a fleet of specialized Claude agents, one per underwriting task.
order: 3
---

A single-page HTML app with a small fleet of specialized AI agents — one for each task that previously meant me copy-pasting back and forth with a chat window. Each agent is a Claude API call with its own system prompt, output schema, and model choice (Opus for reasoning-heavy underwriting work, Sonnet for batch summarization, Haiku for classification and routing). No build step, no framework — plain HTML, Tailwind via CDN, and a thin JS layer that calls the Anthropic API directly from the browser. The interesting decisions were where to route which model, how to expose enough debugging surface for me without drowning a non-engineer teammate in settings, and how to keep state across turns without inventing a backend.

**Stack:** HTML, Tailwind (CDN), vanilla JS, Anthropic API.
