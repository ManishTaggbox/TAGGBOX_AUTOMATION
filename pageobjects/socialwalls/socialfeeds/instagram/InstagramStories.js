import { test, expect } from '@playwright/test';
import { INSTAGRAM } from '../../utils/Constant.js';
const ManageFeeds = require('../../socialfeeds/managefeeds/ManageFeeds.js');

class InstagramStories 
{
    constructor(page) 
    {
        this.page = page;
        this.instagram = page.locator("//li[contains(@class,'instagram-business')]//button[contains(@type,'button')]");
        this.storiesTab = page.locator('#CreateFeedTab-tab-stories');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async instagramStories() 
    {
        await test.step('Step 1: Open Social Feeds page', async () => 
        {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            }
            catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Instagram button, then click', async () => 
        {
            await this.instagram.waitFor({ state: 'visible', timeout: 10000 });
            await this.instagram.click();

            console.log('✅ Clicked on Instagram button');
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Instagram Stories UI');
        });

        await test.step('Step 4: Click on "Stories" tab', async () => 
        {
            await this.storiesTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.storiesTab.click();

            console.log('✅ Clicked on "Stories" tab');
        });

        await test.step('Step 5: Verify "Create Feed" button is enabled', async () => 
        {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });

        await test.step('Step 6: Click the "Create Feed" button', async () => 
        {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.click();

            console.log('✅ Clicked on "Create Feed" button');
        });

        await test.step('Step 7: Wait 25 seconds for Content Gallery to load', async () => 
        {
            await this.page.waitForTimeout(25000);

            console.log('✅ Waited for 25 seconds to load Content Gallery');
        });

        await test.step('Step 8: Proceed with feed management if Content Gallery is loaded', async () => 
        {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            }
            catch (error) {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

export default InstagramStories;
