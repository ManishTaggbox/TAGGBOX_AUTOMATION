import dotenv from 'dotenv';
dotenv.config();

const args = process.argv;
const isHeadless = !args.includes('--headed');

const env = process.env.ENV || 'live';
console.log(`🔧 Playwright Config - Environment: ${env}`);

const baseURLMap = {
  live: 'https://app.taggbox.com',
  test: 'https://test.taggbox.com',
};

const baseURL = baseURLMap[env];
console.log(`🔧 Playwright Config - Base URL: ${baseURL}`);

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  retries: 1,
  expect: {
    timeout: 10000,
  },
  reporter: [['html']],
  use: {
    browserName: 'chromium',
    headless: isHeadless,
    baseURL: baseURL,  // ✅ dynamic based on ENV
    actionTimeout: 0,
    navigationTimeout: 30000,
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    launchOptions: {
      args: isHeadless
        ? ['--window-size=1920,1080']
        : ['--start-maximized'],
    },
    viewport: null,
    screenshot: 'on',
    video: 'on',
  },
};

export default config;