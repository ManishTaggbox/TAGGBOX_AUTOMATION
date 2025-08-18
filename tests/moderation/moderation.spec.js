import { test, expect } from '../moderationfixtures.js';
import { FEED_PATH } from '../../utils/constants.js';
import EditPost from '../../pageobjects/moderation/EditPost.js';
import AddPostTags from '../../pageobjects/moderation/AddPostTags.js';
import EditPostTags from '../../pageobjects/moderation/EditPostTags.js';
import DeletePostTags from '../../pageobjects/moderation/DeletePostTags.js';
import TagProducts from '../../pageobjects/moderation/TagProducts.js';
import EditTaggedProduct from '../../pageobjects/moderation/EditTaggedProduct.js';
import DeleteTaggedProduct from '../../pageobjects/moderation/DeleteTaggedProduct.js';
import PostPinToTop from '../../pageobjects/moderation/PostPinToTop.js';
import PostHighlight from '../../pageobjects/moderation/PostHighlight.js';
import PostPrivatePublic from '../../pageobjects/moderation/PostPrivatePublic.js';
import PostDelete from '../../pageobjects/moderation/PostDelete.js';
import SelectedPostAction from '../../pageobjects/moderation/SelectedPostAction.js';
import CarousalPost from '../../pageobjects/moderation/CarousalPost.js';
import SocialFeedFilter from '../../pageobjects/moderation/SocialFeedFilter.js';
import Pagination from '../../pageobjects/moderation/Pagination.js';
import Search from '../../pageobjects/moderation/Search.js';
import PostTypeFilter from '../../pageobjects/moderation/PostTypeFilter.js';


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

        await test.step('Soft check for correct page title', async () => {
            await expect.soft(page).toHaveTitle('Content Gallery | Tagbox', { timeout: 10000 });
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
    { tag: '@ModerationEditPost', PageObject: EditPost, method: 'editPost' },
    { tag: '@ModerationAddPostTags', PageObject: AddPostTags, method: 'addTags' },
    { tag: '@ModerationSearch', PageObject: Search, method: 'searchOperation' },
    { tag: '@ModerationPostTagsEdit', PageObject: EditPostTags, method: 'editTags' },
    { tag: '@ModerationDeletePostTags', PageObject: DeletePostTags, method: 'deleteTags' },
    { tag: '@ModeratonTagProducts', PageObject: TagProducts, method: 'productTag' },
    { tag: '@ModeratonEditTaggedProduct', PageObject: EditTaggedProduct, method: 'editProducts' },
    { tag: '@ModeratonDeleteTaggedProduct', PageObject: DeleteTaggedProduct, method: 'deleteProducts' },
    { tag: '@ModerationPostPinToTop', PageObject: PostPinToTop, method: 'pinPost' },
    { tag: '@ModerationPostHighlight', PageObject: PostHighlight, method: 'highlightPost' },
    { tag: '@ModerationPostPrivatePublic', PageObject: PostPrivatePublic, method: 'privatePublicPost' },
    { tag: '@ModerationSelectedPostPrivate', PageObject: SelectedPostAction, method: 'postPrivate' },
    { tag: '@ModerationCarousalPost', PageObject: CarousalPost, method: 'carousalPost' },
    { tag: '@ModerationSocialFeedFilter', PageObject: SocialFeedFilter, method: 'socialFeedFilter' },
    { tag: '@ModerationPagination', PageObject: Pagination, method: 'pagination' },
    { tag: '@ModerationPostTypeFilter', PageObject: PostTypeFilter, method: 'postTypeFilter' },
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
