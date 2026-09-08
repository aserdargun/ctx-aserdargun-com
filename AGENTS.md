# CTX working contract

- Build CTX (Context & Knowledge Engineering) as the core-learning observatory for the information system that runs before a model answers.
- Keep research truth in `content/` parsed fail-closed with Zod; no unsupported benchmark numbers, no universal pass states, no fabricated "best technique" claims in `src/`.
- A technique, pattern, or claim page receives its local stage context and source-backed references only. Aggregate snapshot coverage and cross-stage metrics are observer outputs, never decision inputs for individual entries.
- Behavior, experiment, world, simulation, metric, and export schema versions are explicit. Update affected versions when semantics change.
- Every snapshot is `release.json` stamped with the exact Git SHA, branch, repository, research cutoff, and build timestamp; reject mismatched or out-of-cutoff records.
- Keep Turkish and English controls and explanations equivalent. Label model assumptions and simulation units.
- Verify `npm run validate:codex` and review `git diff --check` before handoff.
- Local work only unless the user authorizes external publication. Preserve unrelated work and processes.
