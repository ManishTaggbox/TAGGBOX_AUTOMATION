import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import TiktokPersonalPage from '../../../pageobjects/feeds/upload/TiktokPersonal.js';
import InstagramPostUrlPage from '../../../pageobjects/feeds/upload/InstagramPostUrl.js';   

// Reusable function to run feed test
const runUploadFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page, token, wallId }) => {
    await test.step('Inject token into local storage', async () => {
      await page.addInitScript(token => localStorage.setItem('token', token), token);
    });

    await test.step('Navigate to Add Feed page', async () => {
      await page.goto(FEED_PATH.UPLOAD(wallId), { waitUntil: 'domcontentloaded' });
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
const uploadFeeds = [
  { tag: '@TiktokPersonal  Create Feed', PageObject: TiktokPersonalPage, method: 'tiktokPersonal' },
  { tag: '@InstagramPostUrl  Create Feed', PageObject: InstagramPostUrlPage, method: 'instagramPostUrl' }
 
 
];

// Dynamically register each test
uploadFeeds.forEach(runUploadFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});
