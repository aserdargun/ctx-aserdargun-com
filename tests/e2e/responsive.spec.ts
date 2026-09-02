import { expect, test } from '@playwright/test'

const routes = ['pipeline', 'atlas', 'patterns', 'evidence', 'about']

for (const route of routes) {
  test(`mobile ${route} has no page overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/en/${route}`)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
  })
}

test('mobile pipeline exposes 44px visible interactive targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/pipeline?stage=retrieve&method=dense-retrieval-method')
  const small = await page.locator('button, a, input, select, summary').evaluateAll((nodes) => nodes.filter((node) => {
    const style = getComputedStyle(node)
    const box = node.getBoundingClientRect()
    if (style.visibility === 'hidden' || style.display === 'none' || style.opacity === '0' || box.width === 0 || box.height === 0) return false
    return box.width < 44 || box.height < 44
  }).map((node) => ({ tag: node.tagName, text: node.textContent?.trim().slice(0, 50), box: node.getBoundingClientRect().toJSON() })))
  expect(small).toEqual([])
})

test('mobile pipeline centers the selected stage in its internal rail', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/pipeline?stage=retrieve&method=dense-retrieval-method')
  const geometry = await page.locator('.pipeline-scroll').evaluate((rail) => {
    const selected = rail.querySelector('[aria-current="step"]')!
    const railBox = rail.getBoundingClientRect()
    const selectedBox = selected.getBoundingClientRect()
    return { railCenter: railBox.left + railBox.width / 2, selectedCenter: selectedBox.left + selectedBox.width / 2 }
  })
  expect(Math.abs(geometry.railCenter - geometry.selectedCenter)).toBeLessThan(3)
})

test('mobile menu exposes all five destinations and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/pipeline')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveCount(5)
  await page.getByRole('link', { name: 'Evidence' }).click()
  await expect(page).toHaveURL(/\/en\/evidence/)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
})
