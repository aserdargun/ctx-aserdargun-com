import { useEffect, useRef } from 'react'
import { Icon } from '../../components/Icon'
import { localize } from '../../research/catalog'
import type { Locale, Stage, StageId } from '../../research/schema'

const icons = {
  source: 'source', ingest: 'arrow', parse: 'layers', chunk: 'assemble',
  index: 'cache', retrieve: 'search', rerank: 'sort', assemble: 'assemble',
  cite: 'quote', cache: 'cache', memory: 'memory',
} as const

export function PipelineRail({ stages, selectedId, locale, onSelect }: {
  stages: Stage[]
  selectedId: StageId
  locale: Locale
  onSelect: (id: StageId) => void
}) {
  const selectedIndex = stages.findIndex((stage) => stage.id === selectedId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLButtonElement>(null)
  const selectAt = (index: number) => onSelect(stages[(index + stages.length) % stages.length].id)

  useEffect(() => {
    const viewport = scrollRef.current
    const selected = selectedRef.current
    if (!viewport || !selected) return
    const left = selected.offsetLeft - (viewport.clientWidth - selected.clientWidth) / 2
    if (typeof viewport.scrollTo === 'function') viewport.scrollTo({ left, behavior: 'auto' })
    else viewport.scrollLeft = left
  }, [selectedId])

  return (
    <section id="pipeline-map" className="pipeline-map" aria-labelledby="pipeline-map-title">
      <h2 id="pipeline-map-title" className="sr-only">{locale === 'en' ? 'Context pipeline' : 'Bağlam pipeline’ı'}</h2>
      <div className="mobile-stage-nav">
        <button type="button" onClick={() => selectAt(selectedIndex - 1)} aria-label={locale === 'en' ? 'Previous stage' : 'Önceki aşama'}>←</button>
        <span>{selectedIndex + 1} / {stages.length}</span>
        <button type="button" onClick={() => selectAt(selectedIndex + 1)} aria-label={locale === 'en' ? 'Next stage' : 'Sonraki aşama'}>→</button>
      </div>
      <div className="pipeline-scroll" ref={scrollRef}>
        <div className="pipeline-line">
          {stages.map((stage, index) => {
            const selected = stage.id === selectedId
            const name = localize(stage.name, locale)
            return (
              <button
                key={stage.id}
                ref={selected ? selectedRef : undefined}
                type="button"
                className={selected ? 'stage-node is-selected' : 'stage-node'}
                aria-current={selected ? 'step' : undefined}
                aria-label={`${name}, ${locale === 'en' ? 'stage' : 'aşama'} ${index + 1} ${locale === 'en' ? 'of' : '/'} ${stages.length}`}
                onClick={() => onSelect(stage.id)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight') { event.preventDefault(); selectAt(index + 1) }
                  if (event.key === 'ArrowLeft') { event.preventDefault(); selectAt(index - 1) }
                }}
              >
                <span className="stage-label mono-label">{name}</span>
                <span className="stage-icon"><Icon name={icons[stage.id]} size={25} /></span>
                <span className="stage-dot" aria-hidden="true" />
                <span className="stage-provenance" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
