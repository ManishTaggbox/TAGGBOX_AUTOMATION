import { test, expect } from '@playwright/test';
import SnapUpPage from '../../../../pageobjects/socialwalls/socialfeeds/snapUp/SnapUp.js';


const APP_URL = 'https://app.socialwalls.com/';

const runSnapUpFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page }, testInfo) => {

    await test.step('Navigate and inject token into localStorage', async () => {
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });

      console.log('✅ Page loaded:', APP_URL);
    });

    await test.step(`Run ${tag} feed creation flow`, async () => {
      const feedPage = new PageObject(page);
      await feedPage[method]();
    });

    await test.step('Wait for content gallery to fully load', async () => {
      await page.waitForLoadState('load', { timeout: 60000 });
    });
  });
};
const snapUpFeeds = [
  { tag: '@SocialWallsSnapUp Create Feed', PageObject: SnapUpPage, method: 'snapUpfeed' },
 

];

snapUpFeeds.forEach(runSnapUpFeedTest);

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