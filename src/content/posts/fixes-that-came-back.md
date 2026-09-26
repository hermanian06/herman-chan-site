---
title: About one in four of my bug fixes were reworking an earlier fix
pubDate: 2026-09-26
description: I already wrote the failing test first. Each test was only looking at one piece of the chain.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

A broker's income statement passes through several of my tools before anyone prices a deal off it. One reads the file, another writes the underwriting model, and a third decides whether the pack is ready for review. A mistake anywhere in that path ends up as a wrong number in the workbook.

In September I had a separate AI go through a month of bug records across seven of my projects. About one in four fixes were reworking an earlier fix or repairing something a fix had broken. The reviewer made me word that carefully: some were caught before anything shipped, so it is a rework rate, not a count of production failures. One fix took 38 review rounds.

The surprise was that my habit of writing the failing test first was being followed in most fixes, and in some projects nearly all of them. The problem was what each test could see. One checked the parser, another the readiness check, another the workbook writer. Expected answers were often copied from what the code produced that day. Nothing ran a real file all the way through. In the projects where the review counted how bugs were found, most came from the outside reviewer or from running on real data. Only a handful came from an existing test going red.

So I adopted what I call a chain contract. A sanitized real file goes through the real code, the output is saved and reopened, and every tool that reads it is checked. The expected numbers come from the source's own printed totals.

<figure class="story-flow">
<figcaption>What one chain contract covers</figcaption>
<ol>
<li><strong>Real input</strong>A scrubbed source file with its original layout.</li>
<li><strong>Saved output</strong>Written by the real code, then reopened.</li>
<li><strong>Every reader</strong>Checked against the source's printed totals.</li>
</ol>
</figure>

I ran it as six milestones over a few days:

| Milestone | What it added |
|---|---|
| Isolation | Tests cannot reach production |
| Release record | Proof the required tests ran on the shipped version |
| Underwriting | Income statement to model to audit |
| Supply | Public-records loaders to database |
| Rent | Weekly leasing-site run to comp selection |
| Public demo | Upload to every file the site serves |

Each one found bugs that were still live. The next four posts cover the ones I learned the most from.
