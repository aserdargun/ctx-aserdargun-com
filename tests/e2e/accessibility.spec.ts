import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const route of ['pipeline', 'atlas', 'patterns', 'evidence', 'about']) {
  test(`${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(`/en/${route}`)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([])
  })
}

test('reduced motion collapses transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en/pipeline')
  const duration = await page.locator('.stage-icon').first().evaluate((node) => Number.parseFloat(getComputedStyle(node).transitionDuration))
  expect(duration).toBeLessThanOrEqual(0.00001)
})
