const { test, expect } = require('@playwright/test');

class Moderation 
{
    constructor(page) 
    {
        this.page = page;
        this.selectAll = page.locator('#select_all_');
        this.checkboxes = page.locator('//input[@type="checkbox" and @value="true"]');    
    }

    async moderation() 
    {
        await test.step("Step 1: ClickModeration", async () => 
        {
        await this.page.waitForTimeout(20000);
        await this.selectAll.check();
        //   const count = await checkboxes.count();
        //   expect(count).toBeGreaterThan(40);
        });
    }
}

module.exports = Moderation;