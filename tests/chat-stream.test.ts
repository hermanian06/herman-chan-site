/**
 * The chat box reads POST /chat/stream (Server-Sent Events) so the answer appears as
 * the model writes it. Frames arrive split at arbitrary byte boundaries; keep-alive
 * comments carry nothing; a stream that ends without `done` is an error, not an answer;
 * and every partial answer still goes through renderReply, so injected HTML stays text
 * at every prefix of the stream.
 * Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSSE, createDraft, readChatStream, streamUrl, stageLabel } from "../src/components/chat/chat-stream.ts";
import { renderReply } from "../src/components/chat/render-reply.ts";

const frame = (ev: object) => `data: ${JSON.stringify(ev)}\n\n`;

function responseOf(chunks: string[]): Response {
  const enc = new TextEncoder();
  return new Response(new ReadableStream({
    start(c) { for (const ch of chunks) c.enqueue(enc.encode(ch)); c.close(); },
  }));
}

test("the stream URL sits beside /chat", () => {
  assert.equal(streamUrl("https://permit-demo-chat-production.up.railway.app/chat"),
    "https://permit-demo-chat-production.up.railway.app/chat/stream");
  assert.equal(streamUrl("http://127.0.0.1:8799/chat"), "http://127.0.0.1:8799/chat/stream");
});

test("complete frames parse; a partial frame is kept for the next read", () => {
  const wire = frame({ type: "delta", text: "Hel" }) + frame({ type: "delta", text: "lo" }) + 'data: {"type":"del';
  const { events, rest } = parseSSE(wire);
  assert.deepEqual(events.map((e) => e.text), ["Hel", "lo"]);
  assert.equal(rest, 'data: {"type":"del');
});

test("keep-alive comments and CRLF framing are tolerated", () => {
  const { events } = parseSSE(": ping\r\n\r\n" + frame({ type: "stage", stage: "model", turn: 1 }).replace(/\n/g, "\r\n"));
  assert.equal(events.length, 1);
  assert.equal(events[0].stage, "model");
});

test("a malformed frame is skipped, not thrown or rendered", () => {
  const { events } = parseSSE("data: {not json\n\n" + frame({ type: "delta", text: "ok" }));
  assert.deepEqual(events.map((e) => e.type), ["delta"]);
});

test("deltas accumulate; reset moves a tool turn's preamble out of the answer into the notes", () => {
  const d = createDraft();
  d.apply({ type: "delta", text: "Got the rings." });
  d.apply({ type: "reset" });
  d.apply({ type: "stage", stage: "tools", tools: ["permits_near"] });
  d.apply({ type: "delta", text: "Now pulling supply." });
  d.apply({ type: "reset" });
  d.apply({ type: "delta", text: "Three " });
  assert.equal(d.apply({ type: "delta", text: "projects." }), "Three projects.");
  assert.deepEqual(d.notes, ["Got the rings.", "Now pulling supply."]);
});

test("an empty reset adds no note", () => {
  const d = createDraft();
  d.apply({ type: "reset" });
  d.apply({ type: "delta", text: "  " });
  d.apply({ type: "reset" });
  assert.deepEqual(d.notes, []);
});

test("the component paints the draft on a timer, not requestAnimationFrame (paused in background tabs)", async () => {
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(new URL("../src/components/chat/AskTheData.astro", import.meta.url), "utf8");
  const handler = src.slice(src.indexOf("function streamHandler("), src.indexOf("async function send("));
  assert.ok(handler.length > 0);
  assert.ok(!/requestAnimationFrame/.test(handler), "streamHandler still uses requestAnimationFrame");
  assert.match(handler, /notes/);
});

test("readChatStream survives frames split at every byte and returns done", async () => {
  const wire = frame({ type: "stage", stage: "model", turn: 1 }) + ": ping\n\n"
    + frame({ type: "delta", text: "Georgetown — " }) + frame({ type: "delta", text: "12% growth" })
    + frame({ type: "done", reply: "Georgetown — 12% growth", status: "ok", truncated: false, evidence: [], tools_used: [] });
  const seen: string[] = [];
  const done = await readChatStream(responseOf(wire.split("")), (ev) => seen.push(ev.type));
  assert.deepEqual(seen, ["stage", "delta", "delta", "done"]);
  assert.equal(done.reply, "Georgetown — 12% growth");
});

test("multi-byte characters split across chunks decode intact", async () => {
  const bytes = new TextEncoder().encode(frame({ type: "delta", text: "café — ✂" }) + frame({ type: "done", reply: "x", status: "ok" }));
  const res = new Response(new ReadableStream({
    start(c) { for (const b of bytes) c.enqueue(new Uint8Array([b])); c.close(); },
  }));
  const texts: string[] = [];
  await readChatStream(res, (ev) => { if (ev.type === "delta") texts.push(ev.text); });
  assert.deepEqual(texts, ["café — ✂"]);
});

test("a stream cut before done is an error, not an answer", async () => {
  await assert.rejects(readChatStream(responseOf([frame({ type: "delta", text: "half an ans" })]), () => {}));
});

test("every prefix of a streamed reply still renders injected HTML as text", () => {
  const evil = 'Project <img src=x onerror="alert(1)"> and <script>alert(2)</script> [x](javascript:alert(3)) done';
  for (let i = 1; i <= evil.length; i++) {
    const html = renderReply(evil.slice(0, i));
    assert.ok(!/<img|<script|href="javascript/i.test(html), `prefix ${i}: ${html}`);
  }
});

test("stage labels come from the real events", () => {
  assert.match(stageLabel({ type: "stage", stage: "tools", tools: ["demand_rings", "permits_near"] }, [])!, /demand_rings, permits_near/);
  assert.match(stageLabel({ type: "tool_done", tool: "permits_near" }, ["demand_rings"])!, /Waiting on demand_rings/);
  assert.equal(stageLabel({ type: "delta", text: "x" }, []), null);
});
