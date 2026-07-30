---
title: One model plans, another builds, a third reviews
pubDate: 2026-07-29
description: The reliability math that keeps my pipeline to one LLM call per document also applies to the process that builds the pipeline.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

Earlier this year I wrote about keeping exactly one language-model call per document in my records pipeline, because chained model steps compound their error rates. It took me embarrassingly long to notice the same math applied to the process that builds the pipeline itself.

For most of the year, one model did everything on a build: planned the change, wrote the code, then looked its own work over and told me it was fine. That last step is the problem. A model reviewing its own output brings the same assumptions to the review that it brought to the writing. The bugs it catches are mostly the ones it already avoided.

So I split the job three ways. One model — the strongest planner I have access to — reads the task and writes an implementation plan I can argue with before any code exists. A second model builds against that plan. A third model, from a different vendor entirely, reads the finished changes cold and tries to break them. It gets no context about intentions, only the work.

The vendor split is the part that matters. Two models from the same family share training and taste, and review across that line is softer than it looks. The reviewer I use disagrees with the builder in ways that are occasionally wrong and reliably uncomfortable, which is exactly what I want from a reviewer.

The review runs at every milestone rather than once at the end, and its findings come back to me as claims, not fixes. I decide which ones are real, the builder applies those, and anything confirmed becomes a regression test so the same bug can't return quietly.

My own role shrank in a way I didn't expect. I used to be the reviewer of first resort, reading code line by line at eleven at night. Now I mostly rule on disagreements between two machines. It's a better job.
