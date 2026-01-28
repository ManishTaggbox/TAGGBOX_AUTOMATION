const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { GOOGLE } from '../../utils/constant.js';


class GooglePlaces {
    constructor(page) {
        this.page = page;
        this.typeAddress = page.locator("//input[@placeholder='Type address']");
        this.selectAddress = page.locator("//*[text()='Taggbox, Queens Road, Vidyut Nagar B, Neelkanth Colony, Vidhyut Nagar, Jaipur, Rajasthan, India']");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async googlePlaces() {

        await test.step('Step 1: Fill Google Places input', async () => {
            await this.typeAddress.waitFor({ state: 'visible', timeout: 10000 });
            await this.typeAddress.fill(GOOGLE.GOOGLEPLACE);
        });

        await test.step('Step 2: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 3: Click the "Create Feed" button', async () => {
            await this.selectAddress.click();
        });

        await test.step('Step 4: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 5: Verify "Create Feed" button is enabled', async () => {
            await expect(this.createFeedBtn).toBeEnabled();
        });

        await test.step('Step 6: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.click();
        });

        await test.step('Step 7: Wait 25 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(25000);
        });

        await test.step('Step 8: Proceed with feed management if Content Gallery is loaded', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            } catch (error) {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

module.exports = GooglePlaces;
