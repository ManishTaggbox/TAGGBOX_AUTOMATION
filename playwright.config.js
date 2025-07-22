const config = {
  testDir: './tests',
  timeout: 60_000,                 // Global test timeout
  fullyParallel: false,
  workers: 1,                      // Sequential execution
  expect: {
    timeout: 10000,                 // Timeout for expect() assertions
  },
  reporter: [
    ['html']                     // Change 'html' to 'list' for cleaner CLI output
        
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'https://app.taggbox.com',
    actionTimeout: 0,             // No per-action timeout
    navigationTimeout: 30000,     // Set a safe nav timeout instead of disabling
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',   // Only capture trace when a test fails
    launchOptions: {
      args: ['--start-maximized'],
    },
    viewport: null,               // Use full screen
    screenshot: 'only-on-failure',// Optional: auto screenshots for failed tests
    video: 'retain-on-failure',   // Optional: record video only on failure
  }
};

module.exports = config;
