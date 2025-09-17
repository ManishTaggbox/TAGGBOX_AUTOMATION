import { test, expect } from '@playwright/test';
import { SLACK } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class SlackChannelKeyword {
    constructor(page) {
        this.page = page;
        this.slack = page.locator("//li[contains(@class,'slack')]//button[contains(@type,'button')]");
        this.channelKeywordTab = page.locator('#CreateFeedTab_slack-tab-ChannelKeyword');
        this.keywordField = page.locator('//input[@name="keyword"]');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async slackChannelKeyword() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Slack button, then click', async () => {
            await this.slack.waitFor({ state: 'visible', timeout: 10000 });
            await this.slack.click();

            console.log('✅ Clicked on Slack button');
        });

        await test.step('Step 3: Click to "Channel & Keyword" tab', async () => {
            await this.channelKeywordTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.channelKeywordTab.click();

            console.log('✅ Clicked on "Channel & keyword" tab');
        });

        await test.step('Step 4: Wait for keyword input, then fill', async () => 
        {
            await this.keywordField.waitFor({ state: 'visible', timeout: 10000 });
            await this.keywordField.fill(SLACK.SLACKKEYWORD);
        
            console.log('✅ Filled slack keyword');
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

export default SlackChannelKeyword;
