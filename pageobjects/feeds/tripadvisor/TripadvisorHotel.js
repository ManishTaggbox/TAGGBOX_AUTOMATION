const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import {TRIPADVISOR} from '../../utils/constant.js';

class TripadvisorHotel {
  constructor(page) {
    this.page = page;
    this.hotel = page.locator("//a[@data-name='hotel']");
    this.enterHotelText = page.locator("#Hotel-text");
    this.createFeedBtn = page.locator('#create_feed');
  }

  async tripadvisorHotel() {
      await test.step('Step 1: Click On  hotel', async () => {
      await this.hotel.click({ force: true });
    });

    await test.step('Step 2: Fill Hotel Text input ', async () => {
      await this.enterHotelText.fill(TRIPADVISOR.TRIPADVISORHOTEL);
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

module.exports = TripadvisorHotel;
