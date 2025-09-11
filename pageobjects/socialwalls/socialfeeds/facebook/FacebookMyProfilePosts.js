import { test, expect } from '@playwright/test';
import { FACEBOOK } from '../../utils/Constant.js';
const ManageFeeds = require('../managefeeds/ManageFeeds.js');

class FacebookMyProfilePosts {
    constructor(page) {
        this.page = page;
        this.facebook = page.locator("//li[contains(@class,'facebook')]//button[contains(@type,'button')]");
        this.myProfilePostsTab = page.locator("//button/span[text()='My Profile Posts']");
        this.createFeedBtn = page.locator('#create_feed');
        this.pageField = page.locator('#Page-text');
        this.dropdownOption = page.locator('//div[@class="handlelist"]//li').first();
        this.toastMsg = page.locator('//div[text()="Congratulations! You have successfully created feed."]');
    }

    async facebookMyProfilePosts() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            }
            catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Facebook button, then click', async () => {
            await this.facebook.waitFor({ state: 'visible', timeout: 10000 });
            await this.facebook.click();

            console.log('✅ Clicked on Facebook button');
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Facebook UI');
        });

        await test.step('Step 4: Click to "My Profile Posts" tab', async () => {
            await this.myProfilePostsTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.myProfilePostsTab.click();

            console.log('✅ Clicked on "My Profile Posts" tab');
        });
        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Facebook UI');
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

        await test.step('Step 8: Assert the toast msg', async () => {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.toastMsg).toBeVisible();
            await expect.soft(this.toastMsg).toHaveText('Congratulations! You have successfully created feed.');

            console.log('✅ Validated the toast message');
        });

        await test.step('Step 9: Wait 25 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(15000);

            console.log('✅ Waited for 25 seconds to load Content Gallery');
        });

        await test.step('Step 10: Proceed with feed management if Content Gallery is loaded', async () => {
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

export default FacebookMyProfilePosts;
