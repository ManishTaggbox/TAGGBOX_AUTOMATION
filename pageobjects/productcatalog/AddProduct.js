const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class AddProduct {
    constructor(page) {
        this.page = page;
        this.manualUpload = page.locator('//h5[text()="Manual Upload"]');
        this.addSingleProduct = page.locator('//h5[text()="Add Single Product"]');
        this.submitBtn = page.locator('#product_save_');
        this.productNameValidation = page.locator('//div[text()="Product name is required."]');
        this.productUrlValidation = page.locator('//div[text()="Please enter valid url."]');
        this.productNameInput = page.locator('#pro_name');
        this.priceInput = page.locator('#input_price');
        this.discountInput = page.locator('#input_discount');
        this.urlInput = page.locator('#input_url');
        this.skuInput = page.locator('#input_sku');
        this.pIdInput = page.locator('#input_p_id');
        this.categoryInput = page.locator('#input_p_cat');
        this.tagInput = page.locator('#input_p_tag');
        this.toastMsg = page.locator('//div[text()="Product added successfully"]');
        this.uploadImg = page.locator('#upload_pro_media');
        this.browse = page.locator('//input[@type="file"]');
        this.productName = page.locator('//span[text()="Demo Product"]');
        this.price = page.locator('//span[text()="$1000"]');
        this.discountPrice = page.locator('//span[text()="$100"]');
        this.productUrl = page.locator('(//a[@title="Link"])[1]');
        this.productId = page.locator('//input[@value="PID56789"]');
        this.category = page.locator('//span[text()="CategoryA"]');
        this.sku = page.locator('//span[text()="SKU56789"]');
        this.tag = page.locator('//span[text()="TagA"]');
        this.deleteIcon = page.locator('#action-trash-can');
        this.confirmDeleteBtn = page.locator('//button[text()="Yes, delete it!"]');
        this.deleteSuccessMsg = page.locator('//div[text()="Successfully Deleted !"]');
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


    async addProduct() {
        await test.step("Step 1: Click on 'Manual Upload' option", async () => {
            await this.manualUpload.waitFor({ state: 'visible', timeout: 10000 });
            await this.manualUpload.click();
        });

        await test.step("Step 2: Click on 'Add Single Product' option", async () => {
            await this.addSingleProduct.waitFor({state: 'visible', timeout: 5000});
            await this.addSingleProduct.click();
        });

        await test.step("Step 3: Submit form without filling required fields to trigger validation", async () => {
            await this.submitBtn.waitFor({state: 'visible', timeout: 5000});
            await this.submitBtn.click();
        });

        await test.step("Step 4: Verify product name validation error is visible", async () => {
            await expect.soft(this.productNameValidation).toBeVisible();
        });

        await test.step("Step 5: Verify product name validation error message", async () => {
            await expect.soft(this.productNameValidation).toHaveText('Product name is required.');
        });

        await test.step("Step 6: Verify product URL validation error is visible", async () => {
            await expect.soft(this.productUrlValidation).toBeVisible();
        });

        await test.step("Step 7: Verify product URL validation error message", async () => {
            await expect.soft(this.productUrlValidation).toHaveText('Please enter valid url.');
        });

        await test.step("Step 8: Fill in product name with valid data", async () => {
            await this.productNameInput.fill('Demo Product');
        });

        await test.step("Step 9: Fill in product price with valid data", async () => {
            await this.priceInput.fill('1000');
        });

        await test.step("Step 10: Fill in discount amount with valid data", async () => {
            await this.discountInput.fill('100');
        });

        await test.step("Step 11: Fill in product URL with valid data", async () => {
            await this.urlInput.fill('https://www.google.com/');
        });

        await test.step("Step 12: Fill in SKU with valid data", async () => {
            await this.skuInput.fill('SKU56789');
        });

        await test.step("Step 13: Fill in Product ID with valid data", async () => {
            await this.pIdInput.fill('PID56789');
        });

        await test.step("Step 14: Fill in category with valid data", async () => {
            await this.categoryInput.fill('CategoryA');
        });

        await test.step("Step 15: Fill in tags with valid data", async () => {
            await this.tagInput.fill('TagA, TagB');
        });

        await test.step("Step 16: Click on upload image button", async () => {
            await this.uploadImg.waitFor({state: 'visible', timeout: 5000});
            await this.uploadImg.click();
            await this.page.waitForTimeout(1000);
        });

        await test.step("Step 17: Upload product image file", async () => {
            await this.uploadFile(this.browse.first(), '../../videos/testImg.png');
            await this.page.waitForTimeout(10000);
        });

        await test.step("Step 18: Submit the product form to create new product", async () => {
            await this.submitBtn.waitFor({state: 'visible', timeout: 5000});
            await this.submitBtn.click();
        });

        await test.step("Step 19: Verify success toast message is visible", async () => {
            await expect.soft(this.toastMsg).toBeVisible();
        });

        await test.step("Step 20: Verify success toast message content", async () => {
            await expect.soft(this.toastMsg).toHaveText('Product added successfully');
        });

        await test.step("Step 21: Validate added product name is displayed correctly", async () => {
            await expect.soft(this.productName).toHaveText('Demo Product');
        });

        await test.step("Step 22: Validate added product price is displayed correctly", async () => {
            await expect.soft(this.price).toHaveText('$1000');
        });

        await test.step("Step 23: Validate added discount price is displayed correctly", async () => {
            await expect.soft(this.discountPrice).toHaveText('$100');
        });

        await test.step("Step 24: Validate added product URL attribute is correct", async () => {
            await expect.soft(this.productUrl).toHaveAttribute('href', 'https://www.google.com/');
        });

        await test.step("Step 25: Validate added product ID value is correct", async () => {
            await expect.soft(this.productId).toHaveValue('PID56789');
        });

        await test.step("Step 26: Validate added category is displayed correctly", async () => {
            await expect.soft(this.category).toHaveText('CategoryA');
        });

        await test.step("Step 27: Validate added SKU is displayed correctly", async () => {
            await expect.soft(this.sku).toHaveText('SKU56789');
        });

        await test.step("Step 28: Validate added tag is displayed correctly", async () => {
            await expect.soft(this.tag).toHaveText('TagA');
        });

        await test.step("Step 29: Click on delete icon to remove the test product", async () => {
            await this.deleteIcon.waitFor({state: 'visible', timeout: 5000});
            await this.deleteIcon.first().click();
        });

        await test.step("Step 30: Confirm product deletion", async () => {
            await this.confirmDeleteBtn.waitFor({state: 'visible', timeout: 5000});
            await this.confirmDeleteBtn.click();
        });

        await test.step("Step 31: Verify success toast message is visible", async () => {
            await expect.soft(this.deleteSuccessMsg).toBeVisible();
        });

        await test.step("Step 32: Verify success toast message content", async () => {
            await this.deleteSuccessMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.deleteSuccessMsg).toHaveText('Successfully Deleted !');
        });
    }
}

module.exports = AddProduct;