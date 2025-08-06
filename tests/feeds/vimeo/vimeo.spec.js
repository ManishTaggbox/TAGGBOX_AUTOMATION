import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import VimeoHashtagPage from '../../../pageobjects/feeds/vimeo/VimeoHashtag.js';
import VimeoHandlePage from '../../../pageobjects/feeds/vimeo/VimeoHandle.js';

// Reusable function to run feed test
const runVimeoFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }) => {
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.VIMEO(wallId), { waitUntil: 'domcontentloaded' });
    });

    await test.step('Soft check for correct page title', async () => {
      await expect.soft(page).toHaveTitle('Add feed | Tagbox', { timeout: 10000 });
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
const vimeoFeeds = [
  { tag: '@VimeoHashtag  Create Feed', PageObject: VimeoHashtagPage, method: 'vimeoHashtag' },
 { tag: '@VimeoHandle  Create Feed', PageObject: VimeoHandlePage, method: 'vimeoHandle' }
 
];

// Dynamically register each test
vimeoFeeds.forEach(runVimeoFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
