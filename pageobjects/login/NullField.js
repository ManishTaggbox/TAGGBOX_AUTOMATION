const { test, expect } = require('@playwright/test');

class NullField
{
    constructor(page) 
    {
        this.page = page;
        this.loginBtn = page.locator('.btn-primary');
        this.validationMsg = page.locator('.invalid-feedback');
        this.emailField = page.locator('//input[@type="email"]');
        this.passField = page.locator('//input[@type="password"]');
    }

    async nullField() 
    {
        await test.step("Step 1: Click on Login btn with null fields", async () => 
        {
            await this.emailField.waitFor({state: 'visible', timeout: 5000});
            await this.emailField.fill('');

            await this.passField.waitFor({state: 'visible', timeout: 5000});
            await this.passField.fill('');

            await this.loginBtn.waitFor({state: 'visible', timeout: 5000});
            await this.loginBtn.click();
        });

        await test.step("Step 2: Assert the validation msg for Email field", async () => 
        {
            await this.validationMsg.first().waitFor({state: 'visible', timeout: 15000});
            await expect.soft(this.validationMsg.first()).toHaveText('Email is required.');
            console.log('✅ Validation message for Email field is:', this.validationMsg.first().innerText());
        });

        await test.step("Step 3: Assert the validation msg for Password field", async () => 
        {
            await this.validationMsg.last().waitFor({state: 'visible', timeout: 15000});
            await expect.soft(this.validationMsg.last()).toHaveText('Password is required.');
            console.log('✅ Validation message for Password field is:', this.validationMsg.last().innerText());
        });

        // Enter Email only 
        await test.step("Step 4: Enter Email only and click Login btn", async () => 
        {
            await this.emailField.waitFor({state: 'visible', timeout: 5000});
            await this.emailField.fill('qauser798+tb@gmail.com');

            await this.loginBtn.waitFor({state: 'visible', timeout: 5000});
            await this.loginBtn.click();
        });

        await test.step("Step 5: Assert the validation msg on entering email only", async () => 
        {
            await this.validationMsg.waitFor({state: 'visible', timeout: 15000});
            await expect.soft(this.validationMsg).toHaveText('Password is required.');
            console.log('✅ Validation message for empty Password field is:', this.validationMsg.innerText());
        });

        // Enter Password only
        await test.step("Step 6: Enter password only and click Login btn", async () => 
        {
            await this.emailField.waitFor({state: 'visible', timeout: 5000});
            await this.emailField.fill('');

            await this.passField.waitFor({state: 'visible', timeout: 5000});
            await this.passField.fill('Test@123');

            await this.loginBtn.waitFor({state: 'visible', timeout: 5000});
            await this.loginBtn.click();
        });

        await test.step("Step 7: Assert the validation msg on entering password only", async () => 
        {
            await this.validationMsg.waitFor({state: 'visible', timeout: 15000});
            await expect.soft(this.validationMsg).toHaveText('Email is required.');
            console.log('✅ Validation message for empty Email field is:', this.validationMsg.innerText());
        });
    }    
}

export default NullField;
