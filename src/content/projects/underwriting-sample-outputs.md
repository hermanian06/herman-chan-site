---
title: AI underwriting pipeline — sample outputs
blurb: A live demo of what the pipeline actually produces from a deal's raw documents — a deal summary with comps, demand and supply; a categorised trailing-twelve analysis; a rent-roll rollup by floor plan; and a manifest of every field it extracts, with the model input each one fills. Previewable in the browser, downloadable as workbooks, built on a synthetic property at a real address with illustrative pricing.
href: /demo/underwriting/
order: 0
status: Live demo
statusClass: live
role: Sole builder
for: Public demo
since: 2026
category: Demo
stack:
  - Python
  - openpyxl
  - Astro
---

A public demo of the output side of my underwriting work. The point it makes: I don't build
financial models, because every shop already has one that took years to earn its
committee's trust. What I automate is the two days of extraction that happen before the
model gets touched — which is why the fourth deliverable is a manifest of every field the
pipeline hands over and the model input each one fills.

The property is synthetic and the pricing is illustrative; its location is real, so the
market tabs are genuine pulls from the same databases a live upload reads. The formats are
written from scratch for this demo, no licensed data source is used anywhere in it, and the
values the internal pipeline produces that the demo deliberately does not are labelled as
such.
