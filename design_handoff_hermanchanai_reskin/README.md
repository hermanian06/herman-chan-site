# Handoff: hermanchanai.com — visual reskin

## Overview

A full visual reskin for **hermanchanai.com** — Herman Chan's personal site
(part personal brand, part FDE-style portfolio for Anthropic Forward Deployed
Engineer roles).

The site's information architecture is already built in **Astro + plain CSS**
and is **not changing**. This package is a pure visual reskin: new type
system, new color palette, new component anatomy across the four page
templates (home, post, project, design-tokens reference).

**Direction:** Editorial / ink-on-paper. Warm ivory paper, deep ink type, a
single ink-blue accent. Source Serif 4 + IBM Plex Sans + JetBrains Mono.
Signature move: everything is numbered (posts `001`–`006`, projects
`P/01`–`P/04`, sections `§ 01`–`§ 06`) with tabular monospaced indices.

---

## About the Design Files

The files in this bundle (under `mockups/`) are **design references created
in HTML/CSS** — prototypes showing the intended look, layout, and behavior.
They are **not production code to copy-paste**.

The task is to **recreate these designs in the existing Astro + plain-CSS
codebase**, following the patterns already established there (Astro
components, page-scoped CSS, content collections for posts/projects). Where
the mockups use inline `<style>` blocks per page, those should be split into
the site's existing CSS organization — likely a global tokens stylesheet plus
per-page or per-component styles.

The shared design tokens live in `mockups/shared.css` and should be lifted
into a single global stylesheet on the rebuild (e.g. `src/styles/tokens.css`
or similar). All per-page CSS in the HTML mockups builds on top of those
tokens and should port cleanly.

---

## Fidelity

**High-fidelity.** The mockups are pixel-precise on color, typography,
spacing, hover/focus states, and responsive behavior. Hex values, type
scale, and spacing scale should be matched exactly. No design-system
substitution needed — the tokens in `shared.css` *are* the design system for
this site.

---

## Pages / Templates

The site has four page templates. All share the meta-strip, header, and
footer. All meta/numerical content uses JetBrains Mono with
`font-variant-numeric: tabular-nums`.

### 1. Home / Index (`mockups/home.html`)

**Purpose:** Landing page. Bio hero + numbered list of recent posts +
project cards.

**Layout (≥860px):**

1. **Meta strip** (full-width, mono 12px, hairline below) — persistent
   "Currently · Loc · Updated" row.
2. **Site header** (full-width, hairline below) — brand wordmark on left,
   primary nav (mono 13px uppercase) on right.
3. **Hero** — 12-col grid, `7fr | 5fr`. Left column: kicker (`N° 001 /
   Index`), display headline (`clamp(40px, 7.2vw, 72px)` Source Serif 4
   weight 400, italic phrase in accent), lede paragraph. Right column:
   bordered-left `dl` ("Role / Focus / Stack / Writing / Contact"). Below
   both columns, a "colophon strip" of mono 12px with hairlines between
   segments. Hero has a hairline bottom border.
4. **Writing section** — section-title block (`§ 02 · WRITING ·
   subtitle right-aligned`), followed by a numbered `<ol class="posts">`.
   Each row is a 4-col grid: `48px (num) | 1fr (title + dek) | tag | 88px
   (date)`. Title is Source Serif 22px weight 500. Hover tints the row with
   `--accent-soft`.
5. **Projects section** — section title + a 2-col grid of project cards.
   Cards have a head row (project ID in accent + status pill with colored
   dot), serif title, dek, and a dashed-top meta row with stack pills and
   "since YYYY".
6. **Endplate** — "End of index · 10 entries" + "Subscribe via RSS →"
   hairline strip.
7. **Footer** — 3-col colophon, hairline above and a bottom strip.

**Responsive:**
- `≤860px` — hero collapses to single column (right `dl` flows below
  hero with a top hairline). Post rows collapse to `36px | 1fr` and meta
  drops under the title. Projects collapse to 1 column.
- `≤760px` — header stacks vertically.

### 2. Post detail (`mockups/post.html`)

**Purpose:** Long-form readable layout for markdown posts.

**Layout (≥1080px):**

1. **Meta strip + header** (shared).
2. **Post head** (centered, max 800px, hairline below) — kicker rail
   (`N° 006 / Writing / AI · MCP / 12 May 2026 / 9 min read`), title
   (`clamp(36px, 5.6vw, 56px)`), italic dek, byline row below.
