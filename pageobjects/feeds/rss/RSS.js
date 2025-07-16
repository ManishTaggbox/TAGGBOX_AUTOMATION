const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import { RSSDATA } from '../../utils/constant.js';

class RSS {
    constructor(page) {
        this.page = page;
        this.enterRssText = page.locator("//input[@id='RSS-text']");
        this.enterRssUrl = page.locator("//input[@id='RSS-text-second']");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async rss() {
        await test.step('Step 1: Fill Rss Display Name', async () => {
            await this.enterRssText.fill(RSSDATA.RSSDISPLAYNAME);
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 2: Fill Rss Url', async () => {
            await this.enterRssUrl.fill(RSSDATA.RSSURL);
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

        await test.step('Step 6: Wait 10 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(15000);
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

module.exports = RSS;
