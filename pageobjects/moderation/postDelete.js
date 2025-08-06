const { test, expect } = require('@playwright/test');

class PostDelete
{
    constructor(page) 
    {
        this.page = page;
        this.allPosts = page.locator('//a[text()="All posts"]/span');
        // this.post = page.locator('.content_img_ ');
        this.post = page.locator('.cursor-pointer.position-relative');  
        this.threeDotsOption = page.locator('//i[contains(@class,"fa-regular fa-ellipsis me-1")]');
        this.deleteOption = page.locator('//span[text()="Delete post"]');
        this.continueBtn = page.locator('//button[contains(@class,"swal2-confirm swal2-styled")]');
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.crossIcon = page.locator('.btn-close');
        this.threeDotsIcon = page.locator('//i[contains(@class,"fa-regular fa-ellipsis")]');
        this.deleteIcon = page.locator('//a[text()="Delete post"]');
        this.allCheckbox = page.locator('#select_all_');
        this.deleteBtn = page.locator('//button[contains(@class,"btn-warning")]');    
    }

    async deletePost() 
    {
        let initialAllPosts; 
        let afterAllPosts;

        await test.step("Step 1: Collect the count of all posts", async () => 
        {
            await this.page.waitForTimeout(5000);
            initialAllPosts = Number(await this.allPosts.innerText())
        });

        await test.step("Step 2: Click on first post", async () => 
        {
            await this.post.first().click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 3: Click on three dots", async () => 
        {
            await this.threeDotsOption.click();
        });

        await test.step("Step 4: Click on delete option", async () => 
        {
            await this.deleteOption.click();
        });

        await test.step("Step 5: Click to confirm the action", async () => 
        {
            await this.continueBtn.click();
        });

        await test.step("Step 6: Assert toast mesg to be displayed", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect.soft(this.toastMsg).toHaveText('Your post has been deleted.');  
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 7: Click to confirm the action", async () => 
        {
            await this.crossIcon.last().click();
        });

        await test.step("Step 8: Assert the count of all posts", async () => 
        {
            afterAllPosts = Number(await this.allPosts.innerText());
            expect.soft(afterAllPosts).toBe(initialAllPosts - 1); 
        });

         await test.step("Step 9: Click on three dots icon for first post", async () => 
        {
            await this.threeDotsIcon.first().click();
        });

        await test.step("Step 10: Click on delete option", async () => 
        {
            await this.deleteIcon.click();
        });

        await test.step("Step 11: Click to confirm the action", async () => 
        {
            await this.continueBtn.click();
        });

        await test.step("Step 12: Assert toast mesg to be displayed", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect.soft(this.toastMsg).toHaveText('Your post has been deleted.');  
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 13: Assert the count of all posts", async () => 
        {
            const allPostsCount = Number(await this.allPosts.innerText());
            expect.soft(allPostsCount).toBe(afterAllPosts - 1); 
        });

        await test.step("Step 14: Check the checkbox to select all posts", async () => 
        {
            await this.allCheckbox.click();
        });

        await test.step("Step 15: Click on delete button", async () => 
        {
            await this.deleteBtn.click();
        });

        await test.step("Step 16: Click to confirm the action", async () => 
        {
            await this.continueBtn.click();
        });

        await test.step("Step 17: Assert toast mesg to be displayed", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect.soft(this.toastMsg).toHaveText('Your post has been deleted.');  
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 18: Assert all posts should not be visible", async () => 
        {
            await this.allPosts.waitFor({ state: 'hidden' });
        });
    }
}

export default PostDelete;
