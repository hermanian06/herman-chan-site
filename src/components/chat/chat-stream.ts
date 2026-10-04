/**
 * Client side of the backend's POST /chat/stream (Server-Sent Events over fetch).
 *
 * Event vocabulary (permit-demo-chat `_stream_chat`):
 *   stage     {stage: "model", turn} | {stage: "tools", tools: [...]}
 *   tool_done {tool, ok, records, fact?}  fact = one line built by CODE from that tool's records
 *   delta     {text}   answer text as the model writes it
 *   reset     text streamed in a turn that then asked for tools is withdrawn
 *   done      the same object POST /chat returns — `reply` is authoritative
 * Lines starting with ":" are keep-alive comments and carry nothing.
 *
 * Streamed text is only ever shown through renderReply(), so the no-live-markup
 * guarantee holds for every partial answer too. Pinned by tests/chat-stream.test.ts.
 */
export type ChatEvent = { type: string; [k: string]: any };

/** POST /chat -> POST /chat/stream on the same service. */
export function streamUrl(chatUrl: string): string {
  return chatUrl.replace(/\/chat\/?$/, "/chat/stream");
}

/** Complete SSE frames in `buffer` become events; a trailing partial frame is returned as `rest`. */
export function parseSSE(buffer: string): { events: ChatEvent[]; rest: string } {
  const norm = buffer.replace(/\r\n?/g, "\n");
  const frames = norm.split("\n\n");
  const rest = frames.pop() ?? "";
  const events: ChatEvent[] = [];
  for (const frame of frames) {
    const data = frame.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).replace(/^ /, ""));
    if (!data.length) continue;
    try {
      const ev = JSON.parse(data.join("\n"));
      if (ev && typeof ev.type === "string") events.push(ev);
    } catch {
      /* a malformed frame is skipped, never rendered */
    }
  }
  return { events, rest };
}

/**
 * The answer-so-far: deltas append. On reset, the text the model wrote before asking
 * for more tools ("Got the rings — now pulling supply…") leaves the answer and is kept
 * as a working note, so words that appeared do not silently vanish while tools run.
 */
export function createDraft() {
  let text = "";
  const notes: string[] = [];
  return {
    apply(ev: ChatEvent): string {
      if (ev.type === "delta" && typeof ev.text === "string") text += ev.text;
      else if (ev.type === "reset") {
        if (text.trim()) notes.push(text.trim());
        text = "";
      }
      return text;
    },
    get text() { return text; },
    get notes() { return notes; },
  };
}

/** Human label for the pending line, from the real progress events. */
export function stageLabel(ev: ChatEvent, pendingTools: string[]): string | null {
  if (ev.type === "stage" && ev.stage === "model") {
    return ev.turn === 1 ? "Choosing which MCP methods to call…" : "Reading the records back and composing the answer…";
  }
  if (ev.type === "stage" && ev.stage === "tools") {
    const t: string[] = Array.isArray(ev.tools) ? ev.tools : [];
    return t.length ? `Querying the databases over MCP: ${t.join(", ")}…` : "Querying the databases over MCP…";
  }
  if (ev.type === "tool_done") {
    return pendingTools.length ? `Waiting on ${pendingTools.join(", ")}…` : "Reading the records back…";
  }
  return null;
}

/**
 * Read an SSE Response to the end, calling onEvent for every event, and return the
 * `done` event. Throws if the stream ends without one, so a cut connection is never
 * mistaken for a finished answer.
 */
export async function readChatStream(res: Response, onEvent: (ev: ChatEvent) => void): Promise<ChatEvent> {
  if (!res.body) throw new Error("no response body");
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let done: ChatEvent | null = null;
  for (;;) {
    const { value, done: eof } = await reader.read();
    buf += eof ? dec.decode() : dec.decode(value, { stream: true });
    const parsed = parseSSE(eof ? buf + "\n\n" : buf);
    buf = eof ? "" : parsed.rest;
    for (const ev of parsed.events) {
      if (ev.type === "done") done = ev;
      onEvent(ev);
    }
    if (eof) break;
  }
  if (!done) throw new Error("stream ended before the answer finished");
  return done;
}

const FACT_LABELS: Record<string, string> = {
  demand_rings: "Demographics",
  permits_near: "Supply pipeline",
  find_subdivisions: "Filings",
  recent_filings: "Filings",
  mf_projects: "Multifamily permits",
  rent_market_summary: "Rent market",
  rent_comps_near: "Rent comps",
  rent_community_lookup: "Community",
  rent_coverage: "Rent coverage",
};
const FACT_MAX = 240;

export function factLabel(tool: string): string {
  return FACT_LABELS[tool] ?? tool;
}

/**
 * Facts as they land: each successful `tool_done` with a non-blank string `fact` adds
 * one line, in arrival order. The component renders them with textContent, so a fact
 * is never markup. Pinned by tests/chat-facts.test.ts.
 */
export function createFacts() {
  const items: { label: string; text: string }[] = [];
  return {
    apply(ev: ChatEvent): boolean {
      if (ev.type !== "tool_done" || !ev.ok || typeof ev.fact !== "string" || !ev.fact.trim()) return false;
      let text = ev.fact.trim();
      if (text.length > FACT_MAX) text = text.slice(0, FACT_MAX) + "…";
      items.push({ label: factLabel(String(ev.tool)), text });
      return true;
    },
    get items() { return items; },
  };
}
