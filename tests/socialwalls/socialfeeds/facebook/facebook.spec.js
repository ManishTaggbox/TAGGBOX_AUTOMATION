import { test, expect } from '@playwright/test';
import FacebookPage from '../../../../pageobjects/socialwalls/socialfeeds/facebook/FacebookPage.js';
import FacebookMyProfilePostsPage from '../../../../pageobjects/socialwalls/socialfeeds/facebook/FacebookMyProfilePosts.js';
import FacebookSingleAlbumPage from '../../../../pageobjects/socialwalls/socialfeeds/facebook/FacebookSingleAlbum.js';

const APP_URL = 'https://app.socialwalls.com/';

const runFacebookFeedTest = ({ tag, PageObject, method }) => {
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

const FacebookFeeds = [
  { tag: '@SocialWallsFacebookPage Create Feed', PageObject: FacebookPage, method: 'facebookPage'},
  { tag: '@SocialWallsFacebookMyProfilePosts Create Feed', PageObject: FacebookMyProfilePostsPage, method: 'facebookMyProfilePosts'},
  { tag: '@SocialWallsFacebookSingleAlbum Create Feed', PageObject: FacebookSingleAlbumPage, method: 'facebookSingleAlbum'}
];

FacebookFeeds.forEach(runFacebookFeedTest);

test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
