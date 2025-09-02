const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class UploadCSVFile 
{
    constructor(page) 
    {
        this.page = page;
        this.manualUpload = page.locator('//h5[text()="Manual Upload"]');
        this.uploadCSV = page.locator('//h5[text()="Upload CSV File"]');
        this.browse = page.locator('//input[@type="file"]');
        this.uploadBtn = page.locator('#import_btn');
        this.successMsg = page.locator("//div[contains(text(),'Product Import Successfully.')]");
    }

    getAbsolutePath(relativePath) 
    {
        const fullPath = path.resolve(__dirname, relativePath);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`❌ File not found: ${fullPath}`);
        }
        return fullPath;
    }

    async uploadFile(input, filePath) 
    {
        const fullPath = this.getAbsolutePath(filePath);
        await input.setInputFiles(fullPath);
    }

    async uploadCSVFile() 
    {
        await test.step("Step 1: Click 'Manual Upload' option", async () => 
        {
            await this.manualUpload.waitFor({state: 'visible', timeout: 10000});
            await this.manualUpload.click();
        });

        await test.step("Step 2: Click 'Upload CSV File' option", async () =>
        {
            await this.uploadCSV.waitFor({state: 'visible', timeout: 5000});
            await this.uploadCSV.click();
        });

        await test.step("Step 3: Upload CSV file from specified path", async () => 
        {
            await this.uploadFile(this.browse, '../../videos/sample-products.csv');
        });

        await test.step("Step 4: Wait for file upload processing", async () => 
        {
            await this.page.waitForTimeout(10000);
        });

        await test.step("Step 5: Click 'Upload' button to import products", async () =>
        {
            await this.uploadBtn.waitFor({state: 'visible', timeout: 5000});
            await this.uploadBtn.click();
        });

        await test.step("Step 6: Wait for import process to complete", async () => 
        {
            await this.page.waitForTimeout(8000);
        });

        await test.step("Step 7: Verify success message appears", async () =>
        {
            await this.successMsg.waitFor({state: 'visible', timeout: 20000});
            await expect.soft(this.successMsg).toHaveText('Product Import Successfully.');
        });
    }
}

module.exports = UploadCSVFile;