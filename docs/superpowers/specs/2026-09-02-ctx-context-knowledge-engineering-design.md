# CTX — Context & Knowledge Engineering

Date: 2026-09-02  
Status: Approved product, visual, technical, and publication direction
Repository target: `aserdargun/ctx-aserdargun-com`  
Azure target: `aserdargun subscription 2`, West Europe, Static Web Apps Free

## 1. Product thesis

CTX is a public, bilingual, source-backed research instrument for understanding and designing the layer that turns external knowledge and evolving agent state into useful model context.

Its permanent question is:

> What is the smallest, freshest, attributable context that helps a model act correctly?

CTX is broader than a RAG catalog. It follows information through this permanent engineering path:

```text
source → ingest → parse → chunk → index → retrieve
       → rerank → assemble → cite → cache → memory
```

The product treats context as a finite, actively curated system. It exposes trade-offs, failure modes, provenance, evaluation gates, and open questions instead of collapsing techniques into a vendor score.

The first release is centered on an interactive Pipeline Atlas and Method Comparison. Architecture Patterns, Evidence, and Methodology make the pipeline decisions inspectable; they are not separate article silos.

## 2. Position in the application system

CTX fills the knowledge layer between model runtime and agent harness engineering:

```text
AIA → LLM → CTX → HNS
```

| Product | Permanent question | CTX boundary |
|---|---|---|
| AIA | What models and AI platforms exist? | CTX may cite capabilities but does not maintain a vendor catalog. |
| LLM | How are models served efficiently? | CTX may discuss context budgets and caching but does not benchmark runtimes. |
| CTX | How is useful, attributable model context constructed and maintained? | Owns the knowledge-to-context pipeline. |
| HNS | How is a reliable agent system orchestrated? | CTX may model memory/context inputs but does not compare harnesses or tool orchestration. |
| EVL | How are systems evaluated and made reliable? | CTX defines retrieval/context quality gates; a future EVL layer may generalize their measurement. |

Agent memory belongs to CTX when the question is what should persist, be recalled, be compacted, or be forgotten. It belongs to HNS when the question is how an agent loop schedules or uses that memory.

## 3. Audience and jobs

Primary audiences:

- AI and platform engineers building retrieval-augmented or agentic systems.
- Architects choosing between lexical, semantic, hybrid, graph, long-context, and memory patterns.
- Researchers tracking context engineering and multimodal knowledge systems.
- Technical leaders who need evidence and trade-offs rather than vendor rankings.

Primary jobs:

1. Trace the full transformation from a source to model-visible context.
2. Inspect the purpose, artifacts, failure modes, and evidence at each pipeline stage.
3. Compare methods inside one stage without pretending that one method wins universally.
4. Match an architecture pattern to corpus shape, query type, freshness needs, latency, and governance constraints.
5. Distinguish factual evidence, CTX synthesis, and watch signals.
6. Inspect source dates, review dates, supersession, and uncertainty.
7. Share a stable language, stage, method, or pattern URL.

## 4. Goals and non-goals

### Goals

- Publish a genuinely useful and updateable research product, not a static essay.
- Preserve one connected pipeline from source through memory.
- Make retrieval quality, context quality, and answer quality visibly different layers.
- Keep bilingual English/Turkish content in parity.
- Use only traceable claims; unknown and unmeasured values stay unknown.
- Support dense desktop investigation and accessible mobile use without page overflow.
- Provide a repeatable local Setup, Run, Validate, and Stop lifecycle.
- Publish the verified `main` revision through public GitHub and Azure Static Web Apps Free.

### Non-goals for the first release

- No live document ingestion, embeddings, vector database, model calls, or user uploads.
- No account system, database, CMS, analytics, tracking pixels, comments, or forms.
- No benchmark leaderboard, synthetic score, vendor ranking, or invented cost/latency metrics.
- No unreviewed machine-generated research or automatic publication.
- No general prompt-engineering tutorial, model catalog, runtime benchmark, or agent-harness comparison.
- No legal, security, compliance, or procurement recommendation.
- No Azure Functions, server runtime, paid Azure tier, or Vercel configuration.
- No DNS write until the generated Azure hostname is deployed and exact TXT/CNAME values are shown for action-time approval.

## 5. Information architecture and routes

English and Turkish use stable route slugs so language switching preserves location and valid query state:

| Route | Purpose |
|---|---|
| `/:locale/pipeline` | Primary Pipeline Atlas, stage detail, method selector, comparison, and quality gates |
| `/:locale/atlas` | Searchable technique atlas grouped by stage and problem |
| `/:locale/patterns` | Architecture pattern explorer and decision trade-offs |
| `/:locale/evidence` | Sources, claims, freshness, and change ledger |
| `/:locale/about` | Product boundaries, evidence policy, editorial method, and portfolio relationship |

