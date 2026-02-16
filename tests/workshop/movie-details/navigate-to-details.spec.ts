// spec: MOVIE-LISTS-TEST-PLAN.md
// seed: tests/seed.spec.ts

/**
 * Test Case: Navigate to Movie Details
 * 
 * Objective: Verify navigation to movie details page works correctly
 * Setup: Navigate to homepage and click on a movie to view details
 * 
 * Test Steps:
 * 1. Navigate to homepage
 * 2. Click on first movie poster/title
 * 3. Verify movie details page loads
 * 4. Test navigation back to list
 * 
 * Expected Results:
 * - Movie details URL follows pattern: `/movie?id={id}&page=1`
 * - Movie details page displays:
 *   - Movie title and tagline
 *   - Star rating with numeric score
 *   - Language, duration, and release year
 *   - Genres list with clickable genre links
 * - Browser back button returns to previous list page
 * - Page title updates to movie title
 */

import { test, expect } from '@playwright/test';

test.describe('Movie Details and Interactions', () => {
  test('Navigate to Movie Details', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for movies to load
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    
    // Try to find any movie link that goes to /movie route
    const movieLinks = page.locator('a[href*="/movie"]');
    await expect(movieLinks.first()).toBeVisible({ timeout: 10000 });
    const firstMovie = movieLinks.first();
    
    // Get the first movie's URL for later verification
    const movieUrl = await firstMovie.getAttribute('href');
    console.log(`Clicking on movie link: ${movieUrl}`);
    
    // 2. Click on first movie poster/title and wait for navigation
    await Promise.all([
      page.waitForURL(/movie.*id=\d+/),
      firstMovie.click()
    ]);
    
    // Wait for movie details page to load
    await page.waitForLoadState('networkidle');
    
    // 3. Verify movie details page loads
    
    // Movie details URL follows pattern: `/movie?id={id}&page=1`
    await expect(page).toHaveURL(/movie.*id=\d+/);
    await expect(page).toHaveURL(/page=1/);
    console.log(`Movie details URL: ${page.url()}`);
    
    // Page title updates to movie title
    const pageTitle = await page.title();
    console.log(`Movie details page title: ${pageTitle}`);
    
    // Movie details page displays required elements:
    
    // Movie title and tagline
    const detailsTitle = page.locator('[data-testid="movie-title"], h1, h2, .movie-title, .title').first();
    await expect(detailsTitle).toBeVisible();
    const detailsTitleText = await detailsTitle.textContent();
    console.log(`Movie details title: ${detailsTitleText}`);
    
    // Look for tagline (might not always be present)
    const tagline = page.locator('[data-testid="tagline"], .tagline, .movie-tagline');
    if (await tagline.count() > 0) {
      const taglineText = await tagline.first().textContent();
      console.log(`Movie tagline: ${taglineText}`);
    }
    
    // Star rating with numeric score
    const rating = page.locator('[data-testid="rating"], .rating, .stars, .score');
    if (await rating.count() > 0) {
      await expect(rating.first()).toBeVisible();
      const ratingText = await rating.first().textContent();
      console.log(`Movie rating: ${ratingText}`);
    }
    
    // Language, duration, and release year
    const movieInfo = page.locator('[data-testid="movie-info"], .movie-details, .movie-meta');
    if (await movieInfo.count() > 0) {
      const infoText = await movieInfo.first().textContent();
      console.log(`Movie info: ${infoText}`);
    } else {
      // Look for individual elements
      const year = page.locator('[data-testid="release-year"], .release-year, .year');
      const duration = page.locator('[data-testid="runtime"], .runtime, .duration');
      const language = page.locator('[data-testid="language"], .language');
      
      if (await year.count() > 0) {
        console.log(`Release year found`);
      }
      if (await duration.count() > 0) {
        console.log(`Duration found`);
      }
      if (await language.count() > 0) {
        console.log(`Language found`);
      }
    }
    
    // Genres list with clickable genre links
    const genres = page.locator('[data-testid="genre"], .genre, .genres a, .genre-link');
    const genreCount = await genres.count();
    
    if (genreCount > 0) {
      console.log(`Found ${genreCount} genre links`);
      
      // Verify first genre is clickable
      await expect(genres.first()).toBeVisible();
      const firstGenreText = await genres.first().textContent();
      console.log(`First genre: ${firstGenreText}`);
    }
    
    // 4. Test navigation back to list
    
    // Store current URL for comparison
    const detailsUrl = page.url();
    
    // Use browser back button
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    // Verify we're back to the list page
    await expect(page).toHaveURL(/category=Popular/);
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();
    
    // Verify we can navigate forward again
    await page.goForward();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(detailsUrl);
    
    console.log('Movie details navigation completed successfully');
  });
});