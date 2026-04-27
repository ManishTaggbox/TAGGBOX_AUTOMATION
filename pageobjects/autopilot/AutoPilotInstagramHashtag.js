const { test, expect } = require('@playwright/test');
import { INSTAGRAM } from '../utils/constant.js';

class AutoPilotInstagramHashtag {
    constructor(page) {
        this.page = page;
        this.enterHashtag = page.locator('#hashtag-text');
        this.createFeedBtn = page.locator('#create_feed');

        //VerifyAutoPilot Locator 

        this.addFedd = page.locator("//li[@id='add_feed']");
        this.instagram = page.locator("//span[normalize-space()='Instagram']")
    }

    async autoPilotInstagramHashtag() {
        await test.step('Add Feed Instagram Hashtag AutoPilot', async () => {
            await this.page.waitForTimeout(5000);
            await this.addFedd.waitFor({ state: 'visible' });
            await this.addFedd.click();
            await this.instagram.waitFor({ state: 'visible' });
            await this.instagram.click();
        });
      
        await test.step('Step 2: Fill handle input with "vantara"', async () => {
            await this.enterHashtag.fill(INSTAGRAM.INSTAGRAMHASHTAG);
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 4: Verify "Create Feed" button is enabled', async () => {
            await expect(this.createFeedBtn).toBeEnabled();
        });

        await test.step('Step 5: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.click();
        });

        await test.step('Step 6: Wait 25 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(30000);
        });
    }
}

module.exports = AutoPilotInstagramHashtag;