3. **Three-column body grid**: `180px (TOC) | 1fr (body, max 64ch
   centered) | 220px (marginalia)`.
   - **TOC** (left, sticky) — mono uppercase list with
     decimal-leading-zero counters. Current item in accent.
   - **Body** (center) — Source Serif 4 19px / 1.65. First paragraph
     `.lede` is 22px and has an accent drop-cap (4.2em, floated, weight
     500). `h2` has a mono accent `§ NN` prefix. Code blocks: cream-tint
     background, hairline border, **3px accent left border**, mono 14px.
     Tables: mono uppercase th, hairline rows. Pull-quote: italic 26px
     with 2px accent left border.
   - **Marginalia** (right, sticky) — sans 13px sidenotes with mono
     accent numbers (`N.B. 01`, `N.B. 02`…).
4. **Post end** — mono uppercase row: "End · N words · ⁂ · Filed date".
5. **Further reading** — section title + numbered list of 3 next posts.
6. **Footer** (shared).

**Responsive:**
- `≤1080px` — TOC and marginalia collapse below the body (TOC moves
  above, marginalia below, both center-aligned to 64ch).
- `≤600px` — marginalia stacks to single column.

### 3. Project detail (`mockups/project.html`)

**Purpose:** Dossier-style write-up of a tool/project.

**Layout (≥1000px):**

1. **Meta strip + header** (shared).
2. **Project head** (full-width, hairline below) — kicker rail (project
   ID in accent + breadcrumb + category), 2-col grid `8fr | 4fr`.
   **Left:** title (`clamp(40px, 6.4vw, 72px)`, italic accent word) +
   italic dek. **Right:** **spec sheet** — bordered box with a header
   strip ("Project sheet · P/01 · v 2.3"), a `dl` (Role, For, Built,
   Status with accent pill, Stack as pills, Sources as pills, Users), and
   a CTA list with arrows (Read the write-up / Architecture diagram /
   Repository). **Columns top-align** (`align-items: start`) so the
   title doesn't orphan below a tall spec sheet.
3. **Stats strip** (full-width banded, hairlines top and bottom) — 4
   equal columns. Each stat: large serif number (`clamp(34px, 4vw, 44px)`
   with small mono unit/sub-label) + mono uppercase label. Columns
   separated by soft hairlines.
4. **Body grid**: `8fr | 4fr`.
   - **Prose** (left) — same serif 19px / 1.65 system as posts. Numbered
     section headings, **monospace ASCII architecture diagram** in a
     bordered `.diagram` block (the diagram is plain text inside `<pre>`
     — no SVG/PNG), and a **vertical timeline** (`ol.timeline` — left
     hairline, 7px accent dots, mono "when" + serif "what").
   - **Right rail** (sticky) — three blocks: Changelog (`v 2.3 /
     2026-05-04 / one-line note`), Related writing, Other projects.
5. **Pager** — hairline-topped 2-col grid: previous project on left,
   next on right, both with mono label + serif title.
6. **Footer** (shared).

**Responsive:**
- `≤1000px` — head grid stacks; stats become 2 cols; body stacks; right
  rail goes below prose (not sticky).
- `≤560px` — stats stack to 1 col; spec sheet `dl` labels narrow to 80px.

### 4. Design tokens reference (`mockups/tokens.html`)

**Purpose:** Engineer-facing reference doc. Not part of the public site —
keep as a local reference or move under `/styleguide` if useful.

**Sections:** Tokens head + 6 numbered sections — Color palette (12-swatch
grid), Type scale (10 specimens with sample + attrs), Spacing scale (10
rows with visual bars), Component anatomy (3 cards: Header / Row / Footer),
Custom CSS worth preserving (single mono codeblock), Implementation notes
(3 cards: Accessibility / Responsiveness / Performance).

---

## Persistent components

### Meta strip
- Mono 12px, color `--muted`, 8px vertical padding, hairline bottom.
- Contents: accent dot + "Currently · …" / "Loc · …" / spacer / "Updated
  · YYYY-MM-DD" (tabular nums).
- Uppercase labels (`<b>` styled with `text-transform: uppercase;
  letter-spacing: 0.08em`).

### Site header
- 24px vertical padding, hairline bottom.
- Brand: serif weight 600 22px wordmark "Herman Chan" + italic accent `·`
  glyph + mono uppercase 12px sub ("Acquisitions & AI tooling").
- Nav: mono 13px uppercase `+0.04em`. Current page = accent color + 1px
  accent underline (`::after`, `-3px` offset).
- Same gutter as content: `clamp(20px, 4vw, 48px)`.

