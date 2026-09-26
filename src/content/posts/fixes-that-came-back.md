---
title: My tests passed. The next tool still read the wrong number.
pubDate: 2026-09-26
description: A passing parser test could not tell me whether the saved workbook supplied the right number to the next tool.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

A broker's income statement passes through several of my tools before anyone prices a deal off it. One reads the file, another writes the underwriting model, and a third decides whether the pack is ready for review. A test at the first step cannot tell me whether the last tool read the right number.

In my September retrospective, a separate AI reviewed a month of bug records across seven projects. About one in four fixes were reworking an earlier fix or repairing something a fix had broken. Some were caught before anything shipped, so that is a rework rate, not a count of production failures.

I already asked the AI to write a failing test before fixing a bug. But those tests often stopped at the function being repaired. They did not follow the saved file into the next tool. Expected answers were also often copied from what the code produced that day.

I started calling the broader check a chain contract: a test that follows a source through the real processing code, the saved output and the tools that consume it. Its expected answer comes from evidence outside the code being tested. For an income statement, that includes the statement's own printed totals.

This synthetic example shows the gap:

```text
Statement's printed annual income: $120,000

Parser reads                       $120,000
Saved analysis contains            $120,000
Model reader returns                     $0  <- contract fails
```

Checking the parser alone would miss that failure. Deriving the expected answer from the model reader's own incorrect output could also produce a passing test.

The contract uses scrubbed source files that retain their layouts, runs the real code, then saves and reopens the output. It checks the named downstream readers against independently recorded expectations. Coverage stops at those selected layouts and readers; it does not establish that every possible statement works.

For deal review, I want to trace an actual in the model back to the statement that supplied it. This gives me a way to test that path before using the workbook.
