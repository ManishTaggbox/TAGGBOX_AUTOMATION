import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import ReviewHubPage from '../../../pageobjects/feeds/reviewhub/ReviewHub.js';

// Reusable function to run feed test
const runReviewhubFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }) => {
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.REVIEWHUB(wallId), { waitUntil: 'domcontentloaded' });
    });

    await test.step('Soft check for correct page title', async () => {
      await expect.soft(page).toHaveTitle('Add feed | Taggbox', { timeout: 10000 });
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

// Feed types configuration
const reviewFeeds = [
  { tag: '@ReviewHub Create Feed', PageObject: ReviewHubPage, method: 'reviewHub' },
  { tag: '@FillReviewForm Create Feed', PageObject: ReviewHubPage, method: 'fillReviewForm' },
  { tag: '@VerifySnapUpFeed Create Feed', PageObject: ReviewHubPage, method: 'verifySnapUpFeed' }

];

// Dynamically register each test
reviewFeeds.forEach(runReviewhubFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
