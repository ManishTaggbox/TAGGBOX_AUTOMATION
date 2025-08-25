const { test, expect } = require('@playwright/test');

class PostHighlight 
{
    constructor(page) 
    {
        this.page = page;
        this.highlightIcon = page.locator('(//i[contains(@class,"fa-solid fa-star ")])[4]'); 
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.highlightedPost = page.locator('.assetsItem');  
        this.highlightCard = page.locator('//div[@class="border-0 card"]');    
    }

    async postHighlight() 
    {
        await test.step("Step 1: Click on highlight icon for posts", async () => 
        {
            await this.highlightIcon.waitFor({state: 'visible', timeout: 5000});
            await this.highlightIcon.click();   
        });

        await test.step("Step 2: Assert the displayed toast message", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Post is highlighted.');
            await this.page.waitForTimeout(5000);    
        });

        await test.step("Step 3: Assert the highlight attribute for the element", async () => 
        {
            await this.highlightedPost.nth(3).waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.highlightedPost.nth(3)).toHaveAttribute('data-highlight', '1');
        });

        await test.step("Step 4: Assert the border color of the highlighted post", async () => 
        {
            const color = await this.highlightCard.nth(3).evaluate(el => getComputedStyle(el).outlineColor);
            expect.soft(color).toBe('rgb(255, 64, 81)');  
        });

        await test.step("Step 6: Assert the style of the highlighted post", async () => 
        {
            const style = await this.highlightCard.nth(3).evaluate(el => getComputedStyle(el).outlineStyle);
            expect.soft(style).toBe('solid');
        });

        await test.step("Step 7: Click to remove the post from highlight", async () => 
        {
            await this.highlightIcon.waitFor({state: 'visible', timeout: 5000});
            await this.highlightIcon.click();   
        });
        
        await test.step("Step 8: Assert the displayed toast message", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Post Removed from highlight.');
        });
    }
}

export default PostHighlight;
