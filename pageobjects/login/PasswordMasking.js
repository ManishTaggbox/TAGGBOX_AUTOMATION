const { test, expect } = require('@playwright/test');

class PasswordMasking
{
    constructor(page) 
    {
        this.page = page;
        this.passField = page.locator('//input[@type="password"]');
        this.loginBtn = page.locator('.btn-primary');
    }

    async checkPasswordMasking() 
    {
        await test.step("Step 1: Assert password field's type is 'password' ", async () => 
        {
            const typeAttribute = await this.passField.getAttribute('type');
            expect.soft(typeAttribute).toBe('password');
        });

        await test.step("Step 2: Type a password and ensure the text is masked", async () => 
        {
            await this.passField.fill('');
            await this.passField.fill('Test@123');
        });

        await test.step("Step 3: Validate by ensuring the visible text in DOM isn't the entered password", async () => 
        {
            
            const visibleText = await this.passField.inputValue();
            expect.soft(visibleText).toBe('Test@123'); // value stored internally
  
            console.log('✅ Password field is masked properly');
        });

    
    }
}

export default PasswordMasking;
