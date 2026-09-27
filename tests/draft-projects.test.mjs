// RED-first test: a project entry with `draft: true` is not published (portfolio-demo #3156).
//
// Spec, from the content schema's own flag and from /projects/ (src/pages/projects/index.astro,
// which already filters `!data.draft`): a draft project has NO detail page and NO link from any
// other page — not the "Other projects" list, not prev/next. The detail template
// (src/pages/projects/[slug].astro) ignored the flag, so /projects/egnyte-mcp/ was built and
// linked from every project page.
//
// Reads the BUILT site. Run: npm run build && node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const PROJECTS = join(ROOT, "src/content/projects");

function drafts() {
  return readdirSync(PROJECTS)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => /^draft:\s*true\s*$/m.test(readFileSync(join(PROJECTS, f), "utf8").split("---")[1] ?? ""))
    .map((f) => f.replace(/\.md$/, ""));
}

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

test("the build exists (run npm run build first)", () => {
  assert.ok(existsSync(join(DIST, "projects")), "dist/projects missing — build before testing");
});

test("there is at least one draft project to check (else this test proves nothing)", () => {
  assert.ok(drafts().length > 0, "no draft project in src/content/projects");
});

for (const slug of drafts()) {
  test(`draft project '${slug}' has no built detail page`, () => {
    assert.equal(existsSync(join(DIST, "projects", slug)), false, `dist/projects/${slug}/ was built`);
  });

  test(`no built page links to draft project '${slug}'`, () => {
    const hits = htmlFiles(DIST).filter((f) => readFileSync(f, "utf8").includes(`/projects/${slug}/`));
    assert.deepEqual(hits.map((f) => f.slice(DIST.length)), [], `pages linking /projects/${slug}/`);
  });
}

test("published projects still get their detail pages", () => {
  for (const slug of ["permit-pipeline", "skills-suite"]) {
    assert.ok(existsSync(join(DIST, "projects", slug, "index.html")), `dist/projects/${slug}/ missing`);
  }
});
