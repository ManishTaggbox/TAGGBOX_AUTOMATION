const { test, expect } = require('@playwright/test');

class TagProductWithSearch 
{
    constructor(page) 
    {
        this.page = page;
        this.tagBtn = page.locator('#tag_pd_0'); 
        this.searchBox = page.locator('#search_pro_');
        this.dropdownItem = page.locator('//p[text()="Tag1"]');
        this.searchBox = page.locator('#search_pro_'); 
        this.firstProduct = page.locator('#tag_products_0');
        this.toastMsg = page.locator('//div[text()="Product tagged successfully"]');
        this.secondProduct = page.locator('#tag_products_1');
        this.crossIcon = page.locator('.btn-close');
        this.taggedProducts = page.locator('//div[@role="article"]');
        this.addProduct = page.locator('//button[@aria-label="add"]');
        this.removeProduct = page.locator('.fa-xmark');
    }

    async tagProductWithSearch() 
    {
        await test.step("Step 1: Click to 'Tag Product' for first post", async () => 
        {
            await this.tagBtn.waitFor({ state: 'visible', timeout: 5000});
            await this.tagBtn.click();

            console.log("✅ Clicked to 'Tag Product' for first post");
        });

        await test.step("Step 2: Click to search tag", async () => 
        {
            await this.searchBox.last().waitFor({state: 'visible', timeout: 5000});
            await this.searchBox.last().fill('Tag1');

            await this.dropdownItem.waitFor({state: 'visible', timeout: 5000});
            await this.dropdownItem.click();

            console.log("✅ Searched and selected tag from the dropdown");
        });  
        
        await test.step("Step 3: Click to search product", async () => 
        {
            await this.searchBox.first().waitFor({state: 'visible', timeout: 5000});
            await this.searchBox.first().click();

            await this.firstProduct.click();
            console.log("✅ Clicked to search and selected first product from the dropdown");

            await this.searchBox.first().waitFor({state: 'visible', timeout: 5000});
            await this.searchBox.first().click();

            await this.secondProduct.click();
            console.log("✅ Clicked to search and selected second product from the dropdown");
        });

        await test.step("Step 4: Close the modal", async () => 
        {
            await this.crossIcon.last().waitFor({ state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();

            console.log("✅ Clicked to close the modal");
        });

        await test.step("Step 5: Assert tagged products", async () => 
        {
            await expect.soft(this.taggedProducts).toHaveCount(2);

            console.log("✅ Asserted two products are tagged");
        });

        await test.step("Step 6: Assert tag more products icon isdisplayed", async () => 
        {
            await this.addProduct.waitFor({ state: 'visible', timeout: 5000});

            console.log("✅ Asserted tag more products icon is displayed");
        });

        await test.step("Step 7: Click to remove tagged products", async () => 
        {
            for(let i=1; i>=0; i--)
            {
                await this.removeProduct.nth(i).waitFor({state: 'visible', timeout: 5000});
                await this.removeProduct.nth(i).click();  
                console.log(`✅ Tagged product ${i+1} removed`);
                await this.page.waitForTimeout(2000);    
            }

            console.log("✅ Tagged products removed successfully");
        });
    }
}

export default TagProductWithSearch;
