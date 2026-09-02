import { loadResearchCatalog } from '../src/research/catalog'

const catalog = loadResearchCatalog()
console.log(`CTX content valid: ${catalog.stages.length} stages, ${catalog.methods.length} methods, ${catalog.sources.length} sources, ${catalog.claims.length} claims, ${catalog.patterns.length} patterns.`)
