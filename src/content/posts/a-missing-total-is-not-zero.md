---
title: A missing total is not a zero
pubDate: 2026-09-26
description: A formula without a saved calculated answer became zero, and the underwriting model treated it as actual income.
project: underwriting-agent
tag: AI
tagClass: ai
---

The T-12 column in an underwriting model puts the property's actual trailing income and expenses next to the broker's pro forma. In one run, that column shipped as zeros and three readiness checks passed.

The generated T-12 analysis contained formulas, but the saved workbook did not contain their calculated answers. My reader received a missing value and converted it to zero. The model then displayed zero as an actual.

Rejecting every zero was also wrong. A property can genuinely have no pet income. I needed to preserve two separate facts: the amount, and whether the reader successfully obtained it.

This illustrative Python shows the distinction using synthetic input. The dictionary is a simplified example, not the production schema:

```python
raw_value = None  # Formula's calculated answer is missing.

# This shortcut loses the distinction:
amount = raw_value or 0

# Preserve whether the value was read:
if raw_value is None:
    result = {"state": "unreadable", "value": None}
else:
    result = {"state": "read", "value": raw_value}
```

The full read also needs to distinguish a missing field:

| Synthetic source condition | Meaning |
|---|---|
| Saved numeric value is `0` | Successfully read zero |
| Formula exists; calculated answer is missing | Unreadable |
| Expected field is missing | Absent; apply its required or optional rule |

Four sanitized statements with different layouts now pass through the real builder, saved workbook and downstream readers through to the audit verdict. Expected totals come from the statements' printed totals, never the parser's output.

Building that test found another problem: rebuilding a model without a T-12 left the previous run's actuals in place. That column is now cleared. I also ran the new readiness check over about sixty current deal folders before merging; no verdict changed.

<aside class="story-evidence" aria-label="Verification limits">
<p><strong>OPEN · SEP 26, 2026</strong></p>
<p>The test without Excel and the separate test using Excel are verified on the Mac. In the first Windows release record, the test using Excel passed, but the main contract test without Excel failed. That failure remains tracked separately.</p>
</aside>

I want every actual in that column to be traceable to the statement or visibly missing. The test checks that distinction within the layouts and readers it covers.
