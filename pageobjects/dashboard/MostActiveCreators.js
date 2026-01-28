const { test, expect } = require('@playwright/test');

class MostActiveCreators
{
    constructor(page) 
    {
        this.page = page;
        this.contentTab = page.locator('.tab-content');
        this.connectBtn = page.locator('//a[text()="Connect"]');
        this.dashboardUrl = 'https://app.taggbox.com/home';

        // Delete feed locators
        this.homeMenu = page.locator('#home_menu');
        this.editBtn = page.locator('//button[text()="Edit"]');
        this.manageFeedsMenu = page.locator('#manage_feed');
        this.deleteFeedBtn = page.locator('//button[@data-id="delete"]');
        this.deleteConfirmBtn = page.locator('//button[@aria-label="delete_yes"]');
        this.successMsg = page.locator('//div[text()="Feeds Deleted Succesfully."]');
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

    // Delete created feed here
    async deleteFeed() 
    {
        await test.step("Step 1: Navigate to 'Home' page", async () => 
        {
            await this.homeMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.homeMenu.click();

            console.log("✅ Clicked to 'Home' menu");
        });

        await test.step("Step 2: Click to 'Edit' btn", async () =>
        {
            await this.editBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.editBtn.click();

            console.log("✅ Clicked to 'Edit' btn");
        });

        await test.step("Step 3: Click to 'Manage feeds' menu", async () => 
        {
            await this.manageFeedsMenu.waitFor({ state: 'visible', timeout: 5000 });
            await this.manageFeedsMenu.click();
            await this.page.waitForTimeout(5000);

            console.log("✅ Clicked to 'Manage Feed' menu");
        });

        await test.step("Step 4: Click to 'delete' icon for created feed", async () => 
        {
            let count = 1;

            while (true) 
            {
                const deleteButtons = this.page.locator("//button[@aria-label='delete']");
                const isVisible = await deleteButtons.first().isVisible();

                if (!isVisible) break;

                console.log(`🗑️ Deleting feed #${count}`);

                // Click the first visible delete button
                await deleteButtons.first().click();
                await this.deleteConfirmBtn.click();

                // Optional short wait for DOM to update
                await this.page.waitForTimeout(3000);

                count++;
            }

            if (count === 1) 
            {
                console.log("ℹ️ No feeds found to delete.");
            } else 
            {
                console.log(`✅ All feeds deleted (${count - 1} in total).`);
            }
        });
    }    
}

export default MostActiveCreators;
