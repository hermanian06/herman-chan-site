---
title: How I split planning, building and review between AI models
pubDate: 2026-07-29
updatedDate: 2026-09-15
description: A task brief, a small change and a separate reviewer give me something concrete to judge.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

An underwriting workbook can calculate a plausible answer from the wrong cells. When AI writes the code that fills it, I need more than the builder's explanation that everything looks right. I need someone to challenge the assumptions behind the change.

I split the work into planning, building and review. I define the business outcome, constraints and what would count as finished. The planner turns that into a task brief. A builder implements a small change and commits it, saving an exact version. A separate reviewer reads that version and reports possible defects. I resolve the underwriting decisions; the builder must reproduce technical findings before changing the code.

One August review caught a useful example. A formula checker was removing spaces before comparing Excel formulas. Ignoring cosmetic spacing sounds harmless, but spaces inside a quoted worksheet name are part of the address. Using invented sheet names, these references point to different sheets:

```text
='Rent Roll'!A1
='RentRoll'!A1
```

The reviewer flagged the comparison rule. The builder confirmed it and changed the helper to preserve spaces inside quoted names. Writing the test exposed another problem: two helpers shared a name, so a later definition had replaced the intended one. The fix gave the specialized helper its own name. That second issue came from testing the finding, not from the review itself.

<figure class="story-flow">
<figcaption>The handoff I want at each meaningful change</figcaption>
<ol>
<li><strong>Brief</strong>Outcome, constraints and expected evidence.</li>
<li><strong>Committed change</strong>A fixed version the reviewer can inspect.</li>
<li><strong>Adjudication</strong>Reproduce the finding, decide, fix and check.</li>
</ol>
</figure>

The archived decision record ties that finding to fix `235a1e5`. It also states what was not exercised, including the Windows writer. I find that limit more useful than a blanket “review passed.”

A fresh model can still share the builder's blind spots, even across vendors. Review also costs time and creates another context handoff. I use it to surface claims I can investigate. I remain responsible for deciding whether the evidence is enough to trust the workbook.
