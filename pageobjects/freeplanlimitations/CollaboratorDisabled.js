import { test, expect } from '@playwright/test';

class CollaboratorDisabled {
    constructor(page) {
        this.page = page;
    }

    get profileIcon() { return this.page.locator("#user_profile_"); }
    get myProfileOption() { return this.page.locator("//a[text()='My profile']"); }
    get collaboratorsTab() { return this.page.locator("//button[text()='Collaborator']"); }
    get pricingBtn() { return this.page.locator("//button[text()='Explore Pricing']"); }
   
    async verifyCollaboratorDisabled() {

        await test.step("Click to 'Profile' icon", async () => {
            await this.profileIcon.waitFor({state: 'visible', timeout: 5000});
            await this.profileIcon.click();
        });

        await test.step("Click to 'My Profile' option", async () => {
            await this.myProfileOption.waitFor({state: 'visible', timeout: 5000});
            await this.myProfileOption.click();
        });

        await test.step("Click to 'Collaborators' tab", async () => {
            await this.collaboratorsTab.waitFor({state: 'visible', timeout: 5000});
            await this.collaboratorsTab.click();
        });

        await test.step("Verify 'Explore Pricing' button is displayed", async () => {
            await this.pricingBtn.waitFor({state: 'visible', timeout: 5000});
            await expect(this.pricingBtn).toBeEnabled();
            await this.pricingBtn.click();
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

export default CollaboratorDisabled;