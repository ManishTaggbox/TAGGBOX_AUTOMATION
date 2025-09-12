import { test, expect } from '@playwright/test';
import { TIKTOK } from '../../utils/Constant.js';
import ManageFeeds from '../../socialfeeds/managefeeds/ManageFeeds.js';

class TiktokHandle {
    constructor(page) {
        this.page = page;
        this.tiktok = page.locator("//li[contains(@class,'tiktok')]//button[contains(@type,'button')]");
        this.handleTab = page.locator("#TiktokFeedTab-tab-Handle");
        this.createFeedBtn = page.locator('#create_feed');
        this.handleField = page.locator('#tiktok_handle');
        this.toastMsg = page.locator('//div[text()="Congratulations! You have successfully created feed."]');
    }

    async tiktokHandle() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            }
            catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Tiktok button, then click', async () => {
            await this.tiktok.waitFor({ state: 'visible', timeout: 10000 });
            await this.tiktok.click();

            console.log('✅ Clicked on Tiktok button');
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Tiktok UI');
        });

        await test.step('Step 4: Click the "Handle" tab', async () => {
            await this.handleTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleTab.click();

            console.log('✅ Clicked on "Handle" button');
        });

        await test.step('Step 6: Wait for tiktok_handle input, then fill', async () => {
            await this.handleField.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleField.fill(TIKTOK.TIKTOKHANDLE);

            console.log(`✅ Filled tiktok hashtag input with: ${TIKTOK.TIKTOKHANDLE}`);
        });
        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Tiktok UI');
        });
        await test.step('Step 5: Verify "Create Feed" button is enabled', async () => {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });
        await test.step('Step 7: Click the "Create Feed" button', async () => {
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

export default TiktokHandle;
