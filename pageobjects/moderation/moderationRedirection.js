const { test, expect } = require('@playwright/test');


class Moderation
{
    constructor(page) 
    {
        this.page = page;
        this.selectAll = page.locator('#select_all_');
        this.checkboxes = page.locator('//input[@type="checkbox" and @value="true"]');
    }

async redirect(wallId)
{
    //await test.step('Step 1: Fill AIRNB Rooms Url', async () => {
      await this.selectAll.check();
      console.log("✅ Navigated to Moderation Page with Wall ID:", wallId);

      // const count = await checkboxes.count();
      // expect(count).toBeGreaterThan(40);

      console.log("✅ All checkboxes selected successfully");

    //});

  }


}

module.exports = Moderation;
