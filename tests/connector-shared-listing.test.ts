/**
 * One listing for both directories (Anthropic Connectors Directory + OpenAI plugin
 * directory), 2026-10-07. Spec, written before the change:
 *   - the display name is "Rental Market Data" (OpenAI caps names at 30 characters);
 *     "Multifamily & BFR" moves to subtitles. Titles and headings on /connectors/, the docs
 *     page and privacy carry the short name; the old long name is gone;
 *   - OpenAI needs HTTPS terms and support pages: /connectors/rental-market-data/terms/ and
 *     /support/ exist, carry their required sections, and are linked from the docs page,
 *     the privacy page and the Connectors tab;
 *   - the connection id is found with data_coverage (or in any error), no longer "in every
 *     tool answer";
 *   - generic mentions of the client say "Claude, ChatGPT or Codex" or "your AI assistant";
 *   - no "fair market value", no "Haven", on any connector page.
 * Reads the BUILT pages. Run: npm run build && npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = join(new URL("..", import.meta.url).pathname, "dist", "connectors");
const page = (...p: string[]) => {
  const f = join(DIST, ...p, "index.html");
  assert.ok(existsSync(f), `${f} missing — run npm run build first`);
  return readFileSync(f, "utf8");
};
const text = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;|’/g, "'")
    .replace(/\s+/g, " ");
const h1 = (html: string) => text((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) ?? ["", ""])[1]).trim();
const title = (html: string) => text((html.match(/<title>([\s\S]*?)<\/title>/) ?? ["", ""])[1]).trim();
const h2s = (html: string) =>
  [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]).trim().toLowerCase());

const NAME = "Rental Market Data";
const OLD = "Rental Market Data: Multifamily";
const TERMS = 'href="/connectors/rental-market-data/terms/"';
const SUPPORT_LINK = 'href="/connectors/rental-market-data/support/"';
const PAGES = {
  tab: [],
  docs: ["rental-market-data"],
  privacy: ["rental-market-data", "privacy"],
  terms: ["rental-market-data", "terms"],
  support: ["rental-market-data", "support"],
} as const;

test("the short name is the heading on the docs page and the Connectors tab section; the long name is gone", () => {
  const docs = page(...PAGES.docs);
  assert.equal(h1(docs), NAME);
  assert.match(title(docs), /^Rental Market Data\b/);
  assert.match(text(docs), /Multifamily & BFR/, "the docs page subtitle lacks Multifamily & BFR");
  const tab = page(...PAGES.tab);
  assert.ok(/<h2 class="section-title__label"[^>]*>Rental Market Data<\/h2>/.test(tab), "Connectors §01 heading is not the short name");
  assert.match(text(tab), /Multifamily & BFR/);
  for (const [k, p] of Object.entries(PAGES)) {
    assert.ok(!text(page(...p)).includes(OLD), `${k} still carries the long name`);
  }
  assert.ok(title(page(...PAGES.privacy)).includes(NAME));
});

test("the terms page exists with its required sections", () => {
  const html = page(...PAGES.terms);
  const t = text(html);
  assert.match(t, /Effective date[\s\S]{0,80}?\b20\d\d\b/);
  const heads = h2s(html);
  for (const want of ["the service", "no warranty", "not advice", "fair use", "prohibited", "sources", "changes", "contact"]) {
    assert.ok(heads.some((h) => h.includes(want)), `terms: no <h2> containing "${want}" in ${JSON.stringify(heads)}`);
  }
  for (const fact of ["as is", "investment", "appraisal", "legal advice", "50", "10 calls a minute", "scrap", "circumvent",
    "Census", "BLS", "LODES", "Zillow", "permit", "discontinue", "herman@hermanchan.ai", "Herman Chan"]) {
    assert.ok(t.toLowerCase().includes(fact.toLowerCase()), `terms: "${fact}" missing`);
  }
});

test("the support page exists with what to include, the response, limits and links", () => {
  const html = page(...PAGES.support);
  const t = text(html);
  assert.ok(t.includes("herman@hermanchan.ai"));
  for (const fact of ["connection id", "data_coverage", "the tool", "address", "reply", "50", "nine metros", "22 rent markets"]) {
    assert.ok(t.toLowerCase().includes(fact.toLowerCase()), `support: "${fact}" missing`);
  }
  for (const href of ['href="/connectors/rental-market-data/"', 'href="/connectors/rental-market-data/privacy/"', TERMS]) {
    assert.ok(html.includes(href), `support page has no ${href}`);
  }
});

test("docs, privacy and the Connectors tab link terms and support", () => {
  for (const k of ["docs", "privacy", "tab"] as const) {
    const html = page(...PAGES[k]);
    assert.ok(html.includes(TERMS), `${k}: no link to terms`);
    assert.ok(html.includes(SUPPORT_LINK), `${k}: no link to support`);
  }
  assert.ok(page(...PAGES.terms).includes(SUPPORT_LINK), "terms: no link to support");
});

test("privacy: the connection id comes from data_coverage, not from every answer", () => {
  const t = text(page(...PAGES.privacy));
  assert.ok(!t.includes("every tool answer includes it"), "privacy still says every answer carries the id");
  assert.match(t, /connection id[^.]*data_coverage/);
});

test("generic client mentions name Claude, ChatGPT or Codex, or your AI assistant", () => {
  for (const k of ["privacy", "terms", "support"] as const) {
    const t = text(page(...PAGES[k]));
    const lone = [...t.matchAll(/Claude(?!, ChatGPT or Codex)/g)].map((m) => t.slice(Math.max(0, m.index! - 40), m.index! + 40));
    assert.deepEqual(lone, [], `${k}: Claude named alone`);
  }
  const docs = text(page(...PAGES.docs));
  for (const bad of ["lets Claude screen", "Claude opens a consent page", "MCP connector for Claude:"]) {
    assert.ok(!docs.includes(bad), `docs: Claude-only wording left: ${bad}`);
  }
});

for (const [k, p] of Object.entries(PAGES)) {
  test(`${k}: no "fair market value", no "Haven"`, () => {
    const html = page(...p);
    assert.doesNotMatch(html, /fair\s+market\s+value/i);
    assert.doesNotMatch(html, /\bhaven\b(?!['’])/i);
  });
}
