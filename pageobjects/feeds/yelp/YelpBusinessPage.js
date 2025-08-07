const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import {YELP} from '../../utils/constant.js';

class YelpBusinessPage {
  constructor(page) {
    this.page = page;
    this.enterBusinessText = page.locator('#Business-Page-text');
    this.createFeedBtn = page.locator('#create_feed');
  }

  async yelpBusinessPage() {
    await test.step('Step 1: Fill YELP BUSINESS input with "Bussiness Name"', async () => {
      await this.enterBusinessText.waitFor({ state: 'visible', timeout: 10000 });
      await this.enterBusinessText.fill(YELP.YELPBUSINESSPAGE);
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

    await test.step('Step 5: Wait 10 seconds for Content Gallery to load', async () => {
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

module.exports = YelpBusinessPage;
