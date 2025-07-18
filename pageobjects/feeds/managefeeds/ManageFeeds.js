const { test, expect } = require('@playwright/test');

class ManageFeeds {

  constructor(page) {
    this.page = page;
    this.manageFeedsBtn = page.locator("//span[normalize-space()='Manage Feeds']");
    this.countPost = page.locator("//p[@class='fs-8 fw-semibold mb-0']");
    this.deleteBtn = page.locator("//button[@aria-label='delete']");
    this.confirmYesBtn = page.locator("//button[normalize-space()='Yes']");
    this.successMsg = page.locator("//div[contains(text(),'Feeds Deleted Succesfully.')]");
  }

  async manageFeed() {
    await test.step("Step 1: Click 'Manage Feeds' button", async () => {
      await this.manageFeedsBtn.click();
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

    await test.step("Step 4: Click the delete button", async () => {
      await this.deleteBtn.click();
    });

    await test.step("Step 5: Confirm the deletion", async () => {
      await this.confirmYesBtn.click();
    });

    await test.step("Step 6: Soft verify success message", async () => {
      await expect.soft(this.successMsg).toHaveText('Feeds Deleted Succesfully.');
    });
  }
}

module.exports = ManageFeeds;
