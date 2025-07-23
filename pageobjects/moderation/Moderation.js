const { test, expect } = require('@playwright/test');

class Moderation {
    constructor(page) {
        this.page = page;
       
    }

  

    async moderation() {
        await test.step("Step 1: ClickModeration", async () => {
                await this.page.waitForTimeout(22000);
        });

         }
}

module.exports = Moderation;
