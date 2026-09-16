---
title: "Reusing scraper code across different permit portals"
pubDate: 2026-09-15
description: "Shared portal software creates reusable work; each jurisdiction still has its own details."
project: permit-pipeline
tag: AI
tagClass: ai
---

Adding another county to a housing-supply pipeline is partly an integration problem. Its permit portal may use software I already support, but its field names, search options and record types can differ. Reusing the platform reader helps; assuming the entire county behaves like another one does not.

I separate shared portal mechanics from jurisdiction-specific setup. The shared code handles repeated work such as navigating the platform and retrieving records. Each integration supplies local configuration and maps the source's fields into the pipeline's common record shape. That is where I need to discover what the portal actually means by a count or a date.

For example, “Number of dwelling units” and “Unit count” might map to the same field. “Number of buildings” should not be mapped there merely because it is numeric. This is an illustrative mapping problem, not a claim that every portal uses those labels. Shared syntax does not remove the need for source-specific interpretation.

The weekly runner gives each jurisdiction its own result. It catches a reader's Python exception and continues to the other readers, recording which integration failed. The current result key is forced to the module's jurisdiction name so freshness reporting can join the run to the correct registered source.

<figure class="story-flow">
<figcaption>The reuse boundary</figcaption>
<ol><li><strong>Platform reader</strong>Reusable retrieval mechanics.</li><li><strong>Jurisdiction configuration</strong>Local fields, supported searches and mapping.</li><li><strong>Per-source result</strong>Records and an attributable run outcome.</li></ol>
</figure>

Local stub checks confirm that an exception becomes a failed jurisdiction result without terminating the next call. There is an important limitation: the wrapper marks a non-exception return as successful. It can therefore overwrite a reader's own failure flag. The existing isolation protects against thrown errors; it does not prove that every apparently successful response contains fresh, useful records.

That limits what I can conclude from a green run. I still need checks on source dates, expected fields and the downstream data. A shared-reader change can also affect several jurisdictions at once. I would test representative source cases and the known exceptions before rolling it out broadly. Reuse makes the next integration smaller, but the county-specific verification remains part of the work.
