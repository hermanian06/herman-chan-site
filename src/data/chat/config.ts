/**
 * "Ask the databases" — the chat box on the Supply and Rent tabs.
 *
 * One backend (permit-demo-chat on Railway) serves two front doors; it picks the tool
 * profile from the request Origin, so this site gets all 9 metros, the rent database
 * and demand rings. The backend holds the Anthropic key and the MCP token; the browser
 * holds nothing.
 */
export const CHAT_API_PRODUCTION = "https://permit-demo-chat-production.up.railway.app/chat";
export const CHAT_API_LOCAL = "http://127.0.0.1:8799/chat";

/** Per-browser soft cap (localStorage). The server's per-IP and daily-dollar caps are the backstop. */
export const DAILY_LIMIT = 20;

export type TourItem = { q: string; method: string; kind: "supply" | "rents" | "demand" | "cross" };

/**
 * The guided tour: five single-database questions, then three that cross databases.
 * Each one exercises a specific MCP method — the caption on the chip says which — so a
 * visitor can see the tool loop do exactly what the tool table promises.
 */
export const TOUR: TourItem[] = [
  { q: "Which BFR or townhome subdivisions over 100 units were filed in metro Atlanta in the last 90 days?", method: "find_subdivisions", kind: "supply" },
  { q: "List multifamily projects over 200 units permitted in metro Austin this year, with the developer.", method: "mf_projects", kind: "supply" },
  { q: "What's the median asking rent, and the share of communities offering concessions, for 3-bed BFR in Atlanta right now?", method: "rent_market_summary", kind: "rents" },
  { q: "Which markets does the rent database cover, and how fresh is each one?", method: "rent_coverage", kind: "rents" },
  { q: "What are the population, households and median income within 1, 3 and 5 miles of 2200 Katy Fort Bend Rd, Katy, TX?", method: "demand_rings", kind: "demand" },
  { q: "What's in the supply pipeline within 3 miles of the Centennial Ridge community in Atlanta?", method: "rent_community_lookup → permits_near", kind: "cross" },
  { q: "For 505 W Baseline Rd, Tempe, AZ: what do 2-bed comps within 3 miles ask, and how does that compare with the ring's median household income?", method: "demand_rings → rent_comps_near", kind: "cross" },
  { q: "Screen 2201 TX-195, Georgetown, TX: household growth within 5 miles, units in the pipeline, and current 3-bed asking rents.", method: "demand_rings → permits_near + rent_comps_near", kind: "cross" },
];
