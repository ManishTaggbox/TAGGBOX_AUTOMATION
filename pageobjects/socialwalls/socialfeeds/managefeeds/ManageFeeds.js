import { test, expect } from '@playwright/test';


class ManageFeeds {
  constructor(page) {
    this.page = page;
    this.edit = page.locator("//i[@class='fa-regular fa-pen-to-square  text-secondary']");
    this.socialFeeds = page.locator('.menu-text.flex-grow-1.ms-2');
    this.addFeed = page.locator("//span[normalize-space()='Add Feed']");
    this.manageFeeds = page.locator("//span[normalize-space()='Manage Feeds']");
    this.countPost = page.locator("p[class='text-dark m-0 text-nowrap'] strong").first();
    this.confirmYesBtn = page.locator("button[aria-label='Yes']");
    this.successMsg = page.locator("//div[contains(text(),'Feed Deleted successfully')]");
    this.email = page.locator('#AccountEmail');
    this.password = page.locator('#AccountPassword');
    this.loginBtn = page.locator("button[type='submit']");
    this.myWalls = page.locator("//span[normalize-space()='My Walls']");
  }

  async openSocialFeeds() {

    await test.step('Step 1: Fill email field', async () => {
      await this.email.waitFor({ state: 'visible', timeout: 10000 });
      await this.email.fill('Shristy+51@taggbox.com'); // Update email
    });

    await test.step('Step 2: Fill password field', async () => {
      await this.password.waitFor({ state: 'visible', timeout: 10000 });
      await this.password.fill('Taggbox@123');
    });
    await test.step('Step 3: Click login button', async () => {
      await this.loginBtn.waitFor({ state: 'visible', timeout: 10000 });
      await this.loginBtn.click();
    });

    await test.step('Step 4: Navigate to My Walls', async () => {
      await this.myWalls.waitFor({ state: 'visible', timeout: 10000 });
      await this.myWalls.click();
    });

    await test.step('Step 5: Click edit icon', async () => {
      await this.edit.waitFor({ state: 'visible', timeout: 10000 });
      await this.edit.click();
    });

    await test.step('Step 6: Navigate to Social Feeds', async () => {
      await this.socialFeeds.waitFor({ state: 'visible', timeout: 10000 });
      await this.socialFeeds.click();
    });

    await test.step('Step 7: Click Add Feed button', async () => {
      await this.addFeed.waitFor({ state: 'visible', timeout: 10000 });
      await this.addFeed.click();
    });
  }


  async manageFeed() {
    await test.step("Step 1: Click 'socialFeeds' button", async () => {
      await this.socialFeeds.waitFor({ state: 'visible', timeout: 10000 });
      await this.socialFeeds.click();
      await this.manageFeeds.waitFor({ state: 'visible', timeout: 10000 });
      await this.manageFeeds.click();
      await this.page.waitForTimeout(2000);
    });

    await test.step("Step 2: Soft check that asset count element is visible", async () => {
      await expect.soft(this.countPost).toBeVisible();
    });

    await test.step("Step 3: Read and parse the asset count", async () => {
      const countText = (await this.countPost.textContent() || '').trim();
      console.log(`Assets count: ${countText}`);

      const count = Number.parseInt(countText, 10);

      if (Number.isNaN(count)) {
        console.error(`❌ Failed to parse asset count: "${countText}"`);
        expect.soft(false, `Asset count should be a valid number, got "${countText}"`).toBe(true);
      } else {
        console.log(`✅ Parsed asset count: ${count}`);
        expect.soft(count, 'Asset count should be greater than 0').toBeGreaterThan(0);
      }
    });

    await test.step("Step 4: Delete all feeds if delete button is present", async () => {
      let count = 1;

      while (true) {
        const deleteButtons = this.page.locator("//i[contains(@class,'fs-6')]");
        const isVisible = await deleteButtons.first().isVisible();

        if (!isVisible) break;

        console.log(`🗑️ Deleting feed #${count}`);

        // Click the first visible delete button
        await deleteButtons.first().click();
        await this.confirmYesBtn.click();

        // Wait for success message
        await expect.soft(this.successMsg).toHaveText('Feed Deleted successfully');

        // Optional short wait for DOM to update
        await this.page.waitForTimeout(3000);

        count++;
      }

      if (count === 1) {
        console.log("ℹ️ No feeds found to delete.");
      } else {
        console.log(`✅ All feeds deleted (${count - 1} in total).`);
      }
    });
  }
}
export default ManageFeeds;