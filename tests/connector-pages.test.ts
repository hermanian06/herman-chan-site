/**
 * The public connector's docs and privacy pages (connector plan step 11). The directory
 * listing links both, so their content is part of what reviewers check:
 *   - privacy has the five required sections: what is collected, how it is used and
 *     stored, sharing, retention, contact — plus an effective date;
 *   - docs has at least three example prompts, the server URL, the one-click install
 *     link, the quota and the support email, and links to privacy;
 *   - neither page calls a home-value index "fair market value", and neither carries
 *     an employer brand;
 *   - what is withheld (Herman, 2026-10-06): licensed unit counts, owner and property-manager
 *     names stay out; unit counts and year built from PUBLIC records are shown, each with its
 *     source (county property records, Florida DBPR apartment licences, City of Austin permits).
 * Reads the BUILT pages. Run: npm run build && npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = join(new URL("..", import.meta.url).pathname, "dist", "connectors", "rental-market-data");
const DOCS = join(DIST, "index.html");
const PRIVACY = join(DIST, "privacy", "index.html");
const SUPPORT = "herman@hermanchan.ai";
const SERVER = "https://mcp.hermanchan.ai/mcp";
const INSTALL =
  "https://claude.ai/customize/connectors?modal=add-custom-connector&amp;connectorName=Rental%20Market%20Data&amp;connectorUrl=https%3A%2F%2Fmcp.hermanchan.ai%2Fmcp";

const read = (p: string) => {
  assert.ok(existsSync(p), `${p} missing — run npm run build first`);
  return readFileSync(p, "utf8");
};
const h2s = (html: string) =>
  [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

test("privacy page has the five required sections", () => {
  const heads = h2s(read(PRIVACY)).map((h) => h.toLowerCase());
  for (const want of ["what is collected", "how it is used", "sharing", "retention", "contact"]) {
    assert.ok(heads.some((h) => h.includes(want)), `no <h2> containing "${want}" in ${JSON.stringify(heads)}`);
  }
});

test("privacy page states an effective date and the contact email", () => {
  const html = read(PRIVACY);
  assert.match(html, /Effective date[\s\S]{0,80}?\b20\d\d\b/);
  assert.ok(html.includes(SUPPORT), "support email missing from privacy page");
});

test("docs page has at least three example prompts", () => {
  const n = (read(DOCS).match(/data-prompt\b/g) ?? []).length;
  assert.ok(n >= 3, `found ${n} example prompts`);
});

test("docs page carries the support email, server URL, install link, quota and privacy link", () => {
  const html = read(DOCS);
  assert.ok(html.includes(SUPPORT), "support email missing");
  assert.ok(html.includes(SERVER), "server URL missing");
  assert.ok(html.includes(INSTALL), "custom-connector install link missing");
  assert.match(html, /50 (successful )?tool calls/);
  assert.ok(html.includes('href="/connectors/rental-market-data/privacy/"'), "no link to the privacy page");
});

for (const [name, path] of [["docs", DOCS], ["privacy", PRIVACY]] as const) {
  test(`${name} page never says "fair market value" or "Haven"`, () => {
    const html = read(path);
    assert.doesNotMatch(html, /fair\s+market\s+value/i);
    assert.doesNotMatch(html, /\bhaven\b(?!['’])/i);
  });
}

const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&#39;|&rsquo;|’/g, "'").replace(/\s+/g, " ");

test("docs page: licensed unit counts, owner and property manager stay withheld", () => {
  const t = text(read(DOCS));
  assert.match(t, /licensed[^.]*unit counts?/i, "the licensed unit counts are not named as withheld");
  assert.match(t, /owner and property-manager names/i);
  assert.match(t, /absent from everything the public service can read/i);
});

test("docs page: public-record unit counts and year built are shown, with their sources", () => {
  const t = text(read(DOCS));
  assert.match(t, /unit counts and year built from public records/i, "public-record units / year built not stated as shown");
  for (const src of ["county property records", "Florida DBPR apartment licences", "City of Austin permits"]) {
    assert.ok(t.includes(src), `source "${src}" missing`);
  }
  assert.match(t, /as-of date/i, "the as-of date is not mentioned");
  assert.match(t, /third-party market data/i, "the year-built fallback label is not named");
  assert.doesNotMatch(t, /Rental-community unit counts and owner/i, "the old blanket 'unit counts withheld' sentence is still there");
});

test("privacy page: only the licensed unit counts are absent; public-record counts are readable", () => {
  const t = text(read(PRIVACY));
  assert.match(t, /licensed rental-community unit counts/i);
  assert.match(t, /public-record unit counts and year built/i);
});

test("docs page has an Add to Codex button with the Codex steps, and no CLI commands (Herman, 2026-10-07)", () => {
  const docs = read(DOCS);
  assert.ok(/<button[^>]*data-copy="https:\/\/mcp\.hermanchan\.ai\/mcp"[^>]*>[\s\S]*?Add to Codex/.test(docs),
    "no Add to Codex button that copies the server URL");
  for (const step of ["MCP servers", "Add server", "Streamable HTTP", "Authenticate"]) {
    assert.ok(docs.includes(step), `Codex steps lack "${step}"`);
  }
  for (const cli of ["codex mcp add", "codex mcp login", "claude mcp add"]) {
    assert.ok(!docs.includes(cli), `CLI command still on the page: ${cli}`);
  }
});

test("install buttons open new tabs: Add to Claude to claude.ai, Add to Codex to OpenAI's Codex MCP guide (Herman, 2026-10-07)", () => {
  for (const html of [read(DOCS), read(join(DIST, "..", "index.html"))]) {
    assert.ok(/<a[^>]*href="https:\/\/claude\.ai\/customize\/connectors[^"]*"[^>]*target="_blank"[^>]*rel="noopener[^"]*"[^>]*>\s*Add to Claude/.test(html),
      "Add to Claude does not open a new tab");
    assert.ok(/<button[^>]*data-copy="https:\/\/mcp\.hermanchan\.ai\/mcp"[^>]*data-open="https:\/\/learn\.chatgpt\.com\/docs\/extend\/mcp[^"]*"[^>]*>\s*Add to Codex/.test(html),
      "Add to Codex does not carry the Codex guide to open");
  }
});
