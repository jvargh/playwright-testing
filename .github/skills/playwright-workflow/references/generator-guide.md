# Playwright Generator Agent Guide

This guide provides detailed instructions for using the playwright-generator agent to create robust Playwright test code from approved test plans.

## Agent Configuration

```yaml
---
name: playwright-generator
description: 'Use this agent when you need to create automated browser tests'
model: Claude Sonnet 4
---
```

## Agent Capabilities

The playwright-generator agent is a Playwright Test Generator with expertise in:
- Browser automation and end-to-end testing
- Creating robust, reliable Playwright tests
- Accurately simulating user interactions
- Validating application behavior through automated assertions

## Core Process

### 1. Test Plan Analysis
- Obtains the complete test plan with all steps and verification specifications
- Reviews each scenario for implementation requirements
- Identifies common patterns that can be abstracted into utilities

### 2. Browser Setup and Navigation
- Sets up the browser page and navigates to appropriate starting points
- Establishes the correct context for each test scenario
- Ensures clean state before each test execution

### 3. Step-by-Step Implementation
For each step and verification in the scenario:
- Executes the step manually in the browser to understand required interactions
- Uses the step description as the intent for each browser interaction
- Validates all selectors using Playwright MCP tools
- Captures execution process and relevant information about test steps

### 4. Code Generation
Generates complete test source code with:
- **Single test per file**: Each file contains one focused test scenario
- **Filesystem-friendly naming**: File names match scenario names with safe characters
- **Proper organization**: Tests placed in describe blocks matching top-level test plan items
- **Accurate titles**: Test titles exactly match scenario names from the plan
- **Clear documentation**: Comments with step text before each step execution
- **Best practices**: Follows Playwright conventions and patterns

## Code Generation Standards

### File Structure
```typescript
// spec: [path to test plan]
// seed: [path to seed file if applicable]

import { test, expect } from '@playwright/test';

test.describe('[Feature Category from Plan]', () => {
  test('[Exact Scenario Name]', async ({ page }) => {
    // 1. [Step description from plan]
    await page.[appropriate playwright action]();
    
    // 2. [Next step description]
    await page.[next action]();
    
    // Expected: [verification description]
    await expect(page.[selector]()).to[assertion]();
  });
});
```

### Naming Conventions
- **File names**: kebab-case scenario names (e.g., `add-valid-todo.spec.ts`)
- **Test descriptions**: Exact match to plan category names
- **Test titles**: Exact match to scenario names from plan
- **Selectors**: Use data-testid when available, fall back to stable selectors

### Code Quality Requirements
- **TypeScript**: All tests written in TypeScript with proper typing
- **Framework**: Use @playwright/test framework exclusively
- **Assertions**: Use expect() for all verifications
- **Waits**: Include proper waits for dynamic content
- **Error handling**: Robust selectors that won't break easily

## Implementation Best Practices

### Selector Strategy
1. **Never assume selectors exist** - Always validate through MCP tools
2. **Prefer stable selectors**:
   - `data-testid` attributes (highest priority)
   - `role` and accessibility selectors
   - Semantic HTML elements
   - Text content (when stable)
   - CSS classes (lowest priority)

### Test Organization
```typescript
test.describe('Feature Category', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup for all tests in this describe block
    await page.goto('/');
  });

  test('Scenario Name', async ({ page }) => {
    await test.step('Step description', async () => {
      // Grouped actions for this logical step
    });
    
    await test.step('Verification step', async () => {
      // Assertions and verifications
    });
  });
});
```

### Page Object Integration
When multiple tests share common interactions, create page objects:

```typescript
// page-objects/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async login(username: string, password: string) {
    await this.page.fill('[data-testid="username"]', username);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="login-button"]');
  }
}
```

### Utility Functions
Create reusable utilities for common patterns:

```typescript
// utilities/test-helpers.ts
export async function waitForLoadingToComplete(page: Page) {
  await page.waitForSelector('[data-testid="loading"]', { state: 'hidden' });
}

export async function fillForm(page: Page, formData: Record<string, string>) {
  for (const [field, value] of Object.entries(formData)) {
    await page.fill(`[data-testid="${field}"]`, value);
  }
}
```

## Common Implementation Patterns

### Navigation Testing
```typescript
test('Navigate to feature page', async ({ page }) => {
  // 1. Start from homepage
  await page.goto('/');
  
  // 2. Click navigation link
  await page.click('[data-testid="feature-nav"]');
  
  // Expected: Feature page loads with correct content
  await expect(page).toHaveURL('/feature');
  await expect(page.locator('h1')).toContainText('Feature Page');
});
```

### Form Submission Testing
```typescript
test('Submit valid form data', async ({ page }) => {
  // 1. Navigate to form page
  await page.goto('/form');
  
  // 2. Fill required fields
  await page.fill('[data-testid="name"]', 'Test User');
  await page.fill('[data-testid="email"]', 'test@example.com');
  
  // 3. Submit form
  await page.click('[data-testid="submit"]');
  
  // Expected: Success message appears
  await expect(page.locator('[data-testid="success"]')).toBeVisible();
});
```

### Error State Testing
```typescript
test('Handle invalid input', async ({ page }) => {
  // 1. Navigate to form
  await page.goto('/form');
  
  // 2. Submit empty form
  await page.click('[data-testid="submit"]');
  
  // Expected: Validation errors appear
  await expect(page.locator('[data-testid="name-error"]')).toContainText('Name is required');
});
```

## Debugging and Troubleshooting

### Common Issues and Solutions

**Selector Not Found**
- Use MCP tools to explore the current page state
- Check if element appears after specific actions
- Add appropriate waits for dynamic content

**Timing Issues**
- Add explicit waits: `page.waitForSelector()`
- Use `waitForLoadState()` for page transitions
- Wait for network requests: `page.waitForResponse()`

**Flaky Tests**
- Avoid hard-coded delays with `page.waitForTimeout()`
- Use conditional waits based on page state
- Ensure proper test isolation and cleanup

### Validation Techniques
```typescript
// Wait for element to be ready
await page.waitForSelector('[data-testid="element"]');

// Verify element state
await expect(page.locator('[data-testid="element"]')).toBeVisible();

// Check for specific content
await expect(page.locator('h1')).toContainText('Expected Text');

// Verify URL changes
await expect(page).toHaveURL(/.*\/new-page/);
```

## Integration Guidelines

### Project Structure Integration
Follow the existing project's:
- File organization patterns
- Naming conventions
- Import/export standards
- Configuration and setup files

### Configuration Requirements
Ensure tests work with project's:
- `playwright.config.ts` settings
- Base URL configuration
- Timeout settings
- Browser specifications

### Continuous Integration
Generated tests should:
- Run reliably in CI environments
- Have appropriate timeout values
- Include proper error reporting
- Work across specified browsers