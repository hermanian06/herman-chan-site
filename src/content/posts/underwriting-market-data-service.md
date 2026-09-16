---
title: "Connecting the underwriting agent to my market-data service"
pubDate: 2026-09-15
description: "The upload workflow reuses demand, supply and rent services through one report interface."
project: underwriting-agent
tag: AI
tagClass: ai
---

An uploaded deal needs local demand, competing supply and rent comparables. Those datasets already exist in my other systems. Rebuilding their query logic inside the underwriting upload container would create another version to maintain and another place for the results to diverge.

I connected the upload workflow to one authenticated HTTP report endpoint. The client requests JSON from `/report`, then a mapper translates the response into the deal record the workbook writers already use. This is a web-service integration, not an MCP tool call. The upload container needs the service credential, rather than direct access credentials for each underlying database.

One small mismatch showed why that mapping layer matters. Python dictionaries can use integers as keys; JSON object keys are strings. A report organized by numeric radius can cross the network successfully and still fail a downstream lookup that expects the integer `3`.

This shortened example illustrates the conversion with invented data:

```python
# A radius-keyed section after JSON decoding
received = {"3": {"population": 12000}}

# Restore the numeric-key contract expected downstream
mapped = {int(radius): values
          for radius, values in received.items()}
assert mapped[3]["population"] == 12000
```

The actual mapper handles the report's expected sections and restores numeric keys where required. That lets the writers keep their existing input contract. Successful JSON decoding alone would not detect the mismatch: the response is syntactically valid in both forms.

The local market-client tests exercise a fake HTTP service and synthetic responses, including this key conversion and failure handling. No live market endpoint or production database was queried. Those checks show that the client and mapper handle the fixtures; they do not prove that the deployed service is reachable or that its market data is fresh.

The request also has a bounded wait. If the service or a required module is unavailable, the affected output carries an absent reason instead of fabricated market values. An integration can fail partially, so I need that reason at the module level rather than assuming one successful response means every section was supplied.

Reusing the report service keeps the market logic in one place, but adds a network dependency to the underwriting run. I can inspect and test that boundary separately, which is useful when a workbook is complete except for one missing market section.
