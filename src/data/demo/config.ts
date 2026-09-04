/**
 * Public configuration for the upload demo.
 *
 * Both values are public by nature — the API base is a URL anyone can read out of
 * the network tab, and a Turnstile *site* key is meant to ship in the page — so
 * there is no env plumbing here and nothing secret to leak.
 */

/** Where the demo API lives once it is deployed. */
export const API_BASE_PRODUCTION = "https://api-production-5abc6.up.railway.app";

/** Where it lives while it is running on the same machine as the site. */
export const API_BASE_LOCAL = "http://localhost:8000";

/** Hostnames that mean "the API is running next to this page". */
const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"];

/** Pure so the page's inline script can resolve the base at run time. */
export function resolveApiBase(hostname: string): string {
  return LOCAL_HOSTNAMES.indexOf(hostname) === -1 ? API_BASE_PRODUCTION : API_BASE_LOCAL;
}

/**
 * Resolved for whoever imports this module directly. In a browser that is the real
 * hostname; during the static build there is no `location`, so it resolves to
 * production, which is the right answer for a built page.
 */
export const API_BASE: string = resolveApiBase(
  typeof location === "undefined" ? "" : location.hostname
);

/**
 * Empty until the Cloudflare keys exist. Empty means "render no widget and send an
 * empty turnstile_token"; a non-empty value makes the page load the widget.
 */
export const TURNSTILE_SITE_KEY = "";
