---
title: "Monitoring Excel when an agent runs the workbook"
pubDate: 2026-08-13
updatedDate: 2026-09-15
description: "An earlier desktop workflow exposed a failure the agent could not see on screen."
project: skills-suite
tag: AI
tagClass: ai
---

When an agent opens an underwriting workbook, it waits for Excel to answer. In an earlier Mac workflow, Excel was stuck behind a dialog. A person at the keyboard could have seen it; the agent only saw a file-open call that never finished. Retrying the same call did not explain what was wrong.

I added a watchdog, a small program that checks the application's condition. But deciding that Excel looks unhealthy is different from deciding it is safe to quit. The Mac workflow shares an Excel process with other work. Restarting it at the wrong moment could interrupt another workbook or discard an edit.

The current decision function, `assess()`, checks memory, active writers, CPU activity and open workbooks. Unsaved changes and protected workbooks block a restart. So does an unreadable sensor. Crucially, an unresponsive Excel returns `UNRESPONSIVE`: the watchdog refuses to force-kill it. A modal dialog can still need a person to dismiss it.

<figure>
<figcaption>Mocked inputs passed to the current decision function</figcaption>
<table>
<thead><tr><th scope="col">Observed condition</th><th scope="col">Decision</th></tr></thead>
<tbody><tr><td>A writer is active</td><td>Refuse restart</td></tr><tr><td>Excel does not answer</td><td>Refuse restart</td></tr><tr><td>An unsaved workbook is open</td><td>Refuse restart</td></tr><tr><td>High memory, idle, no workbooks</td><td>Eligible for a graceful quit</td></tr></tbody>
</table>
</figure>

The monitor also needed to show that it had run. An empty log once looked like a dead watchdog, when the checks were correctly leaving active work alone. Its separate heartbeat file now records the latest check time, verdict and reason. `WRITER_ACTIVE` with a recent timestamp means something quite different from an old timestamp.

For this post, six local checks exercised refusal decisions, the eligible case and heartbeat output using mocked sensors and a temporary file. They never opened, queried or restarted Excel. That is evidence for the decision logic, not a fresh test of the running desktop installation.

This is a lesson from the desktop workflow, not the headless public demo. I want automation to report what it can observe and leave a clear reason when recovery needs me. A monitor that refuses to act can be doing exactly the right job.
