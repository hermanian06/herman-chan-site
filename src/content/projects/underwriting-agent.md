---
title: Underwriting agent
blurb: A case study of the pipeline that turns a deal's offering memo, income statement and rent roll into an Excel analysis pack, and of the checks that decide whether a number is allowed out.
order: 3
status: Live
statusClass: live
role: Sole builder & operator
for: My own underwriting, plus a public demo
since: 2026
category: Case study · agent
seriesPosts: false
stack:
  - Python
  - Anthropic API
  - Excel
  - PostgreSQL (Supabase)
  - Railway
stats:
  - num: "3"
    label: Source documents in, one Excel pack out
  - num: "Under $0.50"
    label: Model cost per demo run, measured
  - num: "High 90s"
    label: Percent of income-statement lines categorised the way a hand-labelled answer key has them
timeline:
  - when: "Summer 2026"
    what: "The private deal pack runs its first deals end to end: income statement, rent roll, deal summary, then the model inputs."
  - when: "Sep 2026"
    what: "The public demo is built as a reduced copy of the same pipeline, with a synthetic sample deal."
  - when: "Sep 2026"
    what: "The automated confidentiality-agreement step is retired. A person signs and downloads; the agent takes over from there."
  - when: "Sep 2026"
    what: "Uploads open on the demo: anyone can run their own three documents through it."
---

This page walks through what the underwriting agent does, how a deal moves through it, and how I decide whether its numbers can be trusted. The outputs themselves are one click away: the [sample deal](/underwriting-agent/#sample) shows every tab, and the same page takes [your own files](/underwriting-agent/#try).

## The problem

Before an acquisitions team can form a view on a deal, someone has to turn three documents into numbers. The offering memo gives the property facts. The trailing-twelve-month (T-12) income statement has to be sorted into standard income and expense categories. The rent roll, the unit-by-unit lease list, has to be grouped by floor plan with in-place rents kept apart from recent leases. None of this is judgement. It takes hours per deal, and a mistake in it flows straight into the price.

The agent does that preparation. It does not decide anything. Every pack comes to me for review before it is used.

## How a deal moves through it

There are two versions of the pipeline. The private deal pack runs on real deals and fills my existing Excel workbooks. The public demo is a reduced copy of it that runs in the cloud and writes its own workbook. The design is the same in both.

1. **A person gets the documents.** The broker's confidentiality agreement is signed by a person, and the data room is downloaded by a person. I built and ran automated signing, then retired it: every broker portal behaves differently, and the step with legal weight should have a human on it.
2. **The deal is filed and queued.** One command files the documents into a deal folder, records the asking price, and adds a row to a work queue in the database.
3. **A worker claims the deal.** A second machine that has Excel checks the queue, claims the deal atomically so no two workers pick up the same deal, and runs the analysis steps in order: the income statement and rent roll first, then the deal summary that depends on them. The two machines never talk to each other directly. The queue is the entire interface between them, so the worker can move to another host without redesigning anything.
4. **The model maps and Python counts.** A language model reads labels and column headers and says what each one is: which line is repairs, which column is current rent. Python then reads the numbers using that mapping and does every calculation. The model never retypes a figure. ([More on that split](/posts/the-model-maps-python-reads/).)
5. **Market context is added.** The property's location connects it to my own rent and supply databases and to public demographic data. Where a source has no coverage, the tab says so instead of guessing.
6. **Totals are checked against the source.** See the next section.
7. **The pack is filed for review.** The workbooks land in the deal folder with source references beside each figure, and anything that failed a check is flagged. I review and correct them before any number is used.

## Checking the numbers

A plausible total is the dangerous kind of wrong. Every check in the pipeline compares its answer with something the pipeline did not produce itself.

The statement's own totals are the answer key. After the model categorises every line of an income statement, the engine's revenue, expense and net operating income must equal the totals printed on the statement. If they do not, the figure is withheld and the output names the lines responsible. It is not rounded into agreement. The sample deal's T-12 audit trail shows this check passing.

The check exists because of a real miss. On a live deal's income statement, an early version of the pipeline was off by $1.3 million of net operating income. The statement printed its own total income, total expenses and NOI rows, and the pipeline found them. Then it used none of them. A keyword layer sorted 141 of the 204 lines without ever asking the model. The model sorted the rest without being told whether a line sat in the income or the expense section. The $1.3 million gap showed up in the workbook's own error check, and nothing stopped it. Now the model is shown each line's section, and the result has to match the statement's printed totals to the cent or it is withheld. Another statement printed an adjusted operating-income line above the true bottom line. The gate now takes the last named subtotal, and that statement is pinned in the test suite.

Every fix starts with a failing test. The test is written from what the answer should be, shown failing, and then shown passing after the fix, and it stays in the suite. A test that learns its expected answer from the code it checks proves nothing. ([The incident that set this rule](/posts/a-test-that-was-never-red/).)

Before a fix is committed, a model from another provider reviews the diff as an adversary. Its findings are checked one by one, and the confirmed ones become tests. ([Why the reviewer can't be the author](/posts/the-reviewer-cant-be-the-author/).)

The published path is tested end to end. One test uploads real-shaped files to the real served process and follows them through parsing, the tie-out, the publishing gate and the downloaded workbook. It also re-runs four historical bugs to confirm that each is still caught.

Last, nothing private reaches this site by accident. Every file bound for the site passes a scan for private names, paths and terms first. It covers workbook cells and file metadata, not only the text on screen.

## What it costs

The model is used for reading and categorising, not for arithmetic, so each run needs only a handful of calls. In my measured runs, a three-document upload cost under fifty cents in model usage and finished in about a minute. A hard daily budget stops runs before they would stop part-way through. Every call is logged with its feature, tokens, latency and errors. ([How the cost is tracked](/posts/tracking-model-cost-and-failures/).)

## What is not public

The sample deal is synthetic at a real address. Its financials are invented, but the market tabs are real pulls for that location. Pricing on every public surface is illustrative. The private pack's workbooks and the deals it runs on stay private. The demo shows the same pipeline with its own output format, and a few internal-only sections are marked as such rather than silently left out.

## What I would do next

Categorising within a section is still the model's judgement. On the statements I have measured, the model's choices differ from a hand-labelled answer key on a few lines. These differences never move a total, because the tie-out catches anything that does, but I would like fewer of them. The next step is a larger answer key built from statements the model has never seen.
