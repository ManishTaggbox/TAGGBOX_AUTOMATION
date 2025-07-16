const { test, expect } = require('@playwright/test');
import { TIKTOK } from '../../utils/constant.js';

class ManualUpload {
  constructor(page) {
    this.page = page;
    this.uploadTab = page.locator("//span[normalize-space()='Upload']");
    this.myDeviceBtn = page.locator("//p[normalize-space()='My Device']");
    this.postUrlInput = page.locator("//input[@placeholder='Enter URL to import post']");
    this.dragAndDrop = page.locator("//strong[@class='text-center text-muted mb-2']");
    this.mydevice = page.locator("//div[contains(text(),'My Device')]");
    this.uploadFile = page.locator("//button[normalize-space()='Upload 1 file']");



    this.createFeedBtn = page.locator('#create_feed');
    this.moreActions = page.locator('.fa-regular.fa-ellipsis');
    this.deleteBtn = page.locator("//a[normalize-space()='Delete post']");
    this.confirmDeleteBtn = page.locator("//button[normalize-space()='Yes, delete it!']");
    this.deleteMsg = page.locator("//div[contains(text(),'Your post has been deleted.')]");
  }

  async manualUpload() {
    await test.step('Click "Upload" tab', async () => {
      await this.uploadTab.click({ force: true });
    });

    await test.step('Select " my device " feed option', async () => {
      await this.myDeviceBtn.click({ force: true });
    });

    await test.step('Enter TikTok post URL', async () => {
      await this.dragAndDrop.click({ force: true });
      await this.mydevice.setInputFiles('path/to/your/file.jpg'); 
      await this.uploadFile.click({ force: true });
      

    });

    await test.step('Wait for UI update and verify "Create Feed" is enabled', async () => {
      await this.page.waitForTimeout(2000);
      await expect(this.createFeedBtn).toBeEnabled();
    });

    await test.step('Click "Create Feed" button', async () => {
      await this.createFeedBtn.click();
    });

    await test.step('Wait for Content Gallery to load', async () => {
      await this.page.waitForTimeout(13000);
    });

    await test.step('Delete the uploaded post and verify success message', async () => {
      await this.moreActions.click({ force: true });
      await this.deleteBtn.click({ force: true });
      await this.confirmDeleteBtn.click({ force: true });
      await expect.soft(this.deleteMsg).toHaveText('Your post has been deleted.');
    });
  }
}

module.exports = ManualUpload;
