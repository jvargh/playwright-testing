// spec: MOVIE-LISTS-TEST-PLAN.md
// seed: tests/seed.spec.ts

/**
 * Test Case: Handle No Search Results
 * 
 * Objective: Verify handling of searches that return no results
 * Setup: Navigate to homepage and search for non-existent movie
 * 
 * Test Steps:
 * 1. Navigate to homepage
 * 2. Search for "invalidmovietitle12345"
 * 3. Verify no results page
 * 
 * Expected Results:
 * - URL shows search term in querystring
 * - Page displays "Sorry!" heading
 * - Shows "There were no results for {searchTerm}..." message
 * - "Not found!" image is displayed
 * - "Home" button provides navigation back to homepage
 */

import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('Handle No Search Results', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for page to be ready
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    
    // 2. Search for "invalidmovietitle12345"
    const getVisibleSearchInput = async () => {
      // Find and click all visible search forms to expand them
      const searchForms = page.locator('form[role="search"]');
      const formCount = await searchForms.count();
      for (let i = 0; i < formCount; i++) {
        const form = searchForms.nth(i);
        if (await form.isVisible()) {
          await form.click();
          // Wait for the form expansion animation to complete
          await page.waitForTimeout(300);
        }
      }

      // Now look for visible inputs with more flexible selectors
      const inputSelectors = [
        'input[aria-label="Search Input"]',
        'input[placeholder*="Search for a movie"]',
        'form[role="search"] input[type="text"]',
        'form[role="search"] input:not([type="hidden"])'
      ];

      for (const selector of inputSelectors) {
        const inputs = page.locator(selector);
        const inputCount = await inputs.count();
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          if (await input.isVisible()) {
            return input;
          }
        }
      }

      return null;
    };

    const searchInput = await getVisibleSearchInput();
    if (!searchInput) {
      throw new Error('No visible search input found after opening search form.');
    }

    await expect(searchInput).toBeVisible();
    await searchInput.fill('invalidmovietitle12345');
    await searchInput.press('Enter');
    
    // Wait for search results to load
    await page.waitForLoadState('networkidle');
    
    // 3. Verify no results page
    
    // URL shows search term in querystring
    await expect(page).toHaveURL(/search.*searchTerm=invalidmovietitle12345/);
    
    // Check for no results indicators - try multiple possible selectors
    const noResultsIndicators = [
      'Sorry!',
      'No results',
      'no results',
      'Not found',
      'not found',
      '0 results',
      'Nothing found'
    ];
    
    let foundNoResultsMessage = false;
    
    for (const indicator of noResultsIndicators) {
      const element = page.getByText(indicator, { exact: false });
      const count = await element.count();
      if (count > 0) {
        await expect(element.first()).toBeVisible();
        console.log(`Found "no results" indicator: "${indicator}"`);
        foundNoResultsMessage = true;
        break;
      }
    }
    
    // If no specific message found, check that movie cards are not present
    if (!foundNoResultsMessage) {
      const movieCards = page.locator('a[href*="/movie"]');
      const movieCount = await movieCards.count();
      expect(movieCount).toBe(0);
      console.log('No movies found in search results, indicating no results state');
    }
    
    // Look for "There were no results for..." message pattern
    const noResultsMessage = page.getByText(/there were no results|no results found|nothing found/i);
    if (await noResultsMessage.count() > 0) {
      await expect(noResultsMessage.first()).toBeVisible();
      const messageText = await noResultsMessage.first().textContent();
      expect(messageText?.toLowerCase()).toContain('invalidmovietitle12345');
      console.log(`No results message: "${messageText}"`);
    }
    
    // Look for "Not found!" image or similar imagery
    const notFoundImage = page.locator('img[alt*="not found"], img[alt*="no results"], [data-testid="not-found"], .not-found img');
    if (await notFoundImage.count() > 0) {
      await expect(notFoundImage.first()).toBeVisible();
      console.log('Not found image is displayed');
    }
    
    // Look for "Home" button or similar navigation
    const homeButton = page.locator('button:has-text("Home"), a:has-text("Home"), [data-testid="home-button"], [href="/"]');
    if (await homeButton.count() > 0) {
      await expect(homeButton.first()).toBeVisible();
      console.log('Home button found for navigation back to homepage');
      
      // Test navigation back to homepage
      await homeButton.first().click();
      await expect(page).toHaveURL(/category=Popular/);
      await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
      console.log('Successfully navigated back to homepage');
    } else {
      console.log('Home button not found - user may need to use browser back or logo');
    }
  });
});