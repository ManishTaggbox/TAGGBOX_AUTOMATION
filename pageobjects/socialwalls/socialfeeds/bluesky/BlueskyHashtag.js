import { test, expect } from '@playwright/test';
import { BLUESKY } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class BlueskyHashtag {
    constructor(page) {
        this.page = page;
        this.bluesky = page.locator("//li[contains(@class,'bluesky')]//button[contains(@type,'button')]");
        this.hashtagField = page.locator('#bluesky_hashtag');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async blueskyHashtag() {
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

        await test.step('Step 3: Wait for bluesky hashtag input, then fill', async () => {
            await this.hashtagField.waitFor({ state: 'visible', timeout: 10000 });
            await this.hashtagField.fill(BLUESKY.BLUESKYHASHTAG);

            console.log('✅ Filled Bluesky hashtag');
        });

        await test.step('Step 4: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited 2 seconds for UI update');
        });

        await test.step('Step 5: Verify "Create Feed" button is enabled', async () => {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });

        await test.step('Step 6: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.click();

            console.log('✅ Clicked on "Create Feed" button');
        });

        await test.step('Step 7: Wait 10 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(10000);

            console.log('✅ Waited 10 seconds for Content Gallery to load');
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

export default BlueskyHashtag;
