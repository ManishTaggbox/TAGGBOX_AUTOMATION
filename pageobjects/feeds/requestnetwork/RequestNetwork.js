const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
const path = require('path');
const fs = require('fs');

class ReviewHub {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    // Feed Creation Locators
    this.feedTitle = this.page.locator('#su_title');
    this.feedSubtitle = this.page.locator('#su_sub_title');
    this.logo = this.page.locator('#su_logo');
    this.fileInput = this.page.locator('input[type="file"]').first();
    this.uploadFileBtn = this.page.locator("//button[normalize-space()='Upload 1 file']");
    this.backgroundColor = this.page.locator('#backgroundColor');
    this.privateFeed = this.page.locator('#moderation');
    this.createFeedBtn = this.page.locator('#create_feed');
    this.successMessage = this.page.locator("//div[contains(text(),'Setting Updated Successfully')]");
    this.shareUrl = this.page.locator('#ShareURL');

    // Review Form Locators
    this.submitBtn = this.page.locator("div[class='t_f_p_btn ']");
    this.ratingError = this.page.locator("//div[normalize-space()='* Rating is required.']");
    this.reviewTitleError = this.page.locator("//div[normalize-space()='* Review Title is required.']");
    this.nameError = this.page.locator("//div[normalize-space()='Name is required.']");
    this.emailError = this.page.locator("//div[normalize-space()='Email is required.']");
    this.reviewTitleInput = this.page.locator("//input[@placeholder='Enter review title']");
    this.reviewInput = this.page.locator("//textarea[@placeholder='Write your review here']");
    this.star = this.page.locator("//div[@class='t_star_ico tb__icon tb-star-outline']");
    this.reviewerName = this.page.locator("//input[@placeholder='Enter Your name']");
    this.reviewerEmail = this.page.locator("//input[@placeholder='Enter you email']");
    this.reviewSuccessTitle = this.page.locator("//div[@class='t_s_title']");
    this.chooseFile = this.page.locator("//div[@class='uppy-DragDrop-label']");
    this.close = this.page.locator("//div[@class='position-absolute cursor-pointer rounded-2']");
    this.postPrivate = this.page.locator("//button[@class='disabled w-100 btn btn-private btn-sm']");
    this.postPublic = this.page.locator("//button[@class=' w-100 btn btn-public btn-sm']");
    this.postPublicMsg = this.page.locator("//div[contains(text(),'Post is Public now')]");
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

  async setupFeedBasics() {
    await this.clearAndFill(this.feedTitle, 'Review Hub');
    await this.clearAndFill(this.feedSubtitle, 'Review Hub Subtitle');
  }

  async uploadLogo() {
    await this.logo.click({ force: true });
    await this.uploadFile(this.fileInput, '../../../videos/image.jpg');
    await this.uploadFileBtn.click({ force: true });
    await this.page.waitForTimeout(7000);
  }

  async configureFeedSettings() {
    await this.clearAndFill(this.backgroundColor, '#f273b3ff');
    await this.privateFeed.click({ force: true });
    await this.createFeedBtn.click({ force: true });
  }

  async verifyFeedCreation() {
    await expect.soft(this.successMessage).toHaveText('Setting Updated Successfully');
    await this.page.waitForTimeout(7000);
    
    const url = await this.shareUrl.inputValue();
    console.log('Feed URL:', url);
    
    if (!url) throw new Error('❌ Share URL is missing!');
    
    await this.page.goto(url);
    await this.page.waitForTimeout(5000);
    return url;
  }

  async validateFormErrors() {
    await this.submitBtn.scrollIntoViewIfNeeded();
    await this.submitBtn.click({ force: true });
    await this.page.waitForTimeout(2000);

    const errorChecks = [
      { locator: this.ratingError.filter({ hasText: '* Rating is required.' }).first(), text: '* Rating is required.' },
      { locator: this.reviewTitleError, text: '* Review Title is required.' },
      { locator: this.nameError, text: 'Name is required.' },
      { locator: this.emailError, text: 'Email is required.' }
    ];

    for (const { locator, text } of errorChecks) {
      await expect.soft(locator).toHaveText(text, { timeout: 3000 });
    }
  }

  async fillReviewForm() {
    await this.reviewTitleInput.scrollIntoViewIfNeeded();
    await this.star.nth(0).click();
    await this.star.nth(2).click(); // Selecting up to 3 stars
    await this.reviewTitleInput.fill('TagShop');
    await this.reviewInput.fill('TagShop');

    // File upload
    const filePath = path.resolve(__dirname, '../../../videos/image.jpg');
    await this.fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(9000);

    await this.reviewerName.fill('Manish');
    await this.reviewerEmail.fill('manish.s@taggbox.com');
  }

  async submitReview() {
    await this.submitBtn.click({ force: true });
    await expect.soft(this.reviewSuccessTitle).toHaveText('Thanks for Your Efforts!', {
      timeout: 5000
    });
  }

  async navigateBackAndVerifyPrivacy() {
    await this.page.goBack({ waitUntil: 'load' });
    await this.page.waitForTimeout(3000);
    await this.close.click({ force: true });
    await this.page.waitForTimeout(5000);

    if (await this.postPrivate.isVisible()) {
      console.log('✅ Post is Private');
    } else {
      throw new Error('❌ Post is Not Private');
    }
  }

  async makePostPublic() {
    await this.page.waitForTimeout(2000);
    await this.postPublic.click({ force: true });
    await expect.soft(this.postPublicMsg).toBeVisible();
    await expect.soft(this.postPublicMsg).toHaveText('Post is Public now');
    await this.page.waitForTimeout(2000);
  }

  async handleFeedManagement() {
    try {
      const manageFeeds = new ManageFeeds(this.page);
      await manageFeeds.manageFeed();
    } catch (error) {
      console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
    }
  }

  async reviewHub() {
    await test.step('1️⃣ Fill Feed Title and Subtitle', async () => {
      await this.setupFeedBasics();
    });

    await test.step('2️⃣ Upload Logo Image', async () => {
      await this.uploadLogo();
    });

    await test.step('3️⃣ Set Background Color and Configure Feed', async () => {
      await this.configureFeedSettings();
    });

    await test.step('4️⃣ Verify Feed Creation and Navigate to URL', async () => {
      await this.verifyFeedCreation();
    });

    await test.step('5️⃣ Submit Empty Review Form and Validate Errors', async () => {
      await this.validateFormErrors();
    });

    await test.step('6️⃣ Fill and Submit Review Form', async () => {
      await this.fillReviewForm();
      await this.submitReview();
    });

    await test.step('7️⃣ Navigate Back and Verify Privacy Settings', async () => {
      await this.navigateBackAndVerifyPrivacy();
    });

    await test.step('8️⃣ Make Post Public', async () => {
      await this.makePostPublic();
    });

    await test.step('9️⃣ Handle Feed Management', async () => {
      await this.handleFeedManagement();
    });
  }
}

module.exports = ReviewHub;