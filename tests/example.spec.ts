import { test, expect } from '@playwright/test';

test('homepage shows Developer Tech branding', async ({ page }) => {
  await page.goto('/');
  // header logo is a button with accessible name 'Developer Tech Web Studio'
  await expect(page.getByRole('button', { name: 'Developer Tech Web Studio' })).toBeVisible();
});
