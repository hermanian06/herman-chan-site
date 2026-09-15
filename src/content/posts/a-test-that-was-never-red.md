---
title: Writing the failing test before an AI fixes the bug
pubDate: 2026-08-04
updatedDate: 2026-09-15
description: A passing test once repeated the code's mistake. The expected answer needed its own source.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

One of my analysis tools once returned a number a thousand times too small. An AI-written fix arrived with a passing regression test, a check meant to catch the same bug later. The problem was still present in the path that mattered. The test had learned its expected answer from the code it was supposed to check.

That changed the order I require. Before the builder fixes anything, I want the expected answer derived from the source document or business requirement. Then I want to see the check fail against the broken behavior. Only after that should the implementation change and the same check run again.

Here is a small illustration using invented values. It demonstrates the failure pattern; it is not a replay of the original incident. Suppose a statement labels amounts “in thousands.” A displayed 2.4 means 2,400 dollars. The expected answer comes from that unit label.

```python
# Broken implementation ignores the source's unit label.
def dollars(amount):
    return amount

assert dollars(2.4) == 2400
```

The proposed change is deliberately small:

```python
def dollars(amount):
    return amount * 1000

assert dollars(2.4) == 2400  # Same expected answer.
```

<aside class="story-evidence" aria-label="Local demonstration result">
<p><strong>LOCAL DEMONSTRATION · SEP 15, 2026</strong></p>
<p>Before: FAIL — expected 2,400, got 2.4.<br>After: PASS — expected 2,400, got 2,400.<br>The same expectation ran both times.</p>
</aside>

A test that instead asserted `dollars(2.4) == 2.4` would pass before the fix and reward the mistake. That is why I ask where an expected answer came from, especially when the same model writes both the function and its tests.

The test also has to reach the function used by the workflow. Correcting an unused helper does nothing for the workbook someone receives. For a real fix, I need the failing case connected to that path, followed by an appropriate output check.

Red then green establishes that this check detects this behavior. It does not prove the unit label was read correctly or that downstream calculations are right. My job is to pin the business meaning and ask for evidence at the point where a wrong answer would affect a deal.
