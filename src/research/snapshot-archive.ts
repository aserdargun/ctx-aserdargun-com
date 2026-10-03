import { snapshotSchema, type Snapshot } from './schema'

export interface SnapshotArchiveEntry {
  fileName: string
  data: unknown
}

// Archived manifests are point-in-time coverage lists, not full catalogs, so they
// are free to omit records. They are not free to cite an identifier the catalog
// no longer resolves: that would leave the evidence history pointing at nothing.
export interface SnapshotArchiveContext {
  sourceIds: ReadonlySet<string>
  claimIds: ReadonlySet<string>
}

function requireUniqueReferences(ids: string[], label: string, snapshot: Snapshot) {
  if (new Set(ids).size !== ids.length) throw new Error(`Snapshot ${snapshot.id} repeats a ${label} reference`)
}

function requireResolvable(ids: string[], known: ReadonlySet<string>, label: string, snapshot: Snapshot) {
  for (const id of ids) {
    if (!known.has(id)) throw new Error(`Snapshot ${snapshot.id} cites an unknown ${label}: ${id}`)
  }
}

// Compare the manifest fields that define a snapshot, ignoring array order so a
// hand-reordered file stays equivalent to the re-exported active snapshot.
function canonical(snapshot: Snapshot) {
  return JSON.stringify({
    id: snapshot.id,
    cutoff: snapshot.cutoff,
    publishedAt: snapshot.publishedAt,
    summary: [snapshot.summary.en, snapshot.summary.tr],
    reviewedSourceIds: [...snapshot.reviewedSourceIds].sort(),
    claimIds: [...snapshot.claimIds].sort(),
    watchSignalIds: [...snapshot.watchSignalIds].sort(),
  })
}

export function validateSnapshotArchive(entry: SnapshotArchiveEntry, context: SnapshotArchiveContext): Snapshot {
  const snapshot = snapshotSchema.parse(entry.data)
  if (entry.fileName.replace(/\.json$/, '') !== snapshot.cutoff) {
    throw new Error(`Snapshot file name must carry its own cutoff date: ${entry.fileName}`)
  }
  if (snapshot.id !== `snapshot-${snapshot.cutoff}`) {
    throw new Error(`Snapshot id must match its cutoff date: ${snapshot.id}`)
  }
  if (snapshot.publishedAt < snapshot.cutoff) throw new Error(`Snapshot published before cutoff: ${snapshot.id}`)
  requireUniqueReferences(snapshot.reviewedSourceIds, 'source', snapshot)
  requireUniqueReferences(snapshot.claimIds, 'claim', snapshot)
  requireUniqueReferences(snapshot.watchSignalIds, 'watch signal', snapshot)
  requireResolvable(snapshot.reviewedSourceIds, context.sourceIds, 'source', snapshot)
  requireResolvable(snapshot.claimIds, context.claimIds, 'claim', snapshot)
  requireResolvable(snapshot.watchSignalIds, context.claimIds, 'watch signal', snapshot)
  for (const id of snapshot.watchSignalIds) {
    if (!snapshot.claimIds.includes(id)) throw new Error(`Watch signal is outside the snapshot claims: ${id}`)
  }
  return snapshot
}

export function validateSnapshotArchiveSet(entries: SnapshotArchiveEntry[], active: Snapshot, context: SnapshotArchiveContext): Snapshot[] {
  if (entries.length === 0) throw new Error('Snapshot archive is empty')
  const snapshots = entries.map((entry) => validateSnapshotArchive(entry, context))
  const cutoffs = snapshots.map((snapshot) => snapshot.cutoff)
  if (new Set(cutoffs).size !== cutoffs.length) throw new Error('Snapshot archive repeats a cutoff date')
  const ordered = [...snapshots].sort((left, right) => left.cutoff.localeCompare(right.cutoff))
  const newest = ordered[ordered.length - 1]
  if (canonical(newest) !== canonical(active)) {
    throw new Error(`Active snapshot ${active.id} does not match the newest archived snapshot ${newest.id}`)
  }
  return ordered
}
