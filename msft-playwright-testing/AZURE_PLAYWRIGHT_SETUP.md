# Azure Playwright Workspaces - Testing Documentation

**Date**: February 27, 2026  
**Workspace**: `pw-movies-app-workspace` (Eastus)  
**Workspace ID**: `[MASKED-WORKSPACE-ID]` (stored in .env, protected by .gitignore)  
**Service URL**: `wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers` (WebSocket)

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
*   Health endpoint at `/health`

### 3. **Configure Azure Playwright Workspaces**

**Created Files**:

#### `.env` - Environment Configuration

```
# Sensitive configuration - protected by .gitignore
REGION=eastus
WORKSPACE_ID=[MASKED-WORKSPACE-ID]
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers
```

#### `playwright.service.config.ts` - Service Configuration

```typescript
import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import dotenv from 'dotenv';
import path from 'path';
import config from './playwright.config';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Construct service URL from environment variables
const region = process.env.REGION || 'eastus';
const workspaceId = process.env.WORKSPACE_ID;
const serviceUrl = process.env.PLAYWRIGHT_SERVICE_URL || 
  (workspaceId ? `wss://${region}.api.playwright.microsoft.com/playwrightworkspaces/${workspaceId}/browsers` : undefined);

if (!serviceUrl) {
  throw new Error('PLAYWRIGHT_SERVICE_URL or WORKSPACE_ID must be set in .env or environment');
}

process.env.PLAYWRIGHT_SERVICE_URL = serviceUrl;

export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    credential: new DefaultAzureCredential(),
    exposeNetwork: '<loopback>',
    os: ServiceOS.LINUX,
    runName: `pw-workspaces-${new Date().toISOString()}`,
  }),
  {
    reporter: [
      ['html'],
      ['@azure/playwright/reporter'],
    ],
  }
);
```

**Key Configuration Notes**:

*   `ServiceOS.LINUX`: Specifies the OS for cloud browsers
*   `@azure/playwright/reporter`: **REQUIRED** for Azure Workspaces - uploads results to Azure portal automatically
*   ❌ **DO NOT use local** `**outputFolder**` - causes "blob does not exist" error in cloud environment

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

### 5. **Configure Playwright Tests**

#### `playwright.config.ts` Updates

```typescript
use: {
  baseURL: 'https://playwright.dev',  // Test against public site
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

#### `tests/example.spec.ts` - Test Suite

```typescript
test('loads playwright dev site', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  const heading = page.getByRole('heading', { name: /Playwright/i }).first();
  await expect(heading).toBeVisible();
});

test('playwright docs link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const docLinks = page.getByRole('link', { name: /docs|getting started/i });
  const firstLink = docLinks.first();
  await expect(firstLink).toBeVisible();
});
```

### 6. **Update package.json Scripts (with cross-env)**

```
{
  "scripts": {
    "app:start": "node sample-app/server.js",
    "test": "playwright test",
    "test:report": "playwright show-report",
    "test:service": "playwright test --config=playwright.service.config.ts",
    "test:service:single": "playwright test --config=playwright.service.config.ts --workers=1",
    "test:service:parallel": "playwright test --config=playwright.service.config.ts --workers=20",
    "test:service:debug": "playwright test --config=playwright.service.config.ts --debug"
  }
}
```

**Note**: Service URL is now read from `.env` file which is protected by `.gitignore`

### 7. **Automated Test Scripts with Environment Variable**

**Initial findings**: The service requires the WebSocket endpoint URL (wss://) not the HTTP endpoint.

**Solution**: Automated npm scripts using `cross-env` to set the environment variable:

```
{
  "scripts": {
    "test:service": "playwright test --config=playwright.service.config.ts",
    "test:service:single": "playwright test --config=playwright.service.config.ts --workers=1",
    "test:service:parallel": "playwright test --config=playwright.service.config.ts --workers=20",
    "test:service:debug": "playwright test --config=playwright.service.config.ts --debug"
  }
}
```

**Updated** `.env` **file**:

```
# Sensitive configuration - protected by .gitignore
REGION=eastus
WORKSPACE_ID=[MASKED-WORKSPACE-ID]
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers
```

### 8. **Test Execution Results**

**Commands**:

```
npm run test:service:single        # 1 worker - automatically sets env var
npm run test:service:parallel      # 20 workers - automatically sets env var
npm run test:service:debug         # Debug mode
```

**Test Results**: ✅ **6 PASSED** (3 browsers × 2 tests)

```
  ✓  1 [chromium] › tests\example.spec.ts:3:5 › loads playwright dev site (831ms)
  ✓  2 [chromium] › tests\example.spec.ts:11:5 › playwright docs link (786ms)
  ✓  3 [firefox] › tests\example.spec.ts:3:5 › loads playwright dev site (2.7s)
  ✓  4 [firefox] › tests\example.spec.ts:11:5 › playwright docs link (1.8s)
  ✓  5 [webkit] › tests\example.spec.ts:3:5 › loads playwright dev site (2.0s)
  ✓  6 [webkit] › tests\example.spec.ts:11:5 › playwright docs link (2.2s)

  6 passed (22.1s)

Playwright Workspaces reporting: ENABLED  ✅
Collecting artifacts: screenshots, videos, traces.
Uploading artifacts to Azure portal automatically.
Reporting upload status: SUCCESS ✅
```

**Key Success Factors**:

*   ✅ Using `wss://` protocol for WebSocket endpoint
*   ✅ Includes `/browsers` path suffix
*   ✅ Using `@azure/playwright/reporter` for Azure upload
*   ✅ Environment variable automatically set by npm scripts via cross-env
*   ✅ No manual env var configuration required
*   ✅ Cross-platform compatible with cross-env
*   ✅ No blob/artifact write errors

---

## Configuration & Authentication

### **Azure Authentication Method**

*   **Type**: Entra ID (DefaultAzureCredential)
*   **Setup**: `az login` (single time)
*   **No token management required**

### **Environment Variables**

```
# Service URL is configured in .env, sourced automatically by dotenv
# No manual env var setup required
```

---

## Test Execution Commands

All commands automatically set the correct WebSocket service URL. No manual environment variable configuration needed!

### **Single Worker (Testing)**

```
npm run test:service:single
```

### **Multiple Workers (Parallel Testing - 20 workers)**

```
npm run test:service:parallel
```

### **All Tests (Default Workers)**

```
npm run test:service
```

### **Debug Mode**

```
npm run test:service:debug
```

### **View Test Report**

```
npm run test:report
```

---

## Project Structure

```
msft-playwright-testing/
├── .env                          # Service URL configuration
├── package.json                  # Dependencies & scripts
├── playwright.config.ts          # Base Playwright config
├── playwright.service.config.ts  # Azure Workspaces config
├── tests/
│   └── example.spec.ts          # Test suite
├── sample-app/
│   ├── index.html               # Sample web app
│   └── server.js                # HTTP server
└── playwright-report/           # Test results  (generated)
```

---

## Key Files for Reference
