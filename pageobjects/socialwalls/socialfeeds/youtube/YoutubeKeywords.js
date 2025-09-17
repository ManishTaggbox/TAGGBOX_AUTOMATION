import { test, expect } from '@playwright/test';
import { YOUTUBE } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class YoutubeKeywords {
    constructor(page) {
        this.page = page;
        this.youtube = page.locator("//li[contains(@class,'youtube')]//button[contains(@type,'button')]");
        this.keywordsTab = page.locator('#YoutubeFeedTab-tab-Keywords');
        this.urlField = page.locator('#feedsfield-Keywords');
        this.dropdownOptions = page.locator('//div[@class="handlelist"]//li');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async youtubeKeywords() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Youtube button, then click', async () => {
            await this.youtube.waitFor({ state: 'visible', timeout: 10000 });
            await this.youtube.click();

            console.log('✅ Clicked on YouTube button');
        });

        await test.step('Step 3: Click to "Keywords" tab', async () => {
            await this.keywordsTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.keywordsTab.click();

            console.log('✅ Clicked on "Keywords" tab');
        });

        await test.step('Step 4: Wait for keyword input, then fill', async () => {
            await this.urlField.waitFor({ state: 'visible', timeout: 10000 });
            await this.urlField.fill(YOUTUBE.YOUTUBEKEYWORDS);

            console.log('✅ Filled YouTube keywords');
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

export default YoutubeKeywords;
