const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class ReviewHub {
  constructor(page) {
    this.page = page;
    this.title = page.locator('#su_title');
    this.enterHandle = page.locator("//input[@id='handle-text']");
    this.subTitle = page.locator('#su_sub_title');
    this.logo = page.locator('#su_logo');
    this.fileInput = page.locator('input[type="file"]').first();
    this.uploadFileBtn = page.locator("//button[normalize-space()='Upload 1 file']");
    this.backgroundColor = page.locator('#backgroundColor');
    this.privateFeed = page.locator('#moderation');
    this.createFeedBtn = page.locator('#create_feed');
    this.successMessage = page.locator("//div[contains(text(),'Setting Updated Successfully')]");
  }

  getAbsolutePath(relativePath) {
    const fullPath = path.resolve(__dirname, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`❌ File not found: ${fullPath}`);
    }
    return fullPath;
  }

  async uploadFile(input, filePath) {
    const fullPath = this.getAbsolutePath(filePath);
    await input.setInputFiles(fullPath);
  }

  async clearAndFill(locator, value) {
    await locator.clear({ force: true });
    await locator.fill(value);
  }

  async reviewHub() {
    await test.step('Step 1: Fill Review Hub Title & Subtitle', async () => {
      await this.clearAndFill(this.title, 'Review Hub');
      await this.clearAndFill(this.subTitle, 'Review Hub Subtitle');
    });

    await test.step('Step 2: Upload Logo Image', async () => {
      await this.logo.click({ force: true });
      await this.uploadFile(this.fileInput, '../../../videos/image.jpg');
      await this.uploadFileBtn.click({ force: true });
      await this.page.waitForTimeout(7000); // Keep this as per your request
    });

    await test.step('Step 3: Set Background Color', async () => {
      await this.clearAndFill(this.backgroundColor, '#f273b3ff');
    });

    await test.step('Step 4: Make Feed Private & Submit', async () => {
      await this.privateFeed.click({ force: true });
      await this.createFeedBtn.click({ force: true });
    });

    await test.step('Step 5: Validate Success Message', async () => {
      await expect.soft(this.successMessage).toHaveText('Setting Updated Successfully');
      await this.page.waitForTimeout(10000); // Keep this as per your request
    });
  }
}

module.exports = ReviewHub;
