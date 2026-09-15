---
title: The model maps the columns. Python reads the numbers.
pubDate: 2026-09-15
description: Interpreting a spreadsheet layout and copying its values are different jobs.
project: underwriting-agent
tag: AI
tagClass: ai
---

A rent roll lists units, rents and occupancy, but the column names vary by property manager. One export says “Actual Rent”; another says “Current Charges.” I need the underwriting agent to recognize the layout without asking a language model to retype every number into a new table.

I split interpretation from copying. A parser reads the source cells into a grid. The model receives headers and column profiles, descriptions of the values each column contains, and identifies roles such as unit identifier, current rent and market rent. Python then reads those cells using the mapping and performs the calculations.

These invented rows make the boundary visible. The mapping below is shortened for illustration, not a recorded model response. Positions start at zero.

<figure>
<figcaption>Synthetic rent-roll rows</figcaption>
<table>
<thead><tr><th scope="col">Unit</th><th scope="col">Plan</th><th scope="col">Status</th><th scope="col">Lease rent</th><th scope="col">Market rent</th></tr></thead>
<tbody><tr><td>A101</td><td>2BR</td><td>O</td><td>1,800</td><td>1,950</td></tr><tr><td>A102</td><td>2BR</td><td>O</td><td>1,850</td><td>2,000</td></tr></tbody>
</table>
</figure>

```json
{"columns": {
  "unit": 0, "plan": 1, "status": 2,
  "current_rent": 3, "market_rent": 4
}, "status_vocabulary": [
  {"raw": "O", "meaning": "occupied"}
]}
```

The model's contribution is “current rent is in column 3.” The 1,800 comes from the parsed source cell. In the implementation, `assemble.py` converts the mapping into the worksheet reader's indexing and passes it to `parse_rent_roll`. The model does not need to generate a fresh copy of the rents.

A defined response format is only the first check. The code also rejects column positions outside the table, missing required roles and incompatible roles assigned to one column. If both unit identifier and current rent point to the same numeric-ID column, the reader could mistake a unit number for its rent. That mapping contains perfectly valid integers and still describes the wrong calculation.

For this example, a local run supplied the mapping directly to the current parser and returned rents of 1,800 and 1,850. The range and conflicting-role checks also passed their rejection cases. No live model was called.

The remaining weakness is semantic: the model could swap current rent and market rent while choosing two valid columns. The structural checks would not, by themselves, catch that. Reconciliation against source totals and human review still matter. I can inspect the mapping separately from the arithmetic, which makes it easier to locate the error when a workbook looks wrong.
