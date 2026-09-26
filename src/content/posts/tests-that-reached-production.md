---
title: My tests could reach production. Now they stop before they leave.
pubDate: 2026-09-26
description: A scratch test ran against the live database, and a monitor sat in an error state for 34 days.
project: multi-model-build-chain
tag: AI
tagClass: ai
---

My supply database feeds the pipeline numbers I look at before a deal call. In August, a scratch test script rewrote one of its live database changes, ran it against production and then dropped what it had created. One of the data-quality monitors sat in an error state for 34 days before anyone noticed.

It was not the only case. In other projects, a unit test started a live, paid scrape of leasing sites, and another wrote fake rows into the production queue where I track bugs. Each test passed. Nothing in the test environment stopped it from reaching the real thing.

The first milestone was a guard loaded into every test process. It blocks outside network calls, production database connections and the paid model API. It also blanks credentials, including ones a settings file tries to restore halfway through a run. Tests that need a database get a throwaway one built from the project's own schema files.

The first guarded sweep was humbling. Three tests had been quietly depending on outside services. Two looked up a real street address with a live geocoder. The third described itself as pure Python with no database, yet it could not run unless the production connection string was present.

A reviewer from another AI vendor found six holes in the guard. My favorite: with a proxy configured, the check for the paid API was never reached at all. Later, the rent milestone found a web library that bypassed the guard entirely. Its unguarded control run got through to the real database host before we closed it.

Each project now replays its own worst incident as a self-test. Without the guard, the old script reaches a stand-in for production; with it, the run stops with an isolation error.

<aside class="story-evidence" aria-label="What the guard covers">
<p><strong>SCOPE</strong></p>
<p>Covered: network sockets, database drivers and the model API inside Python test processes.<br>Not covered by the mechanism: separate programs such as browser automation, which are blocked by policy instead. The Windows leg had not been run when this was merged.</p>
</aside>

Honestly, the 34 days bothered me more than the bad script. A test is supposed to be the safe place to be wrong.
