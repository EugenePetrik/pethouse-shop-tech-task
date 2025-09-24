import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './config/baseConfig';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: '90%',
  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: baseConfig.WEB_URL,
    trace: {
      mode: 'retain-on-failure',
    },
    screenshot: {
      fullPage: true,
      mode: 'only-on-failure',
    },
    video: {
      mode: 'retain-on-failure',
    },
    headless: !!process.env.CI,
    actionTimeout: 10_000,
  },
  expect: {
    timeout: 10_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
