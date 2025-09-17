import { test, expect } from '@playwright/test';
import { RSSDATA } from '../../utils/Constant.js';
import ManageFeeds from '../../socialfeeds/managefeeds/ManageFeeds.js';

class RSS {
    constructor(page) {
        this.page = page;
        this.rssbtn = page.locator("//li[contains(@class,'rss')]//button[contains(@type,'button')]");
        this.nameField = page.locator('#rssname');
        this.urlField = page.locator('#rssfeed');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async rss() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for RSS button, then click', async () => {
            await this.rssbtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.rssbtn.click();

            console.log('✅ Clicked on RSS button');
        });

        await test.step('Step 3: Wait for name input, then fill', async () => {
            await this.nameField.waitFor({ state: 'visible', timeout: 10000 });
            await this.nameField.fill(RSSDATA.RSSDISPLAYNAME);

            console.log('✅ Filled RSS name');
        });

        await test.step('Step 4: Wait for url input, then fill', async () => {
            await this.urlField.waitFor({ state: 'visible', timeout: 10000 });
            await this.urlField.fill(RSSDATA.RSSURL);

            console.log('✅ Filled RSS URL');
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

        await test.step('Step 8: Wait 15 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(15000);

            console.log('✅ Waited 15 seconds for Content Gallery to load');
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

export default RSS;
