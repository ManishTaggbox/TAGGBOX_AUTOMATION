const { test, expect } = require('@playwright/test');

class EditProducts 
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.content_img_ ');  
        this.deleteIcon = page.locator('//button[@aria-label="delete"]');
        this.searchBox = page.locator('#search_pro_'); 
        this.firstProduct = page.locator('#tag_products_0');
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.crossIcon = page.locator('.btn-close');
        this.taggedProducts = page.locator('//div[@role="article"]');
        this.firstProduct = page.locator('#tag_products_0');    
    }

    async editProducts() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().click();
        });

        await test.step("Step 2: Click to search product", async () => 
        {
            await this.searchBox.first().click();
        });

        await test.step("Step 3: Select duplicate product from the dropdown list", async () => 
        {
            await this.firstProduct.click();
        });

        await test.step("Step 4: Assert the toast msg for duplicate product tag", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect(this.toastMsg).toHaveText('This product already tagged on this post');
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 5: Remove tagged product", async () => 
        {
            await this.deleteIcon.first().click();
            await this.page.waitForTimeout(5000); 

            await this.deleteIcon.first().click();
            await this.page.waitForTimeout(5000); 

            await this.deleteIcon.click();
        });      

        await test.step("Step 6: Click to search product", async () => 
        {
            await this.searchBox.first().click();
        });

        await test.step("Step 7: Select first product from the dropdown list", async () => 
        {
            await this.firstProduct.click();
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.crossIcon.last().click();
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 9: Assert tagged products", async () => 
        {
            await expect(this.taggedProducts).toHaveCount(1);
        });
    }
}

module.exports = EditProducts;
