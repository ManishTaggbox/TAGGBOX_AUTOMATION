const { test, expect } = require('@playwright/test');
import { TIKTOK } from '../../utils/constant.js';

class TiktokPersonal {
  constructor(page) {
    this.page = page;
    this.uploadTab = page.locator("//span[normalize-space()='Upload']");
    this.tiktokPersonalBtn = page.locator("//p[normalize-space()='Tiktok Personal']");
    this.postUrlInput = page.locator("//input[@placeholder='Enter URL to import post']");
    this.createFeedBtn = page.locator('#create_feed');
    this.moreActions = page.locator('.fa-regular.fa-ellipsis');
    this.deleteBtn = page.locator("//a[normalize-space()='Delete post']");
    this.confirmDeleteBtn = page.locator("//button[normalize-space()='Yes, delete it!']");
    this.deleteMsg = page.locator("//div[contains(text(),'Your post has been deleted.')]");
  }

  async tiktokPersonal() {
    await test.step('Click "Upload" tab', async () => {
      await this.uploadTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.uploadTab.click({ force: true });
    });

    await test.step('Select "Tiktok Personal" feed option', async () => {
      await this.tiktokPersonalBtn.click({ force: true });
    });

    await test.step('Enter TikTok post URL', async () => {
      await this.postUrlInput.fill(TIKTOK.TiKTOKPOSTURL);
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

module.exports = TiktokPersonal;
