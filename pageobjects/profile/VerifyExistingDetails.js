const { test, expect } = require('@playwright/test');

class VerifyExistingDetails {
    constructor(page) {
        this.page = page;
        this.name = page.locator("//h6[normalize-space()='Manish Somani']");
        this.email = page.locator("//p[@class='d-flex align-items-center text-decoration-none text-hover-primary mb-2 fw-medium']");
        this.fullName = page.locator("//span[normalize-space()='Manish Somani']");
        this.emailAddress = page.locator("//span[contains(@class,'fw-bold fs-8 me-2')]");
        this.verifyTag = page.locator("//span[@class='badge badge-light-success']");
    }

    async verifyExistingDetails() {
        await test.step("Step 1: Verify name element is visible", async () => {
            await this.name.waitFor({ state: 'visible', timeout: 10000 });
            await expect.soft(this.name).toBeVisible();
        });

        await test.step("Step 2: Verify name text is 'Manish Somani'", async () => {
            await expect.soft(this.name).toHaveText('Manish Somani');
        });

        await test.step("Step 3: Verify email element is visible", async () => {
            await this.email.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.email).toBeVisible();
        });

        await test.step("Step 4: Verify email text is 'manish.s+51@taggbox.com'", async () => {
            await expect.soft(this.email).toHaveText('manish.s+51@taggbox.com');
        });

        await test.step("Step 5: Verify full name element is visible", async () => {
            await this.fullName.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.fullName).toBeVisible();
        });

        await test.step("Step 6: Verify full name text is 'Manish Somani'", async () => {
            await expect.soft(this.fullName).toHaveText('Manish Somani');
        });

        await test.step("Step 7: Verify email address element is visible", async () => {
            await this.emailAddress.waitFor({state: 'visible', timeout: 5000});
            await expect.soft(this.emailAddress).toBeVisible();
        });

        await test.step("Step 8: Verify email address text is 'manish.s+51@taggbox.com'", async () => {
            await expect.soft(this.emailAddress).toHaveText('manish.s+51@taggbox.com');
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