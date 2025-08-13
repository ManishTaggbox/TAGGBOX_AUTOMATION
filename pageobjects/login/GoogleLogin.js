const { test, expect } = require('@playwright/test');

class GoogleLogin
{
    constructor(page) 
    {
        this.page = page;
        this.gLoginBtn = page.locator('#googleplusSignIn');
        this.emailInput = page.locator('//input[@type="email"]');
        this.nextBtn = page.locator('//span[text()="Next"]');
        this.passwordInput = page.locator('//input[@type="password"]');
       
    }

    async loginWithGoogle() 
    {
        let popup;
        await test.step('Step 2: Click "Login with Google" button and capture popup', async () => 
        {
            const context = this.page.context();
            [popup] = await Promise.all([
            context.waitForEvent('page'), // Wait for popup
            this.gLoginBtn.click() // Update selector if needed
        ]);
        });

        await test.step('Step 3: Wait for Google login popup to load', async () =>
        {
            console.log('Waiting for Google login popup to load...');
            await popup.waitForLoadState();
        });

        await test.step('Step 4: Enter Google email and proceed', async () =>
        {
            // await popup.fill(this.emailInput, 'test@gmail.com');
            await popup.locator(this.emailInput).fill('test@gmail.com');

            await popup.click(this.nextBtn);
        });

        await test.step('Step 5: Wait for password field and enter Google password', async () => 
        {
            await popup.waitForSelector(this.passwordInput, { timeout: 5000 });
            await popup.fill(this.passwordInput, 'Test@123');
            await popup.click(this.nextBtn);
        });

        await test.step('Step 6: Wait for redirection back to main application', async () => 
        {
            // await page.waitForURL('**/home', { timeout: 15000 });
            await this.page.waitForURL('**/home', { timeout: 15000 });
        });

        await test.step('Step 7: Validate successful login', async () =>
        {
            // expect(page.url()).toContain('/home');
            expect(this.page.url()).toContain('/home');
            console.log('✅ Successfully logged in with Google');
        }); 
    }
}

export default GoogleLogin;
