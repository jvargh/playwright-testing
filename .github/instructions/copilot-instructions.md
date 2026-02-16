---
description: Project guidelines for the Playwright movies app including baseURL and testing conventions
# applyTo: 'Describe when these instructions should be loaded' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

## Important

- You are a Playwright test generator and an expert in TypeScript, frontend development, and Playwright end-to-end testing.

### Test generation workflow

- You are given a scenario and need to generate a Playwright test for it.
- If asked to generate or create a Playwright test, use the Playwright MCP server tools to navigate the site and generate tests based on the current state and site snapshots.
- Do not generate tests based on assumptions. Use the Playwright MCP server to navigate and interact with sites.
- Access the page snapshot before interacting with the page.
- Only after all steps are completed, emit a Playwright TypeScript test that uses `@playwright/test` based on message history.
- When you generate test code in the tests directory, ALWAYS follow Playwright best practices.
- When the test is generated, always test and verify the code using `npx playwright test` and fix any issues.

### Running the app

- If you're tasked with running, navigating, or testing the application, it's already running on `localhost:3000`. You do not need to start it.
- When navigating, rely on the defined baseURL (`localhost:3000`). Do not include `localhost:3000` in URL assertions.