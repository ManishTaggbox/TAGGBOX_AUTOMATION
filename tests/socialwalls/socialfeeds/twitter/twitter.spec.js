import { test, expect } from '@playwright/test';
import TwitterHashtagPage from '../../../../pageobjects/socialwalls/socialfeeds/twitter/TwitterHashtag.js';
import TwitterHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/twitter/TwitterHandle.js';
import TwitterMentionPage from '../../../../pageobjects/socialwalls/socialfeeds/twitter/TwitterMention.js';
import TwitterAdvancedPage from '../../../../pageobjects/socialwalls/socialfeeds/twitter/TwitterAdvanced.js';

const APP_URL = 'https://app.socialwalls.com/';

const runTwitterFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page }) => {

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
const TwitterFeeds = [
  { tag: '@SocialWallsTwitterHashtag Create Feed', PageObject: TwitterHashtagPage, method: 'twitterHashtag' },
  { tag: '@SocialWallsTwitterHandle Create Feed', PageObject: TwitterHandlePage, method: 'twitterHandle' },
  { tag: '@SocialWallsTwitterMention Create Feed', PageObject: TwitterMentionPage, method: 'twitterMentions' },
  { tag: '@SocialWallsTwitterAdvanced Create Feed', PageObject: TwitterAdvancedPage, method: 'twitterAdvanced' }
];

TwitterFeeds.forEach(runTwitterFeedTest);

test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
