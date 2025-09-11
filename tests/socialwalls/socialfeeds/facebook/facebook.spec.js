import { test, expect } from '../../socialwallsfixtures/fixtures.js';
import { FEED_PATH } from '../../utils/constant.js';
import FacebookPage from '../../../../pageobjects/socialwalls/socialfeeds/facebook/FacebookPage.js';
import FacebookMyProfilePostsPage from '../../../../pageobjects/socialwalls/socialfeeds/facebook/FacebookMyProfilePosts.js';
import FacebookSingleAlbumPage from '../../../../pageobjects/socialwalls/socialfeeds/facebook/FacebookSingleAlbum.js';

const APP_URL = 'https://app.socialwalls.com/';

const runFacebookFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token }) => {
    // Navigate once to app URL and inject access_token only
    await test.step('Navigate and inject token into localStorage', async () => {
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await page.evaluate(token => {
        localStorage.setItem('access_token', token);
      }, token);
      await page.waitForTimeout(2000);

      console.log('✅ Token injected into localStorage');
    });

    // Proceed to the Feed page
    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.HOME, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(10000);
    });

    // // Run feed creation flow
    // await test.step(`Run ${tag} feed creation flow`, async () => {
    //   const feedPage = new PageObject(page);
    //   await feedPage[method]();
    // });

    // // Wait for content gallery to load fully
    // await test.step('Wait for content gallery to fully load', async () => {
    //   await page.waitForLoadState('load', { timeout: 60000 });
    // });
  });
};

const FacebookFeeds = [
  { tag: '@SocialWallsFacebookPage Create Feed', PageObject: FacebookPage, method: 'facebookPage' },
  { tag: '@SocialWallsFacebookMyProfilePosts Create Feed', PageObject: FacebookMyProfilePostsPage, method: 'facebookMyProfile' },
  { tag: '@SocialWallsFacebookSingleAlbumPage Create Feed', PageObject: FacebookSingleAlbumPage, method: 'FacebookSingleAlbum' },
];

FacebookFeeds.forEach(runFacebookFeedTest);

test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