`locale` is `en` or `tr`. `/` redirects to `/en/pipeline`. A language switch preserves route and valid query state. The explicit language choice may be stored locally but is never transmitted.

Supported share state:

- `stage=<stage-id>`
- `method=<method-id>` when the method belongs to the selected stage
- `pattern=<pattern-id>` on the pattern route

Invalid route or query state fails safely to a localized 404 or the route's default selection without emitting runtime errors.

## 6. First-release surfaces

### 6.1 Pipeline Atlas

The primary screen implements the approved concept:

- Product identity, essential navigation, and EN/TR switch.
- Headline: “Build the context, not just the prompt.”
- Supporting sentence: “Trace how sources become grounded, efficient model context.”
- Primary action: “Explore the pipeline.”
- Secondary action: “Compare methods.”
- An eleven-stage connected pipeline with one selected stage.
- A synchronized stage detail rail.
- A stage-specific method selector and qualitative comparison.
- Context quality gates with expandable evidence notes.
- The active review cutoff and primary-source policy.

Every stage exposes:

- Purpose and output artifact.
- Inputs and dependencies.
- Representative methods.
- Common failure modes.
- Quality questions and observable signals.
- Related patterns, claims, and sources.
- Review date.

Desktop presents the full horizontal path and adjacent detail rail. Mobile uses a swipeable, keyboard-operable stage rail with explicit previous/next controls and a visible step count. The page itself never scrolls horizontally.

### 6.2 Method Comparison

Methods are compared only within the selected stage. Initial method families include, where applicable:

- Parsing: layout-aware, OCR, structured extraction, multimodal parsing.
- Chunking: fixed, recursive, semantic, structure-aware, late chunking.
- Indexing: inverted, vector, hybrid, graph.
- Retrieval: sparse, dense, hybrid, graph, multimodal.
- Reranking: lexical, cross-encoder, late interaction, LLM-assisted.
- Assembly: top-k packing, diversity-aware, hierarchical, citation-aware, compression.
- Caching: exact/prefix and semantic/context cache.
- Memory: working, episodic, semantic, and procedural memory.

Comparison dimensions are qualitative unless a primary source provides a clearly scoped measurement:

- Strengths.
- Limitations.
- Best fit.
- Failure risk.
- Freshness/update cost.
- Explainability/provenance implications.

The product never presents numbers copied across incomparable datasets as a benchmark.

### 6.3 Architecture Patterns

The first release describes six reusable patterns:

1. Sparse retrieval for exact identifiers and controlled vocabulary.
2. Dense retrieval for semantic similarity.
3. Hybrid retrieval with reranking.
4. GraphRAG for relationship and corpus-level questions.
5. Long-context with selective packing and caching.
6. Agent memory with compaction and scoped recall.

Each pattern records:

- Problem and boundary.
- Pipeline stages used or bypassed.
- Data/corpus assumptions.
- Query shape.
- Trade-offs in relevance, latency, cost, freshness, explainability, and operations.
- Failure modes and quality gates.
- Primary sources and CTX synthesis notes.

Pattern selection is guidance for investigation, not an automated architecture recommendation.

### 6.4 Quality Gates

CTX separates five gates:

| Gate | Question |
|---|---|
| Source validity | Is the source authoritative enough for this claim and is access verifiable? |
| Retrieval coverage | Was the useful evidence discoverable and included? |
| Context efficiency | Did the assembly avoid irrelevant, duplicated, conflicting, or excessively large context? |
| Grounded attribution | Can output claims be traced to supplied evidence? |
| Freshness and memory hygiene | Are sources, caches, and retained memories current, scoped, and superseded correctly? |

Gates expose evidence requirements and open questions. They are never rendered as universal green “Pass” states without a defined experiment and result.

### 6.5 Evidence ledger

Evidence records are filterable by pipeline stage, pattern, claim kind, publisher, and review state. Each record shows:

- Claim text in the active language.
- Claim kind: `evidence`, `synthesis`, or `watch-signal`.
- Primary source link and publisher.
- Publication and checked dates.
- Affected stage/pattern.
- Confidence explanation and known limitation.
- Supersession relationship when applicable.

The active snapshot cutoff for the first release is 2026-09-02. Future edits must advance the snapshot explicitly; build validation rejects claims reviewed after the snapshot or before their source publication date.

### 6.6 About and methodology

The About route explains:

- The product thesis and portfolio boundary.
- Why context engineering is broader than prompt engineering or vector search.
- Evidence, synthesis, and watch-signal labels.
- Primary-source preference and allowed exceptions.
- Freshness, supersession, uncertainty, and editorial review.
- No tracking, accounts, uploads, or personalized recommendations.
- Licensing and repository links.

