// Vite serves a file's contents as a string under the `?raw` suffix, and
// resolves a pattern of files with `import.meta.glob`. Neither type-check
// project in this repository includes Vite's client types, so the shapes are
// declared here for both of them. This file stays a global script — an ambient
// module declaration only applies when it is not inside a module.

declare module '*?raw' {
  const content: string
  export default content
}

interface ImportMeta {
  glob(
    pattern: string,
    options?: { query?: string; import?: string; eager?: boolean },
  ): Record<string, unknown>
}
