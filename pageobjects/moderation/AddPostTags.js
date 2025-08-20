const { test, expect } = require('@playwright/test');

class AddPostTags 
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.cursor-pointer.position-relative');  
        this.tagsOption = page.locator('//button[text()="Tags"]'); 
        this.tagsInput = page.locator('.selectpicker__input');
        this.createTag = page.locator('//div[contains(text(), "Create")]');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.addedTagA = page.locator('//span[text()="TagA"]');
        this.addedTagB = page.locator('//span[text()="TagB"]');
        this.successMsg = page.locator('.Toastify__toast-body');
        this.detailsTab = page.locator('#modal_aside_-tab-details');
        this.addedTag1 = page.locator('(//span[text()="TagA"])[2]');
        this.addedTag2 = page.locator('(//span[text()="TagB"])[2]');
        this.crossIcon = page.locator('.btn-close');
    }

    async addPostTags() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.cards.first().click();
        });

        await test.step("Step 2: Click on Tags option", async () => 
        {
            await this.tagsOption.waitFor({ state: 'visible', timeout: 5000 });
            await this.tagsOption.click();
        });

        await test.step("Step 3: Click to clear if any tags exists", async () => 
        {
            await this.tagsInput.clear();
        });

        await test.step("Step 4: Enter tags and select from dropdown", async () => 
        {
            await this.tagsInput.fill('TagA');
            await this.createTag.waitFor({ state: 'visible', timeout: 5000 });
            await this.createTag.click();  

            await this.tagsInput.fill('TagB');
            await this.createTag.waitFor({ state: 'visible', timeout: 5000 });
            await this.createTag.click(); 
        });

        await test.step("Step 5: Click to save changes", async () => 
        {
            await this.saveBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.saveBtn.click();
        });

        await test.step("Step 6: Assert toast msg", async () => 
        {
            await this.successMsg.waitFor({ state: 'visible' , timeout: 5000 });
            await expect.soft(this.successMsg).toHaveText('Tags updated successfully');
        });

        await test.step("Step 7: Click on 'Details' tab", async () => 
        {
            await this.detailsTab.waitFor({ state: 'visible', timeout: 5000 });
            await this.detailsTab.click();
        });

        await test.step("Step 8: Assert added post tags in details tab", async () => 
        {
            await this.addedTag1.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.addedTag1).toHaveText('TagA');

            await this.addedTag2.waitFor({ state: 'visible' , timeout: 5000 });
            await expect.soft(this.addedTag2).toHaveText('TagB');
        });

        await test.step("Step 9: Close the modal", async () => 
        {
            await this.crossIcon.last().waitFor({ state: 'visible', timeout: 5000 });
            await this.crossIcon.last().click();
        });

        await test.step("Step 10: Assert added post tags", async () => 
        {
            await expect.soft(this.addedTagA).toHaveText('TagA');
            await expect.soft(this.addedTagB).toHaveText('TagB');
        });
    }
}

export default AddPostTags;
