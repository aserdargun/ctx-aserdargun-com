export const routeSlugs = ['pipeline', 'atlas', 'patterns', 'evidence', 'about'] as const
export type RouteSlug = (typeof routeSlugs)[number]

export function isRouteSlug(value: string | undefined): value is RouteSlug {
  return routeSlugs.includes(value as RouteSlug)
}
