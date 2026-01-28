const { test, expect } = require('@playwright/test');

class LoginPageLinks
{
    constructor(page)
    {
        this.page = page;
        this.loginUrl = 'https://app.taggbox.com/accounts/login';
        this.links = page.locator('//a[@href]');
    }

    async loginPageLinks() 
    {
        await test.step('Step 1: Wait 5 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(5000);
        }); 

        await test.step("Step 2: Count the total number of links present on the login page", async () => 
        {
            const count = await this.links.count();
            console.log(`🔍 Found ${count} links on login page`);
        });

        await test.step("Step 3: Assert the href and text for each link", async () =>
        {
            const count = await this.links.count();
            for (let i = 0; i < count; i++) 
            {
                const link = this.links.nth(i);
                const href = await link.getAttribute('href');
                const text = ((await link.innerText()) || 'No Text').trim();

                console.log(`🔗 Link ${i + 1}: "${text}" → ${href}`);

                // Check if href is not empty
                expect.soft(href, `Link "${text}" has no href`).not.toBeNull();

                // Verify the link is working (no 404)
                if (href && !href.startsWith('#') && !href.startsWith('javascript:')) 
                {
                    const fullUrl = href.startsWith('http') ? href : new URL(href, this.loginUrl).toString();
                    const response = await this.page.request.get(fullUrl, { timeout: 5000 });
                    const status = response.status();

                    console.log(`   ↳ Status: ${status}`);
                    expect.soft(status, `Link "${text}" is broken`).toBeLessThan(400);
                }
            }
        });
    }
}

export default LoginPageLinks;
