/**
 * The chat bubble renders model output with innerHTML. Model output carries text
 * from public records and from the visitor's own question, so nothing in it may
 * become live markup: raw HTML shows as text, and links/images may not use
 * script-capable URLs. Ordinary markdown (tables, bold, lists, https links) still renders.
 * Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderReply } from "../src/components/chat/render-reply.ts";

test("raw HTML in a reply is shown as text, not parsed", () => {
  const html = renderReply('Project <img src=x onerror="alert(1)"> and <script>alert(2)</script>');
  assert.ok(!/<img/i.test(html), html);
  assert.ok(!/<script/i.test(html), html);
  assert.ok(html.includes("&lt;img"), html);
});

test("a block of raw HTML is shown as text", () => {
  const html = renderReply('<div onclick="alert(1)">click</div>\n\nnext');
  assert.ok(!/<div/i.test(html), html);
});

test("javascript: and data: links do not survive as hrefs", () => {
  for (const url of ["javascript:alert(1)", "JaVaScRiPt:alert(1)", "data:text/html,<b>x</b>", " javascript:alert(1)"]) {
    const html = renderReply(`[see record](${url})`);
    assert.ok(!/href=/i.test(html), `${url} -> ${html}`);
    assert.ok(html.includes("see record"), html);
  }
});

test("images never load from model output", () => {
  const html = renderReply("![map](https://example.com/x.png)");
  assert.ok(!/<img/i.test(html), html);
});

test("ordinary markdown still renders", () => {
  const html = renderReply("**Bold**\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- one\n- two\n\n[source](https://example.com/p?a=1)");
  assert.ok(html.includes("<strong>Bold</strong>"), html);
  assert.ok(html.includes("<table>"), html);
  assert.ok(html.includes("<li>one</li>"), html);
  assert.ok(/<a href="https:\/\/example\.com\/p\?a=1"[^>]*>source<\/a>/.test(html), html);
});
