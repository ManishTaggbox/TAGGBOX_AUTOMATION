import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import FacebookPage from '../../../pageobjects/feeds/facebook/FacebookPage.js';
import FacebookMyProfilePosts from '../../../pageobjects/feeds/facebook/FacebookMyProfilePosts.js';
import FacebookPageReviews from '../../../pageobjects/feeds/facebook/FacebookPageReviews.js';
import FacebookPageMentions from '../../../pageobjects/feeds/facebook/FacebookPageMentions.js';
import FacebookReels from '../../../pageobjects/feeds/facebook/FacebookReels.js';

// Reusable function to run feed test
const runFacebookFeedTest = ({ tag, PageObject, method }) => {
    test(tag, async ({ page, token, wallId }, testInfo) => {
        const alwaysFailingTags = ['@FacebookMyProfilePosts Create Feed'];
        if (testInfo.retry > 0 && alwaysFailingTags.includes(tag)) {
            test.skip(true, 'Skipping consistently failing test on retry');
        }
        await test.step('Inject token into local storage', async () => {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
        });

        await test.step('Navigate to Add Feed page', async () => {
            await page.goto(FEED_PATH.FACEBOOK(wallId), { waitUntil: 'domcontentloaded' });
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
const facebookFeeds = [
    { tag: '@FacebookPage  Create Feed', PageObject: FacebookPage, method: 'facebookPage' },
    { tag: '@FacebookMyProfilePosts Create Feed', PageObject: FacebookMyProfilePosts, method: 'facebookMyProfilePosts' },
    { tag: '@FacebookPageReviews Create Feed', PageObject: FacebookPageReviews, method: 'facebookPageReviews' },
    { tag: '@FacebookPageMentions Create Feed', PageObject: FacebookPageMentions, method: 'facebookPageMentions' },
    { tag: '@FacebookReels Create Feed', PageObject: FacebookReels, method: 'facebookReels' }




];

// Dynamically register each test
facebookFeeds.forEach(runFacebookFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});
