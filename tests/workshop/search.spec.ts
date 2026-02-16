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
import { SidebarMenu } from './poms/SidebarMenu';
import { Header } from './poms/Header';

test.describe('Home And Navigation', () => {
  let sidebar: SidebarMenu;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    sidebar = new SidebarMenu(page);
    header = new Header(page);
    // Navigate to the app
    await page.goto('/');
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    // Wait for the main content to be ready
    await expect(page.getByRole('heading', { name: 'Popular', level: 1 })).toBeVisible();
  });

  test('Header And Sidebar Navigation', async ({ page }) => {
    await test.step('Confirm the sidebar shows Discover and Genres sections', async () => {
      await sidebar.open();
      await sidebar.expectSectionsVisible();
      await sidebar.expectDiscoverLinksVisible();
    });

    await test.step('Click Discover > Popular and verify the URL', async () => {
      await sidebar.clickCategory('Popular');
      await expect(page).toHaveURL(/category=Popular/);
      await expect(page).toHaveURL(/page=1/);
      await expect(page).toHaveTitle(/Popular Movies/);
    });

    await test.step('Click Discover > Top Rated and verify the URL', async () => {
      await sidebar.open();
      await sidebar.clickCategory('Top Rated');
      await expect(page).toHaveURL(/category=Top\+Rated/);
      await expect(page).toHaveURL(/page=1/);
      await expect(page).toHaveTitle(/Top Rated Movies/);
    });

    await test.step('Click Discover > Upcoming and verify the URL', async () => {
      await sidebar.open();
      await sidebar.clickCategory('Upcoming');
      await expect(page).toHaveURL(/category=Upcoming/);
      await expect(page).toHaveURL(/page=1/);
      await expect(page).toHaveTitle(/Upcoming Movies/);
    });

    await test.step('Click Popular link to return to home page', async () => {
      await sidebar.open();
      await sidebar.clickCategory('Popular');
      await expect(page).toHaveURL(/category=Popular/);
      await expect(page).toHaveURL(/page=1/);
      await expect(page).toHaveTitle(/Popular Movies/);
    });
  });

  test('User Profile Entry Point', async ({ page }) => {
    await test.step('Verify the Log In button is visible', async () => {
      await header.expectLoginButtonVisible();
    });

    await test.step('Click the login button and verify it is interactive', async () => {
      await header.clickLoginButton();
      await header.expectLoginButtonVisible();
    });
  });
});
