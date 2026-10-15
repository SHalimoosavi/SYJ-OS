import { test, expect } from '@playwright/test';

test('SYJ OS boots, unlocks, opens settings and persists dark theme', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByText('SYJ OS')).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(1900);
  await expect(page.getByText('Swipe up to unlock')).toBeVisible();
  await page.getByText('Swipe up to unlock').click({ position: { x: 10, y: 5 } });
  await page.getByRole('button', { name: 'Open app drawer' }).click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Display' }).click();
  await page.locator('select').filter({ hasText: 'auto' }).selectOption('dark');
  await page.reload();
  await page.waitForTimeout(300);
  await expect(page.locator('[data-theme="dark"]')).toBeVisible();
});
