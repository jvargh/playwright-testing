// spec: MOVIE-LISTS-TEST-PLAN.md
// seed: tests/seed.spec.ts

/**
 * Test Case: Load Homepage Successfully
 * 
 * Objective: Verify the homepage loads correctly with all essential elements
 * Setup: Navigate to http://localhost:3000 and verify core functionality
 * 
 * Test Steps:
 * 1. Navigate to `http://localhost:3000`
 * 2. Wait for page to fully load
 * 
 * Expected Results:
 * - Page title contains "Movies"
 * - Popular movies are displayed by default
 * - URL shows `/?category=Popular&page=1`
 * - Movie grid displays 20 movies per page
 * - Each movie shows poster image, title, and star rating
 * - Navigation sidebar is visible with categories and genres
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage and Movie Grid Display', () => {
  test('Load Homepage Successfully', async ({ page }) => {
    // 1. Navigate to `http://localhost:3000`
    await page.goto('/');
    
    // 2. Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Verify page title contains "Movies"
    await expect(page).toHaveTitle(/Movies/);
    
    // Verify Popular movies are displayed by default
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    
    // Verify URL shows correct parameters
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page).toHaveURL(/page=1/);
    
    // Wait for movie grid to load
    const firstMovie = page.locator('a[href*="/movie?id="]').first();
    await expect(firstMovie).toBeVisible({ timeout: 10000 });
    
    // Verify each movie shows required elements
    const movieCards = page.locator('a[href*="/movie?id="]');
    const count = await movieCards.count();
    
    console.log(`Found ${count} movies on homepage`);
    expect(count).toBeGreaterThan(0);
    
    // Check first movie has required elements
    const firstMovieCard = movieCards.first();
    await expect(firstMovieCard.locator('img, [data-testid="poster"]')).toBeVisible(); // poster image
    
    // Title might be in the link text or nested element
    const hasTitle = await firstMovieCard.textContent();
    expect(hasTitle).toBeTruthy(); // Should have some text content
    
    // Verify navigation sidebar is accessible
    const menuButton = page.locator('.hamburger-button');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Genres' })).toBeVisible();
    }
  });
});