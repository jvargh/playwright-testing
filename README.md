# Azure Playwright Workspaces - Testing Project

This project demonstrates testing with Azure Playwright Workspaces using the modern `@azure/playwright` SDK.

## Quick Start

```bash
# Install dependencies
npm install

# Run tests in Azure Playwright Workspaces (1 worker)
npm run test:service:single

# Run tests in Azure with 20 parallel workers
npm run test:service:parallel

# View test report
npm run test:report
```

## Setup

1. **Create `.env` file** with your workspace configuration:

```env
REGION=eastus
WORKSPACE_ID=your-workspace-id-here
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/your-workspace-id-here/browsers
```

2. **Authenticate with Azure**:

```bash
az login
```

3. **Run your tests**:

```bash
npm run test:service:single
```

## Documentation

See [AZURE_PLAYWRIGHT_SETUP.md](AZURE_PLAYWRIGHT_SETUP.md) for complete setup instructions and troubleshooting.

## Project Structure

- `tests/` - Test files
- `sample-app/` - Sample web application for testing
- `playwright.config.ts` - Base Playwright configuration
- `playwright.service.config.ts` - Azure Workspaces configuration
- `.env` - Environment variables (DO NOT COMMIT)

## Key Features

✅ Azure Playwright Workspaces integration
✅ Entra ID authentication
✅ Automated environment variable setup via cross-env
✅ Parallel testing support (up to 20 workers)
✅ Automatic artifact upload to Azure Portal
✅ No manual configuration required

## Security

- `.env` file is protected by `.gitignore`
- Never commit workspace IDs or secrets to version control
- Use Azure Key Vault for production secrets
