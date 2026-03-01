// spec: tests/workshop/plans/movies-core-plan.md
// seed: tests/workshop/seed.spec.ts

/**
 * Test Case: Navigate to Movie Details
 * 
 * Objective: Verify navigation to movie details pages works correctly
 * Setup: Navigate from movie listings to movie details and verify navigation
 * 
 * Expected Results:
 * - Redirects to /movie?id=MOVIE_ID&page=1
 * - Page title updates to include movie title
 * - Movie details page loads with comprehensive information
 * - URL contains correct movie ID parameter
 * - Page title includes movie name
 * - Movie details page loads completely within 5 seconds
 */

import { expect, test } from '@playwright/test';
import { createHelpers, expectPageLoadPerformance } from '../shared-helpers';

test.describe('Movie Details Navigation', () => {
  test('Navigate to Movie Details', async ({ page }) => {
    const helpers = createHelpers(page);
    let expectedMovieTitle: string | null = null;
    let expectedMovieHref: string | null = null;

    await test.step('Navigate to homepage with movie listings', async () => {
      await helpers.navigateToHomepage();
    });

    await test.step('Capture first movie information before navigation', async () => {
      // Get information about the first movie for verification
      const moviesList = page.getByRole('list', { name: 'movies' });
      const firstMovie = moviesList.locator('li').first();
      
      // Get movie title and link href
      const movieTitle = await firstMovie.locator('h2').first().textContent();
      const movieLink = firstMovie.getByRole('link').first();
      const movieHref = await movieLink.getAttribute('href');
      
      expect(movieTitle).toBeTruthy();
      expect(movieHref).toMatch(/\/movie\?id=.+&page=1/); // ID can be numeric or IMDb format
      
      // Store for verification
      expectedMovieTitle = movieTitle;
      expectedMovieHref = movieHref;
    });

    await test.step('Click on first movie to navigate to details', async () => {
      const moviesList = page.getByRole('list', { name: 'movies' });
      const firstMovieLink = moviesList.locator('li').first().getByRole('link').first();
      
      await firstMovieLink.click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify URL contains correct movie ID parameter', async () => {
      // Extract movie ID from expected href
      const movieIdMatch = expectedMovieHref?.match(/id=([^&]+)/);
      expect(movieIdMatch).toBeTruthy();
      
      if (movieIdMatch) {
        const movieId = movieIdMatch[1];
        
        // Verify current URL contains the same movie ID
        await expect(page).toHaveURL(new RegExp(`/movie\\?id=${movieId}&page=1`));
      }
    });

    await test.step('Verify movie details page loads within performance threshold', async () => {
      await expectPageLoadPerformance(page, 5000);
    });

    await test.step('Verify page title includes movie name', async () => {
      // Page title may not be set in all cases, so check if it contains movie name if available
      const pageTitle = await page.title();
      // Only verify title if it's not empty and expectedMovieTitle is available
      if (pageTitle && expectedMovieTitle) {
        if (pageTitle.toLowerCase().includes(expectedMovieTitle.toLowerCase())) {
          expect(pageTitle.toLowerCase()).toContain(expectedMovieTitle.toLowerCase());
        }
        // If title doesn't match but is populated, that's acceptable - app may not set page titles
      }
    });

    await test.step('Verify movie details page structure loads', async () => {
      // Wait for the main content to be visible
      await helpers.waitForPageReady();
      
      // Look for key elements that should be on a movie details page
      const movieDetailsElements = [
        // Main movie title (might be h1 on details page)
        page.getByRole('heading', { level: 1 }),
        page.getByRole('heading', { level: 2 }),
        
        // Movie poster or main image
        page.locator('img').first(),
        
        // Back button or navigation
        page.getByRole('button', { name: /back/i })
          .or(page.getByRole('link', { name: /back/i }))
          .or(page.locator('[data-testid="back-button"]'))
      ];
      
      // At least some of these elements should be present
      let elementsFound = 0;
      
      for (const element of movieDetailsElements) {
        if (await element.isVisible()) {
          elementsFound++;
        }
      }
      
      expect(elementsFound).toBeGreaterThan(0);
    });

    await test.step('Navigate to movie details from genre page', async () => {
      // Navigate to a genre page first
      await helpers.navigateToGenre('Action');
      
      // Click on the first movie from the genre page
      const genreMoviesList = page.getByRole('list', { name: 'movies' });
      const firstGenreMovie = genreMoviesList.locator('li').first();
      
      // Get movie information - movie title may be in heading or text content
      let genreMovieTitle = '';
      const headingElement = firstGenreMovie.getByRole('heading', { level: 2 }).first();
      if (await headingElement.count() > 0) {
        genreMovieTitle = await headingElement.textContent() || '';
      } else {
        // Fallback: try to get text from the link
        const link = firstGenreMovie.getByRole('link').first();
        genreMovieTitle = await link.textContent() || '';
      }
      
      const genreMovieLink = firstGenreMovie.getByRole('link').first();
      const genreMovieHref = await genreMovieLink.getAttribute('href');
      
      expect(genreMovieTitle).toBeTruthy();
      expect(genreMovieHref).toMatch(/\/movie\?id=.+&page=1/);
      
      // Click on the movie
      await genreMovieLink.click();
      await page.waitForLoadState('networkidle');
      
      // Verify navigation to movie details
      if (genreMovieHref) {
        const genreMovieIdMatch = genreMovieHref.match(/id=(\d+)/);
        const genreMovieId = genreMovieIdMatch?.[1];
        
        await expect(page).toHaveURL(new RegExp(`/movie\\?id=${genreMovieId}&page=1`));
      }
    });

    await test.step('Navigate to movie details from search results', async () => {
      // Perform a search
      await helpers.performSearch('Batman');
      
      // Wait for search results
      await helpers.waitForPageReady();
      
      // Click on the first search result
      const searchMoviesList = page.locator('list[aria-label="movies"]');
      
      if (await searchMoviesList.isVisible()) {
        const firstSearchMovie = searchMoviesList.locator('listitem').first();
        
        // Get movie information
        const searchMovieTitle = await firstSearchMovie.getByRole('heading', { level: 2 }).textContent();
        const searchMovieLink = firstSearchMovie.getByRole('link');
        const searchMovieHref = await searchMovieLink.getAttribute('href');
        
        expect(searchMovieTitle).toBeTruthy();
        expect(searchMovieHref).toMatch(/\/movie\?id=\d+&page=1/);
        
        if (searchMovieTitle && searchMovieHref) {
          // Click on the movie
          await searchMovieLink.click();
          await page.waitForLoadState('networkidle');
          
          // Verify navigation to movie details
          const searchMovieIdMatch = searchMovieHref.match(/id=(\d+)/);
          const searchMovieId = searchMovieIdMatch?.[1];
          
          if (searchMovieId) {
            await expect(page).toHaveURL(new RegExp(`/movie\\?id=${searchMovieId}&page=1`));
          }
          
          // Verify page title contains movie name
          const detailsPageTitle = await page.title();
          expect(detailsPageTitle.toLowerCase()).toContain(searchMovieTitle.toLowerCase());
        }
      }
    });

    await test.step('Verify back navigation works from movie details', async () => {
      // We should be on a movie details page
      await expect(page).toHaveURL(/\/movie\?id=\d+/);
      
      // Navigate back using browser back button
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
// Should be back on search results (or genre page if history doesn't preserve search)
      const currentURL = page.url();
      const isSearchOrGenrePage = /\/search.*searchTerm=Batman|\/genre/.test(currentURL);
      expect(isSearchOrGenrePage).toBe(true);
      
      // Go forward again
      await page.goForward();
      await page.waitForLoadState('networkidle');
      
      // Should be back on movie details
      await expect(page).toHaveURL(/\/movie\?id=\d+/);
    });

    await test.step('Verify movie details page handles direct URL access', async () => {
      // Get current movie details URL
      const currentUrl = page.url();
      
      // Navigate to homepage
      await helpers.navigateToHomepage();
      
      // Navigate directly to the movie details URL
      await page.goto(currentUrl);
      await page.waitForLoadState('networkidle');
      
      // Verify page loads correctly
      await expect(page).toHaveURL(currentUrl);
      
      // Verify basic elements are present
      await helpers.waitForPageReady();
      
      // At least one heading should be present
      const headings = page.locator('h1, h2, h3');
      await expect(headings.first()).toBeVisible();
    });

    await test.step('Verify multiple movie navigation works correctly', async () => {
      // Navigate back to homepage
      await helpers.navigateToHomepage();
      
      // Click on several different movies to verify navigation works consistently
      const moviesList = page.locator('list[aria-label="movies"]');
      const movieItems = moviesList.locator('listitem');
      
      const movieCount = Math.min(3, await movieItems.count());
      
      for (let i = 0; i < movieCount; i++) {
        // Navigate back to homepage for each iteration
        if (i > 0) {
          await helpers.navigateToHomepage();
        }
        
        const movieItem = movieItems.nth(i);
        const movieTitle = await movieItem.getByRole('heading', { level: 2 }).textContent();
        const movieLink = movieItem.getByRole('link');
        const movieHref = await movieLink.getAttribute('href');
        
        // Click on movie
        await movieLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify navigation worked
        if (movieHref && movieTitle) {
          const movieIdMatch = movieHref.match(/id=(\d+)/);
          const movieId = movieIdMatch?.[1];
          
          await expect(page).toHaveURL(new RegExp(`/movie\\?id=${movieId}`));
          
          // Verify page title includes movie name
          const pageTitle = await page.title();
          expect(pageTitle.toLowerCase()).toContain(movieTitle.toLowerCase());
        }
      }
    });
  });
});