import { test, expect } from '../src/fixtures/base';

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
  await page.screenshot({path: 'scr.png', fullPage: true})
});