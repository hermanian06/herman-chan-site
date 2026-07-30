---
title: Deployed is not redeployable
pubDate: 2026-08-22
description: A service can run healthy for weeks while quietly losing the ability to come back. None of my monitoring asked the second question.
tag: AI
tagClass: ai
---

One of my scheduled services had been running green for weeks — jobs completing, checks passing, dashboard quiet. Then I shipped a small change, and the deploy failed. So did the next attempt, and the one after that. Three failed deploys later the real situation surfaced: the running copy was healthy, but the recipe for building a fresh copy had rotted while nobody was using it. Had the service restarted for any ordinary reason that week, it would not have come back.

Two small rots, both invisible from outside. A dependency the build pulls in had shifted underneath us, so fresh builds now fetched a version missing the one piece we actually used — and the quick sanity check, "does the package load," passed anyway, because the package loaded fine while the piece inside it was gone. And a script that picked the newest available version of something was sorting version numbers as text, where 1.9 counts as newer than 1.29. Either alone was a head-scratcher. Together they ate an afternoon.

What bothered me wasn't the bugs. It was that nothing I monitor could have caught them. Every check I run answers the question "is it up right now?" Nothing asks "if it died tonight, would it come back?" Those are different properties. The second one decays silently, precisely because it's only ever tested at the worst moments — during an incident, or during a deploy you actually needed.

The immediate fixes were quick: the dependency is pinned to an exact version now, and the sorting compares numbers as numbers. The lasting change is a habit. Before I trust a green dashboard, I ask when the rebuild was last proven — and I try to prove it on a calm day, on purpose, rather than letting the next urgent deploy run the experiment for me.

The dashboard still glows green. I just read it more narrowly now: the service is up today. That's all it ever said.
