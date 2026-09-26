---
title: A missing total is not a zero
pubDate: 2026-09-26
description: A reader turned a missing T-12 total into 0, three checks passed and the model shipped a column of zeros.
project: underwriting-agent
tag: AI
tagClass: ai
---

On an underwriting model, the T-12 column is where the property's actual trailing income and expenses land next to the broker's pro forma. In one run, that column shipped as zeros. The T-12 reader could not find a total, recorded it as 0, and three separate readiness checks passed because zero is a perfectly valid number.

The first two repair attempts went too far the other way and treated every zero as unreadable. A property with no pet income really does have zero pet income. The rule I settled on is that each read comes back as one of three things: read, unreadable or absent. A zero that was actually read is valid. A read that failed cannot supply a number.

That fix became the first full chain contract. Four sanitized broker statements, each with a different layout, go through the real T-12 builder, the saved workbook is recalculated, and every downstream reader is checked through to the audit verdict. Layouts, labels and subtotal rows are kept; amounts are scaled by one factor and names replaced. The expected values come from each statement's own printed totals, written into the test, never from what the parser produced.

Building it surfaced three things I did not expect:

- The files the bug review had named as consumers never read a T-12 cell. The real reader lived somewhere else.
- The readiness check reported complete over a T-12 that Excel had never calculated.
- A model rebuilt with no T-12 kept the previous run's actuals in the column. Now the column is empty.

Changing a readiness rule on live deals is its own risk, so I ran the new check over about sixty current deal folders before merging. No verdict changed.

<aside class="story-evidence" aria-label="What the contract does not cover">
<p><strong>OPEN</strong></p>
<p>Both legs are verified on the Mac. On the first Windows release record, the live-Excel leg passed but the main contract test failed. That failure is tracked as its own issue.</p>
</aside>

What I wanted was a model where every actual in that column was either read from the statement or visibly missing. That is what the test now checks.
