import { test, expect } from '../../fixtures.js';
import { FEED_PATH } from '../../../utils/constants.js';
import RedditCommunityPage from '../../../pageobjects/feeds/reddit/RedditCommunity.js';
import RedditHandlePage from '../../../pageobjects/feeds/reddit/RedditHandle.js';
import RedditKeywordsPage from '../../../pageobjects/feeds/reddit/RedditKeywords.js';

const runRedditFeedTest = ({ tag, PageObject, method }) => 
{
    test(tag, async ({ page, token, wallId }) => 
    {
        await test.step('Inject token into local storage', async () => 
        {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
        });

        await test.step('Navigate to Add Feed page', async () => 
        {
            await page.goto(FEED_PATH.REDDIT(wallId), { waitUntil: 'domcontentloaded'});
        });

        await test.step('Soft check for correct page title', async () => 
        {
            await expect.soft(page).toHaveTitle('Add feed | Taggbox', { timeout: 10000});
        });

        await test.step(`Run ${tag} feed creation flow`, async () => 
        {
            const feedPage = new PageObject(page);
            await feedPage[method]();
        });

        await test.step('Wait for content gallery to fully load', async () => 
        {
            await page.waitForLoadState('load', { timeout: 60000});
        });
    });
};

const redditFeeds = 
[
    { tag: '@RedditCommunity Create Feed', PageObject: RedditCommunityPage, method: 'redditCommunity' },
    { tag: '@RedditHandle Create Feed', PageObject: RedditHandlePage, method: 'redditHandle' },
    { tag: '@RedditKeyword Create Feed', PageObject: RedditKeywordsPage, method: 'redditKeywords' }
];

redditFeeds.forEach(runRedditFeedTest);

test.afterEach(async ({ page }) => 
{
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});
