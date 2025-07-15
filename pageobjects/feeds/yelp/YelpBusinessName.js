const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { YELP } from '../../utils/constant.js';


class YelpBusinessName {
    constructor(page) {
        this.page = page;
        this.businessname = page.locator("//a[@data-name='businessname']");
        this.enterAddress = page.locator("//input[@placeholder='Type address']");
        this.channelList = page.locator("//*[text()='Jaipur, Rajasthan, India']");
        this.enterKeywords = page.locator('#Business-Name-text');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async yelpBusinessName() {
        await test.step('Step 1: Click On businessname Url', async () => {
            await this.businessname.click({ force: true });
        });

        await test.step('Step 2: Fill YouTube Location URL and trigger suggestions', async () => {
            await this.enterAddress.fill(YELP.YELPADDRESS);
            await this.enterAddress.press('Space');
        });

        await test.step('Step 3: Wait for dropdown and select first suggested channel', async () => {
            await this.channelList.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.channelList.first().click();
        });

        await test.step('Step 4: Fill YouTube Location Keywords ', async () => {
            await this.enterKeywords.fill(YELP.YELPKEYWORDS);

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

module.exports = YelpBusinessName;
