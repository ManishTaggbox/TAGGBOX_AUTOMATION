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
        this.productCatalog = page.locator('#pd_ctlog');
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
    

    async csvUpload() 
    {
        await this.manualUpload.click();
        await this.uploadCSV.click();
        await this.uploadFile(this.browse, '../../videos/sample-products.csv');
        await this.page.waitForTimeout(10000);
        await this.uploadBtn.click();
        await this.page.waitForTimeout(5000);
        await this.productCatalog.click();
        await this.page.waitForTimeout(5000);
    
    }
}

module.exports = UploadCSVFile;