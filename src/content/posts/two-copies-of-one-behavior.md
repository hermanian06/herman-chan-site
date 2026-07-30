---
title: Two copies of one behavior will drift apart
pubDate: 2026-08-10
description: My analysis scripts exist twice — a Windows version and a Mac twin. A bug fixed in one stayed alive in the other for seven months.
project: skills-suite
tag: AI
tagClass: ai
---

My deal-analysis skills drive Excel, and Excel automation differs enough between Windows and Mac that each script exists twice: a Windows version and a Mac twin that produce the same workbook through different plumbing. Twins sound tidy. In practice, two implementations of one behavior are a promise that they'll stay identical — and for a long time, nobody was checking the promise.

This month I found a bug in one twin that had been fixed in the other seven months earlier. The fix was real, documented, tested — on one side. Nobody carried it across, because back then the other twin wasn't the one misbehaving. The stale copy only surfaced when a deal re-ran a workbook it had already built once and crashed. Re-running an already-finished analysis is exactly the path no routine test exercises, so the bug got seven quiet months.

There was a smaller, dumber version of the same thing in the same stretch: the twins share a naming convention for their common functions, and one referenced a shared function under the other twin's prefix. It worked in every test that didn't touch that corner, and failed in the one that did.

Two changes since. A fix in either twin now includes, in the same sitting, a sweep across every sibling script for the same shape of mistake — not the same line, the same pattern. And I'm partway through a set of conformance checks that run both twins over the same small fixture workbooks and compare the outputs cell by cell, so "the twins agree" becomes a test result instead of a belief.

The underwriting version of this is familiar: two analysts each maintaining their own copy of the same model will diverge, silently, until the day a deal lands on the difference. I knew that about people. I keep having to relearn it about code.
