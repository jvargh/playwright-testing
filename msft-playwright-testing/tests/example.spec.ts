import { test, expect } from '@playwright/test';

test('loads playwright dev site', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
  const heading = page.getByRole('heading', { name: /Playwright/i }).first();
  await expect(heading).toBeVisible();
});

test('playwright docs link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const docLinks = page.getByRole('link', { name: /docs|getting started/i });
  const firstLink = docLinks.first();
  await expect(firstLink).toBeVisible();
});