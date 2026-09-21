# CTX editorial review — 21 September 2026

Scope: all 11 stages, 26 methods, 6 patterns, 5 quality gates, existing claims and source records, both language interfaces, and CTX's relationship to the aserdargun.com learning system. This records the local editorial review before publication, not a benchmark run. Publication was subsequently authorized; current deployed identity is recorded in the live `release.json` and GitHub Actions history.

## Findings and corrections

- Replaced the identical failure text across all stages with stage-specific failure modes derived from the referenced methods and their limitations. These are editorial risk descriptions, not measured failure rates.
- Corrected Turkish `scoped` wording to express a scope boundary, rather than broad coverage. Replaced “Best for / En uygun” labels with “Use cases / Kullanım alanları”; the entries are conditional design guidance.
- Distinguished conversation compaction from a guaranteed readable summary. The [OpenAI compaction guide](https://developers.openai.com/api/docs/guides/compaction) describes an opaque encrypted continuation item.
- Distinguished prefix computation reuse from semantic answer reuse. Added the [Redis semantic cache documentation](https://redis.io/docs/latest/develop/use-cases/semantic-cache/) to the semantic-cache method and its dependent records.
- Added the original [MMR paper](https://www.cs.cmu.edu/~jgc/publication/The_Use_MMR_Diversity_Based_LTMIR_1998.pdf) for diversity-aware ranking, and [Sentence Transformers documentation](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html) for cross-encoder scoring. Provider reranking documentation alone does not establish every model's architecture.
- Added [ALCE](https://arxiv.org/abs/2305.14627) to citation methods and quality gates. A link beside a claim is not proof that the source supports that claim.
- Added the [retrieval guide's deletion caveat](https://developers.openai.com/api/docs/guides/retrieval): file removal can take time to propagate into search results. No universal delay is asserted.
- Clarified the source-supported scope of contextual-retrieval evaluations and removed ambiguous “peer-reviewed-style” wording from the long-context claim.
- Exposed each source's bilingual context in the source register.

## Source review

All 12 existing source pages and the four added primary sources were opened on 21 September. The retained claims were checked against the relevant definitions, abstracts, documented mechanisms, and caveats. This review does not reproduce experiments or certify an implementation. Publication dates remain the original dates; `checkedAt` and `reviewedAt` record this inspection.

| Source IDs | Review focus |
| --- | --- |
| `anthropic-context-engineering`, `anthropic-contextual-retrieval` | Context selection, chunk context, hybrid retrieval, compaction and notes |
| `rag-original-paper`, `lost-in-the-middle`, `memgpt-paper` | Retrieval architecture, position-sensitive context use, memory tiers; original experiment scope retained |
| `microsoft-graphrag` | Graph extraction, communities and retrieval; no universal advantage asserted |
| `openai-retrieval`, `openai-prompt-caching`, `openai-compaction` | Search lifecycle, prefix reuse and implementation-specific compaction |
| `google-agent-search`, `google-gemini-embedding-2` | Parsing, ranking, grounding and announced multimodal capabilities |
| `cohere-rerank`, `sbert-retrieve-rerank`, `mmr-original-paper` | Second-stage ranking, cross-encoders and novelty-aware selection |
| `redis-semantic-cache`, `alce-citation-evaluation` | Answer reuse boundaries and citation evaluation |

The new snapshot has 16 sources and 19 claims. Counts describe catalog coverage only. Schema and application behavior are unchanged; no experiment, simulation, metric or export semantics were introduced. The historical September 4 manifest is preserved, but manifests alone are not full historical catalog archives.

## Portfolio consistency

- Confirmed the root site's canonical CTX role is `core-learning` / `observatory`, with HNS upstream and LLM/LCL downstream. MEM is registered under CTX in `data/system-focus.json`.
- Added localized links back to aserdargun.com and a MEM companion explanation. The memory stage links to MEM's synthetic scenarios. These are navigation and learning relationships, not connected services or shared memory.
- Verified HTTPS access to MEM and its release manifest (`3336e63b05a5231032c7d7269eb79a3306186bda`). The local MEM README's “planned domain” statement was stale; it was not used to describe current availability.
- Verified CTX's live release manifest: `279392f67cea98b4ae6f38f486596d330a34c32e`, `main`, clean build, built September 10, research cutoff September 4. Updated the root site's stale CTX release identity and verification date, preserving the deployed research cutoff. The local September 21 snapshot is not yet published.
- Preserved pre-existing changes in the root checkout. Generated portfolio/HTML files were refreshed through `npm run generate:site`.

## Validation results

- `sh scripts/npm22.sh run validate:codex` passed: 5 lifecycle tests, 39 component/content tests, 2 release tests, and 60 Chromium tests, plus content validation, TypeScript, ESLint, production build and `git diff --check`.
- The browser suite covered both languages and widths from 320 to 1440 pixels. Manual browser inspection also confirmed the portfolio/MEM explanation and the expanded source register.
- The local artifact is stamped with research cutoff `2026-09-21` and `workingTreeDirty: true`; it does not claim these edits are committed or deployed.
- The root site's focused portfolio-projection test passed with CTX's verified live SHA and dates. Its full validation was attempted twice while other portfolio changes were being made. The last full attempt failed on `cld language contract` (actual `['tr']`, expected `['tr', 'en']`), outside the CTX edits. No all-green root-site result is claimed.
