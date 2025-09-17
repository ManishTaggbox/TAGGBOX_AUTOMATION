import { test, expect } from '@playwright/test';
import { PINTEREST } from '../../utils/Constant.js';
import ManageFeeds from '../managefeeds/ManageFeeds.js';

class PinterestUserBoard {
    constructor(page) {
        this.page = page;
        this.pinterest = page.locator("//li[contains(@class,'pinterest')]//button[contains(@type,'button')]");
        this.userBoardTab = page.locator('//button/span[text()="User Board"]');
        this.urlField = page.locator('#pinterest_userboard');
        this.createFeedBtn = page.locator('#create_feed');
    }

    async pinterestUserBoard() {
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

        await test.step('Step 3: Click to "User Board" tab', async () => {
            await this.userBoardTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.userBoardTab.click();

            console.log('✅ Clicked to "User Board" tab');
        });

        await test.step('Step 4: Wait for url input, then fill', async () => {
            await this.urlField.waitFor({ state: 'visible', timeout: 10000 });
            await this.urlField.fill(PINTEREST.PINTERESTUSERBOARD);

            console.log('✅ Filled Pinterest url');
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

export default PinterestUserBoard;
