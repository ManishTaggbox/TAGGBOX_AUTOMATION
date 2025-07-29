const { test, expect } = require('@playwright/test');

class DeleteProducts 
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.content_img_ ');  
        this.deleteIcon = page.locator('//button[@aria-label="delete"]');
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.crossIcon = page.locator('.btn-close');
        this.taggedProducts = page.locator('//div[@role="article"]');
        this.tagBtn = page.locator('#tag_pd_0');

    }

    async deleteProducts() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().click();
        });

        await test.step("Step 5: Remove tagged product", async () => 
        {
            await this.deleteIcon.click();
        }); 

        await test.step("Step 4: Assert the toast msg for duplicate product tag", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect(this.toastMsg).toHaveText('Tagged Product Removed from the Posts Successfully');
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.crossIcon.last().click();
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.taggedProducts.waitFor({ state: 'hidden' });
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.tagBtn.waitFor({ state: 'visible' });
        });           
    }
}

module.exports = DeleteProducts;
