---
title: The rent database
blurb: A weekly scrape of every rental community I track across twenty metros — asking rent and net-effective rent per floor plan, with the concession detail that listings sites don't publish. Nearly seventeen thousand communities, built adapters-first so a language model only reads the sites that have nothing structured to read.
href: /demo/rent-database/
order: 1
status: Live demo
statusClass: live
role: Sole builder & operator
for: Public demo
since: 2026
category: Demo · data pipeline
stack:
  - Python
  - Postgres
  - Playwright
  - Anthropic API
---

A weekly census of advertised rents. Each run walks a community's own leasing page, reads
the floor plans off it, and records what every plan is asking alongside what the community
is actually giving away in concessions — the second number being the one you cannot get
from a listings site, and the one that decides whether a rent assumption is honest.

The build is adapters-first on purpose. Most communities run on one of a handful of leasing
platforms, each serving its floor plans from an endpoint with a stable shape, so the
pipeline tries a deterministic reader per platform before it considers spending a model
call. Only genuinely bespoke sites fall through to the language model, and that tail goes
out as one overnight batch at half price. An adapter that cannot find a floor plan fails
loudly; it cannot invent a two-bedroom.

The public page is aggregates — coverage, vintage, unit mix, concession prevalence by
metro — plus a small sample of community names so a reader can see what kind of thing is
in the database. No rents are published against a name.
