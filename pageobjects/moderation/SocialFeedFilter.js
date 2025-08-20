const { test, expect } = require('@playwright/test');

class SocialFeedFilter 
{
    constructor(page) 
    {
        this.page = page;
        this.filterIcon = page.locator('#filter_aside');
        this.checkboxes = page.locator('//div[@class="checkbox-list"]//input');
        this.crossIcon = page.locator('.fa-xmark');
        this.socialFeed = page.locator('.fil_network');
        this.filterBadge = page.locator('//div[contains(@class, "d-flex flex-wrap align-items-center")]//span');
    }

    async socialFeedFilter() 
    {
        let feedText1;
        let feedText2;

        await test.step("Step 1: Click to open filter overlay", async () => 
        {
            await this.page.waitForTimeout(5000);
            await this.filterIcon.waitFor({state: 'visible', timeout: 5000});
            await this.filterIcon.click();
        });

        await test.step("Step 2: Select the checkboxes", async () => 
        {
            feedText1 = await this.socialFeed.first().textContent();
            feedText2 = await this.socialFeed.last().textContent();

            await this.checkboxes.first().waitFor({state: 'visible', timeout: 5000});
            await this.checkboxes.first().click();
            await this.checkboxes.last().waitFor({state: 'visible', timeout: 5000});
            await this.checkboxes.last().click();
        });

        await test.step("Step 3: Click to close the overlay", async () => 
        {
            await this.crossIcon.last().waitFor({state: 'visible', timeout: 5000});
            await this.crossIcon.last().click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 4: Assert the filter badge", async () => 
        {
            const filterText1 = await this.filterBadge.first().textContent();
            const filterText2 = await this.filterBadge.last().textContent();

            await this.filterBadge.first().waitFor({state: 'visible', timeout: 5000 });
            await this.filterBadge.last().waitFor({state: 'visible', timeout: 5000});
            await expect.soft(filterText1).toContain(feedText1);
            await expect.soft(filterText2).toContain(feedText2);
        });
    }
}

export default SocialFeedFilter;
