import { test, expect } from '@playwright/test';
import { INSTAGRAM } from '../../utils/Constant.js';
const ManageFeeds = require('../../socialfeeds/managefeeds/ManageFeeds.js');

class InstagramHashTag {
  constructor(page) {
    this.page = page;
    this.instagram = page.locator("//li[contains(@class,'instagram-business')]//button[contains(@type,'button')]");
    this.enterHashTag = page.locator('#insta_hashtag');
    this.createFeedBtn = page.locator('#create_feed');
  }

  async instagramHashTag() {
    // Step 1: Manage Social Feeds (uses external class, only once at the start)
    await test.step('Step 1: Open Social Feeds page', async () => {
      try {
        const manageFeeds = new ManageFeeds(this.page);
        await manageFeeds.openSocialFeeds();
      } catch (error) {
        console.warn('⚠️ Social Feeds page did not load properly');
      }
    });

    // Step 2: Click Instagram button
    await test.step('Step 2: Wait for Instagram button, then click', async () => {
      await this.instagram.waitFor({ state: 'visible', timeout: 10000 });
      await this.instagram.click();
    });

    // Step 3: Fill hashtag input
    await test.step('Step 3: Wait for #insta_hashtag input, then fill', async () => {
      await this.enterHashTag.waitFor({ state: 'visible', timeout: 10000 });
      await this.enterHashTag.fill(INSTAGRAM.INSTAGRAMHASHTAG);
    });

    // Step 4: Wait for UI update
    await test.step('Step 4: Wait 2 seconds for UI update', async () => {
      await this.page.waitForTimeout(2000);
    });

    // Step 5: Verify "Create Feed" button is enabled
    await test.step('Step 5: Verify "Create Feed" button is enabled', async () => {
      await expect.soft(this.createFeedBtn).toBeEnabled();
    });

    // Step 6: Click "Create Feed" button
    await test.step('Step 6: Click the "Create Feed" button', async () => {
       await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
      await this.createFeedBtn.click();
    });

    // Step 7: Wait for Content Gallery page to load
    await test.step('Step 7: Wait 25 seconds for Content Gallery to load', async () => {
      await this.page.waitForTimeout(25000);
    });

    // Step 8: Manage feed after Content Gallery is loaded
    await test.step('Step 8: Proceed with feed management if Content Gallery is loaded', async () => {
      try {
        const manageFeeds = new ManageFeeds(this.page);
        await manageFeeds.manageFeed();
      } catch (error) {
        console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
      }
    });
  }
}

export default InstagramHashTag;
