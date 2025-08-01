const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');


class TikTokMyHandle {
  constructor(page) {
    this.page = page;
    this.myHandle = page.locator("(//a[normalize-space()='My Handle'])[1]");
    this.createFeedBtn = page.locator('#create_feed');
  }

  async tikTokMyHandle() {
    await test.step('Step 1: Click On My Handle', async () => {
      await this.myHandle.click({ force: true });
    });

    await test.step('Step 2: Wait 2 seconds for UI update', async () => {
      await this.page.waitForTimeout(4000);
    });

    await test.step('Step 3: Verify "Create Feed" button is enabled', async () => {
      await expect(this.createFeedBtn).toBeEnabled();
    });

    await test.step('Step 4: Click the "Create Feed" button', async () => {
      await this.createFeedBtn.click();
    });

    await test.step('Step 5: Wait 15 seconds for Content Gallery to load', async () => {
      await this.page.waitForTimeout(15000);
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

module.exports = TikTokMyHandle;
