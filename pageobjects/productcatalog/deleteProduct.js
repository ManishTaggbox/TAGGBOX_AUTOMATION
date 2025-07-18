const { expect } = require('@playwright/test');


class DeleteProduct
 {
    constructor(page) 
    {
        this.page = page;
        this.deleteIcon = page.locator('#action-trash-can');
        this.confirmDeleteBtn = page.locator('//button[text()="Yes, delete it!"]');
        this.toastMsg = page.locator('//div[text()="Successfully Deleted !"]');
        this.productName = page.locator('//span[text()="Test Product"]');
        this.selectAllCheckbox = page.locator('#check_all_pro');
        this.deleteAllBtn = page.locator('#d_selected_btn');
        
    }

    async deleteProduct() 
    {
        // Delete single product 
        await this.deleteIcon.first().click();
        await this.confirmDeleteBtn.click();
        await expect(this.toastMsg).toBeVisible();
        await expect(this.toastMsg).toHaveText('Successfully Deleted !');

        // Verify product is deleted
        await expect(this.productName).not.toBeVisible();
    }

    async deleteMultipleProducts() 
    {
        // Select multiple products
        await this.selectAllCheckbox.click();
        await this.deleteAllBtn.click();
        await this.confirmDeleteBtn.click();
        await expect(this.toastMsg).toBeVisible();
        await expect(this.toastMsg).toHaveText('Successfully Deleted !');

        // Verify products are deleted
        const productNames = await this.page.locator('//span[text()="Test Product"]').count();
        expect(productNames).toBe(0);
    }

}

module.exports = DeleteProduct;