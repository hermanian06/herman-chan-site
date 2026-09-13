/**
 * Tab 5 — Blog outline. Every published post condensed to three or four bullets and
 * filed under one of the three systems. Herman rewrites the bullets; the page joins each
 * slug to the post collection for title, date and link, and lists any post NOT filed
 * here under "Unfiled" so nothing published can silently vanish from the site.
 *
 * Group 4 ("How I build") is a judgement call: four posts are about the build process
 * itself and belong to all three systems equally. Fold into a project group if preferred.
 */
export interface OutlinePost {
  slug: string;
  bullets: string[];
}
export interface OutlineGroup {
  key: string;
  title: string;
  href: string;
  blurb: string;
  posts: OutlinePost[];
}

export const BLOG_OUTLINE: OutlineGroup[] = [
  {
    key: "underwriting-agent",
    title: "Underwriting agent",
    href: "/underwriting-agent/",
    blurb: "The skills underneath the agent, the Excel plumbing they drive, and what breaks when models run them unattended.",
    posts: [
      {
        slug: "rent-comps-t12-skills",
        bullets: [
          "Rent benchmarking and T-12 categorisation in Claude chat cut each from an hour to twenty minutes — then three problems showed up: definitions drifted between sessions, output formatting changed every time and lost the formulas, and a paid API key cannot live in a chat window.",
          "Moved both into Claude Code skills: a written spec pins the calculation, a workbook template pins the shape, and the tools call the API directly.",
          "Once tools could hold credentials, other sources followed — Census data for the demand block, the broker's email thread for pricing.",
          "An hour down to five minutes is the headline; two deals a month apart now come out calculated and formatted the same way.",
        ],
      },
      {
        slug: "the-failure-a-human-cant-miss",
        bullets: [
          "Mac Excel runs as one shared instance for every agent; it quietly grew to nearly six gigabytes behind an invisible dialog and failed every workbook open.",
          "A person would have restarted it in a minute. An agent only sees a call that never returns — the glance-at-the-screen reflex has to be built.",
          "A watchdog now checks Excel's memory on a schedule and restarts it safely; its first week reclaimed a four-and-a-half-gigabyte instance before any deal hit it.",
          "Its empty log looked like a dead monitor, so it now writes a heartbeat every check. Quiet-because-healthy and quiet-because-dead have to look different.",
        ],
      },
      {
        slug: "two-copies-of-one-behavior",
        bullets: [
          "Excel automation differs between Windows and Mac, so each analysis script exists twice. Twins are a promise to stay identical that nobody was checking.",
          "A bug fixed in one twin stayed alive in the other for seven months; it only surfaced when a deal re-ran a workbook it had already built.",
          "Every fix now includes a same-sitting sweep of every sibling script for the same shape of mistake, and conformance checks run both twins over fixture workbooks and diff cell by cell.",
        ],
      },
    ],
  },
  {
    key: "supply-database",
    title: "Supply database",
    href: "/supply-database/",
    blurb: "Where the model lives in the pipeline, how the classifier is graded, and the ways a healthy-looking data layer lies.",
    posts: [
      {
        slug: "one-place-the-llm-lives",
        bullets: [
          "Dozens of Python tools in the records pipeline; exactly one language-model call per document.",
          "If every step is 90% reliable, five chained steps land near 59%. The model is the least reliable step, so it gets only the work nothing else can do: a scanned form with handwritten corrections into thirty clean fields.",
          "The tempting version hands the model everything and demos great on day one, then week three is spent finding which of five model steps is lying.",
          "The decision that mattered was where the boundary sits — what stays code and what one thing the model does.",
        ],
      },
      {
        slug: "grading-an-llm-against-its-own-guesses",
        bullets: [
          "First eval graded the dwelling-type classifier against the column the pipeline had already filled in — near-100%, because the model was agreeing with itself.",
          "Rebuilt the answer set by hand from sources the model never touched: the source document, the developer's website, a separate county permit dataset. Score fell to the mid-seventies, and that number was real.",
          "Skipped model-as-judge for the same reason: a judge shares the blind spots of what it judges. Comparisons stay dumb — does the label match, yes or no.",
        ],
      },
      {
        slug: "cost-of-being-wrong",
        bullets: [
          "Single-family vs townhome confusion costs nothing; either one mislabelled as multifamily corrupts the rental-supply number the dashboard exists to track.",
          "The eval reports two scores — strict, and one that only counts a miss when the model crosses the for-sale-to-rental line. The gap is the pile of mistakes that do not matter.",
          "A confident answer on a filing a human could not classify counts as a failure; a missing value beats a wrong one.",
          "'Ninety-something percent accurate' now gets the question: accurate on which errors?",
        ],
      },
      {
        slug: "the-feature-that-tested-well",
        bullets: [
          "A known-developer lookup lifted the classifier score about seven points — until it turned out the lookup was built from the same filings the eval grades against.",
          "On fresh production filings the feature changed about two percent of rows, every one an arguable single-family-to-townhome flip. Nearly shipped a feature that did nothing.",
          "Restricted the lookup to fire only when its override crosses the for-sale-to-rental line: same two percent, now real corrections. A vanity metric became a narrow safety net.",
          "Runs are pinned so the model answers the same way every time; before that, back-to-back runs differed by a couple of points of pure noise.",
        ],
      },
      {
        slug: "every-health-check-was-green",
        bullets: [
          "A migration pointed a database view at its own snapshot; for two weeks the dashboard served plausible, frozen numbers while every job logged success.",
          "No model was wrong, so model evals could not catch it. The data layer got the same treatment: seventeen daily SQL checks where any returned row is a violation.",
          "The first run found a filing dated 2879 and a contamination alarm tuned so tight it flagged normal data. The first run of a monitor mostly measures the monitor.",
          "Evals now follow the number from the model all the way to the page someone acts on.",
        ],
      },
      {
        slug: "deployed-is-not-redeployable",
        bullets: [
          "A scheduled service ran green for weeks, then three deploys in a row failed: the running copy was healthy while the recipe to rebuild it had rotted.",
          "Two invisible rots — a dependency that shifted so fresh builds lost the one piece in use, and a version sort comparing numbers as text.",
          "Every monitor asked 'is it up?'; none asked 'would it come back?' Those are different properties, and the second decays silently.",
          "Dependencies pinned, versions sorted numerically, and rebuilds proven on calm days rather than during the deploy that needs them.",
        ],
      },
      {
        slug: "last-weeks-code",
        bullets: [
          "The server offered the new files; the browser kept running last week's code through every hard refresh and cache clear. The page's offline cache was the culprit.",
          "Server-side proof of a deploy says nothing about what a client is running, and a stale client lies in both directions — a good deploy looks broken, a broken one looks fine.",
          "Every build now stamps a version marker into the page, and 'deployed' means watching the new marker appear in a real browser.",
        ],
      },
      {
        slug: "docker-without-admin",
        bullets: [
          "Ran Docker without a system install, from a small VM in the user folder — the easy part.",
          "A container read from a folder outside the shared home directory, saw it as empty, exited successfully, and had processed nothing. No error, no warning.",
          "The records pipeline has its own versions: a scrape returning zero rows 'successfully', a filter that filters out everything. Clean exits over empty input cost more than any crash.",
          "The counter is the same everywhere: assert on the content, not the completion.",
        ],
      },
    ],
  },
  {
    key: "rent-database",
    title: "Rent database",
    href: "/rent-database/",
    blurb: "No posts yet. Candidates: adapters-first extraction and why the model only reads the bespoke tail; parsing a concession banner into a number; two crons, two schema shapes — snapshot table versus event log.",
    posts: [],
  },
  {
    key: "how-i-build",
    title: "How I build (all three systems)",
    href: "/about/",
    blurb: "The build process itself: three models with three jobs, and the rules that came out of the days it went wrong.",
    posts: [
      {
        slug: "three-models-three-jobs",
        bullets: [
          "One model planning, building and reviewing its own work brings the same assumptions to the review that it brought to the writing.",
          "Split three ways: the strongest planner writes a plan to argue with, a second model builds against it, a third from a different vendor reads the diff cold and tries to break it.",
          "Findings return as claims, not fixes; confirmed bugs become regression tests before anything merges.",
          "My job moved from reading diffs at eleven at night to ruling on disagreements between two machines.",
        ],
      },
      {
        slug: "the-reviewer-cant-be-the-author",
        bullets: [
          "A ZIP-code pattern grabbed the first five-digit number in an address — fine until a five-digit street number in Texas came back tagged with a New York ZIP.",
          "The model that wrote it reviewed it clean; the cross-vendor reviewer flagged the exact line on its first pass, with no memory of what the code was meant to do.",
          "An author reads their work as a record of intentions; a reviewer with no stake reads what is on the page. Same rule as an outside check before committee.",
        ],
      },
      {
        slug: "a-test-that-was-never-red",
        bullets: [
          "A regression test written after the fix, from the code as it stood, passed while the bug was still live — it notarised the broken behaviour instead of guarding the spec.",
          "A second 'fix' had disabled the feature at both call sites; every test stayed green because none had ever pinned the feature as working.",
          "Rule now: write the test from the spec, watch it fail, fix, watch the same test pass. Red then green, both runs kept as the record.",
          "A test written from the code is the code grading itself — the same circle as grading a model against its own guesses.",
        ],
      },
      {
        slug: "work-that-wasnt-its-own",
        bullets: [
          "Two model sessions in one folder; one ran the git reset that discards all uncommitted changes and erased the other's morning of edits. It noticed and confessed on its own.",
          "Standing rules since: destructive git commands banned, commit at every natural stopping point, and parallel sessions each work in their own isolated copy, merged deliberately.",
          "Recovery came from the session transcript — every edit replayed byte for byte. A journal I had been keeping without knowing it.",
        ],
      },
    ],
  },
];
