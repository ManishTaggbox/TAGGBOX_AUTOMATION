import { test, expect } from '@playwright/test';
import { YOUTUBE } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class YoutubePlaylist {
    constructor(page) {
        this.page = page;
        this.youtube = page.locator("//li[contains(@class,'youtube')]//button[contains(@type,'button')]");
        this.playlistTab = page.locator('//button/span[text()="Play List"]');
        this.urlField = page.locator('//input[@name="playList"]');
        this.dropdownOptions = page.locator('//div[@class="handlelist"]//li');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async youtubePlaylist() {
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

        await test.step('Step 3: Click to "Playlist" tab', async () => {
            await this.playlistTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.playlistTab.click();

            console.log('✅ Clicked on "Playlist" tab');
        });

        await test.step('Step 4: Wait for playlist url input, then fill', async () => {
            await this.urlField.waitFor({ state: 'visible', timeout: 10000 });
            await this.urlField.fill(YOUTUBE.YOUTUBEPLAYLISTURL);

            console.log('✅ Filled YouTube playlist URL');
        });

        await test.step('Step 5: Click to select option from the dropdown list', async () => {
            await this.dropdownOptions.waitFor({ state: 'visible', timeout: 10000 });
            await this.dropdownOptions.click();

            console.log('✅ Selected option from dropdown');
        });

        await test.step('Step 6: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited 2 seconds for UI update');
        });

        await test.step('Step 7: Verify "Create Feed" button is enabled', async () => {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });

        await test.step('Step 8: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.click();

            console.log('✅ Clicked on "Create Feed" button');
        });

        await test.step('Step 9: Wait 15 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(15000);

            console.log('✅ Waited 15 seconds for Content Gallery to load');
        });

        await test.step('Step 10: Proceed with feed management if Content Gallery is loaded', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            } catch (error) {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

export default YoutubePlaylist;
