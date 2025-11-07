const { test, expect } = require('@playwright/test');

class AddNewGallery {
    constructor(page) {
        this.page = page;
        this.addNewGalleryBtn = page.locator("button[aria-label='Add Channel']");
        this.save = page.locator('#con_save_btn');
        this.invalidError = page.locator('.invalid-feedback');
        this.galleryName = page.locator('#g_name');
        this.successMsg = page.locator("//div[contains(text(),'Your Gallery Created Successfully.!')]");
        this.contentgallery = page.locator("//span[contains(text(),'Content Gallery')]");
        this.options = page.locator("//button[@class='arrow_disabled dropdown-toggle border-0 d-inline-flex py-1 px-3 dropdown-toggle btn btn-secondary']").first();
        this.rename = page.locator("//a[normalize-space()='Rename']");
        this.update = page.locator('#con_update_btn');
        this.updateMsg = page.locator("//div[contains(text(),'Your Gallery Updated Successfully.!')]");
        this.deleteGallery = page.locator("//a[normalize-space()='Delete']");
        this.yesDeleteGallery = page.locator("//button[@aria-label='delete_yes']");
        this.deletedMsg = page.locator("//div[contains(text(),'Your Gallery Deleted Successfully.!')]");
    }

    async clearAndFillGalleryName(name) {
        await this.galleryName.waitFor({ state: 'visible' });
        await this.galleryName.fill('');
        await this.galleryName.fill(name);
    }

    async addNewGallery() {
        await test.step("Step 1: Click Add New Gallery", async () => {
             await this.addNewGalleryBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.addNewGalleryBtn.click();
        });

        await test.step("Step 2: Click Save without name", async () => {
            await this.save.waitFor({ state: 'visible' });
            await this.save.click();
        });

        await test.step("Step 3: Validate required field error", async () => {
            await expect(this.invalidError).toHaveText('Gallery name is required', { timeout: 5000 });
        });

        await test.step("Step 4: Try with duplicate name", async () => {
            await this.clearAndFillGalleryName('Manish Somani');
            await this.save.click();
            await expect(this.invalidError).toHaveText('Gallery name already exists.', { timeout: 5000 });
        });

        await test.step("Step 5: Try with unique name", async () => {
            await this.clearAndFillGalleryName('Manish');
            await this.save.click();
            await expect(this.successMsg).toBeVisible({ timeout: 7000 });
        });

        await test.step("Step 6: Validate page title", async () => {
            await expect(this.page).toHaveTitle('Add feed | Taggbox', { timeout: 5000 });
        });

        await test.step("Step 7: Navigate to Content Gallery", async () => {
            await this.contentgallery.waitFor({ state: 'visible' });
            await this.contentgallery.click();
        });

        await test.step("Step 8: Rename gallery", async () => {
            await this.options.click();
            await this.rename.waitFor({ state: 'visible' });
            await this.rename.click();
            await this.clearAndFillGalleryName('Manish Taggbox');
            await this.update.click();
            await expect(this.updateMsg).toBeVisible({ timeout: 7000 });
        });

        await test.step("Step 9: Delete gallery", async () => {
            await this.options.click();
            await this.deleteGallery.waitFor({ state: 'visible' });
            await this.deleteGallery.click();
            await this.yesDeleteGallery.waitFor({ state: 'visible' });
            await this.yesDeleteGallery.click();
            await expect(this.deletedMsg).toBeVisible({ timeout: 7000 });
        });
    }
}

module.exports = AddNewGallery;
