import { test, expect } from '@playwright/test';
import TiktokHashtagPage from '../../../../pageobjects/socialwalls/socialfeeds/tiktok/TiktokHashtag.js';
import TiktokMentionsPage from '../../../../pageobjects/socialwalls/socialfeeds/tiktok/TiktokMentions.js';
import TiktokHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/tiktok/TiktokHandle.js';
import TiktokMyHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/tiktok/TiktokMyHandle.js';
import TiktokPostUrlPage from '../../../../pageobjects/socialwalls/socialfeeds/tiktok/TiktokPostUrl.js';

const APP_URL = 'https://app.socialwalls.com/';

const runTikTokFeedTest = ({ tag, PageObject, method }) => {
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
const TiktokFeeds = [
  { tag: '@SocialWallsTiktokHashtag Create Feed', PageObject: TiktokHashtagPage, method: 'tiktokHashtag' },
  { tag: '@SocialWallsTiktokMentions Create Feed', PageObject: TiktokMentionsPage, method: 'tiktokMentions' },
  { tag: '@SocialWallsTiktokHandle Create Feed', PageObject: TiktokHandlePage, method: 'tiktokHandle' },
  { tag: '@SocialWallsTiktokMyHandle Create Feed', PageObject: TiktokMyHandlePage, method: 'tiktokMyHandle' },
  { tag: '@SocialWallsTiktokPostUrl Create Feed', PageObject: TiktokPostUrlPage, method: 'tiktokPostUrl' },
];

TiktokFeeds.forEach(runTikTokFeedTest);

test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
