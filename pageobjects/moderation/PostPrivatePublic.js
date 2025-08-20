const { test, expect } = require('@playwright/test');

class PostPrivatePublic
{
    constructor(page) 
    {
        this.page = page;
        this.privateBtn = page.locator('//button[text()="Private"]'); 
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.privatePostsCount = page.locator('//a[text()="Private"]//span');
        this.privateTab = page.locator('//a[text()="Private"]');
        this.allPostsTab = page.locator('//a[text()="All posts"]');
        this.allCheckbox = page.locator('#select_all_');
        this.privateAllBtn = page.locator('//button[contains(@class,"btn-danger")]');
        this.continueBtn = page.locator('//button[contains(@class,"swal2-confirm")]');
        this.publicAllBtn = page.locator('//button[contains(@class,"btn-success")]');  
        this.publicPostsCount = page.locator('//a[text()="Public"]//span');
        this.publicTab = page.locator('//a[text()="Public"]');
        this.publicBtn = page.locator('//button[text()="Public"]');
    }

    async postPrivatePublic() 
    {
        await test.step("Step 1: Click on Private button for single posts", async () => 
        {
            await this.privateBtn.first().waitFor({state: 'visible', timeout: 5000});
            await this.privateBtn.first().click();   
        });

        await test.step("Step 2: Assert toast mesg to be displayed", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Post is Private now');  
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 3: Assert private post count", async () => 
        {
            await expect.soft(this.privatePostsCount).toHaveText('1'); 
        });

        await test.step("Step 4: Assert private post botton", async () => 
        {
            const bgColor = await this.privateBtn.first().evaluate(el => getComputedStyle(el).backgroundColor);
            expect.soft(bgColor).toBe('rgb(229, 28, 0)'); 
        });

        await test.step("Step 5: Go to private section", async () => 
        {
            await this.privateTab.waitFor({state: 'visible', timeout: 5000});
            await this.privateTab.click();
        });

        await test.step("Step 6: Assert the total private posts", async () => 
        {
            await this.privateBtn.last().waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.privateBtn.last()).toHaveCount(1);
        });

        await test.step("Step 7: Go to all posts tab", async () => 
        {
            await this.allPostsTab.waitFor({state: 'visible', timeout: 5000});
            await this.allPostsTab.click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 8: Click to select all posts", async () => 
        {
            await this.allCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.allCheckbox.click();
        });

        await test.step("Step 9: Click on Private button", async () => 
        {
            await this.privateAllBtn.waitFor({state: 'visible', timeout: 5000});
            await this.privateAllBtn.click();
        });

        await test.step("Step 10: Click for confirmation", async () => 
        {
            await this.continueBtn.waitFor({state: 'visible', timeout: 5000});
            await this.continueBtn.click();
        });

        await test.step("Step 11: Assert the toast msg", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Selected posts are private now.'); 
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 12: Assert private post count", async () => 
        {
             const privatePostCount = await this.privatePostsCount.innerText();
             expect.soft(Number(privatePostCount)).not.toBe(0);
        });

        await test.step("Step 13: Go to private section", async () => 
        {
            await this.privateTab.waitFor({state: 'visible', timeout: 5000});
            await this.privateTab.click();
        });

        await test.step("Step 14: Assert the total private posts", async () => 
        {
            const count = await this.privateBtn.count();
            expect.soft(count).toBeGreaterThan(0);
        });

        await test.step("Step 15: Click to select all posts", async () => 
        {
            await this.allCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.allCheckbox.click();
        });

         await test.step("Step 16: Click on Public button", async () => 
        {
            await this.publicAllBtn.waitFor({state: 'visible', timeout: 5000});
            await this.publicAllBtn.click();
        });

        await test.step("Step 17: Click for confirmation", async () => 
        {
            await this.continueBtn.waitFor({state: 'visible', timeout: 5000});
            await this.continueBtn.click();
        });

        await test.step("Step 18: Assert toast msg", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Selected posts are public now.'); 
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 19: Assert public post count", async () => 
        {
            const publicPostCount = await this.publicPostsCount.innerText();
            expect.soft(Number(publicPostCount)).not.toBe(0);
        });

        await test.step("Step 20: Go to public section", async () => 
        {
            await this.publicTab.waitFor({state: 'visible', timeout: 5000});
            await this.publicTab.click();
        });

        await test.step("Step 21: Assert the total public posts", async () => 
        {
            const count = await this.publicBtn.count();
            expect.soft(count).toBeGreaterThan(0);
        });
    }
}

export default PostPrivatePublic;
