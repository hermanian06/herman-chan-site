---
title: The failure a human can't miss and an agent can't see
pubDate: 2026-08-13
description: Excel quietly grew to six gigabytes on my Mac. I'd have noticed in a minute. The agents driving it never would.
project: skills-suite
tag: AI
tagClass: ai
---

A good share of my deal work runs through Excel on a Mac, driven by model agents rather than by me. Mac Excel only runs as a single shared instance, so every agent's automation flows through one program — and that program, I discovered, was sitting at nearly six gigabytes of memory, wedged behind an invisible dialog box, quietly failing every attempt to open a workbook.

Had I been at the keyboard, I'd have caught it in a minute: the sluggishness, the bouncing icon, the dialog. I'd have restarted Excel without registering the decision. An agent has none of those senses. It sees a file-open call that never returns, waits, retries, times out, and reports a vague failure that looks like a dozen other failures. The human reflex — glance at the machine, restart the obvious thing — doesn't exist unless somebody builds it.

So I built it. A small watchdog now checks Excel's memory and state on a schedule and restarts it safely when it crosses a line. In its first week it caught and reclaimed a four-and-a-half-gigabyte instance entirely on its own, before any deal work hit it.

The subtler lesson arrived afterward, when I checked the watchdog's log, found it empty, and assumed the watchdog was broken. It wasn't. Nothing had been wrong, so it had written nothing. Silence was the designed behavior — and I'd built myself a monitor I couldn't tell apart from a dead one. It now writes a small heartbeat every time it checks, so "quiet because healthy" and "quiet because dead" finally look different.

Handing real work to agents, this turns out to be much of the actual job. Not the intelligence — the senses. Every glance-at-the-screen instinct a person supplies for free has to be noticed, named, and wired in. I'm finding them one outage at a time.
