---
title: "Why I kept the existing underwriting workbooks"
pubDate: 2026-09-15
description: "The existing filenames, tabs and labels turned out to be interfaces other tools depended on."
project: underwriting-agent
tag: AI
tagClass: ai
---

The public underwriting demo produces a combined workbook. It was tempting to make that the operational deliverable too: one file, one analysis path, fewer versions to explain. A dependency review changed my mind about that rollout.

Other tools were already reading the existing workbooks. They located files by name, selected specific tabs and searched for exact row labels. Those conventions were interfaces, even though they were never packaged as a formal API. A workbook can look equivalent to a person and still break a program that reads it.

The September 15 review found a particularly awkward case: a reader could open the new workbook and find part of the data, then miss other fields. The demo's T-12 used labels such as “Net Operating Income” and “Total Operating Expenses” where a consumer expected “NOI” and “Total Expenses.” Partial success is harder to notice than a file that fails to open.

This minimal example uses invented values to show the same kind of exact-label dependency:

```python
rows = {"Net Operating Income": 100}
assert rows.get("NOI") is None
assert rows["Net Operating Income"] == 100
```

Both labels make sense to an analyst. The first lookup still returns nothing. Changing a visible label therefore needs the same care as changing a field name in a service response: find the consumers, update them or preserve compatibility, then check the full result.

I kept the existing colleague-facing workbooks. That decision separates two changes that had become bundled together: replacing the calculation engine and replacing the files people receive. Shared calculations could eventually feed the familiar workbook layouts, while the public sample continues to serve its own demonstration purpose.

That is the direction, not a completed migration. The current plan still records unfinished engine consolidation. The optional engine path defaults off; its live setting was not verified in the dependency review. The evidence here is the dated dependency review and the local label example, not a claim that a new engine has already replaced the operational writers.

Preserving the files leaves duplication to resolve. It also gives me a smaller next step: verify shared calculations behind the existing outputs before asking every consumer to accept a new workbook. I would rather make that compatibility work explicit than discover another half-populated report after changing the deliverable.
