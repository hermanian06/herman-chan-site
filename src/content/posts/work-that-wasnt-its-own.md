---
title: Why each AI builder gets a separate working copy
pubDate: 2026-08-07
updatedDate: 2026-09-15
description: One session's cleanup erased another's edits. I changed where parallel builders work.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

I know the trouble two people can cause editing the same underwriting spreadsheet. I still let two AI sessions work in the same code folder: one building a feature, another testing something unrelated. One session cleaned up its experiment by discarding uncommitted changes. That command also erased the other session's edits.

The cleanup was broader than the task that justified it. Telling agents to be more careful would leave the same shared folder underneath. I changed the working arrangement: each builder gets a Git worktree, a separate working folder attached to its own branch of the repository. A branch alone is not enough if the builders still edit the same files on disk.

<figure class="story-flow">
<figcaption>Illustrative two-task setup</figcaption>
<ol>
<li><strong>Builder A</strong>Rent parser change in folder A, on branch A.</li>
<li><strong>Builder B</strong>Workbook check in folder B, on branch B.</li>
<li><strong>Integration</strong>Review each commit, then combine changes deliberately.</li>
</ol>
</figure>

The builders share project history, but each has its own current files and pending edits. They commit small, coherent changes so I can give a reviewer an exact version. If both change the same area, integration is where we resolve the disagreement. Separate folders do not make those changes automatically compatible.

For this Blog revision, the builder also worked in its own worktree. That is a checkable application of the rule, not evidence that agents can never interfere. They can still reach other folders if their permissions allow it.

We recovered the earlier incident's edits from its session record. I was relieved, but I would not design a recovery process around getting that lucky again. A transcript may be incomplete; saved commits are the checkpoints I deliberately control.

The boundary matters beyond files. Two worktrees can still connect to the same database, deployment or running Excel application. Those resources need an explicit owner and coordinated writes. Parallel builders are useful to me when their work can proceed separately; I still combine their changes and approve shared actions deliberately.
