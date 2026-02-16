/**
 * Seed Test for Movies List Management Application
 * 
 * This file serves as the foundational test setup for the entire test suite.
 * It verifies that the application can be started successfully and basic
 * functionality is working before other tests are executed.
 * 
 * Objective: Verify the application loads correctly and is ready for testing
 */

import { test, expect } from '@playwright/test';

test.describe('Application Setup and Basic Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the app using the configured baseURL
    await page.goto('/');
    // Wait for network idle to ensure all resources have loaded
    await page.waitForLoadState('networkidle');
  });

  test('Application loads successfully', async ({ page }) => {
    // Verify page title contains "Movies"
    await expect(page).toHaveTitle(/Movies/);
    
    // Verify the page loads with Popular movies by default
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page).toHaveURL(/page=1/);
    
    // Verify main content areas are present
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
  });

  test('Core navigation elements are present', async ({ page }) => {
    // Verify header components exist
    await expect(page.locator('header')).toBeVisible();
    
    // Verify sidebar navigation exists (may need to open menu first)
    const menuButton = page.locator('.hamburger-button');
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    
    // Verify key navigation sections
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Genres' })).toBeVisible();
    
    // Verify essential links are present
    await expect(page.getByRole('link', { name: 'Popular' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Top Rated' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Upcoming' })).toBeVisible();
  });

  test('Movie grid loads with content', async ({ page }) => {
    // Wait for movie links to load (movies typically have links to /movie?id=)
    const movieLinks = page.locator('a[href*="/movie?id="]').first();
    await expect(movieLinks).toBeVisible({ timeout: 10000 });
    
    // Verify we have movie content displayed
    const movieCount = await page.locator('a[href*="/movie?id="]').count();
    expect(movieCount).toBeGreaterThan(0);
    
    console.log(`Found ${movieCount} movies on the page`);
  });
});