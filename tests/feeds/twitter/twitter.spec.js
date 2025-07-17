import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import TwitterHashtagPage from '../../../pageobjects/feeds/twitter/TwitterHashtag.js';
import TwitterHandlePage from '../../../pageobjects/feeds/twitter/TwitterHandle.js';    
import TwitterMentionPage from '../../../pageobjects/feeds/twitter/TwitterMention.js';
import TwitterAdvancedPage from '../../../pageobjects/feeds/twitter/TwitterAdvanced.js';

// Reusable function to run feed test
const runTwitterFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }) => {
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.TWITTER(wallId), { waitUntil: 'domcontentloaded' });
    });

    await test.step('Soft check for correct page title', async () => {
      await expect.soft(page).toHaveTitle('Add feed | Tagbox');
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
const twitterFeeds = [
  { tag: '@TwitterHashtag  Create Feed', PageObject: TwitterHashtagPage, method: 'twitterHashtag' },
  { tag: '@TwitterHandle  Create Feed', PageObject: TwitterHandlePage, method: 'twitterHandle' },
  { tag: '@TwitterMention  Create Feed', PageObject: TwitterMentionPage, method: 'twitterMention' },
  { tag: '@TwitterAdvanced  Create Feed', PageObject: TwitterAdvancedPage, method: 'twitterAdvanced' }

 
 
];

// Dynamically register each test
twitterFeeds.forEach(runTwitterFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
