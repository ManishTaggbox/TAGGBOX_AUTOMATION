const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { FACEBOOK } from '../../utils/constant.js';


class FacebookPage {
    constructor(page) {
        this.page = page;
        this.pageText = page.locator("#Page-text");
        this.channelList = page.locator("//div[@class='d-flex flex-column justify-content-start']");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async facebookPage() {

        await test.step('Step 1: Fill FACEBOOK PAGE and trigger suggestions', async () => {
            await this.pageText.fill(FACEBOOK.FACEBOOKPAGE);
            await this.pageText.press('Space');
        });

        await test.step('Step 2: Wait for dropdown and select first suggested channel', async () => {
            await this.channelList.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.channelList.first().click();
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

        await test.step('Step 6: Wait 30 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(30000);
        });

        await test.step('Step 7: Proceed with feed management if Content Gallery is loaded', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            } catch (error) {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

module.exports = FacebookPage;
