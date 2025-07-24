const { test, expect } = require('@playwright/test');

class MediaTypeVideoPrivate {
    constructor(page) {
        this.page = page;

        // Rule creation locators
        this.enterRuleName = page.locator("input[placeholder='Enter rule name']");
        this.addTrigger = page.locator('#rule-dd');
        this.mediaType = page.locator("//p[normalize-space()='Media type']");
        this.selectMediaType = page.locator("//p[normalize-space()='Select Media Type']");
        this.video = page.locator("//p[normalize-space()='Video']");
        this.closeMediaType = page.getByText('Choose the type of media');
        this.addAction = page.locator('#rule-action');
        this.private = page.locator("//span[normalize-space()='Private']");
        this.createRule = page.locator("//button[normalize-space()='Create rule']");
        this.ruleCreatedMsg = page.locator(
            "//div[contains(text(),'AutoPilot rule has been added successfully. Posts will be evaluated accordingly.')]"
        );

        // Verification locators
        this.closeIcon = page.locator('.fa-regular.fa-xmark.cursor-pointer.fs-3');
        this.privateLink = page.locator(".nav-link[data-rr-ui-event-key='private']");
        this.privateMsg = page.locator("//h2[contains(text(),'🔒 Whoa, Everything’s Private!')]");

        // Reusable locator
        this.cardLocator = page.locator("//div[@class='border-0 card']");
    }

    async mediaTypeVideoPrivate() {
        await test.step('Fill in the rule name', async () => {
            await this.page.waitForTimeout(4000);
            await this.enterRuleName.waitFor({ state: 'visible' });
            await this.enterRuleName.fill('Rule 2');
        });

        await test.step('Select trigger - Media Type > Video', async () => {
            await this.addTrigger.click();
            await this.mediaType.click();
            await this.selectMediaType.click();
            await this.video.click();
            await this.closeMediaType.click();
        });

        await test.step('Add action - Mark post as Private', async () => {
            await this.addAction.click();
            await this.private.click();
        });

        await test.step('Click "Create Rule" and verify success message', async () => {
            await this.createRule.click();
            await expect.soft(this.ruleCreatedMsg).toHaveText(
                'AutoPilot rule has been added successfully. Posts will be evaluated accordingly.',
                { timeout: 5000 }
            );
        });
    }

    async verifyMediaPostIsPrivate() {
        await test.step('Close preview modal', async () => {
            await this.page.waitForTimeout(4000);
            await this.closeIcon.waitFor({ state: 'visible' });
            await this.closeIcon.click();
        });

        await test.step('Navigate to the "Private" tab', async () => {
            await this.privateLink.waitFor({ state: 'visible' });
            await this.privateLink.click();
             await this.page.waitForTimeout(5000);
        });

        await test.step('Verify all cards contain the video play icon (media type)', async () => {
            const locatorSelector = "i.fa-regular.fa-circle-play.filter-shadow";
            const cards = await this.cardLocator.all();

            let allCardsHaveLocator = true;

            for (const [index, card] of cards.entries()) {
                const iconCount = await card.locator(locatorSelector).count();

                if (iconCount === 0) {
                    const cardContent = await card.innerText();
                    console.error(`❌ Locator '${locatorSelector}' not found in card ${index + 1}:\n${cardContent}`);
                    allCardsHaveLocator = false;
                } else {
                    console.log(`✅ Locator found in card ${index + 1}`);
                }
            }

            expect.soft(allCardsHaveLocator).toBe(
                true,
                `The locator '${locatorSelector}' was not found in all cards.`
            );
        });
    }
}

module.exports = MediaTypeVideoPrivate;
