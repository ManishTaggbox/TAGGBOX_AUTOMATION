const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class RequestNetwork {
    constructor(page) {
        this.page = page;

        // Locators
        this.btnRequestNetwork = page.locator("button.custom-req-network");
        this.inputDescription = page.locator('#r_f_desc');
        this.btnTriggerFileUpload = page.locator('#sugg_doc');
        this.inputFile = page.locator('input[type="file"]').first();
        this.btnUploadFile = page.locator("//button[normalize-space()='Upload 1 file']");
        this.btnCreateFeed = page.locator('#r_f_submit');
    }

    getAbsolutePath(relativePath) {
        const fullPath = path.resolve(__dirname, relativePath);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`❌ File not found at: ${fullPath}`);
        }
        return fullPath;
    }

    async uploadFile(locator, relativePath) {
        const filePath = this.getAbsolutePath(relativePath);
        await locator.setInputFiles(filePath);
    }

    async requestNetwork() {
        await test.step('Fill description and open file upload', async () => {
            await this.btnRequestNetwork.click({ force: true });
            await this.inputDescription.fill('This is a test description for Request Network feed.');
        });

        await test.step('Upload video from device', async () => {
            await this.btnTriggerFileUpload.click({ force: true });
            await this.uploadFile(this.inputFile, '../../../videos/demovideo.mp4');
            await this.btnUploadFile.waitFor({ state: 'visible', timeout: 5000 });
            await this.btnUploadFile.click({ force: true });

            // Optional: Wait until file upload is processed (you can replace with a better condition if possible)
            await this.page.waitForLoadState('networkidle');
        });

        await test.step('Submit the network feed', async () => {
            await this.btnCreateFeed.click();
        });
    }
}

module.exports = RequestNetwork;
