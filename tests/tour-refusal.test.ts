/**
 * The page promises "a question the databases cannot answer says so rather than
 * guessing" — the guided tour must demonstrate it (bug_reports #3426). The chip asks
 * about a metro outside supply coverage AND a figure no database holds (cap rate);
 * it is labelled as the limits case, last in the tour, and the intro counts it.
 * Live-tested 2026-10-04 against the new backend: declines both halves in 3.0 s, no
 * outside vendors named.
 * Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { TOUR } from "../src/data/chat/config.ts";

test("the last tour chip is the limits case", () => {
  const last = TOUR[TOUR.length - 1];
  assert.equal(last.kind, "limits");
  assert.match(last.q, /Denver/);
  assert.match(last.q, /cap rate/);
});

test("the intro counts the limits chip", () => {
  const src = readFileSync(new URL("../src/components/chat/AskTheData.astro", import.meta.url), "utf8");
  assert.match(src, /one it should decline/);
  assert.ok(src.includes(".ask__method--limits"), "limits chips get their own caption style");
});

test("the intro's five / three / one count matches the chips' kinds", () => {
  // Codex 2026-10-04: deleting a single-database chip left the tests green while the
  // displayed count went false.
  const single = TOUR.filter((t) => ["supply", "rents", "demand"].includes(t.kind)).length;
  const cross = TOUR.filter((t) => t.kind === "cross").length;
  const limits = TOUR.filter((t) => t.kind === "limits").length;
  const WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
  const src = readFileSync(new URL("../src/components/chat/AskTheData.astro", import.meta.url), "utf8");
  // Codex round 2: tie the DISPLAYED sentence to TOUR. One intro since the box moved to
  // the Connectors tab (2026-10-06); it used to carry a supply and a rent variant.
  const intros = [...src.matchAll(/(\w+) single-database questions, (\w+) that cross them, and (\w+) it should decline/g)];
  assert.equal(intros.length, 1, "the intro carries the count sentence");
  for (const m of intros) {
    assert.deepEqual([m[1], m[2], m[3]].map((w) => WORDS[w.toLowerCase()]), [single, cross, limits], m[0]);
  }
});

test("the tour label does not claim every chip calls an MCP method", () => {
  // Codex 2026-10-04: "one MCP method per question" sat beside a chip that calls none.
  const src = readFileSync(new URL("../src/components/chat/AskTheData.astro", import.meta.url), "utf8");
  assert.ok(!src.includes("one MCP method per question"));
});
