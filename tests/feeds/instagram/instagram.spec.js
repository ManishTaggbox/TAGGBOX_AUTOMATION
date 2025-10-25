import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

// Import all Instagram feed page classes
import InstagramHashTagPage from '../../../pageobjects/feeds/instagram/InstagramHashTag.js';
import InstagramMyHandlePage from '../../../pageobjects/feeds/instagram/InstagramMyHandle.js';
import InstagramHandlePage from '../../../pageobjects/feeds/instagram/InstagramHandle.js';
import InstagramStoriesPage from '../../../pageobjects/feeds/instagram/InstagramStories.js';
import InstagramMentionsPage from '../../../pageobjects/feeds/instagram/InstagramMentions.js';
import InstagramTaggedInstaLoginPage from '../../../pageobjects/feeds/instagram/InstagramTaggedInstaLogin.js';
import InstagramTaggedFBLoginPage from '../../../pageobjects/feeds/instagram/InstagramTaggedFBLogin.js';
import InstagramReelsPage from '../../../pageobjects/feeds/instagram/InstagramReels.js';
import InstagramOnlyReelsPage from '../../../pageobjects/feeds/instagram/InstagramOnlyReels.js';

// Reusable function to run feed test
const runInstagramFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }, testInfo) => {
    const alwaysFailingTags = ['@InstagramStories Create Feed', '@InstagramMentions Create Feed'];
    if (testInfo.retry > 0 && alwaysFailingTags.includes(tag)) {
      test.skip(true, 'Skipping consistently failing test on retry');
    }
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
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
const instagramFeeds = [
  { tag: '@InstagramHashTag Create Feed', PageObject: InstagramHashTagPage, method: 'instagramHashTag' },
  { tag: '@InstagramMyHandle Create Feed', PageObject: InstagramMyHandlePage, method: 'instagramMyHandle' },
  { tag: '@InstagramHandle Create Feed', PageObject: InstagramHandlePage, method: 'instagramHandle' },
  { tag: '@InstagramStories Create Feed', PageObject: InstagramStoriesPage, method: 'instagramStories' },
  // { tag: '@InstagramMentions Create Feed', PageObject: InstagramMentionsPage, method: 'instagramMentions' },
  { tag: '@InstagramTaggedInstaLogin Create Feed', PageObject: InstagramTaggedInstaLoginPage, method: 'instagramTaggedInstaLogin' },
  { tag: '@InstagramTaggedFBLogin Create Feed', PageObject: InstagramTaggedFBLoginPage, method: 'instagramTaggedFBLogin' },
  { tag: '@InstagramReels Create Feed', PageObject: InstagramReelsPage, method: 'instagramReels' },
  { tag: '@InstagramOnlyReels Create Feed', PageObject: InstagramOnlyReelsPage, method: 'instagramOnlyReels' }
];

// Dynamically register each test
instagramFeeds.forEach(runInstagramFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
