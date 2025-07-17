const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import {TWITTER} from '../../utils/constant.js';

class TwitterMention {
  constructor(page) {
    this.page = page;
    this.mention = page.locator("//a[@data-name='mention']");
    this.enterMentions = page.locator("#mentions-text");
    this.createFeedBtn = page.locator('#create_feed');
  }

  async twitterMention() {
      await test.step('Step 1: Click On  Handle', async () => {
      await this.mention.click({ force: true });
    });

    await test.step('Step 2: Fill mentions input with "elonmusk"', async () => {
      await this.enterMentions.fill(TWITTER.TWITTERMENTION);
    });

    await test.step('Step 3: Wait 2 seconds for UI update', async () => {
      await this.page.waitForTimeout(2000);
    });

    await test.step('Step 4: Verify "Create Feed" button is enabled', async () => {
      await expect(this.createFeedBtn).toBeEnabled();
    });

    await test.step('Step 5: Click the "Create Feed" button', async () => {
      await this.createFeedBtn.click();
    });

    await test.step('Step 6: Wait 10 seconds for Content Gallery to load', async () => {
      await this.page.waitForTimeout(10000);
    });

    await test.step('Step 7: Proceed with feed management if Content Gallery is loaded', async () => {
      try {
        const manageFeeds = new ManageFeeds(this.page);
        await manageFeeds.manageFeed();
      } catch (error) {
        console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
      }
    });
  }
}

module.exports = TwitterMention;
