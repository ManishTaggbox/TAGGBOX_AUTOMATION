const args = process.argv;
const isHeadless = !args.includes('--headed'); // Playwright's default is headless unless --headed is passed

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
//  retries: 1,
  expect: {
    timeout: 10000,
  },
  reporter: [['html']],
  use: {
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
  },
};

export default config;
