/**
 * The public connector's docs and privacy pages (connector plan step 11). The directory
 * listing links both, so their content is part of what reviewers check:
 *   - privacy has the five required sections: what is collected, how it is used and
 *     stored, sharing, retention, contact — plus an effective date;
 *   - docs has at least three example prompts, the server URL, the one-click install
 *     link, the quota and the support email, and links to privacy;
 *   - neither page calls a home-value index "fair market value", and neither carries
 *     an employer brand.
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
