import { test, expect } from '@playwright/test';
import PinterestHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/pinterest/PinterestHandle.js';
import PinterestUserBoardPage from '../../../../pageobjects/socialwalls/socialfeeds/pinterest/PinterestUserBoard.js';


const APP_URL = 'https://app.socialwalls.com/';

const runPinterestFeedTest = ({ tag, PageObject, method }) => {
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
const pinterestFeeds = [
  { tag: '@SocialWallsPinterestHandle Create Feed', PageObject: PinterestHandlePage, method: 'pinterestHandle' },
  { tag: '@SocialWallsPinterestUserBoard Create Feed', PageObject: PinterestUserBoardPage, method: 'pinterestUserBoard' },
];

pinterestFeeds.forEach(runPinterestFeedTest);

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