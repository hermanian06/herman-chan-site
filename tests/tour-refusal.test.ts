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
