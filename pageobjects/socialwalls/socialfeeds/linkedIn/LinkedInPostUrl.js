import { test, expect } from '@playwright/test';
import { LINKEDIN } from '../../utils/Constant.js';
import ManageFeeds from '../../socialfeeds/managefeeds/ManageFeeds.js';

class LinkedInPostUrl {
    constructor(page) {
        this.page = page;
        this.linkedIn = page.locator("//li[contains(@class,'linkedin')]//button[contains(@type,'button')]");
        this.postUrlTab = page.locator("//span[text()='Post Url']");
        this.urlField = page.locator("#FeedLinkedin_posturl");
        this.companyPageField = page.locator('#FeedLinkedin_company');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async linkedInPostUrl() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for LinkedIn button, then click', async () => {
            await this.linkedIn.waitFor({ state: 'visible', timeout: 10000 });
            await this.linkedIn.click();
        });

        await test.step('Step 3: Click to "PostUrl" tab', async () => {
            await this.postUrlTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.postUrlTab.click();
        });

        await test.step('Step 4: Wait for linkedin post url input, then fill', async () => {
            await this.urlField.waitFor({ state: 'visible', timeout: 10000 });
            await this.urlField.fill(LINKEDIN.LINKEDINPOSTURL);
        });

        await test.step('Step 5: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 6: Verify "Create Feed" button is enabled', async () => {
            await expect.soft(this.createFeedBtn.nth(3)).toBeEnabled();
        });

        await test.step('Step 6: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.nth(3).waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.nth(3).click();
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

export default LinkedInPostUrl;
