import { test } from '@playwright/test';

test('Debug the homepage structure', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Log the page content
  const pageContent = await page.content();
  console.log('Current page URL:', page.url());
  console.log('Page title:', await page.title());
  
  // Check what movie-related elements exist
  const allLinks = await page.locator('a').all();
  console.log(`Found ${allLinks.length} links on the page`);
  
  // Look for any elements that might be movie cards
  const possibleMovieElements = await page.locator('*[href*="/movie/"], *[data-testid*="movie"], *.movie, *[class*="card"], *[class*="item"]').all();
  console.log(`Found ${possibleMovieElements.length} possible movie elements`);
  
  for (let i = 0; i < Math.min(5, possibleMovieElements.length); i++) {
    const element = possibleMovieElements[i];
    const tagName = await element.evaluate(el => el.tagName);
    const className = await element.getAttribute('class') || '';
    const testId = await element.getAttribute('data-testid') || '';
    const href = await element.getAttribute('href') || '';
    console.log(`Element ${i}: ${tagName}, class: "${className}", testid: "${testId}", href: "${href}"`);
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-homepage.png', fullPage: true });
});