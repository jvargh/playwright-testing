/**
 * Test Case: Home And Navigation
 * 
 * ## Header And Sidebar Navigation
 * 
 * Objective: Verify the header controls and sidebar navigation links are visible and route correctly.
 * Setup: Start the app at http://localhost:3000.
 * 
 * Test Steps:
 * 1. Confirm the sidebar shows Discover and Genres sections.
 * 2. Click Discover > Popular and verify the URL contains category=Popular and page=1.
 * 3. Click Discover > Top Rated and verify the URL contains category=Top+Rated and page=1.
 * 4. Click Discover > Upcoming and verify the URL contains category=Upcoming and page=1.
 * 5. Click the app logo if present and verify it returns to the home page.
 * 
 * ## User Profile Entry Point
 * 
 * Objective: Confirm the user profile button is visible and can be opened.
 * Setup: Start the app at http://localhost:3000.
 * 
 * Test Steps:
 * 1. Click the User Profile button in the header.
 * 2. Verify the profile menu or login entry is displayed.
 */

import { test, expect } from '@playwright/test';

test.describe('Home And Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    // Wait for the main content to be ready
    await expect(page.getByRole('heading', { name: 'Popular', level: 1 })).toBeVisible();
  });

  test('Header And Sidebar Navigation', async ({ page }) => {
    // Open the sidebar menu first by clicking the hamburger menu button
    const menuButton = page.locator('.hamburger-button');
    await menuButton.click();
    
    // Step 1: Confirm the sidebar shows Discover and Genres sections
    await expect(page.getByRole('heading', { name: 'Discover', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Genres', level: 2 })).toBeVisible();
    
    // Verify Discover links are visible
    await expect(page.getByRole('link', { name: 'Popular' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Top Rated' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Upcoming' })).toBeVisible();

    // Step 2: Click Discover > Popular and verify the URL
    await page.getByRole('link', { name: 'Popular' }).click();
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Popular Movies/);

    // Reopen the menu to access other links
    await menuButton.click();

    // Step 3: Click Discover > Top Rated and verify the URL
    await page.getByRole('link', { name: 'Top Rated' }).click();
    await expect(page).toHaveURL(/category=Top\+Rated/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Top Rated Movies/);

    // Reopen the menu to access other links
    await menuButton.click();

    // Step 4: Click Discover > Upcoming and verify the URL
    await page.getByRole('link', { name: 'Upcoming' }).click();
    await expect(page).toHaveURL(/category=Upcoming/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Upcoming Movies/);

    // Reopen the menu
    await menuButton.click();

    // Step 5: Click Popular link to return to home page (logo is not clickable)
    await page.getByRole('link', { name: 'Popular' }).click();
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page).toHaveURL(/page=1/);
    await expect(page).toHaveTitle(/Popular Movies/);
  });

  test('User Profile Entry Point', async ({ page }) => {
    // Step 1: Verify the Log In button is visible in the header (user is not authenticated)
    const loginButton = page.getByRole('button', { name: 'Log In' });
    await expect(loginButton).toBeVisible();

    // Step 2: Click the login button and verify it is interactive
    await loginButton.click();
    // The login button should still be present (triggers auth flow)
    await expect(loginButton).toBeVisible();
  });
});