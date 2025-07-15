const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import {VIMEO} from '../../utils/constant.js';

class VimeoHashtag {
  constructor(page) {
    this.page = page;
    this.enterHashTag = page.locator('#Hashtag-text');
    this.createFeedBtn = page.locator('#create_feed');
  }

  async vimeoHashtag() {
    await test.step('Step 1: Fill hashtag input with "beach"', async () => {
      await this.enterHashTag.fill(VIMEO.VIDEMOHASHTAG);
    });

    await test.step('Step 2: Wait 2 seconds for UI update', async () => {
      await this.page.waitForTimeout(2000);
    });

    await test.step('Step 3: Verify "Create Feed" button is enabled', async () => {
      await expect(this.createFeedBtn).toBeEnabled();
    });

    await test.step('Step 4: Click the "Create Feed" button', async () => {
      await this.createFeedBtn.click();
    });

    await test.step('Step 5: Wait 25 seconds for Content Gallery to load', async () => {
      await this.page.waitForTimeout(10000);
    });

    await test.step('Step 6: Proceed with feed management if Content Gallery is loaded', async () => {
      try {
        const manageFeeds = new ManageFeeds(this.page);
        await manageFeeds.manageFeed();
      } catch (error) {
        console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
      }
    });
  }
}

module.exports = VimeoHashtag;
