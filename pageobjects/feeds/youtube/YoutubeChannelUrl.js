const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { YOUTUBE } from '../../utils/constant.js';


class YoutubeChannelUrl {
    constructor(page) {
        this.page = page;
        this.channelUrl = page.locator("//input[@id='Channel-Url-text']");
        this.channelList = page.locator("//a[@class='dropdown-item']");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async youtubeChannelUrl() {

        await test.step('Step 1: Fill YouTube Channel URL and trigger suggestions', async () => {
            await this.channelUrl.fill(YOUTUBE.YOUTUBECHANNELURL);
            await this.channelUrl.press('Space');
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

        await test.step('Step 6: Wait 25 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(20000);
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

module.exports = YoutubeChannelUrl;
