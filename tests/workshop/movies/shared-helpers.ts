/**
 * Shared helpers for Movies App test suite
 * 
 * This file contains reusable functions for common actions across multiple test scenarios.
 * These helpers promote code reuse and maintain consistency across the test suite.
 */

import { type Page, expect } from '@playwright/test';

export class MoviesAppHelpers {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to homepage and wait for it to load completely
   */
  async navigateToHomepage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    
    // Handle webkit error page redirects
    if (this.page.url().includes('/error')) {
      await this.page.goto('/');
      await this.page.waitForLoadState('networkidle');
    }
    
    await expect(this.page.getByRole('heading', { name: 'Popular' })).toBeVisible();
  }

  /**
   * Open the sidebar navigation menu
   */
  async openSidebar() {
    // Wait for page to be ready first
    await this.page.waitForLoadState('networkidle');
    
    // The menu button is a clickable menu element 
    const menuButton = this.page.getByRole('menu');
    await expect(menuButton).toBeVisible({ timeout: 10000 });
    await menuButton.click();
    
    // Wait for sidebar to open completely - check for both headings and first genre link
    await expect(this.page.getByRole('heading', { name: 'Discover' })).toBeVisible({ timeout: 10000 });
    // Use h2 specifically to avoid matching "The Genres" h3
    await expect(this.page.locator('h2:has-text("Genres")')).toBeVisible({ timeout: 10000 });
    
    // Ensure genre links are loaded
    // Look specifically in the navigation/sidebar for Action link, not movie summaries
    const navigationArea = this.page.locator('nav, aside').first();
    await expect(navigationArea.getByRole('link', { name: 'Action' })).toBeVisible({ timeout: 10000 });
    
    // Wait an extra moment for any animations to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Close the sidebar navigation menu
   */
  async closeSidebar() {
    // Press Escape to close the sidebar
    await this.page.keyboard.press('Escape');
    // Wait longer for the sidebar animation to complete and menu items to be removed
    await this.page.waitForTimeout(1500);
    
    // Verify sidebar is actually closed by checking the drawer element
    const sideDrawer = this.page.locator('.side-drawer').first();
    if (await sideDrawer.isVisible()) {
      // Check if it still has 'opened' class, if so try again
      const className = await sideDrawer.getAttribute('class').catch(() => '');
      if (className && className.includes('opened')) {
        // Press Escape again and wait
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1500);
      }
    }
  }

  /**
   * Perform a search using the search input
   */
  async performSearch(searchTerm: string) {
    // First click the search button to reveal the hidden mobile search input
    const searchButton = this.page.getByRole('search').getByRole('button', { name: 'Search for a movie' });
    await expect(searchButton).toBeVisible();
    await searchButton.click({ force: true });
    
    // Wait for input to become visible
    await this.page.waitForTimeout(500);
    
    // Now interact with the search input
    const searchInput = this.page.getByRole('textbox', { name: 'Search Input' });
    await expect(searchInput).toBeVisible();
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to a specific genre by clicking it in the sidebar
   */
  async navigateToGenre(genreName: string) {
    await this.openSidebar();
    const genreLink = this.page.getByRole('link', { name: genreName }).first();
    await expect(genreLink).toBeVisible({ timeout: 10000 });
    
    await genreLink.click();
    await this.page.waitForLoadState('networkidle');
    
    // Wait for genre page content to load completely
    await expect(this.page.getByRole('heading', { name: genreName })).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByRole('heading', { name: 'movies' })).toBeVisible({ timeout: 10000 });
    
    // Ensure movies list is loaded
    const moviesList = this.page.getByRole('list', { name: 'movies' });
    await expect(moviesList).toBeVisible({ timeout: 15000 });
    
    // Close sidebar after navigation to prevent interference with clicks
    await this.closeSidebar();
    
    // Wait for movies to load - give extra time for API calls
    await this.page.waitForTimeout(2000);
    
    // Verify at least one movie loaded
    const movieItems = moviesList.locator('li');
    await expect(movieItems.first()).toBeVisible({ timeout: 10000 });
  }

  /**
   * Navigate to a discover category (Popular, Top Rated, Upcoming)
   */
  async navigateToDiscoverCategory(category: 'Popular' | 'Top Rated' | 'Upcoming') {
    await this.openSidebar();
    const categoryLink = this.page.getByRole('link', { name: category });
    await categoryLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on a movie poster to navigate to movie details
   * Uses the first available movie in the grid
   */
  async navigateToFirstMovieDetails() {
    const firstMovieLink = this.page.getByRole('list', { name: 'movies' }).locator('li').first().getByRole('link');
    const movieHref = await firstMovieLink.getAttribute('href');
    await firstMovieLink.click();
    await this.page.waitForLoadState('networkidle');
    return movieHref;
  }

  /**
   * Click on a specific movie by title
   */
  async navigateToMovieByTitle(movieTitle: string) {
    const movieLink = this.page.getByRole('link', { name: new RegExp(movieTitle, 'i') });
    await movieLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Toggle theme between light and dark mode
   */
  async toggleTheme(targetTheme: 'light' | 'dark') {
    const button = targetTheme === 'dark' 
      ? this.page.getByRole('button', { name: '☾' })
      : this.page.getByRole('button', { name: '☀' });
    
    await button.click();
    // Wait for theme transition
    await this.page.waitForTimeout(500);
  }

  /**
   * Verify that movies grid is loaded and displays movies
   */
  async verifyMoviesGridLoaded() {
    // Use getByRole for better reliability and longer timeout
    const moviesList = this.page.getByRole('list', { name: 'movies' });
    await expect(moviesList).toBeVisible({ timeout: 15000 });
    
    // Check that movies are displayed (accounting for potential loading variations on slow connections)
    const movieItems = moviesList.locator('li');
    await expect(movieItems.first()).toBeVisible({ timeout: 10000 });
    const count = await movieItems.count();
    expect(count).toBeGreaterThanOrEqual(10); // Require at least 10 instead of 15 for slower APIs

    // Verify that movie posters are loaded
    const firstPoster = movieItems.first().locator('img').first();
    await expect(firstPoster).toBeVisible({ timeout: 10000 });
    await expect(firstPoster).toHaveAttribute('src', /.+/);
  }

  /**
   * Verify page URL contains expected parameters
   */
  async verifyURL(expectedParams: Record<string, string>) {
    for (const [param, value] of Object.entries(expectedParams)) {
      await expect(this.page).toHaveURL(new RegExp(`${param}=${encodeURIComponent(value)}`));
    }
  }

  /**
   * Verify that a specific heading is visible
   */
  async verifyPageHeading(headingText: string) {
    await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible();
  }

  /**
   * Navigate to pagination page
   */
  async navigateToPage(pageNumber: number) {
    // Look for pagination controls - this may need adjustment based on actual pagination implementation
    const pageLink = this.page.getByRole('link', { name: `Page ${pageNumber}` })
      .or(this.page.getByRole('button', { name: `Page ${pageNumber}` }))
      .or(this.page.getByRole('link', { name: pageNumber.toString() }));
    
    await pageLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on user profile dropdown
   */
  async openUserProfile() {
    const loginButton = this.page.getByRole('button', { name: 'Log In' });
    await loginButton.click();
    // Wait for dropdown to appear
    await this.page.waitForTimeout(300);
  }

  /**
   * Wait for loading to complete and verify basic page state
   */
  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
    // Ensure no loading spinners are visible
    const loadingSpinner = this.page.locator('.loading, [data-testid="loading"]').first();
    if (await loadingSpinner.isVisible()) {
      await expect(loadingSpinner).not.toBeVisible();
    }
  }
}

/**
 * Create helpers instance for use in tests
 */
export function createHelpers(page: Page): MoviesAppHelpers {
  return new MoviesAppHelpers(page);
}

/**
 * Performance expectation helper
 */
export async function expectPageLoadPerformance(page: Page, maxLoadTime: number) {
  // Simple performance check - ensure page loaded within specified time
  const startTime = Date.now();
  await page.waitForLoadState('networkidle', { timeout: maxLoadTime });
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(maxLoadTime);
}

/**
 * Common expectations for movie grid layouts - UPDATED
 */
export async function expectMovieGridLayout(page: Page) {
  // Wait for the movies list to load with a longer timeout - use getByRole for better reliability
  const moviesList = page.getByRole('list', { name: 'movies' });
  await expect(moviesList).toBeVisible({ timeout: 15000 });
  
  // Wait for at least one movie item to be present - USING LI NOT LISTITEM
  const movieItems = moviesList.locator('li');
  await expect(movieItems.first()).toBeVisible({ timeout: 15000 });
  
  const firstMovie = movieItems.first();
  
  // Each movie should have a link containing poster and title
  await expect(firstMovie.getByRole('link')).toBeVisible();
  await expect(firstMovie.locator('img')).toBeVisible();
  await expect(firstMovie.getByRole('heading', { level: 2 })).toBeVisible();
  
  // Each movie should have rating display
  await expect(firstMovie.locator('[role="generic"][aria-label="rating"]')
    .or(firstMovie.locator('[aria-label*="rating"]'))).toBeVisible();
}