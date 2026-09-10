import { expect, test } from '@playwright/test'

 test('repeated keyboard traversal keeps focus and selection together', async ({ page }) => {
  await page.goto('/en/pipeline?stage=retrieve')
  await page.getByRole('button', { name: /Retrieve, stage 6/ }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: /Rerank, stage 7/ })).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: /Assemble, stage 8/ })).toHaveAttribute('aria-current', 'step')
  await page.keyboard.press('End')
  await expect(page.getByRole('button', { name: /Memory, stage 11/ })).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: /Source, stage 1/ })).toBeFocused()
  await page.keyboard.press('Home')
  await page.keyboard.press('ArrowLeft')
  await expect(page.getByRole('button', { name: /Memory, stage 11/ })).toHaveAttribute('aria-current', 'step')
})

test('mobile comparison can collapse, reopen, and select another method', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/pipeline')
  const dense = page.locator('.comparison-mobile details').filter({ hasText: 'Dense' })
  await dense.locator('summary').click()
  await expect(dense).not.toHaveAttribute('open')
  await dense.locator('summary').click()
  await expect(dense).toHaveAttribute('open')
  const hybrid = page.locator('.comparison-mobile details').filter({ hasText: 'Hybrid' })
  await hybrid.locator('summary').click()
  await expect(hybrid).toHaveAttribute('open')
  await expect(page.getByRole('radio', { name: 'Hybrid' })).toBeChecked()
  await expect(dense).not.toHaveAttribute('open')
})

test('mobile menu dismisses with Escape, outside click, and language navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/pipeline')
  const menu = page.locator('.menu-button')
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeFocused()
  await menu.click()
  await page.locator('main').click({ position: { x: 10, y: 500 } })
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page.getByRole('link', { name: 'Türkçe' }).click()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('language navigation retains and scrolls to a selected section', async ({ page }) => {
  await page.goto('/en/pipeline?stage=memory#method-comparison')
  await page.getByRole('link', { name: 'Türkçe' }).click()
  await expect(page).toHaveURL(/\/tr\/pipeline\?stage=memory#method-comparison$/)
  await expect(page.locator('#method-comparison')).toBeInViewport()
})

test('atlas empty state recovers and its method links preserve selection', async ({ page }) => {
  await page.goto('/en/atlas?q=no-match-xyz')
  await expect(page.getByRole('heading', { name: 'No matching records' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByTestId('method-record')).toHaveCount(26)
  await page.getByTestId('method-record').first().getByRole('link', { name: /Explore in the pipeline/ }).click()
  await expect(page.getByRole('radio', { name: 'Authoritative sourcing' })).toBeChecked()
  await expect(page.locator('main')).toBeFocused()
})

test('invalid evidence filters recover and multi-source claims retain stable identities', async ({ page }) => {
  await page.goto('/en/evidence?stage=invalid&kind=invalid')
  await expect(page.getByRole('combobox', { name: 'Pipeline stage' })).toHaveValue('all')
  await expect(page.getByTestId('claim-record')).toHaveCount(16)
  const claim = page.locator('#reranking-is-second-stage')
  await expect(claim.getByRole('link')).toHaveCount(2)
  const number = await claim.locator('.claim-number').textContent()
  await page.getByRole('combobox', { name: 'Pipeline stage' }).selectOption('rerank')
  await expect(claim.locator('.claim-number')).toHaveText(number!)
  await page.getByRole('combobox', { name: 'Claim kind' }).selectOption('watch-signal')
  await expect(page.getByRole('heading', { name: 'No matching records' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByTestId('claim-record')).toHaveCount(16)
})

for (const locale of ['en', 'tr']) {
  for (const width of [320, 768, 1440]) {
    test(`${locale} pages render without overflow or runtime errors at ${width}px`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
      await page.setViewportSize({ width, height: 900 })
      for (const route of ['pipeline', 'atlas', 'patterns', 'evidence', 'about']) {
        await page.goto(`/${locale}/${route}`)
        await expect(page.locator('h1')).toBeVisible()
        await expect(page).toHaveTitle(/CTX/)
        await expect(page.locator('html')).toHaveAttribute('lang', locale)
        await expect(page.locator('vite-error-overlay')).toHaveCount(0)
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
      }
      expect(errors).toEqual([])
    })
  }
}
