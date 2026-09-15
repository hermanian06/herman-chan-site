---
title: Turning an underwriting workflow into a reusable AI skill
pubDate: 2026-05-22
updatedDate: 2026-09-15
description: Moving the rules out of a conversation so the next run follows the same specification.
project: skills-suite
tag: AI
tagClass: ai
---

When I compare rental-housing deals, “recent rent” needs to mean the same thing on every property. Early chat-based runs kept making slightly different choices about the lookback period, renewals and zero-rent units. The spreadsheets looked reasonable individually. Comparing them was the problem.

I moved recurring work into skills: written instructions an agent reads before running a task, backed by Python tools. I supply the underwriting definitions and decide what a reviewer needs to see. AI helps implement them. The agent can interpret an unfamiliar export, but the calculation should come from an explicit rule that survives the conversation.

The income-statement skill shows the split. A T-12 is twelve months of income and expenses; a T-3 is the latest three. The source-sheet helper adds those three months. Annualizing that result, multiplying by four, happens separately in the analysis. Those are different numbers, and putting both under an ambiguous “T-3” label would make a correct formula misleading.

<figure class="story-flow">
<figcaption>How the skill divides responsibility</figcaption>
<ol>
<li><strong>Written workflow</strong>Defines the period, categories and expected output.</li>
<li><strong>Agent</strong>Interprets the file and supplies its layout.</li>
<li><strong>Python tools</strong>Build formulas, write the workbook and check the saved cells.</li>
</ol>
</figure>

In the current tools, one rules module produces a plan of cell values, formulas and formatting. The Mac and Windows writers apply that same plan. A check then reads the saved, closed workbook back against it. This gives me a way to distinguish a wrong rule from a writer that failed to put the rule into Excel.

For example, a source-sheet test expects `=SUM(P6:R6)` for the three-month helper. It checks the literal formula, including its selected columns. A local check with invented January–June headers selected April–June in either chronological direction: 100 + 110 + 120 = 330. That exercises the rule, not a live workbook. Unreadable headers still need attention.

The cost is upkeep. If I change what “recent” means, the workflow, code and expected answer have to move together. A saved specification can preserve a mistake as consistently as a good decision. I still review the definitions; I no longer want to invent them again on the next deal.
