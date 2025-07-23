const args = process.argv;
const isHeadless = !args.includes('--headed');

const baseUse = {
  browserName: 'chromium',
  headless: isHeadless,
  baseURL: 'https://app.taggbox.com',
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
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
};

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  retries: 1,
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  expect: {
    timeout: 10000,
  },
  reporter: [['html']],
  projects: [
    {
      name: 'content',
      testMatch: /tests\/content\/.*\.js$/,
      use: baseUse,
    },
    {
      name: 'feeds',
      testMatch: /tests\/feeds\/.*\.js$/,
      use: baseUse,
    },
    {
      name: 'productcatalog',
      testMatch: /tests\/productcatalog\/.*\.js$/,
      use: baseUse,
    },
    {
      name: 'profile',
      testMatch: /tests\/profile\/.*\.js$/,
      use: baseUse,
    },
    {
      name: 'moderation',
      testMatch: /tests\/moderation\/.*\.js$/,
      use: baseUse,
    },
    {
      name: 'autopilot',
      testMatch: /tests\/autopilot\/.*\.js$/,
      use: baseUse,
    },
  ],
};

module.exports = config;
