import { type Page, type Locator, expect } from '@playwright/test';

export class SidebarMenu {
  readonly page: Page;
  readonly hamburgerButton: Locator;
  readonly discoverHeading: Locator;
  readonly genresHeading: Locator;
  readonly popularLink: Locator;
  readonly topRatedLink: Locator;
  readonly upcomingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerButton = page.locator('.hamburger-button');
    this.discoverHeading = page.getByRole('heading', { name: 'Discover', level: 2 });
    this.genresHeading = page.getByRole('heading', { name: 'Genres', level: 2 });
    this.popularLink = page.getByRole('link', { name: 'Popular' });
    this.topRatedLink = page.getByRole('link', { name: 'Top Rated' });
    this.upcomingLink = page.getByRole('link', { name: 'Upcoming' });
  }

  async open() {
    await this.hamburgerButton.click();
  }

  async expectSectionsVisible() {
    await expect(this.discoverHeading).toBeVisible();
    await expect(this.genresHeading).toBeVisible();
  }

  async expectDiscoverLinksVisible() {
    await expect(this.popularLink).toBeVisible();
    await expect(this.topRatedLink).toBeVisible();
    await expect(this.upcomingLink).toBeVisible();
  }

  async clickCategory(name: 'Popular' | 'Top Rated' | 'Upcoming') {
    await this.page.getByRole('link', { name }).click();
  }
}
