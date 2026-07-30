---
title: A fix isn't proven by a test that never failed
pubDate: 2026-08-04
description: The regression test I trust is the one I watched fail first. The other kind has lied to me twice.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

When a bug gets fixed in one of my analysis tools, the fix ships with a test so the bug can't quietly come back. For a while I let those tests be written after the fix, from the code as it stood. That ordering burned me twice in quick succession.

The first time, a tool was scaling a number by the wrong factor — an output coming out a thousand times too small. The test that shipped with the fix was written by reading the code and asserting it did what it did. Except the fix hadn't actually landed in the path that mattered, and the test, derived from the broken behavior, passed anyway. Green checkmark, bug still live. The test wasn't guarding the spec; it was notarizing whatever the code happened to do.

The second time, a supposed fix turned out to have quietly disabled the feature at both places it was used. Every existing test stayed green, because no test had ever pinned the feature as working in the first place.

The rule I run now is strict ordering. Before any fix: write the test from the spec — what the number should be, according to the source document — and watch it fail. That failing run is the only evidence the test can detect the bug at all. Then fix, then watch the same test pass. Red, then green, in that order, with both runs kept as the record.

It sounds like ceremony. It's the opposite. In a build process where models write the code and other models review it, the red-then-green sequence is the one step that can't be faked by a confident model or a tired reviewer — me included.

I'd already learned, and written here, that you can't grade a language model against its own guesses. A test written from the code is the same circle: the code grading itself. Apparently I needed to relearn it with ordinary Python.
