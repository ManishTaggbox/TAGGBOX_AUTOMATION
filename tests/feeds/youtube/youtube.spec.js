import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';

import YoutubeChannelUrlPage from '../../../pageobjects/feeds/youtube/YoutubeChannelUrl.js';
import YoutubeShortsPage from '../../../pageobjects/feeds/youtube/YoutubeShorts.js';
import YoutubePlaylistPage from '../../../pageobjects/feeds/youtube/YoutubePlaylist.js';
import YoutubeKeywordsPage from '../../../pageobjects/feeds/youtube/YoutubeKeywords.js';
import YoutubeLocationPage from '../../../pageobjects/feeds/youtube/YoutubeLocation.js';

// Reusable function to run feed test
const runYoutubeFeedTest = ({ tag, PageObject, method }) => {
    test(tag, async ({ page, token, wallId }) => {
        await test.step('Inject token into local storage', async () => {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
        });

        await test.step('Navigate to Add Feed page', async () => {
            await page.goto(FEED_PATH.YOUTUBE(wallId), { waitUntil: 'domcontentloaded' });
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
const youtubeFeeds = [
    { tag: '@YoutubeChannelUrl  Create Feed', PageObject: YoutubeChannelUrlPage, method: 'youtubeChannelUrl' },
    { tag: '@YoutbeShorts  Create Feed', PageObject: YoutubeShortsPage, method: 'youtubeShorts' },
    { tag: '@YoutubePlaylist  Create Feed', PageObject: YoutubePlaylistPage, method: 'youtubePlaylist' },
    { tag: '@YoutubeKeywords  Create Feed', PageObject: YoutubeKeywordsPage, method: 'youtubeKeywords' },
    { tag: '@YoutubeLocation  Create Feed', PageObject: YoutubeLocationPage, method: 'youtubeLocation' }

];

// Dynamically register each test
youtubeFeeds.forEach(runYoutubeFeedTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});
