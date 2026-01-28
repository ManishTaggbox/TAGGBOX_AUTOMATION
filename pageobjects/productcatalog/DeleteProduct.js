const { test, expect } = require('@playwright/test');

class DeleteProduct {
    constructor(page) {
        this.page = page;
        this.deleteIcon = page.locator('#action-trash-can');
        this.confirmDeleteBtn = page.locator('//button[text()="Delete"]');
        this.toastMsg = page.locator('//div[text()="Successfully Deleted !"]');
        this.productName = page.locator('//span[text()="Test Product"]');
        this.selectAllCheckbox = page.locator('#check_all_pro');
        this.deleteAllBtn = page.locator('#d_selected_btn');
    }

    async deleteProduct() {
        await test.step("Step 1: Click on delete icon for single product", async () => {
            await this.deleteIcon.first().waitFor({ state: 'visible', timeout: 10000 });
            await this.deleteIcon.first().click();
        });

        await test.step("Step 2: Confirm deletion by clicking 'Yes, delete it!' button", async () => {
            await this.confirmDeleteBtn.waitFor({state: 'visible', timeout: 5000});
            await this.confirmDeleteBtn.click();
        });

        await test.step("Step 3: Verify success toast message is visible", async () => {
            await expect.soft(this.toastMsg).toBeVisible();
        });

        await test.step("Step 4: Verify success toast message content", async () => {
            await expect.soft(this.toastMsg).toHaveText('Successfully Deleted !');
        });

        await test.step("Step 5: Verify the deleted product is no longer visible", async () => {
            await expect.soft(this.productName).not.toBeVisible();

            // Wait for "Delete Product" toast message to disappear
            await this.page.waitForTimeout(5000);
        });
    }

    async deleteMultipleProducts() {
        await test.step("Step 1: Select all products using select all checkbox", async () => {
            await this.selectAllCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.selectAllCheckbox.click();
        });

        await test.step("Step 2: Click delete selected products button", async () => {
            await this.deleteAllBtn.waitFor({state: 'visible', timeout: 5000});
            await this.deleteAllBtn.click();
        });

        await test.step("Step 3: Confirm bulk deletion by clicking 'Yes, delete it!' button", async () => {
            await this.confirmDeleteBtn.waitFor({state: 'visible', timeout: 5000});
            await this.confirmDeleteBtn.click();
        });

        await test.step("Step 4: Verify success toast message is visible for bulk deletion", async () => {
            await expect.soft(this.toastMsg).toBeVisible();
        });

        await test.step("Step 5: Verify success toast message content for bulk deletion", async () => {
            await expect.soft(this.toastMsg).toHaveText('Successfully Deleted !');
        });

        await test.step("Step 6: Verify all products are deleted by checking count", async () => {
            const productNames = await this.page.locator('//span[text()="Test Product"]').count();
            expect.soft(productNames).toBe(0);
        });
    }
}

module.exports = DeleteProduct;