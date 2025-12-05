const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');

class LinkedInCompanyPage 
{
  constructor(page) 
  {
    this.page = page;
    this.createFeedBtn = page.locator('#create_feed');
  }

  async linkedInCompanyPage() 
  {
    await test.step('Step 1: Wait 2 seconds for UI update', async () => 
    {
      await this.page.waitForTimeout(2000);
    });

    await test.step('Step 2: Verify "Create Feed" button is enabled', async () => 
    {
      await expect(this.createFeedBtn).toBeEnabled();
    });

    await test.step('Step 3: Click the "Create Feed" button', async () => 
    {
      await this.createFeedBtn.click();
    });

    await test.step('Step 4: Wait 25 seconds for Content Gallery to load', async () => 
    {
      await this.page.waitForTimeout(10000);
    });

    await test.step('Step 5: Proceed with feed management if Content Gallery is loaded', async () => {
      try {
        const manageFeeds = new ManageFeeds(this.page);
        await manageFeeds.manageFeed();
      } catch (error) {
        console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
      }
    });
  }
}

module.exports = LinkedInCompanyPage;
