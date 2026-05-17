# Herman Chan — personal site

Astro + Tailwind, deployed on Netlify.

## Local dev

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static build to ./dist
npm run preview   # serve ./dist on http://localhost:4321
```

Node 22.12+ required (Astro 6).

## Adding a post

1. Create a new file in `src/content/posts/<slug>.md`. The filename becomes the URL slug: `src/content/posts/why-i-split-the-agent.md` → `/posts/why-i-split-the-agent/`.
2. Frontmatter:
   ```yaml
   ---
   title: Why I split the underwriting agent into two prompts
   pubDate: 2026-05-24
   description: One-liner that appears under the title on archive + landing.
   project: skills-suite   # optional — slug of a project this post belongs to
   draft: false            # optional — true hides from build
   ---
   ```
3. Write the post body in Markdown below the frontmatter.
4. Commit, push. Netlify auto-deploys on push to `main`.

If `project` matches a project slug (`skills-suite`, `permit-pipeline`, `agent-suite`, `egnyte-mcp`), the post appears on that project's page under "Posts about this." Otherwise it lives in the archive only.

## Editing a project page

Projects are also markdown files: `src/content/projects/<slug>.md`. Edit the body for the intro paragraph; edit `title`, `blurb`, or `order` in frontmatter to change the project card on the landing page.

## Structure

```
src/
├── content/
│   ├── posts/         # one .md per post
│   └── projects/      # one .md per project (4 of them)
├── content.config.ts  # collection schemas (title, pubDate, etc.)
├── layouts/
│   └── Layout.astro   # base HTML, header, footer, meta
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── PostCard.astro
│   └── ProjectCard.astro
├── pages/
│   ├── index.astro             # landing
│   ├── posts/index.astro       # /posts/ archive
│   ├── posts/[slug].astro      # /posts/:slug/
│   ├── projects/[slug].astro   # /projects/:slug/
│   └── rss.xml.ts              # /rss.xml
└── styles/
    └── global.css              # Tailwind + theme tokens
```

## Design tokens

Defined in `src/styles/global.css` under `@theme`. Used as Tailwind utilities like `text-ink`, `border-rule`, `bg-paper`.

| Token        | Value     | Use                       |
| ------------ | --------- | ------------------------- |
| `ink`        | `#18181b` | body text                 |
| `ink-muted`  | `#52525b` | secondary text            |
| `ink-faint`  | `#a1a1aa` | tertiary text, dates      |
| `paper`      | `#fafaf9` | page background           |
| `rule`       | `#e7e5e4` | dividers, borders         |
| `accent`     | `#475569` | reserved                  |

## Redaction checklist (run before every commit that adds a post)

The full checklist lives in `portfolio-site-plan.md` (outside the repo). Quick version:

- No specific deal names, counterparties, vendors, colleagues.
- No tool internals: keywords, prompt text, filter logic, thresholds, data sources.
- For Permit Pipeline posts: no county, record type, or signal naming.
- "I built X," not "Haven does X."