## 7. Visual design specification

### Accepted direction

The accepted visual idea is **editorial systems map × context-flow instrument**:

- Warm white paper canvas.
- Near-black ink.
- Cobalt blue for navigable flow, focus, and selected context.
- Restrained vermilion for provenance and source markers.
- Pale blue for selected/supporting surfaces.
- Fine rules, open rails, dense tables/lists, and square-to-subtly-rounded geometry.
- Instrument Sans-like typography for interface and prose; IBM Plex Mono-like typography for pipeline labels, IDs, and evidence metadata.
- An unbroken cobalt line is the signature motif connecting pipeline stages.

Accepted concept references:

- [`docs/design/ctx-primary-desktop.png`](../../design/ctx-primary-desktop.png)
- [`docs/design/ctx-primary-mobile.png`](../../design/ctx-primary-mobile.png)

The images specify composition and component anatomy. Their generated numerical mobile comparison values are not approved product facts and must not be implemented. The real product uses sourced qualitative comparisons unless a measurement is explicitly scoped and cited.

### Starting tokens

| Token | Intended value |
|---|---|
| Canvas | `#FCFCFA` |
| Primary text | `#101113` |
| Secondary text | `#55585E` |
| Flow/interaction | `#0A4BFF` |
| Provenance | `#E63E1A` |
| Rule | `#D7D9DE` |
| Selected surface | `#EDF3FF` |
| Focus ring | `#0A4BFF` plus a white offset where required |
| Radius | 0–6px; no pill geometry |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64px |

Token adjustments are allowed only for measured accessibility or closer concept fidelity.

### Responsive behavior

- Desktop target: 1440×960 and 1280×800 without page-level overflow.
- Mobile target: 390×844 and 360×800 without page-level overflow.
- Interactive targets are at least 44×44 CSS pixels.
- Pipeline stage controls support pointer, keyboard, and touch.
- Desktop comparison table becomes a disclosure/list pattern on mobile.
- Mobile source and evidence rows retain claim kind, publisher, date, and link without truncating essential meaning.
- Reduced motion removes line-trace and entrance animation while preserving state changes.

### Explicit exclusions

- No marketing hero shell around a future product.
- No generic KPI cards, bento grid, card wall, sidebar, chat UI, or fake terminal.
- No dark theme, gradients, glow, glassmorphism, illustration, or stock imagery.
- No decorative pills, badges, hero eyebrow, or icon-heavy navigation.
- No color-only state communication.
- No invented numeric benchmark, cost, latency, or quality score.

## 8. Content and data contract

Human-editable research data lives under `content/`. Bilingual strings live in the same logical record. Zod schemas validate all cross-references before tests and build.

### Core entities

#### Source

- Stable ID, title, publisher, URL, and source kind.
- Publication date, checked date, and access state.
- Primary/authoritative status and optional supersession.
- Bilingual context summary.

#### Claim

- Stable ID and bilingual text.
- Kind: `evidence`, `synthesis`, or `watch-signal`.
- Source IDs, stage IDs, method IDs, and pattern IDs.
- Review date, confidence explanation, and known limitation.
- Optional supersession.

#### Stage

- Stable ID and fixed order from 1 through 11.
- Bilingual name, purpose, input, and artifact.
- Method, failure, gate, claim, pattern, and source references.
- Review date.

#### Method

- Stable ID and owning stage.
- Bilingual description, strengths, limitations, best fit, and failure risk.
- Operational and provenance implications.
- Claim/source references and review date.

#### Pattern

- Stable ID and bilingual problem statement.
- Ordered pipeline stage/method composition.
- Corpus/query assumptions and trade-offs.
- Failure modes, gates, claims, sources, and review date.

#### Quality gate

- Stable ID and bilingual question.
- Applicable stages and patterns.
- Required evidence, observable signals, and failure interpretation.
- Claim/source references and review date.

#### Research snapshot

- Cutoff date and published date.
- Bilingual summary.
- Reviewed/added/changed source and claim IDs.
- Open watch signals.

### Validation invariants

- IDs are unique and URL-safe.
- Every public string has non-empty English and Turkish values.
- Stage order is exactly 1–11 with no gaps.
- Every reference resolves.
- Every evidence claim has at least one accessible source.
- Synthesis and watch signals include their supporting sources and limitations.
- Source publication dates do not follow claim review dates.
- Review dates do not exceed the active snapshot cutoff.
- URLs use HTTPS and are not empty placeholders.
- No duplicate canonical URLs.
- Unknown numeric values remain absent, never zero or guessed.

## 9. Initial evidence policy

The baseline prioritizes primary or authoritative sources such as:

