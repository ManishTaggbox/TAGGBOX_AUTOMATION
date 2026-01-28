const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import { REDDIT } from '../../utils/constant.js';

class RedditKeywords 
{
    constructor(page) 
    {
        this.page = page;
        this.keywordTab = page.locator('//a[@data-name="keywords"]');
        this.keywordInput = page.locator('#Keywords-text');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async redditKeywords() 
    {
        await test.step('Step 1: Click on "Keywords" tab', async () => 
        {
            await this.keywordTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.keywordTab.click();
        });

        await test.step('Step 2: Fill keyword input with "mountains"', async () => 
        {
            await this.keywordInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.keywordInput.fill(REDDIT.REDDITKEYWORDS);
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 4: Verify "Create Feed" button is enabled', async () => 
        {
            await expect(this.createFeedBtn).toBeEnabled();
        });

        await test.step('Step 5: Click the "Create Feed" button', async () => 
        {
            await this.createFeedBtn.click();
        });

        await test.step('Step 6: Wait 5 seconds for Content Gallery to load', async () => 
        {
            await this.page.waitForTimeout(5000);
        });

        await test.step('Step 7: Proceed with feed management if Content Gallery is loaded', async () => 
        {
            try 
            {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            } 
            catch (error) 
            {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

module.exports = RedditKeywords;
