import { test, expect } from '../moderationfixtures.js';
import { FEED_PATH } from '../../utils/constants.js';
import EditPosts from '../../pageobjects/moderation/editPost.js';
import PostTags from '../../pageobjects/moderation/add-edit-deletePostTags.js';


const runModerationTest = ({ tag, PageObject, method }) => 
{
    test(tag, async ({ page, token, wallId }) => 
    {
        await test.step('Inject token into local storage', async () => 
        {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
            await page.addInitScript(wallId => localStorage.setItem('wallId', wallId), wallId);
        });

        await test.step('Navigate to Moderation page', async () => 
        {
            await page.goto(FEED_PATH.MODERATION(wallId), { waitUntil: 'domcontentloaded' });
        });

        await test.step('Soft check for correct page title', async () => 
        {
            await expect.soft(page).toHaveTitle('Content Gallery | Tagbox');
        });

        await test.step(`Run ${tag} feed creation flow`, async () => 
        {
            const feedPage = new PageObject(page); // ✅ this fixes undefined wallId
            await feedPage[method]();
        });

        await test.step('Wait for content gallery to fully load', async () => 
        {
            await page.waitForLoadState('load', { timeout: 60000 });
        });
    });
};

const moderation = [

    { tag: '@ModerationEditPost', PageObject: EditPosts, method: 'editPost' },
    { tag: '@ModerationEditPostTags', PageObject: PostTags, method: 'postTags' }



];

// Dynamically register each test
moderation.forEach(runModerationTest);

// Common teardown
test.afterEach(async ({ page }) => 
{
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});