### Footer
- 3 equal columns: "Elsewhere", "Reading recently", "Colophon".
- Section headers: mono 12px uppercase muted, weight 500.
- Each `li` is a 2-col label/key row (`name` + mono `k` aligned right).
- Bottom strip: mono 12px, copyright left, domain right, soft hairline
  above.
- Collapses to single column at 760px.

### Section title (used on every page)
- 3-part flex row with bottom hairline + bottom margin.
- Left: `§ NN` in accent + uppercase label in `--fg`. Right (auto-margin):
  optional hint in mono `--muted`.

---

## Interactions & Behavior

- **Link hover** — `color 120ms ease`; default text-decoration is none
  with `underline-offset: 3px` when shown. Body links carry a soft
  `--accent-soft` underline that thickens to `--accent` on hover.
- **Row hover** (post rows + project cards) — background fades to
  `--accent-soft` over 120ms.
- **Nav current page** — accent color *and* 1px accent underline (don't
  collapse to color alone — accessibility).
- **Focus visible** — real 2px `--accent` outline, 3px offset, 2px border
  radius. Never remove.
- No animations beyond 120ms color/background fades. No JS-driven motion
  required.

---

## Responsive behavior

Three breakpoints, no more:
- `1080px` — post-body grid collapses (TOC + marginalia stack).
- `860px` — homepage hero stacks; post-row meta collapses below title;
  projects → 1 col.
- `760px` — site header stacks vertically; footer → 1 col.
- `560px` — project stats → 1 col; spec sheet `dl` labels narrow.

Type and gutter sizing are otherwise fluid via `clamp()`.

---

## State Management

None required. All four pages are static. Astro content collections drive
the post and project lists.

Two pieces of state the engineer should wire up from data sources, not
hard-code:
- Meta strip's "Currently" line (small CMS field or repo constant)
- Meta strip's "Updated" date (last commit date, or build-time)

---

## Design Tokens

### Colors

```css
--bg:          #F6F2E8;  /* page bg (warm ivory) */
--bg-alt:      #ECE5D3;  /* code blocks, spec headers, hovers */
--bg-deep:     #E5DCC4;  /* optional banded sections */
--fg:          #161412;  /* headlines (15.3:1 on bg, AAA) */
--fg-soft:     #2C2924;  /* body copy (11.9:1, AAA) */
--muted:       #6E655A;  /* secondary text (4.7:1, AA — only ≥14px) */
--muted-2:     #948A7C;  /* tertiary */
--rule:        #D5CBB6;  /* hairlines, table borders */
--rule-soft:   #E3DCC9;  /* row dividers */
--accent:      #1C3D6E;  /* links, accent rules (9.7:1) */
--accent-ink:  #14304F;  /* accent hover/pressed */
--accent-soft: rgba(28, 61, 110, 0.08);  /* row hover, soft underline */
```

### Type

Three families, all Google Fonts:

```css
--serif: "Source Serif 4", Cambria, Georgia, serif;
--sans:  "IBM Plex Sans", -apple-system, "Helvetica Neue", sans-serif;
--mono:  "JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace;
```

Load Source Serif 4 with the **optical-size axis** (`opsz 8..60`) and both
italic styles 300/400/500/600/700. Plex Sans 400/500/600. JetBrains Mono
400/500/700.

Type scale (CSS vars: `--t-12` … `--t-72`):

| Token | Size | Use |
|---|---|---|
| `--t-72` | 72px | Display / hero (clamped down from 40) |
| `--t-52` | 52px | Article title (clamped) |
| `--t-40` | 40px | h1 |
| `--t-32` | 32px | h2 |
| `--t-26` | 26px | Project card title, pull quote |
| `--t-22` | 22px | h3, post-row title, lede |
| `--t-19` | 19px | Body |
| `--t-17` | 17px | Base |
| `--t-15` | 15px | Card desc, small prose |
| `--t-14` | 14px | UI sans |
| `--t-13` | 13px | Nav, post-row index |
| `--t-12` | 12px | Mono meta, kickers, captions |

Line-heights: display `1.02–1.06`, headings `1.1–1.25`, body `1.55–1.65`,
UI/meta `1.4`. Body measure capped at **64ch** for prose, **60ch** for
deks/card descriptions.

### Spacing scale (4px base)

```css
--s-1: 4px;  --s-2: 8px;   --s-3: 12px;  --s-4: 16px;
--s-5: 24px; --s-6: 32px;  --s-7: 48px;  --s-8: 64px;
--s-9: 96px; --s-10: 128px;
```

Use only these. No half-values.

### Layout

