import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import LinkedInHashTagPage from '../../../pageobjects/feeds/linkedIn/LinkedInCompanyPage.js';
import LinkedInPostUrlPage from '../../../pageobjects/feeds/linkedIn/LinkedInPostUrl.js';

// Reusable function to run feed test
const runLinkedInFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }) => {
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.LINKEDIN(wallId), { waitUntil: 'domcontentloaded' });
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
const linkedInFeeds = [
  { tag: '@LinkedInCompanyPage  Create Feed', PageObject: LinkedInHashTagPage, method: 'linkedInCompanyPage' },
  { tag: '@LinkedInPostUrl  Create Feed', PageObject: LinkedInPostUrlPage, method: 'linkedInPostUrl' }
 
];

// Dynamically register each test
linkedInFeeds.forEach(runLinkedInFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
