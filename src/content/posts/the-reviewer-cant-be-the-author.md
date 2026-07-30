---
title: The reviewer can't be the author
pubDate: 2026-08-01
description: A postal-code bug sailed past the model that wrote it and got caught in minutes by a model that didn't.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

My records pipeline pulls a property address out of each government filing, and a small piece of pattern-matching code extracts the ZIP code from it. The model that wrote that code reviewed it, tested it against sample filings, and called it clean. It ran fine for a while. Then a Texas address came back tagged with a New York ZIP code.

The pattern was grabbing the first five-digit number it found — which is usually the ZIP, unless the street number happens to be five digits long. A street number in the ten-thousands looks exactly like a New York postal code if nothing tells you otherwise. Five-digit street numbers are rare enough in my markets that the bug passed every spot check.

Here's the part that stays with me. The cross-vendor reviewer I'd wired into my build process flagged that exact line on its first pass. Not because it's a smarter model — on most tasks I'd rank it below the one that wrote the bug. It flagged it because it was reading the code as text, with no memory of what the code was supposed to do.

An author, human or machine, reads their own work as a record of intentions. I meant to grab the ZIP, so that's what I see the pattern doing. A reviewer with no stake reads what's actually on the page: this matches any five digits, including a street number. The model that wrote it would have made the author's excuse. A different model had no excuse available.

In my day job the equivalent is having someone outside the deal team check the numbers before a deal goes to committee, and everyone accepts that the outside part is what makes it work. It took a wrong ZIP code for me to apply the same rule to machines. The fix took minutes, a regression test now pins it, and the reviewer stays.
