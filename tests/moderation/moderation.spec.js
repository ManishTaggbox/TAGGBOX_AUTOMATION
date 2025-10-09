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
import ChangeOrder from '../../pageobjects/moderation/ChangeOrder.js';
import ViewPost from '../../pageobjects/moderation/ViewPost.js';
import TagProductWithSearch from '../../pageobjects/moderation/TagProductWithSearch.js';

async function setupModeration(page, token, wallId)
{
  await page.addInitScript(token => localStorage.setItem('token', token), token);
  await page.addInitScript(wallId => localStorage.setItem('wallId', wallId), wallId);

  await page.goto(FEED_PATH.MODERATION(wallId), { waitUntil: 'domcontentloaded' });
  await expect.soft(page).toHaveTitle('Content Gallery | Taggbox', { timeout: 10000 });
  await page.waitForLoadState('load', { timeout: 60000 });
}

test.describe('Moderation Tests', () => 
{
  test('@ModerationEditPost - Edit post', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const editPost = new EditPost(page);
    await editPost.editPost();
  });

  test('@ModerationAddPostTags - Add tags', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const addTags = new AddPostTags(page);
    await addTags.addPostTags();
  });

  test('@ModerationSearch - Search posts', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const search = new Search(page);
    await search.Search();
  });

  test('@ModerationPostTagsEdit - Edit post tags', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const editTags = new EditPostTags(page);
    await editTags.editPostTags();
  });

  test('@ModerationDeletePostTags - Delete post tags', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const deleteTags = new DeletePostTags(page);
    await deleteTags.deletePostTags();
  });

  test('@ModerationTagProducts - Tag products', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const tagProduct = new TagProducts(page);
    await tagProduct.tagProducts();
  });

  test('@ModerationEditTaggedProduct - Edit tagged product', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const editProduct = new EditTaggedProduct(page);
    await editProduct.editTaggedProduct();
  });

  test('@ModerationDeleteTaggedProduct - Delete tagged product', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const deleteProduct = new DeleteTaggedProduct(page);
    await deleteProduct.deleteTaggedProduct();
  });

  test('@ModerationPostPinToTop - Pin post to top', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const pinPost = new PostPinToTop(page);
    await pinPost.postPinToTop();
  });

  test('@ModerationPostHighlight - Highlight post', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const highlight = new PostHighlight(page);
    await highlight.postHighlight();
  });

  test('@ModerationPostPrivatePublic - Toggle private/public post', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const privatePublic = new PostPrivatePublic(page);
    await privatePublic.postPrivatePublic();
  });

  test('@ModerationSelectedPostPrivate - Set selected post as private', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const selectedPost = new SelectedPostAction(page);
    await selectedPost.selectedPostAction();
  });

  test('@ModerationCarousalPost - Carousal post moderation', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const carousal = new CarousalPost(page);
    await carousal.carousalPost();
  });

  test('@ModerationSocialFeedFilter - Filter social feeds', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const filter = new SocialFeedFilter(page);
    await filter.socialFeedFilter();
  });

  test('@ModerationPagination - Pagination check', async ({ page, token, wallId }) => 
  {
    await setupModeration(page, token, wallId);
    const pagination = new Pagination(page);
    await pagination.pagination();
  });

  test('@ModerationPostTypeFilter - Post type filter', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const typeFilter = new PostTypeFilter(page);
    await typeFilter.postTypeFilter();
  });

  test('@ModerationTagProductWithSearch - Tag products with searching multiple tags', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const tag = new TagProductWithSearch(page);
    await tag.tagProductWithSearch();
  });

  test('@ModerationPostDelete - Delete post', async ({ page, token, wallId }) => {
    await setupModeration(page, token, wallId);
    const deletePost = new PostDelete(page);
    await deletePost.postDelete();
  });

  test('@ModerationChangeOrder - Change post order for pinned posts', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const changeOrder = new ChangeOrder(page);
    await changeOrder.changeOrder();
  });

  test('@ModerationViewPost - Check View Posts option', async ({ page, token, wallId }) =>
  {
    await setupModeration(page, token, wallId);
    const viewPost = new ViewPost(page);
    await viewPost.viewPost();
  });
});

// Common teardown
test.afterEach(async ({ page }) => 
{
  console.log('🧹 Running teardown...');
  await page.evaluate(() => localStorage.clear());
  await page.close();
  console.log('✅ Teardown complete.');
});