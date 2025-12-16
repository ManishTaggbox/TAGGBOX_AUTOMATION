const { test, expect } = require('@playwright/test');

class EditProduct {
    constructor(page) {
        this.page = page;
        this.editIcon = page.locator('#action-pen');
        this.productNameInput = page.locator('#pro_name');
        this.priceInput = page.locator('#input_price');
        this.discountInput = page.locator('#input_discount');
        this.urlInput = page.locator('#input_url');
        this.skuInput = page.locator('#input_sku');
        this.pIdInput = page.locator('#input_p_id');
        this.categoryInput = page.locator('#input_p_cat');
        this.submit = page.locator('#product_save_');
        this.productNameValidation = page.locator('//div[text()="Product name is required"]');
        this.productUrlValidation = page.locator('//div[text()="Please enter valid url."]');
        this.tagInput = page.locator('#input_p_tag');
        this.toastMsg = page.locator('//div[text()="Product updated successfully"]');
        this.productName = page.locator('//span[text()="Test Product"]');
        this.price = page.locator("(//span[contains(text(), '£100')])");
        this.discountPrice = page.locator('(//span[contains(text(), "10")])[2]');
        this.productUrl = page.locator('(//a[@title="Link"])[1]');
        this.productId = page.locator('//input[@value="PID12345"]');
        this.category = page.locator('//span[text()="Category1"]');
        this.sku = page.locator('//span[text()="SKU12345"]');
        this.tag = page.locator('//span[text()="Tag1"]');
    }

    async editProduct() {
        await test.step("Step 1: Click on the edit icon to open edit form", async () => {
            await this.editIcon.first().waitFor({ state: 'visible', timeout: 10000 });
            await this.editIcon.first().click();
        });

        await test.step("Step 2: Clear all existing form values", async () => {
            await this.productNameInput.clear();
            await this.priceInput.clear();
            await this.discountInput.clear();
            await this.urlInput.clear();
            await this.skuInput.clear();
            await this.pIdInput.clear();
            await this.categoryInput.clear();
        });

        await test.step("Step 3: Submit form with empty values to trigger validation", async () => {
            await this.submit.waitFor({state: 'visible', timeout: 5000});
            await this.submit.click();
        });

        await test.step("Step 4: Verify product name validation error is visible", async () => {
            await expect.soft(this.productNameValidation).toBeVisible();
        });

        await test.step("Step 5: Verify product name validation error message", async () => {
            await expect.soft(this.productNameValidation).toHaveText('Product name is required');
        });

        await test.step("Step 6: Verify product URL validation error is visible", async () => {
            await expect.soft(this.productUrlValidation).toBeVisible();
        });

        await test.step("Step 7: Verify product URL validation error message", async () => {
            await expect.soft(this.productUrlValidation).toHaveText('Please enter valid url.');
        });

        await test.step("Step 8: Fill in product name with valid data", async () => {
            await this.productNameInput.fill('Test Product');
        });

        await test.step("Step 9: Fill in product price with valid data", async () => {
            await this.priceInput.fill('100');
        });

        await test.step("Step 10: Fill in discount amount with valid data", async () => {
            await this.discountInput.fill('10');
        });

        await test.step("Step 11: Fill in product URL with valid data", async () => {
            await this.urlInput.fill('https://www.google.com/');
        });

        await test.step("Step 12: Fill in SKU with valid data", async () => {
            await this.skuInput.fill('SKU12345');
        });

        await test.step("Step 13: Fill in Product ID with valid data", async () => {
            await this.pIdInput.fill('PID12345');
        });

        await test.step("Step 14: Fill in category with valid data", async () => {
            await this.categoryInput.fill('Category1');
        });

        await test.step("Step 15: Fill in tags with valid data", async () => {
            await this.tagInput.fill('Tag1, Tag2');
        });

        await test.step("Step 16: Submit the updated product form", async () => {
            await this.submit.waitFor({state: 'visible', timeout: 5000});
            await this.submit.click();
        });

        await test.step("Step 17: Verify success toast message is visible", async () => {
            await expect.soft(this.toastMsg).toBeVisible();
        });

        await test.step("Step 18: Verify success toast message content", async () => {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Product updated successfully');
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 19: Validate updated product name is displayed", async () => {
            await expect.soft(this.productName).toHaveText('Test Product');
        });

        await test.step("Step 20: Validate updated product price is displayed", async () => {
            //await expect.soft(this.price).toContainText('$100');
            await expect.soft(this.price).toContainText('£100');
        });

        await test.step("Step 21: Validate updated discount price is displayed", async () => {
            //await expect.soft(this.discountPrice).toContainText('$10');
            await expect.soft(this.discountPrice).toContainText('£10');
        });

        await test.step("Step 22: Validate updated product URL attribute", async () => {
            await expect.soft(this.productUrl).toHaveAttribute('href', 'https://www.google.com/');
        });

        await test.step("Step 23: Validate updated product ID value", async () => {
            await expect.soft(this.productId).toHaveValue('PID12345');
        });

        await test.step("Step 24: Validate updated category is displayed", async () => {
            await expect.soft(this.category).toHaveText('Category1');
        });

        await test.step("Step 25: Validate updated SKU is displayed", async () => {
            await expect.soft(this.sku).toHaveText('SKU12345');
        });

        await test.step("Step 26: Validate updated tag is displayed", async () => {
            await expect.soft(this.tag).toHaveText('Tag1');
        });
    }
}

module.exports = EditProduct;