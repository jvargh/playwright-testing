import { test, expect } from '@playwright/test';

test('Simple Navigation Test', async ({ page }) => {
  // Navigate to homepage
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  console.log('Page URL:', page.url());
  console.log('Page title:', await page.title());
  
  // Click on first movie
  const movieLinks = page.locator('a[href*="/movie"]');
  const count = await movieLinks.count();
  console.log(`Found ${count} movie links`);
  
  if (count > 0) {
    const firstMovie = movieLinks.first();
    const movieUrl = await firstMovie.getAttribute('href');
    console.log(`First movie URL: ${movieUrl}`);
    
    await firstMovie.click();
    await page.waitForLoadState('networkidle');
    
    console.log('After click - Page URL:', page.url());
    console.log('After click - Page title:', await page.title());
    
    // Just check that we navigated somewhere
    expect(page.url()).toContain('movie');
  } else {
    console.log('No movie links found - page might not be loading properly');
  }
});