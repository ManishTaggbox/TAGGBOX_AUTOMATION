import { test, expect } from '../../socialwallsfixtures/fixtures.js';
import { FEED_PATH } from '../../utils/constant.js';
import InstagramHashTagPage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramHashTag.js';
import InstagramMyHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramMyHandle.js';
import InstagramHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramHandle.js';
import InstagramStoriesPage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramStories.js';
import InstagramMentionsPage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramMentions.js';
import InstagramTaggedInstaLoginPage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramTaggedInstaLogin.js';
import InstagramTaggedFBLoginPage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramTaggedFBLogin.js';
import InstagramVideosPage from '../../../../pageobjects/socialwalls/socialfeeds/instagram/InstagramVideos.js';

const APP_URL = 'https://app.socialwalls.com/';

const runInstagramFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token }) => {
    // Navigate once to app URL and inject access_token only
    await test.step('Navigate and inject token into localStorage', async () => {
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });

      // Ensure page is ready before injecting token
      await page.waitForSelector('body');

      await page.evaluate(token => {
        localStorage.setItem('access_token', token);
      }, token);

      // Validate token was set
      const storedToken = await page.evaluate(() => localStorage.getItem('access_token'));
      expect(storedToken).toBe(token);

      console.log('✅ Token injected into localStorage');
    });

    // Proceed to the Feed page
    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.HOME, { waitUntil: 'domcontentloaded' });
    });

    // Run feed creation flow
    // await test.step(`Run ${tag} feed creation flow`, async () => {
    //   const feedPage = new PageObject(page);

    //   if (typeof feedPage[method] !== 'function') {
    //     throw new Error(`❌ Method "${method}" not found on ${PageObject.name}`);
    //   }

    //   await feedPage[method]();
    //});

    // Run feed creation flow
    await test.step(`Run ${tag} feed creation flow`, async () => {
      const feedPage = new PageObject(page);
      await feedPage[method]();
    });

    // Wait for content gallery to load fully
    await test.step('Wait for content gallery to fully load', async () => {
      await page.waitForLoadState('load', { timeout: 60000 });
      console.log('✅ Content gallery loaded successfully');
    });
  });
};

const instagramFeeds = [
  { tag: '@SocialWallsInstagramHashTag Create Feed', PageObject: InstagramHashTagPage, method: 'instagramHashTag' },
  { tag: '@SocialWallsInstagramMyHandle Create Feed', PageObject: InstagramMyHandlePage, method: 'instagramMyHandle' },
  { tag: '@SocialWallsInstagramHandle Create Feed', PageObject: InstagramHandlePage, method: 'instagramHandle' },
  // { tag: '@SocialWallsInstagramStories Create Feed', PageObject: InstagramStoriesPage, method: 'instagramStories' },
  // { tag: '@SocialWallsInstagramMentions Create Feed', PageObject: InstagramMentionsPage, method: 'instagramMentions' },
  // { tag: '@SocialWallsInstagramTaggedInsta Create Feed', PageObject: InstagramTaggedInstaLoginPage, method: 'instagramTaggedInstaLogin' },
  // { tag: '@SocialWallsInstagramTaggedFB Create Feed', PageObject: InstagramTaggedFBLoginPage, method: 'instagramTaggedFBLogin' },
  // { tag: '@SocialWallsInstagramVideos Create Feed', PageObject: InstagramVideosPage, method: 'instagramVideos' },
];

instagramFeeds.forEach(runInstagramFeedTest);

test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});