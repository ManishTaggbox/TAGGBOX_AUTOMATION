const { test, expect } = require('@playwright/test');

class DeleteTaggedProduct
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.cursor-pointer.position-relative');  
        this.deleteIcon = page.locator('//button[@aria-label="delete"]');
        this.toastMsg = page.locator('//div[text()="Tagged Product Removed from the Posts Successfully"]');
        this.crossIcon = page.locator('.btn-close');
        this.taggedProducts = page.locator('//div[@role="article"]');
        this.tagBtn = page.locator('#tag_pd_0');
    }

    async deleteTaggedProduct() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().waitFor({state: 'visible', timeout: 5000});
            await this.cards.first().click();
        });

        await test.step("Step 5: Remove tagged product", async () => 
        {
            await this.deleteIcon.waitFor({state: 'visible', timeout: 5000});
            await this.deleteIcon.click();
        }); 

        await test.step("Step 4: Assert the toast msg for duplicate product tag", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.toastMsg).toHaveText('Tagged Product Removed from the Posts Successfully');
            await this.page.waitForTimeout(5000); 
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.crossIcon.last().waitFor({state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.taggedProducts.waitFor({state: 'hidden', timeout: 5000});
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.tagBtn.waitFor({state: 'visible', timeout: 5000});
        });           
    }
}

export default DeleteTaggedProduct;

