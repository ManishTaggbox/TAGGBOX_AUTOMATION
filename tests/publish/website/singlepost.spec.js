import { test, expect } from '../../publishfixtures.js';

import { FEED_PATH } from '../../../utils/constants.js';
import SinglePost from '../../../pageobjects/publish/website/theme/singlepost/SinglePost.js';
import SinglePostWebEmbed from '../../../pageobjects/publish/website/theme/singlepost/SinglePostWebEmbed.js';
import DeleteWebsite from '../../../pageobjects/publish/website/theme/themeutils/DeleteWebsite.js';



const runSinglePostTest = ({ tag, PageObject, method }) => {
    test(tag, async ({ page, token, wallId }) => {
        await test.step('Inject token into local storage', async () => {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
            await page.addInitScript(wallId => localStorage.setItem('wallId', wallId), wallId);

        });

        await test.step('Navigate to PUBLISH page', async () => {
            await page.goto(FEED_PATH.PUBLISH, { waitUntil: 'domcontentloaded' });
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

const singlePost = [
    { tag: '@SinglePost Theme Created', PageObject: SinglePost, method: 'singlePost' },
    { tag: '@SinglePostWebEmbed Generated', PageObject: SinglePostWebEmbed, method: 'singlePostWebEmbed' },
    { tag: '@SinglePost Theme Deleted', PageObject: DeleteWebsite, method: 'deleteWebsite' }
   
];

singlePost.forEach(runSinglePostTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});
