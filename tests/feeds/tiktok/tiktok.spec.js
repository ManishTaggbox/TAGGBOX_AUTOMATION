import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import TikTokHashtagPage from '../../../pageobjects/feeds/tiktok/TikTokHashtag.js';
import TikTokMentionPage from '../../../pageobjects/feeds/tiktok/TikTokMention.js';
import TikTokHandlePage from '../../../pageobjects/feeds/tiktok/TikTokHandle.js';
import TikTokMyHandlePage from '../../../pageobjects/feeds/tiktok/TikTokMyHandle.js';
import TikTokPostUrlPage from '../../../pageobjects/feeds/tiktok/TikTokPostUrl.js';

// Reusable function to run feed test
const runTiktokFeedTest = ({ tag, PageObject, method }) => {
    test(tag, async ({ page, token, wallId }) => {
        await test.step('Inject token into local storage', async () => {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
        });

        await test.step('Navigate to Add Feed page', async () => {
            await page.goto(FEED_PATH.TIKTOK(wallId), { waitUntil: 'domcontentloaded' });
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
const tiktokFeeds = [
    { tag: '@TikTokHashtag  Create Feed', PageObject: TikTokHashtagPage, method: 'tikTokHashtag' },
    { tag: '@TikTokMention  Create Feed', PageObject: TikTokMentionPage, method: 'tikTokMentions' },
    { tag: '@TikTokHandle  Create Feed', PageObject: TikTokHandlePage, method: 'tikTOkHandle' },
    { tag: '@TikTokMyHandle  Create Feed', PageObject: TikTokMyHandlePage, method: 'tikTokMyHandle' },
    { tag: '@TikTokPostUrl  Create Feed', PageObject: TikTokPostUrlPage, method: 'tikTOkPostUrl' }


];

// Dynamically register each test
tiktokFeeds.forEach(runTiktokFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});
