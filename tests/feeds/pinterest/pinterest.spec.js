import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import PinterestHandlePage from '../../../pageobjects/feeds/pinterest/PinterestHandle.js';
import PinterestUserBoardPage from '../../../pageobjects/feeds/pinterest/PinterestUserBoard.js';

// Reusable function to run feed test
const runPinterestFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }) => {
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.PINTEREST(wallId), { waitUntil: 'domcontentloaded' });
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
const pinterestFeeds = [
  { tag: '@PinterestHandle  Create Feed', PageObject: PinterestHandlePage, method: 'pinterestHandle' },
 { tag: '@PinterestUserBoard  Create Feed', PageObject: PinterestUserBoardPage, method: 'pinterestUserBoard' }
 
];

// Dynamically register each test
pinterestFeeds.forEach(runPinterestFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
