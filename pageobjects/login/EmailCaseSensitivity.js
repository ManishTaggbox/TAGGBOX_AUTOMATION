const { test, expect } = require('@playwright/test');

class EmailCaseSensitivity
{
    constructor(page) 
    {
        this.page = page;
        this.emailField = page.locator('//input[@type="email"]');
        this.passField = page.locator('//input[@type="password"]');
        this.loginBtn = page.locator('.btn-primary');
    }

    async emailCaseSensitive() 
    {
         await test.step("Step 1: Enter valid email address in uppercase", async () => 
        {
            await this.emailField.fill('');
            await this.emailField.fill('MANISH.S+51@TAGGBOX.COM');
        });

        await test.step("Step 2: Enter valid password", async () => 
        {
            await this.passField.fill('');
            await this.passField.fill('Taggbox@123');
        });

        await test.step("Step 3: Click on the Login btn", async () => 
        {
            await this.loginBtn.click();
        });

        await test.step("Step 4: Assert the page url and title of the page post login", async () => 
        {
            await expect.soft(this.page).toHaveURL('https://app.taggbox.com/home');
            console.log('✅ Current URL after login:', await this.page.url());

            await expect.soft(this.page).toHaveTitle('Dashboard | Tagbox');
            console.log('✅ Current page title after login:', await this.page.title());
        });
    }
}

export default EmailCaseSensitivity;
