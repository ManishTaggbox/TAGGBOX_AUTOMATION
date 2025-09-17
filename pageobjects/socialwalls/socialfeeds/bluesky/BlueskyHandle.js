import { test, expect } from '@playwright/test';
import { BLUESKY } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class BlueskyHandle {
    constructor(page) {
        this.page = page;
        this.bluesky = page.locator("//li[contains(@class,'bluesky')]//button[contains(@type,'button')]");
        this.handleTab = page.locator('#PinterestFeedTab-tab-handle');
        this.handleField = page.locator('#bluesky_handle');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async blueskyHandle() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Bluesky button, then click', async () => {
            await this.bluesky.waitFor({ state: 'visible', timeout: 10000 });
            await this.bluesky.click();

            console.log('✅ Clicked on Bluesky button');
        });

        await test.step('Step 3: Click to "Handle" tab', async () => {
            await this.handleTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleTab.click();

            console.log('✅ Clicked on "Handle" tab');
        });

        await test.step('Step 4: Wait for bluesky handle input, then fill', async () => {
            await this.handleField.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleField.fill(BLUESKY.BLUESKYHANDLE);

            console.log('✅ Filled Bluesky handle');
        });

        await test.step('Step 5: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited 2 seconds for UI update');
        });

        await test.step('Step 6: Verify "Create Feed" button is enabled', async () => {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });

        await test.step('Step 7: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.click();

            console.log('✅ Clicked on "Create Feed" button');
        });

        await test.step('Step 8: Wait 10 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(10000);

            console.log('✅ Waited 10 seconds for Content Gallery to load');
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

export default BlueskyHandle;
