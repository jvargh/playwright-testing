import { type Page, type Locator, expect } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async expectLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
