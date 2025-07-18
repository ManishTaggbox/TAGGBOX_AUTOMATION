const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class RequestNetwork {
    constructor(page) {
        this.page = page;

        // Locators
        this.requestNetworkbtn = page.locator("button[class='custom-req-network border-0 px-2 btn btn-secondary']");
        this.description = page.locator('#r_f_desc');
        this.uploadFilebtn1 = page.locator("#sugg_doc");
        this.fileInput = page.locator('input[type="file"]').first();
        this.uploadFileBtn = page.locator("//button[normalize-space()='Upload 1 file']");
        this.submitBtn = page.locator('#r_f_submit');
        this.successMessage = page.locator("//div[contains(text(),'Request shared successfully')]");

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



    async requestNetwork() {
        await test.step('Click "Upload" tab', async () => {
            await this.requestNetworkbtn.click({ force: true });
            await this.description.fill('This is a test description for Request Network feed.');
        });

        await test.step('Select "My Device" and upload video', async () => {
            await this.uploadFilebtn1.click({ force: true });


            await this.uploadFile(this.fileInput, '../../../videos/demovideo.mp4');
            await this.uploadFileBtn.click({ force: true });
            await this.page.waitForTimeout(8000);
        });



        await test.step('Click "Submit" button', async () => {
            await this.submitBtn.click();
        });
        await test.step('Soft verify success message', async () => {
            await expect.soft(this.successMessage).toHaveText('Request shared successfully');
        });

    }
}

module.exports = RequestNetwork;

