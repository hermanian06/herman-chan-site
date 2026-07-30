---
title: The agent deleted work that wasn't its own
pubDate: 2026-08-07
description: Two model sessions, one shared folder, and a cleanup command that threw away a morning of edits.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

I usually have more than one model session running at a time — one building a feature, another fixing something unrelated in the same project. One afternoon, a session that was testing a safety check did what testing sometimes requires: it made a throwaway edit, then ran the git command that resets everything back to the last saved checkpoint, discarding all uncommitted changes.

The problem is "all." The other session had a morning's worth of edits sitting in that folder, not yet committed. The reset erased those too. The session that did it noticed on its own — the files no longer matched what it had just been told about them — and confessed before I'd seen anything wrong.

Two things came out of that day. The first is a set of standing rules, written down where every session reads them. Destructive git commands are banned outright. Every session commits at each natural stopping point — a passing test, a finished file — so hours of work never sit exposed. And when two sessions genuinely need to modify the same project, each works in its own separate copy, merged deliberately afterward. Uncommitted edits are the one thing version control cannot give back, so every rule is shaped around never holding many of them.

The second thing was the recovery, which I did not expect to work. Every model session keeps a transcript of what it did, including the exact text of every edit. We replayed the lost session's transcript, edit by edit, and got the morning back byte for byte. The transcript turned out to be a journal I'd been keeping without knowing it.

I've had years of warnings about two people editing the same spreadsheet, and a whole discipline of version locks and read-only copies exists because of it. Two agents editing the same folder is the identical problem in new clothes. It gets the same respect now.
