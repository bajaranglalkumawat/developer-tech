import { test, expect } from '@playwright/test';

const BASE_URL = 'https://developertech.in';

test.describe('DeveloperTech Website Tests', () => {
  test('Homepage loads', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Developer/i);
  });

  test('No console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(BASE_URL);
    await page.waitForTimeout(3000);

    expect(errors).toEqual([]);
  });

  test('Main navigation visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('header')).toBeVisible();
  });

  test('Homepage screenshot', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.screenshot({
      path: 'screenshots/homepage.png',
      fullPage: true,
    });
  });

  test('Mobile menu works', async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto(BASE_URL);

    const menuButton = page.locator('button').first();

    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
  });

  test('All images loaded', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const loaded = await images.nth(i).evaluate((image) => {
        return image.complete && image.naturalWidth > 0;
      });

      expect(loaded).toBeTruthy();
    }
  });

  test('Page performance basic check', async ({ page }) => {
    await page.goto(BASE_URL);

    const loadTime = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return nav.loadEventEnd;
    });

    expect(loadTime).toBeLessThan(5000);
  });
});
