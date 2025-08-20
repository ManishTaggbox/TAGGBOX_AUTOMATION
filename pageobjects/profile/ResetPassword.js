const { test, expect } = require('@playwright/test');


class ResetPassword {
    constructor(page) {
        this.page = page;
        this.resetBtn = page.locator('//button[text()="Reset Password"]');
        this.updateBtn = page.locator('//button[text()="Update Password"]');
        this.validationMsg = page.locator('//div[contains(text(), "Password must be at least")]');
        this.password = page.locator('//input[@name="password"]');
        this.passwordStrength = page.locator('//span[text()="Strong"]');
        this.confirmPassword = page.locator('//input[@name="cpassword"]');
        this.validation = page.locator('//div[text()="Password does not match."]');
        this.successMsg = page.locator('//div[text()="Password Updated Successfully"]');
    }

    async resetPassword() {
        await test.step("Step 1: Click on Reset Password button", async () => {
            await this.resetBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.resetBtn.click();
        });

        await test.step("Step 2: Click on Update Password button without filling fields", async () => {
            await this.updateBtn.waitFor({state: 'visible', timeout: 5000});
            await this.updateBtn.click();
        });

        await test.step("Step 3: Verify password validation message is visible", async () => {
            await expect.soft(this.validationMsg).toBeVisible();
        });

        await test.step("Step 4: Fill password field with 'Taggbox@123'", async () => {
            await this.password.fill('Taggbox@123');
        });

        await test.step("Step 5: Verify password strength indicator shows 'Strong'", async () => {
            await expect.soft(this.passwordStrength).toBeVisible();
        });

        await test.step("Step 6: Fill confirm password field with 'Test@Taggbox'", async () => {
            await this.confirmPassword.fill('Test@Taggbox');
        });

        await test.step("Step 7: Verify password mismatch validation message is visible", async () => {
            await expect.soft(this.validation).toBeVisible();
        });

        await test.step("Step 8: Clear confirm password field", async () => {
            await this.confirmPassword.clear();
        });

        await test.step("Step 9: Fill confirm password field with matching password 'Taggbox@123'", async () => {
            await this.confirmPassword.fill('Taggbox@123');
        });

        await test.step("Step 10: Click on Update Password button to submit", async () => {
            await this.updateBtn.waitFor({state: 'visible', timeout: 5000});
            await this.updateBtn.click();
        });

        await test.step("Step 11: Verify success message is visible", async () => {
            await expect.soft(this.successMsg).toBeVisible();
        });

        await test.step("Step 12: Verify success message text is 'Password Updated Successfully'", async () => {
            await expect.soft(this.successMsg).toHaveText('Password Updated Successfully');
        });
    }
}

module.exports = ResetPassword;