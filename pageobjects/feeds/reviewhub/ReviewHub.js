const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
const path = require('path');
const fs = require('fs');

class ReviewHub {
  constructor(page) {
    this.page = page;

    // --- Feed Creation Locators ---
    this.feedTitle = page.locator('#su_title');
    this.feedSubtitle = page.locator('#su_sub_title');
    this.logo = page.locator('#su_logo');
    this.fileInput = page.locator('input[type="file"]').first();
     this.fileInputSnapup = page.locator('input[type="file"]');
    this.uploadFileBtn = page.locator("//button[normalize-space()='Upload 1 file']");
    this.backgroundColor = page.locator('#backgroundColor');
    this.privateFeed = page.locator('#moderation');
    this.createFeedBtn = page.locator('#create_feed');
    this.successMessage = page.locator("//div[contains(text(),'Setting Updated Successfully')]");
    this.shareUrl = page.locator('#ShareURL');

    // --- Review Form Locators ---
    this.submitBtn = page.locator("div[class='t_f_p_btn ']");
    this.ratingError = page.locator("//div[normalize-space()='* Rating is required.']");
    this.reviewTitleError = page.locator("//div[normalize-space()='* Review Title is required.']");
    this.nameError = page.locator("//div[normalize-space()='Name is required.']");
    this.emailError = page.locator("//div[normalize-space()='Email is required.']");
    this.reviewTitleInput = page.locator("//input[@placeholder='Enter review title']");
    this.reviewInput = page.locator("//textarea[@placeholder='Write your review here']");
    this.star = page.locator("//div[@class='t_star_ico tb__icon tb-star-outline']");
    this.reviewerName = page.locator("//input[@placeholder='Enter Your name']");
    this.reviewerEmail = page.locator("//input[@placeholder='Enter you email']");
    this.reviewSuccessTitle = page.locator("//div[@class='t_s_title']");
    this.chooseFile = page.locator("//div[@class='uppy-DragDrop-label']");

    this.close = page.locator("//div[@class='position-absolute cursor-pointer rounded-2']");
    this.postPrivate = page.locator("//button[@class='disabled w-100 btn btn-private btn-sm']");
    this.postPublic = page.locator("//button[@class=' w-100 btn btn-public btn-sm']");
    this.postPublicMsg = page.locator("//div[contains(text(),'Post is Public now')]")
  }

  getAbsolutePath(relativePath) {
    const fullPath = path.resolve(__dirname, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`❌ File not found: ${fullPath}`);
    }
    return fullPath;
  }

  async uploadFile(inputLocator, filePath) {
    const fullPath = this.getAbsolutePath(filePath);
    await inputLocator.setInputFiles(fullPath);
  }

  async clearAndFill(locator, value) {
    await locator.clear({ force: true });
    await locator.fill(value);
  }

  async reviewHub() {
    await test.step('1️⃣ Fill Feed Title and Subtitle', async () => {
      await this.clearAndFill(this.feedTitle, 'Review Hub');
      await this.clearAndFill(this.feedSubtitle, 'Review Hub Subtitle');
    });

    await test.step('2️⃣ Upload Logo Image', async () => {
      await this.logo.click({ force: true });
      await this.uploadFile(this.fileInput, '../../../videos/image.jpg');
      await this.uploadFileBtn.click({ force: true });
      await this.page.waitForTimeout(7000);
    });

    await test.step('3️⃣ Set Background Color', async () => {
      await this.clearAndFill(this.backgroundColor, '#f273b3ff');
    });

    await test.step('4️⃣ Set Feed to Private and Create', async () => {
      await this.privateFeed.click({ force: true });
      await this.createFeedBtn.click({ force: true });
    });

    await test.step('5️⃣ Verify Feed Creation Success Message', async () => {
      await expect.soft(this.successMessage).toHaveText('Setting Updated Successfully');
    });

    await test.step('6️⃣ Navigate to Generated Feed URL', async () => {
      await this.page.waitForTimeout(7000);
      const url = await this.shareUrl.inputValue();
      console.log('Feed URL:', url);

      if (!url) throw new Error('❌ Share URL is missing!');
      await this.page.goto(url);
      await this.page.waitForTimeout(5000);
    });

    await test.step('7️⃣ Submit Empty Review Form and Validate Errors', async () => {
      await this.submitBtn.scrollIntoViewIfNeeded();
      await this.submitBtn.click({ force: true });
      await this.page.waitForTimeout(2000);

      await expect.soft(this.ratingError.filter({ hasText: '* Rating is required.' }).first()).toHaveText('* Rating is required.');

      await expect.soft(this.reviewTitleError).toHaveText('* Review Title is required.', { timeout: 3000 });
      await expect.soft(this.nameError).toHaveText('Name is required.', { timeout: 3000 });
      await expect.soft(this.emailError).toHaveText('Email is required.', { timeout: 3000 });
    });

    await test.step('8️⃣ Fill Review Form and Submit Successfully', async () => {
      await this.reviewTitleInput.scrollIntoViewIfNeeded();
      await this.star.nth(0).click();
      await this.star.nth(2).click(); // Selecting up to 3 stars
      await this.reviewTitleInput.fill('Taggbox');
      await this.reviewInput.fill('Taggbox');
      await this.page.waitForTimeout(3000);

      // File upload
      const filePathSnapup = path.resolve(__dirname, '../../../videos/image.jpg'); // Adjust path as needed
      await this.fileInputSnapup.setInputFiles(filePathSnapup);
      await this.page.waitForTimeout(9000);

      await this.reviewerName.fill('Manish');
      await this.reviewerEmail.fill('manish.s@taggbox.com');

      await this.submitBtn.click({ force: true });

      await expect.soft(this.reviewSuccessTitle).toHaveText('Thanks for Your Efforts!', {
        timeout: 5000
      });

      await test.step('9 Verify Feed Creation Success Message', async () => {
        await this.page.goBack({ waitUntil: 'load' });
        await this.page.waitForTimeout(3000);

      });
      await test.step('10 Verify Feed Creation Success Message', async () => {
        await this.close.click({ force: true });
        await this.page.waitForTimeout(5000);

        if (await this.postPrivate.isVisible()) {
          console.log('✅ Post is Private');
        } else {
          throw new Error('❌ Post is Not Private');
        }

        await this.page.waitForTimeout(2000);
        await this.postPublic.click({ force: true });

        await expect.soft(this.postPublicMsg).toBeVisible();
        await expect.soft(this.postPublicMsg).toHaveText('Post is Public now');
          await this.page.waitForTimeout(2000);

      });
      await test.step('Step 11: Proceed with feed management if Content Gallery is loaded', async () => {
        try {
          const manageFeeds = new ManageFeeds(this.page);
          await manageFeeds.manageFeed();
        } catch (error) {
          console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
        }
      });
    });
  }
}

module.exports = ReviewHub;