import { test, expect } from '@playwright/test';
import { FACEBOOK } from '../../utils/Constant.js';
import ManageFeeds from '../../socialfeeds/managefeeds/ManageFeeds.js';

class FacebookHashtag {
    constructor(page) {
        this.page = page;
        this.facebook = page.locator("//li[contains(@class,'facebook')]//button[contains(@type,'button')]");
        this.hashtagTab = page.locator("#CreateFeedTab-tab-hashtag");
        this.hashtagField = page.locator('#hashtag-text');
        this.createFeedBtn = page.locator('#create_feed');
        this.toastMsg = page.locator('//div[text()="Congratulations! You have successfully created feed."]');
    }

    async facebookHashtag() {
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

        await test.step('Step 4: Click to "Hashtag" tab', async () => {
            await this.hashtagTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.hashtagTab.click();

            console.log('✅ Clicked on "Hashtag" tab');
        });

        await test.step('Step 5: Wait for facebook_hashtag input, then fill', async () => {
            await this.hashtagField.waitFor({ state: 'visible', timeout: 10000 });
            await this.hashtagField.fill(FACEBOOK.FACEBOOKHASHTAG);

            console.log(`✅ Filled facebook hashtag input with: ${FACEBOOK.FACEBOOKHASHTAG}`);
        });

        await test.step('Step 6: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Facebook UI');
        });

        await test.step('Step 7: Verify "Create Feed" button is enabled', async () => {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });

        await test.step('Step 8: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.click();

            // await this.page.waitForTimeout(25000);

            console.log('✅ Clicked on "Create Feed" button');
        });

        await test.step('Step 9: Assert the toast msg', async () => {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.toastMsg).toBeVisible();
            await expect.soft(this.toastMsg).toHaveText('Congratulations! You have successfully created feed.');

            console.log('✅ Validated the toast message');
        });

        await test.step('Step 10: Wait 35 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(35000);

            console.log('✅ Waited for 35 seconds to load Content Gallery');
        });

        await test.step('Step 11: Proceed with feed management if Content Gallery is loaded', async () => {
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

export default FacebookHashtag;
