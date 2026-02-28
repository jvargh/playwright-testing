import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import dotenv from 'dotenv';
import path from 'path';
import config from './playwright.config';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Ensure service URL is set (from cross-env or .env)
if (!process.env.PLAYWRIGHT_SERVICE_URL) {
  throw new Error(
    'PLAYWRIGHT_SERVICE_URL is not set. Please run tests using npm scripts:\n' +
    '  npm run test:service:single\n' +
    '  npm run test:service:parallel'
  );
}

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