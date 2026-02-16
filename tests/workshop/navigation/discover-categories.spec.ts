// spec: MOVIE-LISTS-TEST-PLAN.md
// seed: tests/seed.spec.ts

/**
 * Test Case: Navigate Between Discover Categories
 * 
 * Objective: Verify navigation between Popular, Top Rated, and Upcoming categories works correctly
 * Setup: Navigate to homepage and test category navigation
 * 
 * Test Steps:
 * 1. Navigate to homepage (Popular)
 * 2. Click "Top Rated" in sidebar
 * 3. Verify URL and page content
 * 4. Click "Upcoming" in sidebar
 * 5. Verify URL and page content
 * 6. Click "Popular" to return
 * 
 * Expected Results:
 * - Each category click updates URL correctly:
 *   - Popular: `/?category=Popular&page=1`
 *   - Top Rated: `/?category=Top+Rated&page=1`
 *   - Upcoming: `/?category=Upcoming&page=1`
 * - Page title updates accordingly
 * - Movie grid refreshes with category-appropriate content
 * - Active category is highlighted in sidebar
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation and Categories', () => {
  test('Navigate Between Discover Categories', async ({ page }) => {
    // 1. Navigate to homepage (Popular)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for initial page to load
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    
    // Open sidebar menu if needed
    const menuButton = page.locator('.hamburger-button');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    }
    
    // Verify we start on Popular
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page).toHaveURL(/page=1/);
    
    // 2. Click "Top Rated" in sidebar
    await page.getByRole('link', { name: 'Top Rated' }).click();
    
    // 3. Verify URL and page content
    await expect(page).toHaveURL(/category=Top.*Rated/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Top Rated/i);
    await expect(page.getByRole('heading', { name: 'Top Rated' })).toBeVisible();
    
    // Wait for movies to load
    const topRatedMovies = page.locator('a[href*="/movie?id="]').first();
    await expect(topRatedMovies).toBeVisible({ timeout: 10000 });
    
    // Reopen menu for next navigation
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    
    // 4. Click "Upcoming" in sidebar
    await page.getByRole('link', { name: 'Upcoming' }).click();
    
    // 5. Verify URL and page content
    await expect(page).toHaveURL(/category=Upcoming/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Upcoming/i);
    await expect(page.getByRole('heading', { name: 'Upcoming' })).toBeVisible();
    
    // Wait for movies to load
    const upcomingMovies = page.locator('a[href*="/movie?id="]').first();
    await expect(upcomingMovies).toBeVisible({ timeout: 10000 });
    
    // Reopen menu for return navigation
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    
    // 6. Click "Popular" to return
    await page.getByRole('link', { name: 'Popular' }).click();
    
    // Verify return to Popular
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Popular/i);
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    
    // Wait for movies to load
    const popularMovies = page.locator('a[href*="/movie?id="]').first();
    await expect(popularMovies).toBeVisible({ timeout: 10000 });
    
    console.log('Successfully navigated through all Discover categories');
  });
});