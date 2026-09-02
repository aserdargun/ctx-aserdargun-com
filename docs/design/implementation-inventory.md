# CTX implementation inventory

## Source concepts

- Desktop: `docs/design/ctx-primary-desktop.png`, 1536×1024.
- Mobile: `docs/design/ctx-primary-mobile.png`, 864×1821 representing a 390px-class layout.
- Background is warm white paper, not gray, cream, dark, gradient, or glass.
- Cobalt is reserved for flow, selection, links, and focus. Vermilion identifies provenance.
- Generated numeric metrics in the mobile concept are layout examples only and are excluded from production content.

## Allowed first-viewport copy

- CTX
- Context & Knowledge Engineering
- Atlas
- Pipeline
- Patterns / Pattern’ler
- Evidence / Kanıt
- About / Hakkında
- EN / TR
- Build the context, not just the prompt.
- Yalnız prompt’u değil, bağlamı kur.
- Trace how sources become grounded, efficient model context.
- Kaynakların grounded ve verimli model bağlamına dönüşümünü izle.
- Explore the pipeline / Pipeline’ı keşfet
- Compare methods / Yöntemleri karşılaştır
- SOURCE, INGEST, PARSE, CHUNK, INDEX, RETRIEVE, RERANK, ASSEMBLE, CITE, CACHE, MEMORY
- Reviewed 02 Sep 2026 / 02 Eyl 2026 tarihinde incelendi
- Primary sources only / Yalnız birincil kaynaklar

## Component families

- Header: code mark, full product name, five text navigation links, EN/TR switch, mobile menu.
- Hero: one large heading, one supporting sentence, two square actions.
- Pipeline: one unbroken rail, eleven stage controls, provenance diamonds, selected-stage count on mobile.
- Detail: open integrated rail; never a modal or floating card.
- Method comparison: open desktop table; ruled mobile disclosures.
- Quality gates: ruled disclosure rows; no universal pass state.
- Supporting routes: editorial headers, filter rails, open lists, structured relationship flows.
- Footer: provenance statement and GitHub link.

## Typography and geometry

- IBM Plex Sans: prose, headings, and controls.
- IBM Plex Mono: pipeline stages, IDs, metadata, and evidence labels.
- Heading letter spacing is tight; body copy remains relaxed.
- Rules are one pixel. Radius is 0–6px. No pills or nested rounded panels.
- Mobile interactive controls have at least 44×44 CSS pixel geometry.

## Icon inventory

- Menu: three square-ended horizontal strokes.
- Direction: square-ended arrow SVG.
- Stages: document, layers, search, rerank arrows, assembly nodes, citation quotes, cache box, and memory chip.
- Status: check and warning shapes paired with text; never color alone.
- All icons use the same 1.7px square-cap outline family.

## Motion and accessibility

- Cobalt path and selection transitions may move for orientation.
- Reduced motion removes trace and entrance movement.
- Skip link, focus-visible rings, native controls, logical DOM order, and one main landmark are mandatory.
