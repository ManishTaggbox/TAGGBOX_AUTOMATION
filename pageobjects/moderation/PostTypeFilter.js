const { test, expect } = require('@playwright/test');

class PostTypeFilter 
{
    constructor(page) 
    {
        this.page = page;
        this.filterIcon = page.locator('#filter_aside');
        this.textCheckbox = page.locator('#text_only');
        this.crossIcon = page.locator('.fa-xmark');
        this.filterBadge = page.locator('//div[contains(@class, "d-flex flex-wrap align-items-center")]//span');
        this.addFeedBtn = page.locator('//button[text()="Add Another Feed"]');
        this.resetBtn = page.locator('//button[text()="Reset"]');
        this.imageCheckbox = page.locator('#image_only');  
        this.totalPosts = page.locator('//button[text()="Public"]');  
        this.videoCheckbox = page.locator('#video_only');    
    }

    async postTypeFilter() 
    {
        await test.step("Step 1: Click to open filter overlay", async () => 
        {
            await this.filterIcon.waitFor({state: 'visible', timeout: 5000});
            await this.filterIcon.click();
        });

        await test.step("Step 2: Click to check 'Text Only' checkbox", async () => 
        {
            await this.textCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.textCheckbox.click();
        });

        await test.step("Step 3: Close the filter overlay", async () => 
        {
            await this.crossIcon.last().waitFor({state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 4: Assert the displayed filter badge & its text", async () => 
        {
            await this.filterBadge.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.filterBadge).toHaveText('Text Only');
        });

        await test.step("Step 5: Assert 'Add Another Feed' button", async () => 
        {
            await this.addFeedBtn.waitFor({state: 'visible', timeout: 5000});
        });

        await test.step("Step 6: Reset the filter", async () => 
        {
            await this.resetBtn.waitFor({state: 'visible', timeout: 5000});
            await this.resetBtn.click();
        });

        await test.step("Step 7: Click to open filter overlay", async () => 
        {
            await this.filterIcon.waitFor({state: 'visible', timeout: 5000});
            await this.filterIcon.click();
        });

        await test.step("Step 8: Click to check 'With Image' checkbox", async () => 
        {
            await this.imageCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.imageCheckbox.click();
        });

        await test.step("Step 9: Close the filter overlay", async () => 
        {
            await this.crossIcon.last().waitFor({state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 10: Assert the displayed filter badge & its text", async () => 
        {
            await this.filterBadge.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.filterBadge).toHaveText('With Image');
        });

        await test.step("Step 11: Assert the displayed filtered data", async () => 
        {
            const totalPosts = this.totalPosts;

            const count = await totalPosts.count();
            expect.soft(count).toBeGreaterThan(0);
        });

        await test.step("Step 12: Reset the filter", async () => 
        {
            await this.resetBtn.waitFor({state: 'visible', timeout: 5000});
            await this.resetBtn.click();
        });

        await test.step("Step 13: Click to open filter overlay", async () => 
        {
            await this.filterIcon.waitFor({state: 'visible', timeout: 5000});
            await this.filterIcon.click();
        });

        await test.step("Step 14: Click to check 'With Video' checkbox", async () => 
        {
            await this.videoCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.videoCheckbox.click();
        });

        await test.step("Step 15: Close the filter overlay", async () => 
        {
            await this.crossIcon.last().waitFor({state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 16: Assert the displayed filter badge & its text", async () => 
        {
            await this.filterBadge.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.filterBadge).toHaveText('With Video');
        });

        await test.step("Step 17: Assert the displayed filtered data", async () => 
        {
            const totalPosts = this.totalPosts;
            const count = await totalPosts.count();
            expect.soft(count).toBeGreaterThan(0);
        });

        await test.step("Step 12: Reset the filter", async () => 
        {
            await this.resetBtn.waitFor({state: 'visible', timeout: 5000});
            await this.resetBtn.click();
        });
    }
}

export default PostTypeFilter;
