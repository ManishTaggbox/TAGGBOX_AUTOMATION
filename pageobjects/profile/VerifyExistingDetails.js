const { test, expect } = require('@playwright/test');

class VerifyExistingDetails {
    constructor(page) {
        this.page = page;
        this.name = page.locator("//h6[normalize-space()='Shristy Sharma']");
        this.emailAddress = page.locator(".profile_email");
        this.fullName = page.locator(".profile_name").last();
        //this.emailAddress = page.locator(".profile_email").last();
        this.verifyTag = page.locator(".badge-light-success");
    }

    async verifyExistingDetails() {
        await test.step("Step 1: Verify name element is visible", async () => {
            await this.name.waitFor({ state: 'visible', timeout: 10000 });
            await expect.soft(this.name).toBeVisible();
        });

        await test.step("Step 2: Verify name text is 'Shristy Sharma'", async () => {
            await expect.soft(this.name).toHaveText('Shristy Sharma');
        });

        await test.step("Step 3: Verify email element is visible", async () => {
            await this.emailAddress.first().waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.emailAddress.first()).toBeVisible();
        });

        await test.step("Step 4: Verify email text is 'shristy+01@taggbox.com'", async () => {
            await expect.soft(this.emailAddress.first()).toHaveText('shristy+01@taggbox.com');
        });

        await test.step("Step 5: Verify full name element is visible", async () => {
            await this.fullName.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.fullName).toBeVisible();
        });

        await test.step("Step 6: Verify full name text is 'Shristy Sharma'", async () => {
            await expect.soft(this.fullName).toHaveText('Shristy Sharma');
        });

        await test.step("Step 7: Verify email address element is visible", async () => {
            await this.emailAddress.last().waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.emailAddress.last()).toBeVisible();
        });

        await test.step("Step 8: Verify email address text is 'shristy+01@taggbox.com'", async () => {
            await expect.soft(this.emailAddress.last()).toHaveText('shristy+01@taggbox.com');
        });

        await test.step("Step 9: Verify verification tag is visible", async () => {
            await this.verifyTag.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.verifyTag).toBeVisible();
        });

        await test.step("Step 10: Verify verification tag text is 'Verified'", async () => {
            await expect.soft(this.verifyTag).toHaveText('Verified');
        });
    }
}

module.exports = VerifyExistingDetails;