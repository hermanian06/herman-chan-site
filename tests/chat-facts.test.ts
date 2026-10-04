/**
 * Facts as they land (2026-10-04): each `tool_done` event can carry `fact`, one line
 * the backend builds from that tool's own records ("5 mi ring: 22,591 households…").
 * The pending bubble lists them as tools finish, so a visitor sees real numbers
 * seconds in instead of 20-50 s of silence. A fact is shown as TEXT (never markup),
 * a failed tool or a missing/blank fact adds nothing, the same tool reporting twice
 * (two permits_near calls) keeps both lines, and an over-long line is cut.
 * Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createFacts, factLabel } from "../src/components/chat/chat-stream.ts";

test("tool_done facts accumulate in arrival order with a readable tool label", () => {
  const f = createFacts();
  f.apply({ type: "tool_done", tool: "demand_rings", ok: true, fact: "5 mi ring: 22,591 households" });
  f.apply({ type: "delta", text: "ignored" });
  f.apply({ type: "tool_done", tool: "permits_near", ok: true, fact: "17 pipeline projects within 5 mi" });
  assert.deepEqual(f.items, [
    { label: "Demographics", text: "5 mi ring: 22,591 households" },
    { label: "Supply pipeline", text: "17 pipeline projects within 5 mi" },
  ]);
});

test("a failed tool, a missing fact or a blank fact adds nothing", () => {
  const f = createFacts();
  f.apply({ type: "tool_done", tool: "permits_near", ok: false, fact: "should not show" });
  f.apply({ type: "tool_done", tool: "permits_near", ok: true });
  f.apply({ type: "tool_done", tool: "permits_near", ok: true, fact: "   " });
  f.apply({ type: "tool_done", tool: "permits_near", ok: true, fact: 42 });
  assert.equal(f.items.length, 0);
});

test("the same tool reporting twice keeps both lines", () => {
  const f = createFacts();
  f.apply({ type: "tool_done", tool: "permits_near", ok: true, fact: "1 pipeline project within 3 mi" });
  f.apply({ type: "tool_done", tool: "permits_near", ok: true, fact: "No pipeline filings found within 3 mi" });
  assert.equal(f.items.length, 2);
});

test("an over-long fact is cut with an ellipsis", () => {
  const f = createFacts();
  f.apply({ type: "tool_done", tool: "mf_projects", ok: true, fact: "x".repeat(500) });
  assert.ok(f.items[0].text.length <= 241 && f.items[0].text.endsWith("…"));
});

test("unknown tools fall back to their own name", () => {
  assert.equal(factLabel("sale_comps_near"), "sale_comps_near");
  assert.equal(factLabel("rent_comps_near"), "Rent comps");
});
