import { test, expect } from '@playwright/test';

class GalleryLimit {
    constructor(page) {
        this.page = page;
    }

    get addGalleryBtn() { return this.page.locator("//button[normalize-space()='Add Gallery']"); }
    get galleryNameInput() { return this.page.locator("#g_name"); }
    get saveGalleryBtn() { return this.page.locator("#con_save_btn"); }
    get upgradeTitle() { return this.page.locator("#swal2-title"); }
    get upgradeBtn() { return this.page.locator("button[class='swal2-confirm swal2-styled']"); }
    
    async verifyGalleryLimit() {

        await test.step("Click to 'Add Gallery' button", async () => {
            await this.addGalleryBtn.waitFor({state: 'visible', timeout: 5000});
            await this.addGalleryBtn.click();
        });

        await test.step("Enter gallery name and save", async () => {
            await this.galleryNameInput.waitFor({state: 'visible', timeout: 5000});
            await this.galleryNameInput.fill('Test Gallery');
        });

        await test.step("Validate 'addUpdate' API response", async () => {

            const responsePromise = this.page.waitForResponse(res =>
                res.url().includes('/api/v1/dashboard/ShoppableGallery/addUpdate') &&
                res.request().method() === 'POST'
            );

            await this.saveGalleryBtn.click();

            const response = await responsePromise;

            expect(response.status()).toBe(201);

            const responseBody = await response.json();

            expect(responseBody).toMatchObject({
                responseStatus: 'error',
                responseMessage: 'Upgrade to create more galleries.!'
            });

            console.log('addUpdate API Response:', responseBody);
        });

        await test.step("Verify upgrade prompt is displayed", async () => {
            await this.upgradeTitle.waitFor({state: 'visible', timeout: 5000});
            await expect(this.upgradeTitle).toBeVisible();
            await expect(this.upgradeTitle).toHaveText('Upgrade to Add More Galleries');
        });

        await test.step("Click to 'Upgrade Now' button", async () => {
            await this.upgradeBtn.waitFor({state: 'visible', timeout: 5000});
            await this.upgradeBtn.click();
        });

        await test.step("Verify navigation to pricing page", async () => {
            await expect(this.page).toHaveURL(/.*\/price/);
            console.log("Current URL after clicking Upgrade Now:", this.page.url());
        });       
    }
}

export default GalleryLimit;