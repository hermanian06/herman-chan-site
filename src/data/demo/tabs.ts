/**
 * The demo's fourteen output tabs — the one list every demo page renders from
 * (regrouped 2026-09-14: rent comps, property tax and supply are their own sections; each
 * analysis has raw data / analysis / audit trail; the Excel model group ends the list).
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
  { id: "demand", label: "Demand", group: "Deal summary" },
  { id: "comps", label: "Rent comps", group: "Rent database" },
  { id: "property-tax", label: "Property tax", group: "Property tax" },
  { id: "supply", label: "Supply", group: "Supply database" },
  { id: "t12-data", label: "Raw data", group: "T-12 analysis" },
  { id: "t12-pnl", label: "Analysis", group: "T-12 analysis" },
  { id: "t12-checks", label: "Audit trail", group: "T-12 analysis" },
  { id: "rent-roll", label: "Raw data", group: "Rent roll analysis" },
  { id: "unit-mix", label: "Analysis", group: "Rent roll analysis" },
  { id: "rent-roll-checks", label: "Audit trail", group: "Rent roll analysis" },
  { id: "manifest", label: "Model-ready outputs", group: "Excel model" },
  { id: "audit-trail", label: "Audit trail", group: "Excel model" },
  { id: "notes", label: "Notes & disclosures", group: "Excel model" },
];
