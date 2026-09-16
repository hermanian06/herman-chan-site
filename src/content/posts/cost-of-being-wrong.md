---
title: "Scoring classifier errors by their effect on the supply estimate"
pubDate: 2026-06-05
updatedDate: 2026-09-15
description: "Equal mistakes in a headline accuracy score can have different downstream effects."
project: evaluation-framework
tag: AI
tagClass: ai
---

My supply classifier distinguishes single-family homes, townhomes and multifamily buildings. Two wrong labels can count equally in an accuracy score while affecting different parts of the comparison I use. I wanted the evaluation to expose that difference without hiding the underlying mistakes.

The comparator reports exact-label agreement and a second, task-specific grouping. In the current grouping, single-family and townhome sit together; multifamily sits separately. A single-family prediction for a townhome fails the strict check but agrees at the grouped level. Calling that same townhome multifamily crosses the grouping boundary.

That grouping is a pipeline convention. It is not proof of ownership or rental tenure: single-family homes and townhomes can be rentals, and building form alone cannot establish whether units are rented or sold. My earlier explanation blurred that distinction. Even a single-family versus townhome error can affect a form-sensitive density estimate. The second score examines a chosen reporting boundary; it does not make that error harmless.

<figure>
<figcaption>Synthetic cases checked against the current comparator</figcaption>
<table>
<thead><tr><th scope="col">Expected → predicted</th><th scope="col">Strict result</th><th scope="col">Grouped result</th></tr></thead>
<tbody><tr><td>Single-family → townhome</td><td>Mismatch</td><td>Agreement</td></tr><tr><td>Single-family → multifamily</td><td>Mismatch</td><td>Mismatch</td></tr></tbody>
</table>
</figure>

Unknown answers need another view. If the source cannot support a dwelling type and the model supplies one anyway, the problem is unsupported certainty. If the source supports a type but the model leaves it unknown, the problem is missed information. Those failures can need different fixes even though neither supplies the desired answer.

Local, synthetic comparator checks exercise these distinctions. They verify how cases are scored; they do not measure current model quality or attach a financial loss to an error. I have not built a measured dollar-cost model for these mistakes.

I keep the strict score visible because a business grouping can make a model look better by forgiving distinctions that another user needs. A tool comparing building forms for construction planning might care deeply about the townhome versus detached-home distinction. The grouping is a question I bring to the person using the output, and I would revisit it when the decision changes.
