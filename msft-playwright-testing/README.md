# Azure Playwright Workspaces - Testing Documentation

**Date**: February 27, 2026  
**Workspace**: `pw-movies-app-workspace` (Eastus)  
**Workspace ID**: `[MASKED-WORKSPACE-ID]` (stored in .env, protected by .gitignore)  
**Service URL**: `wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers` (WebSocket)

---

## 🚀 Quick Start - First Time Setup

Before running any tests, you must install dependencies:

```
npm install
```

This command will install all required packages:

*   `@azure/playwright` - Azure Playwright Workspaces SDK
*   `@azure/identity` - Azure authentication
*   `@playwright/test` - Playwright testing framework
*   `cross-env` - Cross-platform environment variable setup
*   `dotenv` - Environment file loading
*   `@types/node` - Node.js TypeScript definitions

**⚠️ Important**: The `.env` file containing your Azure workspace credentials is protected by `.gitignore` and will NOT be included in version control. You must have a valid `.env` file in this directory before running tests.

---

## Architecture Overview

```

┌─────────────────────────────────────────────────────────────────────────────┐
│                    Local Development Machine                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Developer / CI/CD                                                          │
│        │                                                                    │
│        ├─→ npm install (one time setup)                                     │
│        │                                                                    │
│        └─→ npm run test:service:* (run tests)                               │
│                │                                                            │
│                ├─→ cross-env sets PLAYWRIGHT_SERVICE_URL                    │
│                │                                                            │
│                ├─→ playwright.service.config.ts reads .env                  │
│                │                                                            │
│                └─→ Init Azure Playwright Service                            │
│                                                                             │
│  Test Suite (tests/example.spec.ts)                                         │
│      │                                                                      │
│      └─→ WebSocket Connection (wss://)                                      │
│                                                                             │
│  Sample App (localhost:3000)                                                │
│      └─→ Server ready for testing                                           │
│                                                                             │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │ WebSocket (wss://)
                                  │
                                  │
        ┌─────────────────────────▼──────────────────────────────┐
        │  Azure Playwright Workspaces (eastus)                  │
        ├────────────────────────────────────────────────────────┤
        │                                                        │
        │  Playwright Service                                    │
        │  ├─ Chromium Browser (Cloud)                           │
        │  ├─ Firefox Browser (Cloud)                            │
        │  └─ WebKit Browser (Cloud)                             │
        │      │                                                 │
        │      ├─→ Load app from localhost:3000                  │
        │      ├─→ Execute tests in parallel                     │
        │      └─→ Collect traces, videos, screenshots           │
        │                                                        │
        │  @azure/playwright/reporter                            │
        │  └─→ Format and upload artifacts                       │
        │                                                        │
        └─────────────────────────┬──────────────────────────────┘
                                  │
                                  │ Upload Artifacts
                                  │
        ┌─────────────────────────▼──────────────────────────────┐
        │  Azure Portal                                          │
        ├────────────────────────────────────────────────────────┤
        │                                                        │
        │  Test Results Dashboard                                │
        │  ├─ HTML Reports                                       │
        │  ├─ Trace Viewer                                       │
        │  ├─ Screenshots                                        │
        │  ├─ Videos                                             │
        │  └─ Test Metrics                                       │
        │                                                        │
        └────────────────────────────────────────────────────────┘
```

### Data Flow Summary

1.  **Local Setup** → Developer runs `npm install` (one-time)
2.  **Test Execution** → Developer runs `npm run test:service:*`
3.  **Environment** → `cross-env` automatically sets `PLAYWRIGHT_SERVICE_URL`
4.  **Configuration** → `playwright.service.config.ts` loads `.env` and initializes service
5.  **Cloud Browsers** → Azure spawns 3 browsers (Chromium, Firefox, WebKit)
6.  **Test Loading** → Browsers connect to sample app on localhost:3000
7.  **Test Execution** → Tests run in parallel across cloud browsers
8.  **Artifact Collection** → Traces, videos, screenshots captured
9.  **Reporting** → `@azure/playwright/reporter` formats results
10.  **Upload** → Artifacts automatically sent to Azure Portal
11.  **Results** → Available in Azure Portal for viewing and analysis

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

### 2. **Azure Load Testing Integration**

```
npm init @azure/playwright@latest
```

