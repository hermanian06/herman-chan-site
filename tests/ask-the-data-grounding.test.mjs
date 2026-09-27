// RED-first test for the Ask-the-data evidence strip (CPP bug row #1348).
//
// Spec, from the chat backend contract (POST /chat in the County Permit Pipeline
// repo, Demo Portal/chat_backend/README.md), not from current behaviour:
//   A. `evidence` is capped at 15; `evidence_total` is the distinct count before
//      the cap. When it exceeds the list, the strip says "15 of 32 records".
//   B. `truncated: true` (model stopped on max_tokens) gets a visible note driven
//      by that field, even when the answer cited no records.
//   C. No evidence_total / equal total and truncated=false render as before.
// `status` handling is untouched: history and the browser quota gate on "ok".
//
// Runs the component's own `groundingEl` source (types stripped by node) against
// a minimal fake DOM. Run: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";

const SRC = readFileSync(new URL("../src/components/chat/AskTheData.astro", import.meta.url), "utf8");

function extract(name) {
  const i = SRC.indexOf("function " + name + "(");
  assert.ok(i >= 0, "missing " + name);
  let d = 0;
  for (let k = SRC.indexOf("{", SRC.indexOf(")", i)); k < SRC.length; k++) {
    if (SRC[k] === "{") d++;
    else if (SRC[k] === "}" && --d === 0) return SRC.slice(i, k + 1);
  }
}

function el(tag) {
  return {
    tag, className: "", textContent: "", title: "", innerHTML: "", children: [],
    appendChild(c) { this.children.push(c); return c; },
    insertAdjacentHTML(_p, h) { this.innerHTML += h; },
    querySelector() { return el("x"); },
  };
}

const groundingEl = new Function(
  "document", "CONF_TITLES", "esc",
  "return (" + stripTypeScriptTypes(extract("groundingEl")) + ");",
)({ createElement: el }, {}, (s) => String(s == null ? "" : s));

const flat = (n, out = []) => {
  if (!n) return out;
  out.push({ cls: n.className, text: n.textContent + n.innerHTML });
  n.children.forEach((c) => flat(c, out));
  return out;
};
const text = (d) => flat(groundingEl(d)).map((n) => n.text).join(" | ");
const ev = (n) => Array.from({ length: n }, (_, i) => ({ source: "tceq_noi", id: "TXR" + i, name: "P" + i }));

test("capped evidence says N of total", () => {
  const t = text({ confidence: "medium", evidence: ev(15), evidence_total: 32, tools_used: [{ tool: "permits_near" }] });
  assert.match(t, /15 of 32 records/);
});

test("uncapped evidence unchanged", () => {
  for (const d of [
    { confidence: "high", evidence: ev(3), evidence_total: 3, tools_used: [] },
    { confidence: "high", evidence: ev(3), tools_used: [] },
  ]) {
    const t = text(d);
    assert.match(t, /3 records/);
    assert.doesNotMatch(t, / of /);
  }
});

test("truncated gets a visible note driven by the field", () => {
  const has = (d) => flat(groundingEl(d)).some((n) => n.cls.includes("trunc"));
  assert.ok(has({ confidence: "medium", evidence: ev(2), tools_used: [], truncated: true }));
  assert.ok(!has({ confidence: "medium", evidence: ev(2), tools_used: [], truncated: false }));
  assert.ok(has({ truncated: true }), "a cut answer that cited nothing still shows the note");
});
