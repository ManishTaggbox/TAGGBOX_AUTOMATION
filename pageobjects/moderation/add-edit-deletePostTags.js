const { test, expect } = require('@playwright/test');

class PostTags 
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.content_img_ ');  
        this.tagsOption = page.locator('//button[text()="Tags"]'); 
        this.tagsInput = page.locator('.selectpicker__input');
        this.createTag = page.locator('//div[contains(text(), "Create")]');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.addedTags = page.locator('//span[contains(text(), "Tag")]');
        this.successMsg = page.locator('.Toastify__toast-body');
        this.crossIcon = page.locator('.btn-close');
        
    }

    async postTags() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
        await this.cards.first().click();
        });

        await test.step("Step 2: Click on Tags option", async () => 
        {
        await this.tagsOption.click();
        });

        await test.step("Step 3: Click to clear if any tags exists", async () => 
        {
        await this.tagsInput.clear();
        });

        await test.step("Step 4: Enter tags and select from dropdown", async () => 
        {
        await this.tagsInput.fill('TagA');
        await this.createTag.click();  

        await this.tagsInput.fill('TagB');
        await this.createTag.click(); 
        });

        await test.step("Step 5: Click to save changes", async () => 
        {
        await this.saveBtn.click();
        });

        await test.step("Step 6: Assert toast msg", async () => 
        {
        await this.successMsg.waitFor({ state: 'visible' });
        await expect(this.successMsg).toHaveText('Tags updated successfully');
        });

        await test.step("Step 7: Close the modal", async () => 
        {
        await this.crossIcon.last().click();
        });

        await test.step("Step 8: Assert added post tags", async () => 
        {
        await this.addedTags.first().waitFor({ state: 'visible' });
        await expect(this.addedTags.first()).toHaveText('TagA');

        await this.addedTags.last().waitFor({ state: 'visible' });
        await expect(this.addedTags.last()).toHaveText('TagB');
        });

        
    }
}

module.exports = PostTags;
