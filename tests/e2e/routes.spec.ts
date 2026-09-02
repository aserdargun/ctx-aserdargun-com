import { expect, test } from '@playwright/test'

const headings = {
  en: {
    pipeline: 'Build the context, not just the prompt.',
    atlas: 'Choose by constraint, not fashion.',
    patterns: 'Compose a system, then test its seams.',
    evidence: 'Every claim keeps its receipt.',
    about: 'Context is infrastructure.',
  },
  tr: {
    pipeline: 'Yalnız prompt’u değil, bağlamı kur.',
    atlas: 'Modaya göre değil, kısıta göre seç.',
    patterns: 'Sistemi birleştir, sonra ek yerlerini test et.',
    evidence: 'Her iddia makbuzunu korur.',
    about: 'Bağlam bir altyapıdır.',
  },
} as const

for (const [locale, routes] of Object.entries(headings)) {
  for (const [route, heading] of Object.entries(routes)) {
    test(`${locale}/${route} renders its localized product surface`, async ({ page }) => {
      await page.goto(`/${locale}/${route}`)
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
      await expect(page.locator('main')).toHaveCount(1)
    })
  }
}

test('locale switch preserves route and query state', async ({ page }) => {
  await page.goto('/en/pipeline?stage=memory&method=working-memory')
  await page.getByRole('link', { name: 'Türkçe' }).click()
  await expect(page).toHaveURL(/\/tr\/pipeline\?stage=memory&method=working-memory/)
  await expect(page.getByRole('heading', { level: 2, name: 'Bellek' })).toBeVisible()
})
