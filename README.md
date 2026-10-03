# CTX — Context & Knowledge Engineering

CTX is a bilingual, source-backed field guide for designing the information system that runs before an AI model answers. It connects the complete context path:

`source → ingest → parse → chunk → index → retrieve → rerank → assemble → cite → cache → memory`

The product covers dense, sparse, hybrid, graph, multimodal, long-context, caching, compression, provenance, citation, and memory techniques without presenting unsupported benchmark numbers or universal pass states.

## Local lifecycle

The checkout owns its preview lifecycle and uses Node.js 22:

```bash
sh scripts/npm22.sh ci
sh scripts/npm22.sh run preview:start
sh scripts/npm22.sh run preview:status
sh scripts/npm22.sh run validate:codex
sh scripts/npm22.sh run preview:stop
```

The preview binds only to `http://127.0.0.1:4175`. Stop refuses to terminate a listener owned by another checkout.

## Research contract

Structured records live under `content/` and are parsed fail-closed with Zod. Every public research record has complete English and Turkish text, stable references, source IDs, and a review date no later than the active snapshot cutoff. Evidence, synthesis, and watch signals remain distinct.

The current `2026-09-21` snapshot contains 11 stages, 26 techniques, 6 architecture patterns, 16 primary sources, 19 claims, and 5 evidence-required quality gates. All sixteen source pages were inspected during the editorial refresh. See [the review log](docs/research-review-2026-09-21.md) for source mappings and boundaries. Historical snapshot manifests retain their original dates; they do not embed complete historical catalogs.

The validator rejects invalid calendar dates, duplicate references, inconsistent stage ownership, methods outside a pattern's stages, non-primary sources, and incomplete snapshot coverage. Pattern and quality-gate review dates follow the same cutoff rule as stages, methods, and claims.

Every dated manifest under `content/snapshots/` is validated on each build. An archived slice must carry its own cutoff in its file name and ID, must not be published before that cutoff, and must not repeat a reference or cite a source or claim the catalog cannot resolve. Archived slices may omit records they had not yet reviewed, but the active snapshot must equal the newest archived slice, so the evidence history and the shipped catalog cannot drift apart.

## Portfolio role

CTX is the core-learning observatory for context and knowledge engineering in aserdargun.com. HNS → CTX → LLM / LCL describes conceptual learning paths. MEM is its independent companion laboratory for synthetic memory lifecycle scenarios; links do not transfer state or provide a shared backend.

## Connected research flows

Atlas methods open their exact pipeline stage and selection. Each stage exposes its failure modes, source references, and related claims. Architecture patterns link to their constituent methods and show the quality gates required for that pattern. The evidence ledger retains every source for each claim and keeps claim identifiers stable across filtering.

Filters and selections are shareable through the URL. Empty result sets offer a reset; invalid filters fall back to valid defaults. Language switching preserves section anchors as well as selections. Pipeline keyboard navigation supports arrows, Home, and End; mobile menus dismiss with Escape or an outside click.

## Validation

`npm run validate:codex` checks lifecycle ownership, content integrity, TypeScript, ESLint, component behavior, a production build, artifact integrity, localized routes, desktop/mobile interaction, viewport overflow, 44px mobile targets, and serious/critical axe findings.

A valid `dist/` includes hashed JavaScript and CSS, local IBM Plex fonts, `staticwebapp.config.json`, and `release.json` stamped with the exact Git SHA, branch, repository, research cutoff, and build timestamp.

`content/active-snapshot.ts` selects the dated research snapshot for both the application and release tools. Release metadata also records `workingTreeDirty`, so a local preview with uncommitted edits cannot be mistaken for an exact commit build. Artifact validation runs the release tests on the current branch. Test workers are bounded to two to keep local validation usable alongside other projects.

## Publication

The public repository is `aserdargun/ctx-aserdargun-com`. GitHub Actions deploy only the validated `dist/` artifact to the Free, West Europe Azure Static Web App `swa-ctx-aserdargun-com` in `rg-ctx-aserdargun-com`. The workflow uses `AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_CTX_ASERDARGUN_COM`; it does not use Oryx or Vercel.

The existing custom domain is `ctx.aserdargun.com`. Publication requires explicit authorization and verification of GitHub Actions, Azure readiness, and the live `release.json` against the intended commit. A local snapshot alone does not establish the deployed research cutoff.

## Licensing

Source code is MIT licensed. Original research prose and structured catalog content are licensed under CC BY 4.0. Linked third-party material remains under its respective owner’s terms.
