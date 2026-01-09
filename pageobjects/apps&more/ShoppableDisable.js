const { test, expect } = require('@playwright/test');

class ShoppableDisable
{
    constructor(page) 
    {
        this.page = page;
        this.appsMoreMenu = page.locator('#apps_more');
        this.disableBtn = page.locator('//button[text()="Disable"]');
        this.confirmDisableBtn = page.locator('//button[text()="Yes"]');
        this.productCatalogMenu = page.locator('#pd_ctlog');
        this.galleryEditBtn = page.locator('(//button[text()="Edit"])[1]');      
        this.threeDotsIcon = page.locator('//div[@class="dropdown"]//button');    
        this.addCTAButton = page.locator('//a[text()="Add CTA"]');     
    }

    async shoppableDisableConditions() 
    {
        await test.step("Step 1: Assert 'Apps & More' is displayed and clicked", async () => 
        {
            await this.appsMoreMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.appsMoreMenu.click();
            
            console.log("✅ 'Apps & More' menu is displayed and clicked");
        });

        await test.step("Step 2: Assert 'Disable' button is displayed and clicked", async () => 
        {
            await this.disableBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.disableBtn.click();
            
            console.log("✅ 'Disable' button is displayed and clicked");
        });

        await test.step("Step 3: Assert 'Confirm Disable' button is displayed and clicked", async () => 
        {
            await this.confirmDisableBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.confirmDisableBtn.click();
            
            console.log("✅ 'Confirm Disable' button is displayed and clicked");
        });

        await test.step("Step 4: Assert 'Product Catalog' menu is not displayed", async () => 
        {
            await this.productCatalogMenu.waitFor({ state: 'hidden', timeout: 5000 });
            await expect(this.productCatalogMenu).toBeHidden();
            
            console.log("✅ 'Product Catalog' menu is not displayed");
        });

        await test.step("Step 5: Go to 'Moderation'", async () => 
        {
            await this.galleryEditBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.galleryEditBtn.click();

            console.log("✅ 'Edit' button is displayed and clicked");
            console.log("✅ 'Moderation' page is opened");
        });

        await test.step("Step 6: Click on three dot icons for first post", async () => 
        {
            await this.threeDotsIcon.nth(0).waitFor({state: 'visible', timeout: 5000});
            await this.threeDotsIcon.nth(0).click();   

            console.log("✅ Clicked on three dot icon of first pinned post");
        });

        await test.step("Step7: Assert 'Add CTA' menu is displayed", async () => 
        {
            await this.addCTAButton.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.addCTAButton).toBeVisible();
            
            console.log("✅ 'Add CTA' menu is displayed");
        });

    }
    
}

export default ShoppableDisable;
