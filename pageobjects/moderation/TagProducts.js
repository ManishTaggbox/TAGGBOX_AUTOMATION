const { test, expect } = require('@playwright/test');

class TagProducts 
{
    constructor(page) 
    {
        this.page = page;
        this.tagBtn = page.locator('#tag_pd_0'); 
        this.searchBox = page.locator('#search_pro_'); 
        this.firstProduct = page.locator('#tag_products_0');
        this.secondProduct = page.locator('#tag_products_1');
        this.thirdProduct = page.locator('#tag_products_2');
        this.toastMsg = page.locator('//div[text()="Product tagged successfully"]');
        this.crossIcon = page.locator('.btn-close');
        this.taggedProducts = page.locator('//div[@role="article"]');
        this.addProduct = page.locator('//button[@aria-label="add"]');
    }

    async tagProducts() 
    {
        await test.step("Step 1: Click to 'Tag Product' for first post", async () => 
        {
            await this.tagBtn.waitFor({ state: 'visible', timeout: 5000});
            await this.tagBtn.click();
        });

        await test.step("Step 2: Click to search product", async () => 
        {
            await this.searchBox.first().waitFor({state: 'visible', timeout: 5000});
            await this.searchBox.first().click();
        });

        await test.step("Step 3: Select first product from the dropdown list", async () => 
        {
            await this.firstProduct.click();
        });

        await test.step("Step 4: Assert toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible',  timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Product tagged successfully');
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 5: Click again to search product", async () => 
        {
            await this.searchBox.first().waitFor({ state: 'visible', timeout: 5000});
            await this.searchBox.first().click();
        });

        await test.step("Step 6: Select second product from the dropdown list", async () => 
        {
            await this.secondProduct.waitFor({ state: 'visible', timeout: 5000});
            await this.secondProduct.click();
        });

        await test.step("Step 7: Assert toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Product tagged successfully');
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 8: Click again to search product", async () => 
        {
            await this.searchBox.first().waitFor({ state: 'visible', timeout: 5000});
            await this.searchBox.first().click();
        });

        await test.step("Step 9: Select third product from the dropdown list", async () => 
        {
            await this.thirdProduct.waitFor({ state: 'visible', timeout: 5000});
            await this.thirdProduct.click();
        });

        await test.step("Step 10: Assert toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Product tagged successfully');
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 11: Close the modal", async () => 
        {
            await this.crossIcon.last().waitFor({ state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();
        });

        await test.step("Step 12: Assert tagged products", async () => 
        {
            await expect.soft(this.taggedProducts).toHaveCount(3);
        });

        await test.step("Step 13: Assert tag more products icon isdisplayed", async () => 
        {
            await this.addProduct.waitFor({ state: 'visible', timeout: 5000});
        });
    }
}

export default TagProducts;
