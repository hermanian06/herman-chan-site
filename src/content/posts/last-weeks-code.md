---
title: The deploy was live. My browser was running last week's code.
pubDate: 2026-08-19
description: The server said the new version shipped. The page in front of me disagreed. It took a while to learn they were both right.
tag: AI
tagClass: ai
---

I shipped a fix to one of my internal dashboards and confirmed the deploy the way I usually do: fetched the live files straight from the server and checked they were the new ones. They were. The page in front of me kept misbehaving in exactly the old way. I did everything you're supposed to do — hard refresh, cleared the stored data, even stripped out the page's offline machinery entirely. Still the old behavior.

The culprit was the dashboard's offline cache, a browser feature that keeps a copy of a page's code so it loads instantly on the next visit. Mine was serving last week's code with total commitment, straight through every clearing move I made. Only forcing the page to request its code under a new name — the standard cache-busting trick — finally dislodged it.

The trap isn't the caching. It's what caching does to verification. My proof of "deployed" was server-side; the thing users experience is client-side, and a stale client lies in both directions. It can make a good deploy look broken, which costs you an evening chasing a bug you already fixed. Worse, it can make a broken deploy look fine, because the page you're blessing is quietly running the old code.

The fix I kept is small. Every build now stamps a version marker into the page itself, and "deployed" means I watched the new marker appear in an actual browser — not that the server offered the new files when asked politely. One line of discipline, and the two ends of the wire can't disagree without me noticing.

There's a deal-world version I already knew: the model being right in the workbook doesn't matter if the committee is reading last month's printout. I just hadn't expected to meet it again in a browser cache.
