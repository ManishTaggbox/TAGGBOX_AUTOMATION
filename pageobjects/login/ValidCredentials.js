const { test, expect } = require('@playwright/test');

class ValidCredentials
{
    constructor(page) 
    {
        this.page = page;
        this.emailField = page.locator('//input[@type="email"]');
        this.passField = page.locator('//input[@type="password"]');
        this.loginBtn = page.locator('.btn-primary').first();
    }

    async validCredentials() 
    {
        await test.step('Step 1: Wait 5 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(5000);
        }); 

        await test.step("Step 2: Enter valid email address", async () => 
        {
            await this.emailField.fill('');
            await this.emailField.fill('manish.s+51@taggbox.com');
        });

        await test.step("Step 3: Enter valid password", async () => 
        {
            await this.passField.fill('');
            await this.passField.fill('Taggbox@123');
        });

        await test.step("Step 4: Click on the Login btn", async () => 
        {
            await this.loginBtn.waitFor({state: 'visible', timeout: 5000});
            await this.loginBtn.click();
        });

        await test.step("Step 5: Assert the page url and title of the page post login", async () => 
        {
            await expect.soft(this.page).toHaveURL('https://app.taggbox.com/home');
            console.log('✅ Current URL after login:', await this.page.url());

            await expect.soft(this.page).toHaveTitle('Dashboard | Taggbox');
            console.log('✅ Current page title after login:', await this.page.title());
        });
    }
}

export default ValidCredentials;
