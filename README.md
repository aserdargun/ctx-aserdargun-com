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

The current `2026-09-04` snapshot contains 11 stages, 26 techniques, 6 architecture patterns, 12 primary sources, 16 claims, and 5 evidence-required quality gates. All twelve source links were rechecked during the editorial refresh.

## Validation

`npm run validate:codex` checks lifecycle ownership, content integrity, TypeScript, ESLint, component behavior, a production build, artifact integrity, localized routes, desktop/mobile interaction, viewport overflow, 44px mobile targets, and serious/critical axe findings.

A valid `dist/` includes hashed JavaScript and CSS, local IBM Plex fonts, `staticwebapp.config.json`, and `release.json` stamped with the exact Git SHA, branch, repository, research cutoff, and build timestamp.

## Publication

The public repository is `aserdargun/ctx-aserdargun-com`. GitHub Actions deploy only the validated `dist/` artifact to the Free, West Europe Azure Static Web App `swa-ctx-aserdargun-com` in `rg-ctx-aserdargun-com`. The workflow uses `AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_CTX_ASERDARGUN_COM`; it does not use Oryx or Vercel.

The custom domain `ctx.aserdargun.com` is a separate DNS and Azure custom-domain operation after the generated hostname is verified.

## Licensing

Source code is MIT licensed. Original research prose and structured catalog content are licensed under CC BY 4.0. Linked third-party material remains under its respective owner’s terms.
