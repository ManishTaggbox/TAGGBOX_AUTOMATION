import { test, expect } from '../moderationfixtures.js';
import { FEED_PATH } from '../../utils/constants.js';
import EditPosts from '../../pageobjects/moderation/editPost.js';
import AddTags from '../../pageobjects/moderation/addPostTags.js';
import EditTags from '../../pageobjects/moderation/editPostTags.js';
import DeleteTags from '../../pageobjects/moderation/deletePostTags.js';
import TagProduct from '../../pageobjects/moderation/tagProducts.js';
import EditProduct from '../../pageobjects/moderation/editTaggedProduct.js';
import DeleteProduct from '../../pageobjects/moderation/deleteTaggedProduct.js';
import PostPinToTop from '../../pageobjects/moderation/postPinToTop.js';
import PostHighlight from '../../pageobjects/moderation/postHighlight.js';
import PostPrivatePublic from '../../pageobjects/moderation/postPrivatePublic.js';
import PostDelete from '../../pageobjects/moderation/postDelete.js';


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

const moderation = 
[
    { tag: '@ModerationEditPost', PageObject: EditPosts, method: 'editPost' },
    { tag: '@ModerationAddPostTags', PageObject: AddTags, method: 'addTags' },
    { tag: '@ModerationEditPostTags', PageObject: EditTags, method: 'editTags' },
    { tag: '@ModerationDeletePostTags', PageObject: DeleteTags, method: 'deleteTags' },
    { tag: '@ModeratonTagProducts', PageObject: TagProduct, method: 'productTag' },
    { tag: '@ModeratonEditTaggedProduct', PageObject: EditProduct, method: 'editProducts' },
    { tag: '@ModeratonDeleteTaggedProduct', PageObject: DeleteProduct, method: 'deleteProducts' },
    { tag: '@ModerationPostPinToTop', PageObject: PostPinToTop, method: 'pinPost' },
    { tag: '@ModerationPostHighlight', PageObject: PostHighlight, method: 'highlightPost' },
    { tag: '@ModerationPostPrivatePublic', PageObject: PostPrivatePublic, method: 'privatePublicPost' },
    
    
    
    { tag: '@ModerationPostDelete', PageObject: PostDelete, method: 'deletePost' }
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
