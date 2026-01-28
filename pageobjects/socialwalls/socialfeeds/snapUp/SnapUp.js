import { test, expect } from '@playwright/test';
import ManageFeeds from '../managefeeds/ManageFeeds.js';
const path = require('path');
const fs = require('fs');

class SnapUp {
    constructor(page) {
        this.page = page;
        this.snapUp = page.locator("//li[contains(@class,'onsiteupload')]//button[contains(@type,'button')]");
        this.titleField = page.locator('//input[@name="title"]');
        this.subtitleField = page.locator('//textarea[@name="subTitle"]');
        this.btnTextField = page.locator('//textarea[@name="subTitle"]');
        this.thankUMsgField = page.locator('//textarea[@name="thankUMsg"]');
        this.clearLogo = page.locator('.close');
        this.logo = page.locator('//span[text()="Attach "]').last();
        //this.fileInput = page.locator('//button[text()="browse files"]').last();
        this.fileInput = page.locator('input[type="file"]').first();
        this.uploadFileBtn = page.locator("//button[normalize-space()='Upload 1 file']");
    }

    async clearAndFill(locator, value) {
    await locator.clear({ force: true });
    await locator.fill(value);
    }

    async uploadFile(inputLocator, filePath) {
    const fullPath = this.getAbsolutePath(filePath);
    await inputLocator.setInputFiles(fullPath);
    }

    getAbsolutePath(relativePath) {
        const fullPath = path.resolve(__dirname, relativePath);
        if (!fs.existsSync(fullPath)) {
          throw new Error(`❌ File not found: ${fullPath}`);
        }
        return fullPath;
      }

    async snapUpfeed() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for SnapUp button, then click', async () => {
            await this.snapUp.waitFor({ state: 'visible', timeout: 10000 });
            await this.snapUp.click();

            console.log('✅ Clicked on SnapUp button');
        });

        await test.step('1️⃣ Fill snapup feed data', async () => {
            await this.titleField.waitFor({ state: 'visible', timeout: 10000 });
            await this.clearAndFill(this.titleField, 'Review Hub');
            await this.clearAndFill(this.subtitleField, 'Review Hub Subtitle');
            await this.clearAndFill(this.btnTextField, 'Submit');
            await this.clearAndFill(this.thankUMsgField, 'Thank you for submission');

            console.log('✅ Entered snapup feed data');
        });

        await test.step('2️⃣ Upload Logo Image', async () => {
            await this.clearLogo.click({ force: true });
            await this.logo.click({ force: true });
            await this.uploadFile(this.fileInput, '../../../../videos/imagesnapup.jpg');
            await this.page.waitForTimeout(12000);
            await this.uploadFileBtn.click({ force: true });
            await this.page.waitForTimeout(12000);
        });

        // await test.step('3️⃣ Set Background Color', async () => {
        //     await this.clearAndFill(this.backgroundColor, '#f273b3ff');
        // });

        // await test.step('4️⃣ Set Feed to Private and Create', async () => {
        //     await this.privateFeed.click({ force: true });
        //     await this.createFeedBtn.click({ force: true });
        // });

        // await test.step('5️⃣ Verify Feed Creation Success Message', async () => {
        //     await expect.soft(this.successMessage).toHaveText('Setting Updated Successfully');
        // });


    }
}

export default SnapUp;