- Original research papers and project documentation.
- Official model/platform documentation for specific features.
- Maintainer documentation for retrieval, graph, indexing, reranking, caching, and memory systems.
- Standards bodies when a standard is discussed.

Vendor documentation proves what that vendor declares or exposes; it does not independently prove comparative superiority. CTX synthesis must say when a conclusion combines several sources. Community articles may appear only when they are the original disclosure of a technique or are clearly labeled supporting context.

The initial source set will cover context engineering, contextual retrieval, dense/sparse/hybrid retrieval, reranking, GraphRAG, long-context failure, prompt/context caching, multimodal retrieval, provenance/citations, and agent memory/compaction.

## 10. Technical architecture

- React 19 + Vite 8 + TypeScript 6.
- React Router with static-compatible client routes and Azure navigation fallback.
- Zod-validated JSON content imported at build time.
- No network request is required for the core application after static assets load.
- Local fonts are bundled; production does not depend on a font CDN.
- CSS custom properties implement the accepted design system.
- Focused components own the app shell, pipeline, stage detail, method comparison, patterns, evidence ledger, and methodology content.
- URL parsing is isolated, validated, and tested.
- Search/filter state is deterministic and shareable when relevant.

The production artifact is `dist/` and contains hashed JavaScript/CSS, local fonts, `staticwebapp.config.json`, and a stamped `release.json` matching the deployed Git SHA.

## 11. Accessibility and interaction contract

- Semantic landmarks and one visible `h1` per route.
- Skip link and logical DOM/focus order.
- Native buttons, links, radio groups, tables, and disclosures wherever their semantics fit.
- The pipeline is understandable without color and operable by keyboard.
- Selection changes are announced without moving focus unexpectedly.
- Visible `:focus-visible` state on every interactive control.
- 44×44px minimum interactive targets on mobile.
- WCAG AA contrast for normal text and UI boundaries.
- Reduced-motion support.
- No horizontal page overflow at supported widths.
- External links identify that they open a new site; no forced new tab is required.

## 12. Testing and release contract

Local validation includes:

- Lifecycle ownership tests for checkout-scoped Run/Stop behavior.
- Content schema and cross-reference validation.
- TypeScript and ESLint.
- Unit/component tests for locale switching, URL state, stage/method selection, filters, and invalid state.
- Production build and static artifact verification.
- Playwright desktop/mobile routes, core interactions, keyboard use, axe checks, reduced motion, and overflow assertions.
- `git diff --check`.

Codex local actions are:

- Setup: locked npm install plus Playwright Chromium.
- Run: checkout-owned preview on `127.0.0.1:4175`.
- Validate: the complete release contract.
- Stop: idempotent, port-scoped, and refuses foreign processes.

GitHub Actions use one validation workflow and one authoritative production deployment workflow. Deployment validates and builds first, stamps `dist/release.json`, then uploads the prebuilt artifact with `skip_app_build: true`. Production deployments serialize and never cancel an in-progress upload.

Azure identifiers are fixed:

- Subscription: `aserdargun subscription 2`
- Resource group: `rg-ctx-aserdargun-com`
- Static Web App: `swa-ctx-aserdargun-com`
- Region: West Europe
- SKU: Free
- Workflow: `.github/workflows/deploy-swa-ctx-aserdargun-com.yml`
- Secret: `AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_CTX_ASERDARGUN_COM`
- Concurrency group: `swa-ctx-aserdargun-com-production`
- Branch: `main`
- Artifact: `dist`

Release completion requires fresh local validation, clean and identical local/remote Git, successful GitHub workflow for the intended SHA, Azure environment `Ready`, correlated release metadata, generated-host HTTPS/MIME checks, and desktop/mobile browser verification with clean relevant console logs.

## 13. Publication boundary

The authorized first release creates the public GitHub repository and matching Azure Static Web Apps Free resources in `aserdargun subscription 2`, then deploys the verified `main` revision.

Custom-domain publication is a separate action-time gate because it writes persistent IHS DNS records. After the Azure-generated hostname is verified, the exact values must be shown before any write:

- TXT host: `_dnsauth.ctx`
- TXT value: fresh Azure-generated ownership token
- CNAME host: `ctx`
- CNAME value: the verified generated Azure hostname

Root portfolio integration is not silently included in this repository's release. After `ctx.aserdargun.com` is verified, the canonical `aserdargun.com` application map and Learning System topology should be updated in a separately reviewed change so CTX appears structurally between LLM and HNS.

## 14. Licensing and maintenance

- Source code: MIT.
- Original research prose and structured research content: CC BY 4.0.
- Third-party material remains under its original terms and is linked rather than reproduced.
- Updates are reviewed Git changes with an explicit snapshot cutoff.
- A future automation may propose source changes, but publication remains owner-reviewed and fail-closed.
