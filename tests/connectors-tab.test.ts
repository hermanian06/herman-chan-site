/**
 * The Connectors tab (2026-10-06): one top-level home for both MCP surfaces.
 *   - every page's nav carries a "Connectors" tab pointing at /connectors/;
 *   - /connectors/ links the public connector's docs (whose URL the directory listing pins)
 *     and carries the private server's endpoint and tool table under #private;
 *   - the Supply tab no longer carries its own MCP section, and Supply/Rent point here;
 *   - the "Ask the databases" chat box renders once, on /connectors/#ask, not on Supply/Rent.
 * Reads the BUILT pages. Run: npm run build && npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = join(new URL("..", import.meta.url).pathname, "dist");
const read = (...p: string[]) => {
  const f = join(DIST, ...p, "index.html");
  assert.ok(existsSync(f), `${f} missing — run npm run build first`);
  return readFileSync(f, "utf8");
};
const PRIVATE = "https://permit-pipeline-mcp-production.up.railway.app/mcp";

test("nav has a Connectors tab on every main page", () => {
  for (const p of [[], ["supply-database"], ["rent-database"], ["connectors"], ["connectors", "rental-market-data"]]) {
    assert.match(read(...p), /<a href="\/connectors\/"[^>]*>Connectors<\/a>/, `no Connectors tab on /${p.join("/")}`);
  }
});

test("Connectors tab is marked current on its own page and on the connector docs", () => {
  for (const p of [["connectors"], ["connectors", "rental-market-data"]]) {
    assert.match(read(...p), /<a href="\/connectors\/" aria-current="page">Connectors<\/a>/);
  }
});

test("/connectors/ links the public docs and carries the private server", () => {
  const html = read("connectors");
  assert.ok(html.includes('href="/connectors/rental-market-data/"'), "no link to the public connector docs");
  assert.ok(html.includes("https://mcp.hermanchan.ai/mcp"), "public server URL missing");
  assert.match(html, /id="private"/);
  assert.ok(html.includes(PRIVATE), "private endpoint missing");
  assert.equal((html.match(/<th scope="row"[^>]*><code\b/g) ?? []).length, 17, "expected the 17-tool table");
});

test("Supply no longer has its own MCP section; Supply and Rent point to /connectors/#private", () => {
  const supply = read("supply-database");
  assert.doesNotMatch(supply, /id="mcp"/);
  assert.ok(!supply.includes(PRIVATE), "Supply still carries the private endpoint");
  assert.ok(supply.includes('href="/connectors/#private"'));
  assert.ok(read("rent-database").includes('href="/connectors/#private"'));
  for (const p of [["supply-database"], ["rent-database"]]) assert.ok(!read(...p).includes("/supply-database/#mcp"));
});

test("the chat box renders once, on /connectors/#ask, and Supply/Rent link to it", () => {
  const html = read("connectors");
  assert.equal((html.match(/data-ask\b/g) ?? []).length, 1, "expected exactly one chat box on /connectors/");
  assert.match(html, /id="ask"/);
  for (const p of ["supply-database", "rent-database"]) {
    const page = read(p);
    assert.doesNotMatch(page, /data-ask\b/, `${p} still renders the chat box`);
    assert.ok(page.includes('href="/connectors/#ask"'), `${p} has no link to the chat box`);
  }
});

test("Connectors tab has an Add to Codex button next to Add to Claude (Herman, 2026-10-07)", () => {
  const html = read("connectors");
  assert.ok(/<button[^>]*data-copy="https:\/\/mcp\.hermanchan\.ai\/mcp"[^>]*>[\s\S]*?Add to Codex/.test(html),
    "no Add to Codex button that copies the public server URL");
  for (const step of ["MCP servers", "Add server", "Streamable HTTP", "Authenticate"]) {
    assert.ok(html.includes(step), `Codex steps lack "${step}"`);
  }
});
