/**
 * The Blog's reading order: short notes, not newly dated full articles.
 * An originalSlug links a note to an existing article without changing its title or URL.
 * The page automatically lists every other published article in the archive section.
 */
export interface BuildNote {
  id: string;
  title: string;
  description: string;
  bullets: [string, string, string];
  originalSlug?: string;
}

export interface OutlineGroup {
  key: string;
  title: string;
  blurb: string;
  notes: BuildNote[];
}

export const BLOG_OUTLINE: OutlineGroup[] = [
  {
    key: "building-with-ai",
    title: "Building with AI",
    blurb: "How I turn an underwriting task into a specification, direct the build and check the result.",
    notes: [
      {
        id: "reusable-skills",
        title: "Turning an underwriting workflow into a reusable AI skill",
        description: "Moving the rules out of a conversation so the next run follows the same specification.",
        originalSlug: "rent-comps-t12-skills",
        bullets: [
          "In chat, rent definitions and workbook formats drifted between sessions. I moved the recurring instructions into a written skill the agent reads before doing the work.",
          "The skill defines the workflow and decision rules. Python tools read the source files, calculate the results and write them into a consistent workbook layout.",
          "A written rule still needs a check against its expected result. When a definition changes, the workflow and its checks need to change together.",
        ],
      },
      {
        id: "planning-building-review",
        title: "How I split planning, building and review between AI models",
        description: "A task brief, a small change and a separate reviewer give me something concrete to judge.",
        originalSlug: "three-models-three-jobs",
        bullets: [
          "I define the outcome, constraints and completion evidence before a model starts building. The builder works against that brief and commits a small, coherent change.",
          "A separate AI reads the change and reports possible defects. Findings go back to the builder to reproduce, accept or reject with evidence; I resolve the decisions that need my judgment.",
          "A fresh reviewer can catch assumptions the builder missed. Using a different model adds a perspective, but it does not guarantee that either one is right.",
        ],
      },
      {
        id: "failing-test-first",
        title: "Writing the failing test before an AI fixes the bug",
        description: "A passing test once repeated the code's mistake. The expected answer needed its own source.",
        originalSlug: "a-test-that-was-never-red",
        bullets: [
          "An AI-written regression test passed while the defect was still present because it copied the implementation's assumption about the correct answer.",
          "My rule now is to derive the expected result from the source document or business requirement, watch the test fail, then fix the code and rerun that same test.",
          "The failing and passing runs show that this check detects this defect. Other calculations and the business rule itself still need their own verification.",
        ],
      },
      {
        id: "separate-working-copies",
        title: "Why each AI builder gets a separate working copy",
        description: "One session's cleanup erased another's edits. I changed where parallel builders work.",
        originalSlug: "work-that-wasnt-its-own",
        bullets: [
          "Two model sessions were editing the same folder when one discarded uncommitted changes belonging to the other. I recovered that incident's edits from the session record.",
          "Each builder now gets a Git worktree: a separate working folder with its own branch and edits. Changes are committed and combined deliberately.",
          "Separate folders protect file edits. A shared database, deployment or running Excel application still needs explicit ownership and coordination.",
        ],
      },
    ],
  },
  {
    key: "underwriting-agent",
    title: "Underwriting agent",
    blurb: "The boundary between document interpretation, calculation and the workbook a person reviews.",
    notes: [
      {
        id: "column-mapping",
        title: "The model maps the columns. Python reads the numbers.",
        description: "Interpreting a spreadsheet layout and copying its values are different jobs.",
        bullets: [
          "Income statements and rent rolls arrive with different labels and layouts. A parser reads the cells; the model identifies the columns and maps labels into a defined structure.",
          "Code constrains the allowed mappings, reads the selected numeric cells and performs the calculations. The model does not need to retype a table of numbers.",
          "A structurally valid mapping can still select the wrong column. Reconciliation and human review help check whether the chosen field means what the analysis assumes.",
        ],
      },
      {
        id: "source-tracing",
        title: "Tracing an underwriting number back to its source",
        description: "A review output needs to explain where a value came from and what was checked.",
        bullets: [
          "Source references and calculation inputs travel with the deal record into the review output, so a reviewer can trace supported values back to their documents.",
          "Checks answer different questions: is the record well formed, does the arithmetic reconcile, and do copied values match the selected source cells? REVIEW and NOT CHECKED results remain visible.",
          "A source reference helps someone inspect a value; it does not establish that every field was interpreted correctly. Missing evidence still calls for a person's judgment.",
        ],
      },
      {
        id: "excel-monitoring",
        title: "Monitoring Excel when an agent runs the workbook",
        description: "An earlier desktop workflow exposed a failure the agent could not see on screen.",
        originalSlug: "the-failure-a-human-cant-miss",
        bullets: [
          "In the Mac desktop workflow, a shared Excel process became stuck behind a dialog. The agent saw a workbook-open call that never returned.",
          "I added a watchdog to check the application's state. Then I added a heartbeat to its log, so a completed healthy check could be distinguished from a monitor that never ran.",
          "Restarting a shared application can affect other work. Detecting a hang and deciding whether recovery is safe are separate responsibilities; this incident predates the headless public demo.",
        ],
      },
      {
        id: "workbook-compatibility",
        title: "Why I kept the existing underwriting workbooks",
        description: "The existing filenames, tabs and labels turned out to be interfaces other tools depended on.",
        bullets: [
          "A combined demo workbook looked like a possible replacement for the operational files. A dependency review found other tools reading the existing workbooks by filename, tab and label.",
          "I kept the current deliverables. Changing the calculation engine and changing the files people receive are separate decisions, and the public sample serves a different purpose.",
          "Full engine consolidation remains unfinished. Shared calculations could eventually feed the existing workbook layouts, but that compatibility path still needs to be built and verified.",
        ],
      },
    ],
  },
  {
    key: "supply-database",
    title: "Supply database",
    blurb: "Turning inconsistent public records into comparable project data, with the uncertainty kept visible.",
    notes: [
      {
        id: "reusable-portal-readers",
        title: "Reusing scraper code across different permit portals",
        description: "Shared portal software creates reusable work; each jurisdiction still has its own details.",
        bullets: [
          "Different jurisdictions often use the same underlying portal platform. I separate reusable readers from local configuration and field mapping so each integration returns a consistent record shape.",
          "The orchestrator records results by jurisdiction and lets other readers continue when one fails. A successful run and a fresh, useful dataset require different checks.",
          "Shared code reduces duplication, but a change can affect several sources. Local exceptions need to stay visible and be checked against the source they support.",
        ],
      },
      {
        id: "supply-model-boundary",
        title: "Where I use language models in the supply pipeline",
        description: "Structured fields and ambiguous document text need different kinds of processing.",
        originalSlug: "one-place-the-llm-lives",
        bullets: [
          "Ordinary code retrieves records and parses structured fields. Language models help interpret document content and classify filings where labels alone do not answer the question.",
          "Those model outputs feed defined data fields and checks. Extraction and classification are separate evaluation tasks, and the current pipeline has more than one model-assisted path.",
          "Interpretation adds cost, latency and another way to be wrong. I keep the boundary specific to the source and task instead of assuming every document needs the same model workflow.",
        ],
      },
      {
        id: "project-identity",
        title: "When three filings describe one housing project",
        description: "Counting records is easy. Deciding which records refer to the same development is harder.",
        bullets: [
          "A development can appear in several agencies' records under different names and at different stages. Counting each filing as a project can duplicate the supply estimate.",
          "The pipeline groups supported matches under a common project identity while retaining the individual source records and their history. Names, geography and other identifiers help establish the connection.",
          "Matching too aggressively merges separate developments; matching too cautiously leaves duplicates. Nearby projects and phases make both mistakes possible.",
        ],
      },
      {
        id: "estimated-supply",
        title: "Showing estimated supply without making it look measured",
        description: "A reported unit count, an acreage-based estimate and an unknown count carry different evidence.",
        bullets: [
          "Some filings report units or lots. Others provide acreage that can support an estimate, while some lack enough information to establish a count at all.",
          "I distinguish source-reported counts from estimates and disclose the assumptions behind the estimates. A proposed count or filing signal does not establish completed delivery.",
          "Estimates help screen a market, but they introduce uncertainty. A decision that depends on the count needs source verification, and an unavailable count should remain unavailable.",
        ],
      },
    ],
  },
  {
    key: "rent-database",
    title: "Rent database",
    blurb: "Reading leasing sites, interpreting offers and preserving what was actually observed.",
    notes: [
      {
        id: "reader-fallbacks",
        title: "Why the rent scraper tries more than one platform reader",
        description: "A platform signal on a leasing page does not guarantee its reader can retrieve the rents.",
        bullets: [
          "A leasing site can contain signals for several platforms. The first matching reader may fail even though another matching reader can return usable rent data.",
          "The scraper tries matching readers in priority order before falling back to a model. A failed page fetch is recorded separately from a platform the readers do not support.",
          "Extra attempts can recover data but take time. The fallback-chain checks cover a first reader failing and a later reader succeeding; a broader recovery rate needs its own measurement.",
        ],
      },
      {
        id: "concession-banners",
        title: "Turning concession banners into usable rent data",
        description: "The promotion on the marketing page may be missing from the availability feed.",
        bullets: [
          "I read the marketing offer alongside the rent feed and retain its original wording. Free rent, dollar credits, waived fees and floor-plan restrictions mean different things.",
          "Supported free-rent offers can feed the net-effective calculation: rent after the eligible concession. An offer restricted to certain units should not become a community-wide discount.",
          "Dollar credits remain text rather than being converted into free weeks. Leaving some promotions unquantified avoids quietly supplying assumptions the source did not provide.",
        ],
      },
      {
        id: "observed-rents",
        title: "Why a rent range is not a list of observed rents",
        description: "Minimum and maximum prices lose the distribution a rent benchmark needs.",
        bullets: [
          "Two communities can have the same lowest and highest rents but different prices in between. A range cannot reproduce an average of the lowest observed rents.",
          "Readers preserve actual unit observations, including repeated prices. When the source supplies only a range, the observation list stays absent instead of inventing units at its endpoints.",
          "Range-only sources still support a more limited comparison. Contract checks distinguish observed rents from advertised floor prices so those two kinds of evidence are not silently mixed.",
        ],
      },
      {
        id: "rent-cadence",
        title: "Making the rent schedule and freshness checks agree",
        description: "A market that is not due this week should not look like a failed collection run.",
        bullets: [
          "Markets can run on different collection cycles. A monitor expecting every market every week would flag intentional off-weeks as failures.",
          "Collection and freshness checks use the same schedule rules. They distinguish a market that is not due, a failed attempt and a scheduled run that never started.",
          "Longer cycles mean fewer collections and older observations. The refresh interval needs to match the decision the data supports, with catch-up handling for genuinely missed runs.",
        ],
      },
    ],
  },
  {
    key: "evals-reliability",
    title: "Evals & reliability",
    blurb: "How I check model answers, follow data failures and see what a run cost.",
    notes: [
      {
        id: "independent-test-set",
        title: "How I built an independent test set for the supply classifier",
        description: "The classifier's existing answers could not also be its answer key.",
        originalSlug: "grading-an-llm-against-its-own-guesses",
        bullets: [
          "My first evaluation compared the classifier with labels the pipeline had already generated. Agreement with its own answers gave me little evidence of correctness.",
          "The test set pairs saved inputs with independently supported expected labels and their evidence. Representative samples stay separate from targeted collections of known failures.",
          "Labels can still be ambiguous or become outdated. They need review, and changes to the answer key need to be distinguishable from changes to the model's performance.",
        ],
      },
      {
        id: "green-health-checks",
        title: "The dashboard was wrong for two weeks. Every health check was green.",
        description: "Successful ingestion and scheduled jobs concealed a query refreshing its own stale snapshot.",
        originalSlug: "every-health-check-was-green",
        bullets: [
          "In this incident, a migration made a database view copy its own stale snapshot. The dashboard showed plausible, frozen numbers while the surrounding jobs reported success.",
          "I followed the data through to the query the dashboard consumed and added checks on the values and freshness. Model evaluations could not detect a failure outside the model.",
          "One new check was too sensitive and needed tuning. Checks only cover the conditions they test, so a green status still needs a clear explanation of what was examined.",
        ],
      },
      {
        id: "classifier-error-impact",
        title: "Scoring classifier errors by their effect on the supply estimate",
        description: "Equal mistakes in a headline accuracy score can have different downstream effects.",
        originalSlug: "cost-of-being-wrong",
        bullets: [
          "The evaluator reports exact-label matches alongside a task-specific grouping used by the pipeline. The two views help show which distinctions a headline score hides.",
          "It also separates unsupported confident answers from cases where the model leaves the answer unknown. Missing evidence and an incorrect guess need different treatment.",
          "Business groupings depend on the use case, so I keep strict scores visible. Building form alone does not establish whether homes are rented or sold.",
        ],
      },
      {
        id: "model-observability",
        title: "Tracking model cost and failures across my systems",
        description: "Consistent call records make usage comparable; different failures need different responses.",
        bullets: [
          "A shared model-call wrapper records usage, latency and errors with system and feature labels, so calls from separate workflows can be compared.",
          "If primary telemetry storage fails, the logger tries local storage. If both fail, it warns and drops the record so a logging problem does not itself stop the workflow.",
          "A recognized budget breach is different: it intentionally stops a call before spending. Continuing through a telemetry outage preserves work but can leave gaps in the usage record.",
        ],
      },
    ],
  },
  {
    key: "mcp-integration",
    title: "MCP & integration",
    blurb: "Connecting an AI client to existing data and services, including access and coverage limits.",
    notes: [
      {
        id: "supply-mcp-tools",
        title: "Turning supply questions into MCP tools",
        description: "Named tools let an AI client ask useful questions without learning the database's table layout.",
        bullets: [
          "MCP, the Model Context Protocol, gives an AI client an interface for calling tools with structured inputs. A geographic question becomes a tool call with a location and search parameters.",
          "The server queries the data and returns records the client can use in its answer. Query logic stays in the service and database rather than being recreated in each prompt.",
          "A narrow tool makes its expected behavior easier to explain and check. It still has a defined scope; a question outside that scope may need another tool or a different query.",
        ],
      },
      {
        id: "mcp-sign-in",
        title: "Adding sign-in and revocation to my MCP server",
        description: "Remote access needs a way to grant permission, recognize a caller and withdraw that permission.",
        bullets: [
          "The remote server uses an OAuth sign-in flow and checks access tokens before allowing tool calls. Tokens can expire or be revoked when access should end.",
          "PKCE binds redemption of a sign-in code to the client that started the flow. Authentication has its own state, separate from the business tools' read-only queries.",
          "Read-only tools still expose data to authorized callers. Sign-in setup, token lifecycle and client error handling are part of the integration; authentication alone does not prove the whole system secure.",
        ],
      },
      {
        id: "market-service-integration",
        title: "Connecting the underwriting agent to my market-data service",
        description: "The upload workflow reuses demand, supply and rent services through one report interface.",
        bullets: [
          "The underwriting upload requests an authenticated HTTP/JSON report from my market-data service. This connection uses a web API; it is separate from the MCP client interface.",
          "A mapper translates the report into the deal record the workbook writers already use. It also restores numeric keys that JSON turns into strings, without giving the upload container direct database credentials.",
          "The network call has a bounded wait. If the report or one of its modules is unavailable, the corresponding output carries an absent reason rather than made-up market data.",
        ],
      },
      {
        id: "incomplete-tool-data",
        title: "What an AI tool should return when its data is incomplete",
        description: "No matching records, missing coverage and an approximate location are different answers.",
        bullets: [
          "A search with no matches should not be confused with a data layer that is unavailable for that market. The subdivision tool explains some unsupported coverage and suggests alternative tools.",
          "Geographic results also need their precision carried through. A distance based on an approximate location should not read like a measured distance from the project's exact address.",
          "The response contract is not yet uniform across every tool; some unsupported selections can still return an empty list. Clearer status fields and checks on the client's final answer remain useful next steps.",
        ],
      },
    ],
  },
];
