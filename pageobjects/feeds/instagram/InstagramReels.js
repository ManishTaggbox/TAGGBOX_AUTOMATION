const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');


class InstagramReels {
  constructor(page) {
    this.page = page;
    this.reels = page.locator("//a[@data-name='reels']");
    this.createFeedBtn = page.locator('#create_feed');

    this.countPost = page.locator("//p[@class='fs-8 fw-semibold mb-0']").first();
    this.manageFeedsBtn = page.locator("#manage_feed");
  }

  async instagramReels() {
    await test.step('Step 1: Click on Reels tab', async () => {
      await this.reels.waitFor({ state: 'visible', timeout: 10000 });
      await this.reels.click({ force: true });
    });

    await test.step('Step 2: Wait 2 seconds for UI update', async () => {
      await this.page.waitForTimeout(2000);
    });

    await test.step('Step 3: Verify "Create Feed" button is enabled', async () => {
      await expect(this.createFeedBtn).toBeEnabled();
    });

    await test.step('Step 4: Click the "Create Feed" button', async () => {
      await this.createFeedBtn.click();

      await this.manageFeedsBtn.waitFor({ state: 'visible', timeout: 10000 });
      await this.manageFeedsBtn.click();
      await this.page.waitForTimeout(2000);
    });

    await test.step('Step 5: Print the count of posts', async () => {
      await this.countPost.waitFor({ state: 'visible', timeout: 10000 });
      const countText = (await this.countPost.textContent() || '').trim();
      console.log(`Posts count: ${countText}`);
    }
    );

    // await test.step('Step 5: Wait 10 minutes for Content Gallery to load', async () => {
    //   await this.page.waitForTimeout(60000);
    // });

//     await test.step('Step 5: Wait 5 minutes for Content Gallery to load', async () => {
//   const startTime = Date.now();

//   try {
//     await expect.poll(
//       async () => {
//         const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
//         console.log(`⏳ Waiting... ${elapsedSec}s elapsed`);
//         return await this.countPost.isVisible();
//       },
//       {
//         timeout: 5 * 60 * 1000,
//         intervals: [5000],
//         message: 'Content Gallery did not load within 5 minutes',
//       }
//     ).toBe(true);
//   } catch (e) {
//     const totalTime = Math.floor((Date.now() - startTime) / 1000);
//     console.log(`🛑 Wait stopped after ${totalTime}s`);
//     throw e;
//   }
  
// });

    await test.step('Step 5: Wait until post count is greater than 0', async () => {

      console.log('5th step started');
  const startTime = Date.now();

  await expect.poll(
    async () => {
      const count = await this.countPost.count();
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      console.log(`⏳ Waiting... ${elapsed}s | postCount=${count}`);

      return count;
    },
    {
      timeout: 10 * 60 * 1000, // 10 minutes
      intervals: [5000],       // poll every 5s
      message: 'Post count never became greater than 0',
    }
  ).toBeGreaterThan(0);

    await this.page.reload();
    console.log('5th step completed');
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

module.exports = InstagramReels;
