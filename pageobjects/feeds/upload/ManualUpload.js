const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class ManualUpload {
    constructor(page) {
        this.page = page;

        // Locators
        this.uploadTab = page.locator("//span[normalize-space()='Upload']");
        this.myDeviceBtn = page.locator("//p[normalize-space()='My Device']");
        this.dragAndDropArea = page.locator("//strong[@class='text-center text-muted mb-2']");
        this.fileInput = page.locator('input[type="file"]').first();
        this.uploadFileBtn = page.locator("//button[normalize-space()='Upload 1 file']");
        this.authorName = page.locator('#author_n_');
        this.caption = page.locator('#mu_caption');
        this.authorImage = page.locator('#s_pi');
        this.fileInputAuthor = page.locator('input[type="file"][accept="image/*"]:not([webkitdirectory])');
        this.createFeedBtn = page.locator('#create_feed');
        this.moreActions = page.locator('.fa-regular.fa-ellipsis');
        this.deleteBtn = page.locator("//a[normalize-space()='Delete post']");
        this.confirmDeleteBtn = page.locator("//button[normalize-space()='Yes, delete it!']");
        this.deleteMsg = page.locator("//div[contains(text(),'Your post has been deleted.')]");
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

    async fillPostDetails() {
        await this.authorName.fill('Taggbox Automation');
        await this.caption.fill('This is a test caption for manual upload.');
    }

    async deletePost() {
        await test.step('Delete the uploaded post and verify success message', async () => {
            await this.moreActions.click({ force: true });
            await this.deleteBtn.click({ force: true });
            await this.confirmDeleteBtn.click({ force: true });
            await expect.soft(this.deleteMsg).toHaveText('Your post has been deleted.');
        });
    }

    async manualUpload() {
        await test.step('Click "Upload" tab', async () => {
            await this.uploadTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.uploadTab.click({ force: true });
        });

        await test.step('Select "My Device" and upload video', async () => {
            await this.myDeviceBtn.click({ force: true });
            await this.dragAndDropArea.click({ force: true });
            await this.uploadFile(this.fileInput, '../../../videos/demovideo.mp4');
            await this.uploadFileBtn.click({ force: true });
            await this.page.waitForTimeout(8000);
        });

        await test.step('Fill in author details and upload profile image', async () => {
            await this.fillPostDetails();
            await this.authorImage.click({ force: true });
            await this.uploadFile(this.fileInputAuthor, '../../../videos/image.jpg');
            await this.uploadFileBtn.click({ force: true });
            await this.page.waitForTimeout(5000);
        });

        await test.step('Click "Create Feed" button', async () => {
            await this.createFeedBtn.click();
        });

        await this.deletePost();
    }
}

module.exports = ManualUpload;
