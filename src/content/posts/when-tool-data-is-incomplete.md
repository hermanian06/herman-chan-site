---
title: "What an AI tool should return when its data is incomplete"
pubDate: 2026-09-15
description: "No matching records, missing coverage and an approximate location are different answers."
project: permit-pipeline-mcp
tag: AI
tagClass: ai
---

“No projects found” sounds like a market conclusion. It can also mean that a tool does not expose the relevant source for that market. If an AI assistant turns both situations into the same sentence, a technical coverage gap becomes misleading investment advice.

I made some of that coverage information part of the supply tool's response. When `find_subdivisions` receives a metro whose early filing layer is not connected to that tool, it returns an explanation and suggests other tools. The data may exist elsewhere in the database. The limitation is the path the client tried to use.

Here is a shortened description of that existing behavior. It is explanatory text, not a universal status schema used by all tools:

```json
[{
  "info": "This metro's early radar is not wired into this tool. Use the permitted-project or entitlement tools instead."
}]
```

The distinction matters because an empty search result is a different claim. A supported query that runs successfully and finds no matching rows has examined something. An unavailable layer has not answered the question at all. A client should preserve the latter limitation when it explains the result.

Geographic precision is another part of the answer. Some `permits_near` records carry `geocode_precision`, indicating whether the location is exact, approximate to a street or approximate to a ZIP area. A distance calculated from a ZIP-level location should not be presented as a precise measurement from the development's entrance.

Local stub checks verify the explanatory coverage branch. Source inspection confirms the precision field in geographic results. They do not demonstrate that every AI client repeats those qualifications correctly. The contract is also incomplete: some unsupported source selections still return an empty list. I cannot describe the response format as consistent across the server.

A next improvement would be explicit, consistent statuses for coverage limitations, successful empty results and failed queries, followed by tests of the client's final answer. That would make the distinction easier to check than prose alone. For now, I want the tool's limits to travel with its records, and I still inspect whether the assistant's summary kept them.
