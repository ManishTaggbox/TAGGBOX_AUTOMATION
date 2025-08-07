const { test, expect } = require('@playwright/test');

class PostPinToTop 
{
    constructor(page) 
    {
        this.page = page;
        this.pinIcon = page.locator('(//i[contains(@class,"fa-thumbtack")])[4]'); 
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.filterIcon = page.locator('#filter_aside');
        this.pinFilter = page.locator('#pinFilter');
        this.crossIcon = page.locator('//i[@class="fa-regular fa-xmark "]');
        this.postCard = page.locator('.content_img_ ');  
        this.pinPostBadge = page.locator('//span[text()="Pin Post"]');
        this.resetBtn = page.locator('//button[text()="Reset"]');
        this.unpinIcon = page.locator('(//i[contains(@class,"fa-thumbtack")])[1]');
    }

    async pinPost() 
    {
        await test.step("Step 1: Click on PinToTop icon for posts", async () => 
        {
            await this.pinIcon.click();   
        });

        await test.step("Step 2: Assert the displayed toast message", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect.soft(this.toastMsg).toHaveText('Post is pinned to top');
            await this.page.waitForTimeout(2000);    
        });

        await test.step("Step 3: Click on filter icon", async () => 
        {
            await this.filterIcon.click();   
        });

        await test.step("Step 4: Check 'Pinned To Top' filter", async () => 
        {
            await this.pinFilter.click();   
        });

        await test.step("Step 5: Close the filter overlay", async () => 
        {
            await this.crossIcon.click();   
        });

        await test.step("Step 6: Assert that only pinned posts are displayed", async () =>
        {
            await this.postCard.waitFor({ state: 'visible' });
            await expect.soft(this.postCard).toHaveCount(1); // Assuming only one post is pinned
        });
        
        await test.step("Step 7: Assert the pin post badge", async () => 
        {
            await this.pinPostBadge.waitFor({ state: 'visible' });
            await expect.soft(this.pinPostBadge).toHaveText('Pin Post');
        });

        await test.step("Step 8: Assert the Reset button is displayed", async () => 
        {
            await this.resetBtn.waitFor({ state: 'visible' });
        });

        await test.step("Step 9: Click on the Reset button", async () => 
        {
            await this.resetBtn.click();
        });

        await test.step("Step 10: Click to unpin the post", async () => 
        {
            await this.unpinIcon.click();
            await this.page.waitForTimeout(2000);    
        });

        await test.step("Step 11: Assert the unpin toast message", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect.soft(this.toastMsg).toHaveText('Post Removed from top');   
        });
    }
}

export default PostPinToTop;
