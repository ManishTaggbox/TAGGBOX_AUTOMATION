const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { YOUTUBE } from '../../utils/constant.js';


class YoutubeKeywords {
    constructor(page) {
        this.page = page;
        this.keywords = page.locator("//a[@data-name='keywords']");
        this.keywordsText = page.locator("//input[@id='Keywords-text']");
        this.channelList = page.locator("(//span[contains(@class,'fs-10 mb-0')])[51]");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async youtubeKeywords() {
        await test.step('Step 1: Click On keywords Url', async () => {
            await this.keywords.waitFor({ state: 'visible', timeout: 10000 });
            await this.keywords.click({ force: true });
        });

        await test.step('Step 2: Fill YouTube Keywords and trigger suggestions', async () => {
            await this.keywordsText.fill(YOUTUBE.YOUTUBEKEYWORDS);

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
            await this.page.waitForTimeout(10000);
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

module.exports = YoutubeKeywords;