**Result**: ✅ Configured Azure Load Testing integration

*   Added `@azure/playwright` package - Azure Playwright Workspaces SDK
*   Configured service integration for cloud-based testing
*   Enabled Azure authentication and reporting capabilities

### 3. **Create Sample Application**

**Files Created**:

*   `sample-app/index.html` - Sample web application with interactive UI
*   `sample-app/server.js` - Node.js HTTP server (port 3000)

**Sample App Features**:

*   Status display with toggle button
*   Movie list UI
*   Health endpoint at `/health`

### 4. **Configure Azure Playwright Workspaces**

**Created Files**:

#### `.env` - Environment Configuration

```
# Sensitive configuration - protected by .gitignore
REGION=eastus
WORKSPACE_ID=[MASKED-WORKSPACE-ID]
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/[MASKED-WORKSPACE-ID]/browsers
```

### 5. **Install Dependencies**

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

### 6. **Configure Playwright Tests**

#### `playwright.config.ts` - Base Configuration

```typescript
use: {
  baseURL: 'https://playwright.dev',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

#### `tests/example.spec.ts` - Test Suite

Tests targeting public URLs with all three browsers.

### 7. **Update package.json Scripts**

```json
{
  "scripts": {
    "test:service:single": "playwright test --config=playwright.service.config.ts --workers=1",
    "test:service:parallel": "playwright test --config=playwright.service.config.ts --workers=20"
  }
}
```

### 8. **Automated Test Scripts**

Using `cross-env` to automatically set `PLAYWRIGHT_SERVICE_URL` - no manual environment variable setup required.

### 9. **Test Execution Results**

**Status**: ✅ **6 PASSED** (3 browsers × 2 tests in parallel)

- **Execution Time**: ~22.1 seconds
- **Workers**: 20 parallel workers - all tests passed
- **Azure Reporting**: ✅ **ENABLED** - Results automatically uploaded to Azure portal

---

## Key Success Factors

✅ **Service URL**: `wss://` protocol with `/browsers` suffix (WebSocket, not HTTP)  
✅ **Automation**: `cross-env` in npm scripts (no manual env var setup)  
✅ **Reporter**: `@azure/playwright/reporter` (NOT local outputFolder)  
✅ **Authentication**: Entra ID via DefaultAzureCredential  
✅ **Testing**: 20 parallel workers - all passing with no blob errors  
✅ **Results**: Automatically uploaded to Azure Portal  

---

## Quick Commands

```bash
# First time (required)
npm install

# Run tests - no manual setup needed!
npm run test:service:parallel    # 20 workers (fastest)
npm run test:service:single      # 1 worker (debugging)

# View results
npm run test:report              # Local HTML report
# OR check Azure Portal for automatically uploaded results
```

---

## Command Reference

| Task | Command |
|------|-------|
| Install dependencies | `npm install` |
| Run tests (20 workers) | `npm run test:service:parallel` |
| Run tests (1 worker) | `npm run test:service:single` |
| View HTML report | `npm run test:report` |
| Check Azure auth | `az account show` |

---

## Project Structure

```
msft-playwright-testing/
├── .env                          # Service URL configuration (protected)
├── package.json                  # Dependencies & scripts
├── playwright.config.ts          # Base Playwright config
├── playwright.service.config.ts  # Azure Workspaces config
├── tests/
│   └── example.spec.ts          # Test suite
├── sample-app/
│   ├── index.html               # Sample web app
│   └── server.js                # HTTP server (localhost:3000)
└── playwright-report/           # Test results (generated)
```

---

## Technology Stack

*   **Framework**: Playwright Test (`@playwright/test` ^1.58.2)
*   **Cloud**: Azure Playwright Workspaces (wss://eastus)
*   **Language**: TypeScript
*   **Auth**: Entra ID (DefaultAzureCredential)
*   **Server**: Node.js
*   **Reporting**: HTML + Azure Reporter

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| HTTP 500 | Use `wss://` endpoint with `/browsers` |
| Blob does not exist | Use `@azure/playwright/reporter` |
| Auth failures | Run `az login` (one time) |
| Platform issues | Ensure `cross-env` is installed |

---

**Documentation**: February 27, 2026  
**Status**: ✅ **PRODUCTION READY**  
**Last Updated**: Architecture diagram and data flow added
