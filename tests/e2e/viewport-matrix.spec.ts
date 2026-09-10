import { expect, test } from '@playwright/test'

for (const locale of ['en', 'tr']) {
  for (const width of [320, 390, 768, 900, 1024, 1280, 1440]) {
    test(`${locale} research surfaces fit ${width}px without runtime errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
      await page.setViewportSize({ width, height: 900 })
      for (const route of ['pipeline', 'atlas', 'patterns', 'evidence', 'about']) {
        await page.goto(`/${locale}/${route}`)
        await expect(page.locator('main h1')).toBeVisible()
        await page.evaluate(() => document.fonts.ready)
        expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBe(width)
        await expect(page.locator('vite-error-overlay')).toHaveCount(0)
        if (width <= 390) {
          const small = await page.locator('button, a, input, select, summary').evaluateAll((nodes) => nodes.filter((node) => {
            if (!node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false
            const box = node.getBoundingClientRect()
            return box.width < 44 || box.height < 44
          }).map((node) => node.textContent?.trim().slice(0, 70)))
          expect(small, `${route} touch targets`).toEqual([])
        }
      }
      expect(errors).toEqual([])
    })
  }
}
