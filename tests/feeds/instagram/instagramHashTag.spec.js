// instagramHashTag.spec.js
import { test, expect } from '../../fixtures.js';
import InstagramHashTagPage from '../../../pageobjects/feeds/instagram/InstagramHashTag.js';
import { FEED_PATH } from '../../../utils/constants.js';

test('@InstagramHashTag Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram hashtag feed creation flow', async () => {
    const instagramHashTag = new InstagramHashTagPage(page);
    await instagramHashTag.instagramHashTag();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});

test.afterEach(async ({ page }) => {
  console.log('🧹 Running teardown...');
  // FIX: Clear localStorage before closing the page
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');

});
