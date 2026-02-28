# Azure Playwright Workspaces - Testing Documentation

**Date**: February 27, 2026  
**Workspace**: `pw-movies-app-workspace` (Eastus)  
**Workspace ID**: `[MASKED-WORKSPACE-ID]` (stored in .env, protected by .gitignore)  
**Service URL**: `wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers` (WebSocket)

---

## 🚀 Quick Start - First Time Setup

Before running any tests, you must install dependencies:

```bash
npm install
```

This command will install all required packages:
- `@azure/playwright` - Azure Playwright Workspaces SDK
- `@azure/identity` - Azure authentication
- `@playwright/test` - Playwright testing framework
- `cross-env` - Cross-platform environment variable setup
- `dotenv` - Environment file loading
- `@types/node` - Node.js TypeScript definitions

**⚠️ Important**: The `.env` file containing your Azure workspace credentials is protected by `.gitignore` and will NOT be included in version control. You must have a valid `.env` file in this directory before running tests.

---

## Steps Completed

### 1. **Initialize Playwright Project**

```
npm init playwright@latest --quiet --lang=ts --browser=chromium --no-browsers
```

**Result**: ✅ Successfully created Playwright test project structure

*   `playwright.config.ts` - Base configuration
*   `tests/example.spec.ts` - Example tests
*   `package.json` - Dependencies

### 2. **Create Sample Application**

**Files Created**:

*   `sample-app/index.html` - Sample web application with interactive UI
*   `sample-app/server.js` - Node.js HTTP server (port 3000)

**Sample App Features**:

*   Status display with toggle button
*   Movie list UI
*   Health endpoint at `//health`

### 3. **Configure Azure Playwright Workspaces**

**Created Files**:

#### `.env` - Environment Configuration

```
# Sensitive configuration - protected by .gitignore
REGION=eastus
WORKSPACE_ID=[MASKED-WORKSPACE-ID]
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers
```

### 4. **Install Dependencies**

```
npm install
```

**Installed Packages**:

*   `@azure/playwright` - Latest (Playwright Workspaces SDK)
*   `@azure/identity` - Latest (Azure authentication)
*   `@playwright/test` - ^1.58.2
*   `cross-env` - ^10.1.0 (Cross-platform environment variable setup)
*   `dotenv` - ^17.2.3 (Environment file loading)
*   `@types/node` - ^25.3.2

---

## Test Execution Commands

All commands automatically set the correct WebSocket service URL. No manual environment variable configuration needed!

### **Single Worker (Testing)**

```bash
npm run test:service:single
```

### **Multiple Workers (Parallel Testing - 20 workers)**

```bash
npm run test:service:parallel
```

### **All Tests (Default Workers)**

```bash
npm run test:service
```

### **Debug Mode**

```bash
npm run test:service:debug
```

### **View Test Report**

```bash
npm run test:report
```

### **Start Sample App Server**

```bash
npm run app:start
```

---

## Project Structure

```
msft-playwright-testing/
├── .env                          # Service URL configuration (protected by .gitignore)
├── .gitignore                    # Git ignore patterns
├── package.json                  # Dependencies & scripts
├── playwright.config.ts          # Base Playwright config
├── playwright.service.config.ts  # Azure Workspaces config
├── README.md                     # This file
├── tests/
│   └── example.spec.ts          # Test suite
├── sample-app/
│   ├── index.html               # Sample web app
│   └── server.js                # HTTP server
└── playwright-report/           # Test results (generated)
```

---

## Configuration Overview

### Azure Authentication

*   **Type**: Entra ID (DefaultAzureCredential)
*   **Setup**: `az login` (single time)
*   **No token management required**

### Environment Variables

The `.env` file contains:

```
REGION=eastus
WORKSPACE_ID=[your-workspace-id]
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[your-workspace-id]/browsers
```

**Key Points**:
- Service URL is configured in `.env`, sourced automatically by dotenv
- Environment variable is automatically set by npm scripts via `cross-env`
- No manual env var setup required

---

## Test Results

✅ **Tests Status**: PASSING

- **Test Count**: 6 tests (2 tests × 3 browsers: chromium, firefox, webkit)
- **Execution Time**: ~22.1 seconds (full suite)
- **Workers**: Tested with 20 parallel workers - all tests passed
- **Azure Reporting**: ✅ **ENABLED** - Results automatically uploaded to Azure portal

---

## Sample Application

**Features**:
- Interactive status toggle button
- Movie list display
- Health check endpoint at `/health`
- Runs on port 3000 by default

**Start the app**:

```bash
npm run app:start
# Server listening on http://localhost:3000
```

---

## Command Reference

| Task | Command | Notes |
|------|---------|-------|
| Install dependencies | `npm install` | Run once - includes all required packages |
| Run local tests | `npm test` | Uses local chromium browser |
| Run tests in Azure (1 worker) | `npm run test:service:single` | Auto-sets WSS env var |
| Run tests in Azure (20 workers) | `npm run test:service:parallel` | Auto-sets WSS env var |
| Run all tests in Azure | `npm run test:service` | Auto-sets WSS env var |
| Debug mode | `npm run test:service:debug` | Auto-sets WSS env var |
| View HTML report | `npm run test:report` | Opens in browser |
| Start sample app | `npm run app:start` | Runs on http://localhost:3000 |
| Check Azure auth | `az account show` | Verify credentials |

---

## Technology Stack

*   **Framework**: Playwright Test (`@playwright/test` ^1.58.2)
*   **Cloud Platform**: Azure Playwright Workspaces
*   **Language**: TypeScript
*   **Authentication**: Entra ID via DefaultAzureCredential
*   **Server**: Node.js (sample app)
*   **Reporting**: HTML + Trace Viewer + Azure Reporter

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test:service:parallel
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

Environment variable `PLAYWRIGHT_SERVICE_URL` should be set as a GitHub Actions secret.

---

## Troubleshooting

### Issue: "PLAYWRIGHT_SERVICE_URL is not set"

**Solution**: Use npm scripts that automatically set the environment variable:
```bash
npm run test:service:single  # Sets WSS URL automatically
```

### Issue: Tests fail with authentication error

**Solution**: Ensure Azure CLI is authenticated:
```bash
az login
az account show  # Verify you're logged in
```

### Issue: Could not find Chrome

**Solution**: Run the sample tests against public URLs or start the sample app:
```bash
npm run app:start  # In another terminal
npm run test:service:single
```

---

## Notes

- The `.env` file is protected by `.gitignore` - never commit credentials
- The `@azure/playwright/reporter` is required for Azure Workspaces test result management
- Tests use the `wss://` WebSocket protocol, not `https://`
- Sample app server serves from port 3000 by default
- Test reports are automatically uploaded to Azure portal

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Azure Playwright Workspaces](https://learn.microsoft.com/en-us/azure/load-testing/tutorial-playwright-test-recording)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
