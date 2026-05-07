import { test, expect } from '@playwright/test';

class AutoPilotDisabled {
    constructor(page) {
        this.page = page;
    }

    get addGalleryBtn() { return this.page.locator("//button[normalize-space()='Add Gallery']"); }
    get editGalleryBtn() { return this.page.locator("//button[@type='button'][normalize-space()='Edit']").first(); }
    get autoPilotOption() { return this.page.locator("#autopilot"); }  
    get upgradeNowBtn() { return this.page.locator("//button[text()='Upgrade Now']"); } 
    
    async verifyAutoPilotDisabled() {

        await test.step("Click to 'Edit Gallery' button", async () => {
            await this.editGalleryBtn.waitFor({state: 'visible', timeout: 5000});
            await this.editGalleryBtn.click();
        });

        await test.step("Click to 'Auto Pilot' option", async () => {
            await this.autoPilotOption.waitFor({state: 'visible', timeout: 5000});
            await this.autoPilotOption.click();
        });
        
        await test.step("Verify 'Upgrade Now' is displayed", async () => {
            await this.upgradeNowBtn.waitFor({state: 'visible', timeout: 5000});
            await expect(this.upgradeNowBtn).toHaveText('Upgrade Now');
        });

        await test.step("Click to 'Upgrade Now' button", async () => {
            await this.upgradeNowBtn.waitFor({state: 'visible', timeout: 5000});
            await expect(this.upgradeNowBtn).toBeEnabled();
            await this.upgradeNowBtn.click();
        });

        await test.step("Verify onClick 'Upgrade Now' navigation to pricing page", async () => {
            await expect(this.page).toHaveURL(/.*\/price/);
            console.log("Current URL after clicking Upgrade Now:", this.page.url());
        });           

        await test.step("Validate 'productPlanDetails' API response", async () => {

            const responsePromise = this.page.waitForResponse(res =>
                res.url().includes('/api/v1/user/productPlanDetail') &&
                res.request().method() === 'GET'
            );
            const response = await responsePromise;

            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody).toMatchObject({
                status: 'success',
                activePlan: 'Free',
            });

            console.log('productPlanDetails API Response:', responseBody);
        });         
    }
}

export default AutoPilotDisabled;