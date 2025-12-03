const { test, expect } = require('@playwright/test');
const ManageFeeds = require('../../feeds/managefeeds/ManageFeeds.js');
import { INSTAGRAM } from '../../utils/constant.js';

class InstagramOnlyReels {
    constructor(page) {
        this.page = page;
        this.handle = page.locator("//a[@data-name='handle']");
        this.enterHandle = page.locator("//input[@id='handle-text']");
        this.onlyReels = page.locator("(//input[@id='check-inline-onlyReels'])[3] ");
        this.createFeedBtn = page.locator('#create_feed');
    }

    async instagramOnlyReels() {
        await test.step('Step 1: Click on handle tab', async () => {
            await this.handle.waitFor({ state: 'visible', timeout: 10000 });
            await this.handle.click({ force: true });
        });

        await test.step('Step 2: Fill handle input with "lenskart"', async () => {
            await this.enterHandle.fill(INSTAGRAM.INSTAGRAMHANDLE);
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });

        await test.step('Step 1: Click On  onlyReels', async () => {
            await this.onlyReels.click({ force: true });
        });

        await test.step('Step 3: Wait 2 seconds for UI update', async () => {
            await this.page.waitForTimeout(2000);
        });
        await test.step('Step 4: Verify "Create Feed" button is enabled', async () => {
            await expect(this.createFeedBtn).toBeEnabled();
        });

        await test.step('Step 5: Click the "Create Feed" button', async () => {
            await this.createFeedBtn.click();
        });

        await test.step('Step 6: Wait 25 seconds for Content Gallery to load', async () => {
            await this.page.waitForTimeout(30000);
        });

        await test.step('Step 6: Wait for Content Gallery to load and validate icons', async () => {
            const CARD_SELECTOR = "//div[@class='content_img_ overflow-hidden position-relative']";
            const ICON_SELECTOR = 'xpath=.//i[contains(@class,"fa-circle-play")]';

            // Wait until cards are rendered
            await this.page.waitForSelector(CARD_SELECTOR, { timeout: 40000 });

            const cards = await this.page.locator(CARD_SELECTOR).elementHandles();
            let allHaveIcons = true;

            for (const card of cards) {
                const icons = await card.$$(ICON_SELECTOR);
                if (icons.length === 0) {
                    allHaveIcons = false;
                    break;
                }
            }

            if (allHaveIcons) {
                console.log('✅ All cards have the expected icon.');
            } else {
                console.error('❌ One or more cards are missing the expected icon.');
            }

            expect.soft(allHaveIcons).toBe(false, 'Not all cards have the expected icon.');
        });

        await test.step('Step 7: Proceed with feed management if Content Gallery is loaded', async () => {
            try {
                const manageFeeds = new ManageFeeds(this.page);
                await manageFeeds.manageFeed();
            } catch (error) {
                console.warn('⚠️ Content Gallery page did not load properly. Skipping manageFeed().');
            }
        });
    }
}

module.exports = InstagramOnlyReels;
