const { test, expect } = require('@playwright/test');

class InvalidCredentials
{
    constructor(page) 
    {
        this.page = page;
        this.emailField = page.locator('//input[@type="email"]');
        this.passField = page.locator('//input[@type="password"]');
        this.loginBtn = page.locator('.btn-primary').first();
        this.validationMsg = page.locator('.invalid-feedback');
    }

    async invalidCredentials() 
    {
        await test.step('Step 1: Wait 5 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(5000);
        });    

        await test.step("Step 2: Enter invalid email address", async () => 
        {
            await this.emailField.waitFor({state: 'visible', timeout: 5000});
            await this.emailField.fill('demo@gmail.com');
        });

        await test.step("Step 3: Enter invalid password", async () => 
        {
            await this.passField.waitFor({state: 'visible', timeout: 5000});
            await this.passField.fill('Test@123');
        });

        await test.step("Step 4: Click on Login btn", async () => 
        {
            await this.loginBtn.waitFor({state: 'visible', timeout: 5000});
            await this.loginBtn.click();
        });

        await test.step("Step 5: Assert the validation msg", async () => 
        {
            await this.validationMsg.waitFor({state: 'visible', timeout: 10000});
            await expect.soft(this.validationMsg).toHaveText('Password does not match !');
            console.log('✅ Validation message for invalid Email and Password is:', this.validationMsg.innerText());
        });
    }
}

export default InvalidCredentials;
