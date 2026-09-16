---
title: "Turning concession banners into usable rent data"
pubDate: 2026-09-15
description: "The promotion on the marketing page may be missing from the availability feed."
tag: AI
tagClass: ai
---

A rent feed can show the asking price while the leasing page advertises several weeks free. For an acquisition comparison, those are parts of the same offer. Ignoring the banner overstates the advertised cost; applying it to every unit can understate it.

I keep the promotion's original wording alongside the structured rent data. The concession scanner recognizes supported free-rent language and separates it from dollar credits, waived fees and other offers. Net-effective rent means the monthly cost after spreading an eligible concession over the lease term. It requires more than spotting a number beside the word “free.”

The parser deliberately leaves a dollar credit as text. It does not turn that credit into a number of free weeks, even when a monthly rent is available. That would introduce assumptions about the lease and the credit's conditions at the parsing step.

<figure>
<figcaption>Invented banners, illustrating the current parsing boundary</figcaption>
<table>
<thead><tr><th scope="col">Banner</th><th scope="col">What can travel forward</th></tr></thead>
<tbody><tr><td>Six weeks free</td><td>A supported free-rent duration and original text</td></tr><tr><td>$1,000 move-in credit</td><td>Original text; no invented free weeks</td></tr><tr><td>Special on selected floor plans</td><td>An eligibility question that still needs resolving</td></tr></tbody>
</table>
</figure>

Local tests exercise the dollar-credit boundary with and without a supplied monthly rent: the scanner keeps the wording and returns no free-week value. These are parser checks using synthetic offers. They do not establish that a promotion is available for a particular apartment today.

Eligibility is still the harder part. The current code can treat an offer naming multiple bedroom types as community-wide without confirming the property's full bedroom mix. That is an imperfect shortcut. A property with another, unmentioned floor plan could receive an overly broad discount. I would need to join the restriction to actual inventory before claiming complete unit-level coverage.

I want the comparison to preserve the asking rent, the promotion and the basis for any adjustment. That lets me inspect an appealing net-effective number before treating it as a rent comparable. Some offers remain unquantified, which is more useful to me than silently filling in terms the page never gave.
