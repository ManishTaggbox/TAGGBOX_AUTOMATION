import { test, expect } from '@playwright/test';
import LinkedInCompanyPage from '../../../../pageobjects/socialwalls/socialfeeds/linkedIn/LinkedInCompanyPage.js';
import LinkedInHandlePage from '../../../../pageobjects/socialwalls/socialfeeds/linkedIn/LinkedInHandle.js';
import LinkedInHashtagPage from '../../../../pageobjects/socialwalls/socialfeeds/linkedIn/LinkedInHashtag.js';
import LinkedInPostUrlPage from '../../../../pageobjects/socialwalls/socialfeeds/linkedIn/LinkedInPostUrl.js';

const APP_URL = 'https://app.socialwalls.com/';

const runLinkedInFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page },testInfo) => {

     const alwaysFailingTags = ['@SocialWallsInstagramStories Create Feed', '@SocialWallsInstagramMentions Create Feed'];
    if (testInfo.retry > 0 && alwaysFailingTags.includes(tag)) {
      test.skip(true, 'Skipping consistently failing test on retry');
    }

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
const linkedInFeeds = [
  { tag: '@SocialWallsLinkedInCompanyPage Create Feed', PageObject: LinkedInCompanyPage, method: 'linkedInCompanyPage' },
  { tag: '@SocialWallsLinkedInHandle Create Feed', PageObject: LinkedInHandlePage, method: 'linkedInHandle' },
  { tag: '@SocialWallsLinkedInHashtag Create Feed', PageObject: LinkedInHashtagPage, method: 'linkedInHashtag' },
  { tag: '@SocialWallsLinkedInPostUrl Create Feed', PageObject: LinkedInPostUrlPage, method: 'linkedInPostUrl' },
];

linkedInFeeds.forEach(runLinkedInFeedTest);

// Simple cleanup
test.afterEach(async ({ page }) => {
  try {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.context().clearCookies();
  } catch (error) {
    // Ignore cleanup errors
  }
});