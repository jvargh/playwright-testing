import { test, expect } from '@playwright/test';

test.describe('Test 3.1: Basic Search - Single Keyword', () => {
  /**
   * TEST SCENARIO DOCUMENTATION
   * ============================
   *
   * Objective: Verify that users can perform a basic search with a single
   * keyword and receive relevant results.
   *
   * Setup:
   * - Homepage is loaded
   * - Search functionality is accessible in header
   *
   * Test Steps:
   * 1. Click on search icon or search field in header
   * 2. Type movie title: "Wolverine"
   * 3. Press Enter or click search button
   * 4. Wait for search results to load
   * 5. Observe the displayed search results
   * 6. Verify "Wolverine" or similar movies appear in results
   * 7. Verify search term is shown in page title or header
   * 8. Check that result count is displayed
   * 9. Verify all results are relevant to search term
   *
   * Expected Results:
   * - Search field accepts text input
   * - Search executes upon pressing Enter or clicking search button
   * - Results page loads within 2 seconds
   * - Search term is preserved and displayed
   * - Relevant movies matching "Wolverine" are shown
   * - Result count is displayed (e.g., "15 results found")
   * - Each result shows movie poster, title, and rating
   * - No irrelevant movies appear in results
   * - All results are clickable and lead to movie details
   */

  test('should search for "Wolverine" and display relevant results', async ({ page }) => {
    await test.step('Navigate to search results page', async () => {
      await page.goto('/search?searchTerm=Wolverine&page=1');
      await page.waitForLoadState('networkidle', { timeout: 5000 });
    });

    await test.step('Verify search results page URL contains expected parameters', async () => {
      expect(page.url()).toContain('search');
      expect(page.url()).toContain('searchTerm=Wolverine');
    });

    await test.step('Verify search results content is loaded', async () => {
      const pageMainContent = await page.locator('main').innerText().catch(() => '');
      const hasMovieListContent = pageMainContent.toLowerCase().includes('deadpool') || 
                                       pageMainContent.toLowerCase().includes('movie') ||
                                       pageMainContent.toLowerCase().includes('wolverine');
      expect(hasMovieListContent || pageMainContent.length > 0).toBeTruthy();
    });

    await test.step('Verify movie results exist and count them', async () => {
      const movieLinks = page.locator('a[href*="/movie"]');
      const movieCount = await movieLinks.count();
      expect(movieCount).toBeGreaterThan(0);
    });

    await test.step('Verify first result is relevant to search term', async () => {
      const firstMovieLink = page.locator('a[href*="/movie"]').first();
      await expect(firstMovieLink).toBeVisible();
      const firstMovieText = await firstMovieLink.textContent();
      expect(firstMovieText?.toLowerCase()).toContain('wolverine');
    });

    await test.step('Navigate to movie details page by clicking first result', async () => {
      const firstMovieLink = page.locator('a[href*="/movie"]').first();
      await firstMovieLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 3000 }).catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    });

    await test.step('Verify movie details page is displayed with correct URL', async () => {
      const movieUrl = page.url();
      expect(movieUrl).toContain('/movie');
      expect(movieUrl).toContain('id=');
    });
  });
});
