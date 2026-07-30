---
title: The container ran fine. The folder it read was empty.
pubDate: 2026-08-16
description: Getting Docker running without a system-level install was the easy part. The failure it produced was the quiet kind.
tag: AI
tagClass: ai
---

I needed a couple of database tools on my Mac that are painful to install directly, and the clean way to get them is Docker: run the tool inside a disposable container, throw the container away after. I wanted it without touching system settings — no installers, no password prompts — and it turns out the whole stack can run that way, through a small virtual machine living entirely in my user folder. After an evening of assembly, it worked.

Then came the failure worth writing down. A container job read its input from a folder I handed it, ran cleanly, exited successfully — and had processed nothing. The virtual machine only shares your home folder with containers. Hand a container a path outside that, like the temporary directory my scripts default to, and it sees an empty folder where your files should be. No error, no warning. A successful run over nothing.

That's the failure mode I've come to respect most. A loud crash costs minutes. A clean exit over empty input can sail all the way into a finished deliverable before anyone notices the numbers are hollow. My records pipeline has its own versions — a scrape that returns zero rows "successfully," a filter that filters out everything — and they've all cost me more than any crash has.

The counter is the same everywhere: assert on the content, not the completion. The container job now refuses to run unless its input is verifiably non-empty, and checks that the output actually contains rows before declaring victory. And rather than trusting shared folders at all, I now pipe the data directly in and out of the container, which sidesteps the whole class.

The tools took an evening to set up. The habit of distrusting a quiet success took longer to install, and it's the part I'd keep if I had to give the rest back.
