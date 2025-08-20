const { test, expect } = require('@playwright/test');

class EditPostTags 
{
    constructor(page) 
    {
        this.page = page; 
        this.cards = page.locator('.cursor-pointer.position-relative');  
        this.tagsOption = page.locator('//button[text()="Tags"]'); 
        this.tagsInput = page.locator('.selectpicker__input');
        this.createTag = page.locator('//div[contains(text(), "Create")]');
        this.toastMsg = page.locator('.Toastify__toast-body');
        this.deleteTag = page.locator('//span/button');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.detailsTab = page.locator('#modal_aside_-tab-details');
        this.tag1 = page.locator('(//span[text()="Tag1"])[2]');
        this.crossIcon = page.locator('.btn-close');
        this.addedTags = page.locator('//span[text()="Tag1"]');
    }

    async editPostTags() 
    {
        await test.step("Step 1: Click on first post", async () => 
        {
            await this.cards.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.cards.first().click();
        });

        await test.step("Step 2: Click on Tags option", async () => 
        {
            await this.tagsOption.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.tagsOption.click();
        });

        await test.step("Step 3: Validate by entering duplicate tag", async () => 
        {
            await this.tagsInput.fill('TagA');
            await this.createTag.waitFor({ state: 'visible', timeout: 5000 });
            await this.createTag.click();   
        });

        await test.step("Step 4: Assert error toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible' , timeout: 10000 });
            await expect.soft(this.toastMsg).toHaveText('Tag already exists');
            await this.page.waitForTimeout(5000); // Wait for toast msg to remove
        });

        await test.step("Step 5: Click to remove existing tags", async () => 
        {
            await this.deleteTag.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.deleteTag.first().click();
            // await this.deleteTag.last().waitFor({ state: 'visible', timeout: 5000 });
            // await this.deleteTag.last().click();
        });

        await test.step("Step 6: Enter new tag and select from dropdown", async () => 
        {
            await this.tagsInput.fill('Tag1');
            await this.createTag.waitFor({ state: 'visible', timeout: 5000 });
            await this.createTag.click();   
        });

        await test.step("Step 7: Click to save changes", async () => 
        {
            await this.saveBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.saveBtn.click();
        });

        await test.step("Step 8: Assert toast msg", async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.toastMsg).toHaveText('Tags updated successfully');
        });

        await test.step("Step 9: Click on 'Details' tab", async () => 
        {
            await this.detailsTab.waitFor({ state: 'visible', timeout: 5000 });
            await this.detailsTab.click();
        });

        await test.step("Step 10: Assert added post tags in details tab", async () => 
        {
            await this.tag1.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.tag1).toHaveText('Tag1');
        });

        await test.step("Step 11: Close the modal", async () => 
        {
            await this.crossIcon.last().waitFor({ state: 'visible', timeout: 5000 });
            await this.crossIcon.last().click();
        });

        await test.step("Step 12: Assert added post tags", async () => 
        {
            await this.page.waitForTimeout(5000); // Wait for page to load 
            await this.addedTags.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.addedTags).toHaveText('Tag1');
        });
    }
}

export default EditPostTags;
