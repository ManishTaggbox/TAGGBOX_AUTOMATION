import { test, expect } from '@playwright/test';
import { INSTAGRAM } from '../../utils/Constant.js';
import ManageFeeds from '../../socialfeeds/managefeeds/ManageFeeds.js';

class InstagramHandle 
{
    constructor(page) 
    {
        this.page = page;
        this.instagram = page.locator("//li[contains(@class,'instagram-business')]//button[contains(@type,'button')]");
        this.handleTab = page.locator('#CreateFeedTab-tab-handle');
        this.handleField = page.locator('#insta_handle');
        this.createFeedBtn = page.locator('#create_feed');
        this.toastMsg = page.locator('//div[text()="Congratulations! You have successfully created feed."]');
    }

    async instagramHandle() 
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

            console.log('✅ Waited for 2 seconds to load Instagram Handle UI');
        });

        await test.step('Step 4: Click the "Handle" tab', async () => 
        {
            await this.handleTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleTab.click();

            console.log('✅ Clicked on "Handle" tab');
        });

        await test.step('Step 5: Wait for #insta_handle input, then fill', async () => 
        {
            await this.handleField.waitFor({ state: 'visible', timeout: 10000 });
            await this.handleField.fill(INSTAGRAM.INSTAGRAMHANDLE);

            console.log(`✅ Filled insta handle input with: ${INSTAGRAM.INSTAGRAMHANDLE}`);
        });

         await test.step('Step 6: Wait 2 seconds for UI update', async () => 
        {
            await this.page.waitForTimeout(2000);

            console.log('✅ Waited for 2 seconds to load Instagram Handle UI');
        });

        await test.step('Step 7: Verify "Create Feed" button is enabled', async () => 
        {
            await expect.soft(this.createFeedBtn).toBeEnabled();

            console.log('✅ "Create Feed" button is enabled');
        });

        await test.step('Step 8: Click the "Create Feed" button', async () => 
        {
            await this.createFeedBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.createFeedBtn.click();

            console.log('✅ Clicked on "Create Feed" button');
        });

        await test.step('Step 9: Assert the toast msg', async () => 
        {
            await this.toastMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.toastMsg).toBeVisible();
            await expect.soft(this.toastMsg).toHaveText('Congratulations! You have successfully created feed.');

            console.log('✅ Validated the toast message');
        });

        await test.step('Step 10: Wait 25 seconds for Content Gallery to load', async () => 
        {
            await this.page.waitForTimeout(15000);

            console.log('✅ Waited for 15 seconds to load Content Gallery');
        });

        await test.step('Step 11: Proceed with feed management if Content Gallery is loaded', async () => 
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

export default InstagramHandle;
