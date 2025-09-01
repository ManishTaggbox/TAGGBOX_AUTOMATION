const { test, expect } = require('@playwright/test');

class MostActiveCreators
{
    constructor(page) 
    {
        this.page = page;
        this.contentTab = page.locator('.tab-content');
        this.connectBtn = page.locator('//a[text()="Connect"]');
        this.dashboardUrl = 'https://app.taggbox.com/home';
    }

    async activeCreators() 
    {
        await test.step("Step 1: Assert data displayed in 'Most Active Creators' tab", async () => 
        {
            await this.contentTab.nth(2).waitFor({ state: 'visible', timeout: 5000 });
            
            console.log("✅ Data displayed in 'Most Active Creators' section");
        });

        await test.step("Step 2: Assert 'Connect' btn for each posts", async () => 
        {
            const count = await this.connectBtn.count();
            for (let i = 0; i < count; i++) 
            {
                const link = this.connectBtn.nth(i);
                const href = await link.getAttribute('href');
                const text = ((await link.innerText()) || 'No Text').trim();

                console.log(`🔗 Link ${i + 1}: "${text}" → ${href}`);

                // Check if href is not empty
                expect.soft(href, `Link "${text}" has no href`).not.toBeNull();

                // Verify the link is working (no 404)
                if (href && !href.startsWith('#') && !href.startsWith('javascript:')) 
                {
                    const fullUrl = href.startsWith('http') ? href : new URL(href, this.dashboardUrl).toString();
                    const response = await this.page.request.get(fullUrl, { timeout: 5000 });
                    const status = response.status();

                    console.log(`   ↳ Status: ${status}`);
                    expect.soft(status, `Link "${text}" is broken`).toBeLessThan(400);
                }
            }
            
            console.log("✅ 'Connect' btn is working fine for all posts");
        });
    }
}

export default MostActiveCreators;
