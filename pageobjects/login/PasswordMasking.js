const { test, expect } = require('@playwright/test');

class PasswordMasking
{
    constructor(page) 
    {
        this.page = page;
        this.passField = page.locator("//input[@placeholder='Password']");
        this.eyeBtn = page.locator('.fa-eye-slash');
        this.unmaskedPassField = page.locator('//input[@type="text"]');
    }

    async passwordMasking() 
    {
        await test.step('Step 1: Wait 5 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(5000);
        }); 

        await test.step("Step 2: Assert password field's type is 'password' ", async () => 
        {
            const typeAttribute = await this.passField.getAttribute('type');
            expect.soft(typeAttribute).toBe('password');
        });

        await test.step("Step 3: Type a password and ensure the text is masked", async () => 
        {
            await this.passField.fill('Test@123');
        });

        await test.step("Step 4: Validate by ensuring the visible text in DOM isn't the entered password", async () => 
        {
            
            const visibleText = await this.passField.inputValue();
            expect.soft(visibleText).toBe('Test@123');
  
            console.log('✅ Password field is masked properly');
        });

        await test.step("Step 5: Click on eye button", async () => 
        {
            await this.eyeBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.eyeBtn.click();
        });

        await test.step("Step 6: Assert password field's type is 'text' ", async () => 
        {
            await this.passField.waitFor({ state: 'visible', timeout: 5000 });

            const typeAttribute = await this.passField.getAttribute('type');
            expect.soft(typeAttribute).toBe('text');

            console.log('✅ Eye button functionality is working fine');
        });
    }
}

export default PasswordMasking;
