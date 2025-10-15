const { test, expect } = require('@playwright/test');

class ManageFeeds {

  constructor(page) {
    this.page = page;
    this.manageFeedsBtn = page.locator("//span[normalize-space()='Manage Feeds']");
    this.countPost = page.locator("//p[@class='fs-8 fw-semibold mb-0']").first();
    this.deleteBtn = page.locator("//button[@data-id='delete']");
    this.confirmYesBtn = page.locator("//button[normalize-space()='Yes']");
    this.successMsg = page.locator("//div[contains(text(),'Feeds Deleted Succesfully.')]");
  }

  async manageFeed() {
    await test.step("Step 1: Click 'Manage Feeds' button", async () => {
      await this.manageFeedsBtn.waitFor({ state: 'visible', timeout: 10000 });
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

    await test.step("Step 4: Delete all feeds if delete button is present", async () => {
      let count = 1;

      while (true) {
        const deleteButtons = this.page.locator("//button[@aria-label='delete']");
        const isVisible = await deleteButtons.first().isVisible();

        if (!isVisible) break;

        console.log(`🗑️ Deleting feed #${count}`);

        // Click the first visible delete button
        await deleteButtons.first().click();
        await this.confirmYesBtn.click();

        // Wait for success message
        await expect.soft(this.successMsg).toHaveText('Feeds Deleted Succesfully.');

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

module.exports = ManageFeeds;
