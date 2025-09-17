import { test, expect } from '@playwright/test';
import SlackChannelPage from '../../../../pageobjects/socialwalls/socialfeeds/slack/SlackChannel.js';
import SlackChannelKeywordPage from '../../../../pageobjects/socialwalls/socialfeeds/slack/SlackChannelKeyword.js';

const APP_URL = 'https://app.socialwalls.com/';

const runSlackFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page }, testInfo) => {

    await test.step('Navigate and inject token into localStorage', async () => {
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });

      console.log('✅ Page loaded:', APP_URL);
    });

    await test.step(`Run ${tag} feed creation flow`, async () => {
      const feedPage = new PageObject(page);
      await feedPage[method]();
    });

    // Wait for content gallery to load fully
    await test.step('Wait for content gallery to fully load', async () => {
      await page.waitForLoadState('load', { timeout: 60000 });
    });
  });
};
const slackFeeds = [
  { tag: '@SocialWallsSlackChannel Create Feed', PageObject: SlackChannelPage, method: 'slackChannel' },
  { tag: '@SocialWallsSlackChannelKeyword Create Feed', PageObject: SlackChannelKeywordPage, method: 'slackChannelKeyword' }, 
];

slackFeeds.forEach(runSlackFeedTest);

// Simple cleanup
test.afterEach(async ({ page }) => {
  try {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.context().clearCookies();
  } catch (error) {
    // Ignore cleanup errors
  }
});