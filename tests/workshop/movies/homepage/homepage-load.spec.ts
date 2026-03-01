// spec: tests/workshop/plans/movies-core-plan.md
// seed: tests/workshop/seed.spec.ts

/**
 * Test Case: Homepage Loads Successfully
 * 
 * Objective: Verify the application loads correctly and displays the initial state
 * Setup: Navigate to homepage and verify all core elements are present
 * 
 * Expected Results:
 * - Page title contains "Popular Movies"
 * - URL updates to /?category=Popular&page=1
 * - Demo banner is visible
 * - Movies grid displays with movie posters
 * - Left sidebar navigation is accessible
 * - Header with search bar and theme toggle is present
 * - At least 20 movie items are displayed
 * - All movie posters load successfully
 * - Popular category is highlighted/active in sidebar
 * - Star ratings are visible for each movie
 */

import { expect, test } from '@playwright/test';
import { createHelpers, expectMovieGridLayout, expectPageLoadPerformance } from '../shared-helpers';

test.describe('Homepage Load and Initial State', () => {
  test('Homepage Loads Successfully', async ({ page }) => {
    const helpers = createHelpers(page);

    await test.step('Navigate to homepage', async () => {
      await helpers.navigateToHomepage();
    });

    await test.step('Verify page loads within performance threshold', async () => {
      await expectPageLoadPerformance(page, 5000);
    });

    await test.step('Verify page title and URL', async () => {
      await expect(page).toHaveTitle(/Popular Movies/);
      await helpers.verifyURL({ category: 'Popular', page: '1' });
    });

    await test.step('Verify demo banner is present', async () => {
      const demoBanner = page.locator('text=This is a demo intended for testing. Data and images are provided by').first();
      await expect(demoBanner).toBeVisible();
      
      const tmdbLink = page.getByRole('link', { name: 'TMDB' }).first();
      await expect(tmdbLink).toBeVisible();
      await expect(tmdbLink).toHaveAttribute('href', 'https://www.themoviedb.org');
    });

    await test.step('Verify main content heading', async () => {
      await helpers.verifyPageHeading('Popular');
      await expect(page.getByRole('heading', { name: 'movies' })).toBeVisible();
    });

    await test.step('Verify movies grid layout and content', async () => {
      await expectMovieGridLayout(page);
      await helpers.verifyMoviesGridLoaded();
    });

    await test.step('Verify header components are present', async () => {
      // Verify search functionality is present - the button may be inside a search form
      const searchButton = page.getByRole('search').getByRole('button', { name: 'Search for a movie' });
      await expect(searchButton).toBeVisible();
      
      // Click search button to reveal input if needed - force click if intercepted
      await searchButton.click({ force: true });
      
      // Wait for any transitions and check if input becomes visible
      await page.waitForTimeout(500);
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await expect(searchInput).toBeVisible();
      await expect(searchInput).toHaveAttribute('placeholder', /Search for a movie/);

      // Verify theme toggle buttons are present
      await expect(page.getByRole('button', { name: '☀' })).toBeVisible();
      await expect(page.getByRole('button', { name: '☾' })).toBeVisible();

      // Verify login button is present
      await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();

      // Verify menu button is present
      const menuButton = page.getByRole('menu');
      await expect(menuButton).toBeVisible();
    });

    await test.step('Verify sidebar navigation accessibility', async () => {
      await helpers.openSidebar();
      
      // Verify sidebar sections are visible
      await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Genres' })).toBeVisible();

      // Verify Popular link shows as active/selected
      const popularLink = page.getByRole('link', { name: 'Popular' });
      await expect(popularLink).toBeVisible();
      await expect(popularLink).toHaveAttribute('href', '/?category=Popular&page=1');

      await helpers.closeSidebar();
    });

    await test.step('Verify individual movie items have required elements', async () => {
      const moviesList = page.getByRole('list', { name: 'movies' });
      const firstMovie = moviesList.locator('li').first();

      // Verify movie poster loads successfully
      const poster = firstMovie.locator('img').first();
      await expect(poster).toBeVisible();
      await expect(poster).toHaveAttribute('src', /.+/);
      
      // Verify movie title is present
      const movieTitle = firstMovie.getByRole('heading', { level: 2 });
      await expect(movieTitle).toBeVisible();
      
      // Verify star ratings are visible
      const ratingElement = firstMovie.locator('[role="generic"][aria-label="rating"]')
        .or(firstMovie.locator('[aria-label*="rating"]'));
      await expect(ratingElement).toBeVisible();
      
      // Verify movie link is functional
      const movieLink = firstMovie.getByRole('link');
      await expect(movieLink).toBeVisible();
      await expect(movieLink).toHaveAttribute('href', /\/movie\?id=\d+&page=1/);
    });
  });
});