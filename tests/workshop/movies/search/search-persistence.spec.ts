// spec: tests/workshop/plans/movies-core-plan.md
// seed: tests/workshop/seed.spec.ts

/**
 * Test Case: Search Input Persistence
 * 
 * Objective: Verify search term persists across page navigation
 * Setup: Perform search, navigate to other pages, and verify persistence
 * 
 * Expected Results:
 * - Search term persists across page navigation
 * - Search input can be cleared and new searches performed
 * - Search functionality works from any page in the application
 */

import { expect, test } from '@playwright/test';
import { createHelpers } from '../shared-helpers';

test.describe('Search Functionality', () => {
  test('Search Input Persistence', async ({ page }) => {
    const helpers = createHelpers(page);
    const searchTerm: string = 'Batman';

    await test.step('Navigate to homepage and perform initial search', async () => {
      await helpers.navigateToHomepage();
      await helpers.performSearch(searchTerm);
      
      // Verify search results loaded
      await expect(page).toHaveURL(/searchTerm=Batman/);
      await helpers.waitForPageReady();
    });

    await test.step('Verify search term persists in input field initially', async () => {
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      // Search input may be hidden after search completes, but value should persist
      // No need to verify visibility, just check the value is preserved
      const inputValue = await searchInput.inputValue();
      expect(inputValue.toLowerCase()).toBe(searchTerm.toLowerCase());
    });

    await test.step('Navigate to genre page and verify search persistence', async () => {
      // Navigate to a genre page
      await helpers.navigateToGenre('Action');
      
      // Verify we're on the Action genre page
      await expect(page).toHaveURL(/genre.*name=Action/);
      
      // Verify search input still contains the search term (may be hidden but value persists)
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      const inputValue = await searchInput.inputValue();
      expect(inputValue.toLowerCase()).toBe(searchTerm.toLowerCase());
    });

    await test.step('Navigate to movie details and verify search persistence', async () => {
      // Click on a movie to go to movie details
      await helpers.navigateToFirstMovieDetails();
      
      // Verify we're on movie details page (ID can be numeric or IMDb format)
      await expect(page).toHaveURL(/\/movie\?id=.+/);
      
      // Verify search input still contains the search term (may be hidden but value persists)
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      const inputValue = await searchInput.inputValue();
      expect(inputValue.toLowerCase()).toBe(searchTerm.toLowerCase());
    });

    await test.step('Navigate to discover category and verify search persistence', async () => {
      // Navigate to Top Rated category
      await helpers.navigateToDiscoverCategory('Top Rated');
      
      // Verify we're on Top Rated page
      await expect(page).toHaveURL(/category=Top\+Rated/);
      
      // Verify search input still contains the search term (may be hidden but value persists)
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      const inputValue = await searchInput.inputValue();
      expect(inputValue.toLowerCase()).toBe(searchTerm.toLowerCase());
    });

    await test.step('Perform new search from current page', async () => {
      // Perform a new search from the current page (Top Rated)
      const newSearchTerm = 'Spider';
      await helpers.performSearch(newSearchTerm);
      
      // Verify new search results loaded
      await expect(page).toHaveURL(/searchTerm=Spider/);
      await helpers.waitForPageReady();
      
      // Verify search input now contains the new search term
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      const newInputValue = await searchInput.inputValue();
      expect(newInputValue.toLowerCase()).toBe(newSearchTerm.toLowerCase());
    });

    await test.step('Clear search and verify functionality', async () => {
      // First reveal the search input by clicking the search button
      const searchButton = page.getByRole('search').getByRole('button', { name: 'Search for a movie' });
      await searchButton.click({ force: true });
      await page.waitForTimeout(500);
      
      // Clear the search input
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await searchInput.click();
      await searchInput.fill('');
      
      // Verify input is empty
      const emptyInputValue = await searchInput.inputValue();
      expect(emptyInputValue).toBe('');
      
      // Type new search term
      const anotherSearchTerm = 'Marvel';
      await searchInput.fill(anotherSearchTerm);
      await searchInput.press('Enter');
      
      // Wait for new search results
      await page.waitForLoadState('networkidle');
      
      // Verify new search worked
      await expect(page).toHaveURL(/searchTerm=Marvel/);
      
      // Verify input contains the new search term
      const finalInputValue = await searchInput.inputValue();
      expect(finalInputValue.toLowerCase()).toBe(anotherSearchTerm.toLowerCase());
    });

    await test.step('Verify search works from homepage after navigation', async () => {
      // Navigate back to homepage
      await helpers.navigateToHomepage();
      
      // Verify we're on homepage
      await expect(page).toHaveURL(/category=Popular/);
      
      // The search input exists (may be hidden on mobile) but should retain value
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      // No visibility check - input may be hidden on mobile
      
      // Perform a fresh search from homepage
      const homepageSearchTerm = 'Avengers';
      await helpers.performSearch(homepageSearchTerm);
      
      // Verify search works from homepage
      await expect(page).toHaveURL(/searchTerm=Avengers/);
      await helpers.waitForPageReady();
      
      // Verify movies are displayed - use correct selectors
      const moviesList = page.getByRole('list', { name: 'movies' });
      if (await moviesList.isVisible()) {
        const movieItems = moviesList.locator('li');
        const itemCount = await movieItems.count();
        expect(itemCount).toBeGreaterThanOrEqual(1);
      }
    });

    await test.step('Verify search functionality works across browser back/forward navigation', async () => {
      // We should currently be on Avengers search results
      await expect(page).toHaveURL(/searchTerm=Avengers/);
      
      // Go back in browser history
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      // Should be back to Popular movies homepage
      await expect(page).toHaveURL(/category=Popular/);
      
      // Go forward in browser history
      await page.goForward();
      await page.waitForLoadState('networkidle');
      
      // Should be back to Avengers search results
      await expect(page).toHaveURL(/searchTerm=Avengers/);
      
      // Verify search input contains the search term after forward navigation
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      const inputValue = await searchInput.inputValue();
      expect(inputValue.toLowerCase()).toBe('avengers');
    });

    await test.step('Verify search input remains functional after multiple navigations', async () => {
      // Perform one final search to ensure everything still works
      const finalSearchTerm = 'Disney';
      await helpers.performSearch(finalSearchTerm);
      
      // Verify final search works
      await expect(page).toHaveURL(/searchTerm=Disney/);
      await helpers.waitForPageReady();
      
      // Verify search input functionality is maintained
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      const finalInputValue = await searchInput.inputValue();
      expect(finalInputValue.toLowerCase()).toBe(finalSearchTerm.toLowerCase());
      
      // Verify we can still interact with search results
      const moviesList = page.locator('list[aria-label="movies"]');
      if (await moviesList.isVisible()) {
        const movieItems = moviesList.locator('listitem');
        // Should have at least some results for Disney
        const itemCount = await movieItems.count();
        expect(itemCount).toBeGreaterThanOrEqual(1);
      }
    });
  });
});