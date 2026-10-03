/**
 * Markdown -> HTML for the "Ask the databases" chat bubble.
 *
 * The bubble is filled with innerHTML, and a reply carries text from public records and
 * from the visitor's own question. So nothing in it may become live markup:
 *   - raw HTML (block or inline) is escaped and shows as text;
 *   - links keep their text but only http(s) and mailto hrefs survive;
 *   - images never load — the alt text is shown instead.
 * Tables, emphasis, lists and ordinary links render as before. Pinned by
 * tests/render-reply.test.ts (`npm test`).
 */
import { Marked } from "marked";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

const SAFE_URL = /^(https?:|mailto:)/i;

const md = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    link({ href, title, tokens }) {
      const inner = this.parser.parseInline(tokens);
      const url = (href || "").trim();
      if (!SAFE_URL.test(url)) return inner;
      const t = title ? ` title="${escapeHtml(title)}"` : "";
      return `<a href="${escapeHtml(url)}"${t} rel="noopener noreferrer" target="_blank">${inner}</a>`;
    },
    image({ text }) {
      return escapeHtml(text || "");
    },
  },
});

export function renderReply(text: string): string {
  return md.parse(text || "(no answer)", { async: false }) as string;
}
