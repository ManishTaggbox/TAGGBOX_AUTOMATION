const { test, expect } = require('@playwright/test');

class SelectedPostAction 
{
    constructor(page) 
    {
        this.page = page;
        this.checkbox = page.locator('//input[@aria-label="select"]'); 
        this.selectAllLabel = page.locator('.form-check-label');
        this.privateBtn = page.locator('//button[contains(@class,"btn-danger")]'); 
        this.continueBtn = page.locator('//button[contains(@class,"swal2-confirm")]');
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.privateTab = page.locator('//a[text()="Private"]');
        this.privatePostsCount = page.locator('//a[text()="Private"]//span');
        this.cards = page.locator('.cursor-pointer.position-relative');  
        this.privatePosts = page.locator('.btn-private');
        this.selectAllCheckbox = page.locator('#select_all_');
        this.publicBtn = page.locator('//button[contains(@class,"btn-success")]');
    }

    async selectedPostAction() 
    {
        await test.step("Step 1: Click on the first 5 posts checkboxes to select the posts", async () => 
        {
            await this.page.waitForTimeout(5000);

            const count = await this.checkbox.count();
            const limit = Math.min(5, count);

            for (let i = 0; i < limit; i++) 
            {
                await this.checkbox.nth(i).check();
            }
        });

        await test.step("Step 2: Assert the count of selected posts", async () => 
        {
            await this.page.waitForTimeout(2000);
            await expect.soft(this.selectAllLabel).toHaveText('5 Selected');
        });

        await test.step("Step 3: Click on the 'Private' btn", async () => 
        {
            await expect(this.privateBtn).toBeVisible();
            await this.privateBtn.waitFor({state: 'visible', timeout: 5000});
            await this.privateBtn.click();
        });

        await test.step("Step 4: Click for confirmation", async () => 
        {
            await this.continueBtn.waitFor({state: 'visible', timeout: 5000});
            await this.continueBtn.click();
        });

        await test.step("Step 5: Assert the toast msg", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Selected posts are private now.'); 
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 6: Go to 'Private' tab", async () => 
        {
            await this.privateTab.waitFor({state: 'visible', timeout: 5000});
            await this.privateTab.click();
        });

        await test.step("Step 7: Assert the count of private posts", async () => 
        {
            await this.privatePostsCount.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.privatePostsCount).toHaveText('5');
        });

        await test.step("Step 8: Assert the avaliable private posts", async () => 
        {
            await expect.soft(this.privatePosts).toHaveCount(5);
        });

        await test.step("Step 9: Select all Posts and make them public", async () => 
        {
            await this.selectAllCheckbox.waitFor({state: 'visible', timeout: 5000});
            await this.selectAllCheckbox.click();
            await this.publicBtn.waitFor({state: 'visible', timeout: 5000});
            await this.publicBtn.click();
        });

        await test.step("Step 10: Click for confirmation", async () => 
        {
            await this.continueBtn.waitFor({state: 'visible', timeout: 5000});
            await this.continueBtn.click();
        });

        await test.step("Step 11: Assert the toast msg", async () => 
        {
            await this.toastMsg.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.toastMsg).toHaveText('Selected posts are public now.'); 
            await this.page.waitForTimeout(5000);
        });
    }
}

export default SelectedPostAction;
