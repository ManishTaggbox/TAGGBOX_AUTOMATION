const { test, expect } = require('@playwright/test');

class DeletePostTags 
{
    constructor(page) 
    {
        this.page = page;
        this.cards = page.locator('.content_img_ ');  
        this.tagsOption = page.locator('//button[text()="Tags"]'); 
        this.deleteTag = page.locator('//span/button');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.crossIcon = page.locator('.btn-close');
        this.addedTags = page.locator('//span[contains(text(), "Tag")]');   
        this.detailsTab = page.locator('#modal_aside_-tab-details');
        this.tag1 = page.locator('(//span[text()="Tag1"])[2]'); 
    }

    async deleteTags() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().click();
        });

        await test.step("Step 2: Click on Tags option", async () => 
        {
            await this.tagsOption.click();
        });

        await test.step("Step 3: Delete existing tags", async () => 
        {
            await this.deleteTag.click();
        });

        await test.step("Step 4: Click to save changes", async () => 
        {
            await this.saveBtn.click();
        });

        await test.step("Step 5: Assert toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' });
            await expect(this.toastMsg).toHaveText('Tags updated successfully');
        });

        await test.step("Step 6: Click on 'Details' tab", async () => 
        {
            await this.detailsTab.click();
        });

        await test.step("Step 7: Assert deleted post tags in details tab", async () => 
        {
            await this.tag1.waitFor({ state: 'hidden' });
        });

        await test.step("Step 8: Close the modal", async () => 
        {
            await this.crossIcon.last().click();
        });

        await test.step("Step 9: Assert deleted post tags", async () => 
        {
            await this.page.waitForTimeout(5000); // Wait for page to load 
            await this.addedTags.waitFor({ state: 'hidden' });
        });
    }
}

module.exports = DeletePostTags;
