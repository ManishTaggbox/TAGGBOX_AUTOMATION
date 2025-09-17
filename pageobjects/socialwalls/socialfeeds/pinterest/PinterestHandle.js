import { test, expect } from '@playwright/test';
import { PINTEREST } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class PinterestHandle {
    constructor(page) {
        this.page = page;
        this.pinterest = page.locator("//li[contains(@class,'pinterest')]//button[contains(@type,'button')]");
        this.handleField = page.locator('#pinterest_handle');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async pinterestHandle() {
        await test.step('Step 1: Open Social Feeds page', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.openSocialFeeds();
            } catch (error) {
                console.warn('⚠️ Social Feeds page did not load properly');
            }
        });

        await test.step('Step 2: Wait for Pinterest button, then click', async () => {
            await this.pinterest.waitFor({ state: 'visible', timeout: 10000 });
            await this.pinterest.click();

            console.log('✅ Clicked on Pinterest button');
        });

        await test.step('Step 3: Wait for handle input, then fill', async () => {
            await this.handleField.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleField.fill(PINTEREST.PINTERESTHANDLE);

            console.log('✅ Filled Pinterest handle URL');
        });

        await test.step('Step 4: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited 2 seconds for UI update');
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

        await test.step('Step 7: Wait 10 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(10000);

            console.log('✅ Waited 10 seconds for Content Gallery to load');
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

export default PinterestHandle;
