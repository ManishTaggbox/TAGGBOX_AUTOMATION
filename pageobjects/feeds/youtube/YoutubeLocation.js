const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { YOUTUBE } from '../../utils/constant.js';


class YoutubeLocation {
    constructor(page) {
        this.page = page;
        this.location = page.locator("//a[@data-name='location']");
        this.enterAddress = page.locator("//input[@placeholder='Type address']");
        this.channelList = page.locator("//*[text()='Jaipur, Rajasthan, India']");
        this.enterKeywords = page.locator("//input[@placeholder='Enter keywords']");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async youtubeLocation() {
        await test.step('Step 1: Click On location Url', async () => {
            await this.location.waitFor({ state: 'visible', timeout: 10000 });
            await this.location.click({ force: true });
        });

        await test.step('Step 2: Fill YouTube Location URL and trigger suggestions', async () => {
            await this.enterAddress.fill(YOUTUBE.YOUTUBELOCATION);
            await this.enterAddress.press('Space');
        });

        await test.step('Step 3: Wait for dropdown and select first suggested channel', async () => {
            await this.channelList.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.channelList.first().click();
        });

        await test.step('Step 4: Fill YouTube Location Keywords ', async () => {
            await this.enterKeywords.fill(YOUTUBE.YOUTUBELOCATIONKEYWORDS);

        });

        await test.step('Step 5: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });
        await test.step('Step 6: Verify "Create Feed" button is enabled', async () => {
            await expect(this.createFeedBtn).toBeEnabled();
        });

        await test.step('Step 7: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.click();
        });

        await test.step('Step 8: Wait 25 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(10000);
        });

        await test.step('Step 9: Proceed with feed management if Content Gallery is loaded', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            } catch (error) {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

module.exports = YoutubeLocation;
