import { describe, expect, it } from 'vitest'
import archive20260904 from '../../content/snapshots/2026-09-04.json'
import archive20260921 from '../../content/snapshots/2026-09-21.json'
import { loadResearchCatalog } from './catalog'
import { validateSnapshotArchive, validateSnapshotArchiveSet, type SnapshotArchiveContext, type SnapshotArchiveEntry } from './snapshot-archive'
import type { Snapshot } from './schema'

const catalog = loadResearchCatalog()
const active = catalog.snapshot
const context: SnapshotArchiveContext = {
  sourceIds: new Set(catalog.sources.map((source) => source.id)),
  claimIds: new Set(catalog.claims.map((claim) => claim.id)),
}

const entries: SnapshotArchiveEntry[] = [
  { fileName: '2026-09-21.json', data: archive20260921 },
  { fileName: '2026-09-04.json', data: archive20260904 },
]

function archive(overrides: Partial<Snapshot> = {}): Snapshot {
  return { ...structuredClone(active), ...overrides } as Snapshot
}

const corruptions: [string, (entry: SnapshotArchiveEntry) => void][] = [
  ['file name without its own cutoff', (entry) => { entry.fileName = 'archived.json' }],
  ['id detached from cutoff', (entry) => { entry.data = { ...(entry.data as object), id: 'snapshot-drifted' } }],
  ['publication before cutoff', (entry) => { entry.data = { ...(entry.data as object), publishedAt: '2020-01-01' } }],
  ['missing id', (entry) => { const copy = { ...(entry.data as object) } as Record<string, unknown>; delete copy.id; entry.data = copy }],
  ['a source the catalog cannot resolve', (entry) => { const copy = archive(); copy.reviewedSourceIds = [...copy.reviewedSourceIds, 'source-that-does-not-exist']; entry.data = copy }],
  ['a claim the catalog cannot resolve', (entry) => { const copy = archive(); copy.claimIds = [...copy.claimIds, 'claim-that-was-never-reviewed']; entry.data = copy }],
  ['a watch signal outside the catalog', (entry) => { const copy = archive({ watchSignalIds: ['not-a-reviewed-claim'] }); entry.data = copy }],
  ['repeated source reference', (entry) => { const copy = archive(); copy.reviewedSourceIds = [...copy.reviewedSourceIds, copy.reviewedSourceIds[0]]; entry.data = copy }],
  ['repeated claim reference', (entry) => { const copy = archive(); copy.claimIds = [...copy.claimIds, copy.claimIds[0]]; entry.data = copy }],
  ['watch signal outside the snapshot claims', (entry) => { const copy = archive({ watchSignalIds: ['not-a-reviewed-claim'] }); copy.claimIds = copy.claimIds.filter((id) => !copy.watchSignalIds.includes(id)); entry.data = copy }],
  ['empty source register', (entry) => { entry.data = archive({ reviewedSourceIds: [] }) }],
  ['untranslated summary', (entry) => { entry.data = archive({ summary: { en: 'Only English.', tr: '' } }) }],
]

describe('snapshot archive integrity', () => {
  it('accepts the committed archive and resolves the active pointer to its newest slice', () => {
    const ordered = validateSnapshotArchiveSet(entries, active, context)
    expect(ordered.map((snapshot) => snapshot.cutoff)).toEqual(['2026-09-04', '2026-09-21'])
    expect(ordered[ordered.length - 1].id).toBe(active.id)
  })

  it('validates a single archived slice', () => {
    expect(validateSnapshotArchive(entries[1], context).id).toBe('snapshot-2026-09-04')
  })

  it.each(corruptions)('rejects %s', (_name, corrupt) => {
    const entry = structuredClone(entries[1])
    corrupt(entry)
    expect(() => validateSnapshotArchive(entry, context)).toThrow()
  })

  it('rejects an empty archive', () => {
    expect(() => validateSnapshotArchiveSet([], active, context)).toThrow()
  })

  it('rejects two slices claiming the same cutoff date', () => {
    const duplicate = { fileName: '2026-09-21-copy.json', data: structuredClone(archive20260921) }
    expect(() => validateSnapshotArchiveSet([entries[0], duplicate as SnapshotArchiveEntry], active, context)).toThrow()
  })

  it('rejects an active pointer that is not the newest archived slice', () => {
    const older = structuredClone(archive20260904) as unknown as Snapshot
    expect(() => validateSnapshotArchiveSet(entries, older, context)).toThrow()
  })
})
