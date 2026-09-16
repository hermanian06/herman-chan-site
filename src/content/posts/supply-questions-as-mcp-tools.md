---
title: "Turning supply questions into MCP tools"
pubDate: 2026-09-15
description: "Named tools let an AI client ask useful questions without learning the database's table layout."
project: permit-pipeline-mcp
tag: AI
tagClass: ai
---

When I look at an acquisition, I ask questions such as “what competing construction is near this address?” My database organizes records by source and stage. An AI client should not have to rediscover that table layout each time it helps me investigate a property.

I exposed named tools through MCP, the Model Context Protocol. MCP gives the client a structured way to discover and call those tools. The supply logic still lives in the server and database. The model chooses a tool and its arguments; the server performs the query and returns records for the model to explain.

For example, `permits_near` takes coordinates, a radius, a lookback period and a result limit. This is an illustrative argument set, not a recorded live request:

```json
{
  "lat": 33.4,
  "lng": -112.1,
  "radius_mi": 3,
  "days_back": 180,
  "limit": 10
}
```

The implementation first asks the database for candidates inside a rectangular boundary around the point. Python then calculates their distance and removes candidates outside the circle. The rectangle narrows the query; the distance check handles its corners. Returned rows carry a common set of project fields plus `distance_mi`, so the client can compare results from different sources.

That mechanism is visible in the current server code. Local checks of the normalizer and distance helper use synthetic records and points; they do not establish current database coverage or authenticated client connectivity. A computed distance is also only as precise as the coordinates behind it.

I prefer this interface to asking the model to compose a new database query from a long schema description. The argument names expose the choices I expect a user to make, and I can inspect those choices when an answer looks surprising. A radius of three miles and a lookback of six months describe a different question from the same point over five years.

The constraint is that a named tool has a defined scope. If users repeatedly need a new comparison, I have to decide whether it belongs in a parameter or needs a separate tool. MCP makes the interface available to the client; it does not design that interface or make the underlying coverage complete.
