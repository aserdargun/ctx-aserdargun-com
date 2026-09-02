import { expect, test } from '@playwright/test'

test('stage, method, and provenance remain synchronized', async ({ page }) => {
  await page.goto('/en/pipeline?stage=retrieve&method=dense-retrieval-method')
  await page.getByRole('button', { name: /Memory, stage 11/ }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Memory' })).toBeVisible()
  await expect(page).toHaveURL(/stage=memory&method=working-memory/)
  await page.locator('.method-option').filter({ hasText: 'Compaction' }).click()
  await expect(page.getByRole('radio', { name: 'Compaction' })).toBeChecked()
  await expect(page).toHaveURL(/method=memory-compaction/)
  await expect(page.getByText('Primary sources only').first()).toBeVisible()
})

test('keyboard traversal advances the selected pipeline stage', async ({ page }) => {
  await page.goto('/en/pipeline?stage=retrieve')
  const retrieve = page.getByRole('button', { name: /Retrieve, stage 6/ })
  await retrieve.focus()
  await retrieve.press('ArrowRight')
  await expect(page.getByRole('button', { name: /Rerank, stage 7/ })).toHaveAttribute('aria-current', 'step')
})
