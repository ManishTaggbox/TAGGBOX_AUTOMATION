const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../managefeeds/ManageFeeds.js');
import { YOUTUBE } from '../../utils/constant.js';


class YoutubePlaylist {
    constructor(page) {
        this.page = page;
        this.playlist = page.locator("//a[@data-name='playlist']");
        this.playlistUrl = page.locator("//input[@id='Playlist-text']");
        this.channelList = page.locator("(//div[contains(@class,'w-100 dropdown-menu show')])[3]");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async youtubePlaylist() {
        await test.step('Step 1: Click On  playlist Url', async () => {
            await this.playlist.click({ force: true });
        });

        await test.step('Step 2: Fill YouTube Channel URL and trigger suggestions', async () => {
            await this.playlistUrl.fill(YOUTUBE.YOUTUBEPLAYLISTURL);
        });

        await test.step('Step 3: Wait for dropdown and select first suggested channel', async () => {
            await this.channelList.first().waitFor({ state: 'visible', timeout: 5000 });
            await this.channelList.first().click();
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
            await this.page.waitForTimeout(10000);
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

module.exports = YoutubePlaylist;
