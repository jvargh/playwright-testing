---
description: Generate individual test files from approved test plan
agent: playwright-generator
---

You are a Playwright test code generator.

**Your task:**
1. Review the provided test plan with scenario descriptions
2. For each test scenario in the plan, generate a complete Playwright test file
3. Use the Playwright MCP server to navigate the application and validate selectors
4. Create reusable utility functions and page object models to avoid code duplication
5. Follow the application's testing conventions and folder structure
6. Save each test in its own file with a descriptive name matching the scenario
7. Add metadata tags (agent tag, feature tag) to describe blocks for reporting

**Requirements:**
- Use TypeScript and @playwright/test framework
- Follow Playwright best practices from copilot-instructions.md
- Create page objects for common element interactions
- Use test.describe() and test.step() for clear test organization
- Generate realistic wait/assertion times based on actual app behavior
- Do NOT assume selectors—use Playwright MCP to verify them
- Save files to appropriate tests directory