```css
--measure: 68ch;
--gutter:  clamp(20px, 4vw, 48px);
--max:     1240px;
```

### Misc

- Border radius: **2px** for code chips/pills, **0px** elsewhere (the
  design is hairlines, not pillows). Spec-sheet boxes, project cards, and
  diagram blocks all use square corners.
- Borders: 1px hairlines in `--rule` (firm) or `--rule-soft` (row
  dividers). Accent left-borders are 2px (pull quote) or 3px (code blocks).
- Shadows: **none**. The aesthetic is paper, not lifted cards.

---

## Custom CSS worth preserving

These are the small details that hold the system together. Lift each into
the global stylesheet:

```css
/* selection — accent ink on cream, never default blue */
::selection { background: #1c3d6e; color: #f6f2e8; }

/* focus ring — accent, generous offset, soft radius */
:focus-visible {
  outline: 2px solid #1c3d6e;
  outline-offset: 3px;
  border-radius: 2px;
}

/* tabular numerals everywhere a number lives */
.num, time, td.num, .post-row__date, .changelog .v, .stat__num {
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}

/* drop cap on first paragraph of a post */
.post-body p.lede::first-letter {
  font-family: "Source Serif 4", serif;
  font-weight: 500;
  font-size: 4.2em;
  float: left;
  line-height: 0.88;
  padding: 4px 10px 0 0;
  margin-top: 4px;
  color: #1c3d6e;
}

/* faint paper grain — body bg, two radial tints */
body {
  background:
    radial-gradient(circle at 12% 18%, rgba(28,61,110,0.015) 0, transparent 60%),
    radial-gradient(circle at 88% 82%, rgba(28,61,110,0.018) 0, transparent 55%),
    #f6f2e8;
}

/* italic glyph in brand wordmark — the one decorative beat */
.brand__mark .glyph {
  font-family: "Source Serif 4", serif;
  font-style: italic;
  font-weight: 400;
  color: #1c3d6e;
}

/* Source Serif stylistic set + oldstyle figures by default */
html { font-feature-settings: "ss01", "onum", "kern"; }
```

---

## Accessibility

- All body/headline pairs against `--bg` exceed WCAG **AAA** (11–15:1).
- Muted `#6E655A` is **AA at 14px+**; never use it below 14px.
- Focus ring is a real visible outline (not a `box-shadow` hack). Do not
  remove on click.
- Nav current-page indicator is **color *and* underline** — don't collapse
  to color alone.

---

## Assets

**No image assets.** The design intentionally uses no stock photography,
no SVG illustrations, no icons-as-art. Visual interest comes from
typography, hairlines, numbered sections, and the monospace ASCII diagram
in the project page.

**Fonts** — load from Google Fonts (already done via the `@import` at the
top of `shared.css`). Self-hosting is fine too; subset to Latin and keep
the optical-size axis on Source Serif.

**Favicon / OG cards** — not designed in this round. The brand wordmark
("Herman Chan" + italic `·` glyph in `#1C3D6E` on `#F6F2E8`) is the
starting point.

---

## Files in this bundle

```
design_handoff_hermanchanai_reskin/
├── README.md           ← this file
└── mockups/
    ├── shared.css      ← design tokens + base + meta-strip/header/footer
    ├── home.html       ← home page mockup
    ├── post.html       ← post detail mockup
    ├── project.html    ← project detail mockup
    └── tokens.html     ← design-tokens reference page
```

Open `home.html` first in a browser to get the overall feel, then walk
through `post.html` → `project.html`. Use `tokens.html` and this README
together as the implementation reference.

---

## Implementation order (suggested)

1. **Tokens + base** — port `shared.css` (everything above the `meta-strip`
   block) into a global `tokens.css` / `base.css`. Load the three Google
   Fonts.
2. **Layout primitives** — Astro components for `<MetaStrip>`,
   `<SiteHeader>`, `<SiteFooter>`, `<SectionTitle>`. These are reused
   everywhere.
3. **Home page** — port hero + post list + project grid. Wire post and
   project data from existing Astro collections.
4. **Post layout** — markdown rendering with the body styles, plus the
   TOC + marginalia rails. The TOC can be generated from `h2` headings in
   the markdown.
5. **Project layout** — spec sheet, stats, timeline, changelog. Frontmatter
   schema additions: `spec` (role/built/status/stack/sources/users),
   `stats[]`, `timeline[]`, `changelog[]`.
6. **Polish pass** — focus rings, selection color, tabular nums, drop cap,
   paper grain. The small CSS block above.
