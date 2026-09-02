/**
 * The demo's fourteen output tabs — the one list both demo pages render from.
 *
 * The ids are load-bearing, not cosmetic. `GET /api/meta` echoes this same list, and a
 * finished run returns `previews` keyed by exactly these strings; OutputTabs turns each
 * id into a `[data-panel="<id>"]` section, which is what the upload page fills at run
 * time. So adding, renaming or reordering a tab here is a change to the API contract and
 * has to move on the server in the same breath.
 *
 * Order is the render order, and consecutive tabs sharing a `group` are drawn under one
 * group label — OutputTabs groups by adjacency, so do not interleave groups.
 *
 * The sample page's download list is deliberately NOT here: it is five static files in
 * `public/downloads/underwriting-demo/`, while the upload page's downloads arrive per-run
 * from the API with signed, expiring URLs. Only one page carries a static list, so there
 * is nothing to share.
 */
export interface DemoTab {
  id: string;
  label: string;
  group: string;
}

export const DEMO_TABS: DemoTab[] = [
  { id: "summary", label: "Deal summary", group: "Deal summary" },
  { id: "comps", label: "Rent comps", group: "Deal summary" },
  { id: "property-tax", label: "Property tax", group: "Deal summary" },
  { id: "demand", label: "Demand", group: "Deal summary" },
  { id: "supply", label: "Supply", group: "Deal summary" },
  { id: "t12-data", label: "Monthly data", group: "T-12 analysis" },
  { id: "t12-pnl", label: "P&L summary", group: "T-12 analysis" },
  { id: "t12-checks", label: "Checks & pricing", group: "T-12 analysis" },
  { id: "rent-roll", label: "Rent roll", group: "Rent roll analysis" },
  { id: "unit-mix", label: "Unit mix", group: "Rent roll analysis" },
  { id: "trade-out", label: "Trade-out", group: "Rent roll analysis" },
  { id: "manifest", label: "Field manifest", group: "Model-ready outputs" },
  { id: "audit-trail", label: "Audit trail", group: "Model-ready outputs" },
  { id: "notes", label: "Notes & disclosures", group: "Model-ready outputs" },
];
