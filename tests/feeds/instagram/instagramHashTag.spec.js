// instagramHashTag.spec.js
import { test, expect } from '../../fixtures.js';
import InstagramHashTagPage from '../../../pageobjects/feeds/instagram/InstagramHashTag.js';
import InstagramMyHandlePage from '../../../pageobjects/feeds/instagram/InstagramMyHandle.js';
import InstagramHandlePage from '../../../pageobjects/feeds/instagram/InstagramHandle.js';
import InstagramStoriesPage from '../../../pageobjects/feeds/instagram/InstagramStories.js';
import InstagramMentionsPage from '../../../pageobjects/feeds/instagram/InstagramMentions.js';
import InstagramTaggedInstaLoginPage from '../../../pageobjects/feeds/instagram/InstagramTaggedInstaLogin.js';
import InstagramTaggedFBLoginPage from '../../../pageobjects/feeds/instagram/InstagramTaggedFBLogin.js';
import InstagramReelsPage from '../../../pageobjects/feeds/instagram/InstagramReels.js';
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




test('@InstagramMyHandle Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram my handle feed creation flow', async () => {
    const instagramMyHandle = new InstagramMyHandlePage(page);
    await instagramMyHandle.instagramMyHandle();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});



test('@InstagramHandle Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram handle feed creation flow', async () => {
    const instagramHandle = new InstagramHandlePage(page);
    await instagramHandle.instagramHandle();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});





test('@InstagramStories Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram Stories feed creation flow', async () => {
    const instagramStories = new InstagramStoriesPage(page);
    await instagramStories.instagramStories();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});


test('@InstagramMentions Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram Mentions feed creation flow', async () => {
    const instagramMentions = new InstagramMentionsPage(page);
    await instagramMentions.instagramMentions();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});


test('@InstagramTaggedInstaLogin Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram Tagged Insta Login  feed creation flow', async () => {
    const instagramTaggedInstaLogin = new InstagramTaggedInstaLoginPage(page);
    await instagramTaggedInstaLogin.instagramTaggedInstaLogin();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});

test('@InstagramTaggedFBLogin Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram Tagged FB Login  feed creation flow', async () => {
    const instagramTaggedFBLogin = new InstagramTaggedFBLoginPage(page);
    await instagramTaggedFBLogin.instagramTaggedFBLogin();
  });

  await test.step('Wait for content gallery to fully load', async () => {
    await page.waitForLoadState('load', { timeout: 60000 });
  });
});

test('@InstagramReels Create Feed', async ({ page, token, wallId }) => {
  await test.step('Inject token into local storage', async () => {
    await page.addInitScript(token => localStorage.setItem('token', token), token);
  });

  await test.step('Navigate to Add Feed page', async () => {
    await page.goto(FEED_PATH.INSTAGRAM(wallId), { waitUntil: 'domcontentloaded' });
  });

  await test.step('Soft check for correct page title', async () => {
    await expect.soft(page).toHaveTitle('Add feed | Tagbox');
  });

  await test.step('Run Instagram Reels  feed creation flow', async () => {
    const instagramReels = new InstagramReelsPage(page);
    await instagramReels.instagramReels();
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
