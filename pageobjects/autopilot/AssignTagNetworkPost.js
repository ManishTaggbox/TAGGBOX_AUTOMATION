import { test, expect } from '@playwright/test';
import { AUTOPILOTASSIGNTAG } from '../utils/constant.js';

class AssignTagNetworkPost {
    constructor(page) {
        this.page = page;
        this.editRule = page.locator('#edit_0');
        this.addAction = page.locator("div[class='w-100 text-center dropdown'] i[class='fa-light fa-circle-plus text-muted me-0 fs-4']");
        this.assignTag = page.locator('.menu-title');
        this.enterTag = page.locator('.selectpicker__input-container.css-19bb58m input');

        this.updatePlan = page.locator("//button[normalize-space()='Update rule']");
        this.successMsg = page.locator("//div[contains(text(),'AutoPilot rule successfully updated.')]");

        //VerifyAutoPilot Locator 

        this.closeIcon = page.locator('.fa-regular.fa-xmark.cursor-pointer.fs-3');
    }

    async assignTagNetworkPost() {
        const tagName = AUTOPILOTASSIGNTAG.ASSIGNTAG;
        const createTag = this.page.locator(`//div[contains(text(), 'Create "${tagName}"')]`);

        await test.step('Edit existing rule', async () => {
            await this.page.waitForTimeout(5000);
            await this.editRule.waitFor({ state: 'visible' });
            await this.editRule.click();
        });

        await test.step('Add Action - Assign Tag', async () => {
            await this.addAction.waitFor({ state: 'visible' });
            await this.addAction.click();

            await this.assignTag.waitFor({ state: 'visible' });
            await this.assignTag.click();

            await this.enterTag.waitFor({ state: 'visible' });
            await this.enterTag.fill(tagName);

            await createTag.waitFor({ state: 'visible' });
            await createTag.click();
        });

        await test.step('Click Update Rule button', async () => {
            await this.updatePlan.waitFor({ state: 'visible' });
            await this.updatePlan.click();
        });

        await test.step('Verify update success message', async () => {
            await this.successMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.successMsg).toHaveText(
                'AutoPilot rule successfully updated.',
                { timeout: 5000 }
            );
        });
    }

    async verifyAssignTag() {
        await test.step('Close preview modal', async () => {
            await this.page.waitForTimeout(5000);
            await this.closeIcon.waitFor({ state: 'visible' });
            await this.closeIcon.click();
            await this.page.waitForTimeout(5000);
        });

        const expectedTag = AUTOPILOTASSIGNTAG.ASSIGNTAG;

        await test.step('Verify tag exists on all cards', async () => {
            const cards = await this.page.locator("//div[@class='border-0 card']").all();

            let allCardsHaveTag = true;

            for (const [index, card] of cards.entries()) {
                await test.step(`Check card ${index + 1}`, async () => {
                    const badges = await card.locator(".badge-outline-secondary.border.badge").all();
                    let cardHasTag = false;

                    for (const badge of badges) {
                        const badgeText = await badge.textContent();
                        console.log(`Badge Text: ${badgeText}`);

                        if (badgeText.trim() === expectedTag) {
                            cardHasTag = true;
                            console.log(`✅ Found tag '${expectedTag}' in card ${index + 1}`);
                            break;
                        }
                    }

                    if (!cardHasTag) {
                        const cardContent = await card.innerText();
                        console.error(`❌ Tag '${expectedTag}' not found in card ${index + 1}:\n${cardContent}`);
                        allCardsHaveTag = false;
                    }
                });
            }

            // Final soft assertion outside loop
            expect.soft(allCardsHaveTag).toBe(true, `The tag '${expectedTag}' was not found in all cards.`);
        });
    }

}

export default AssignTagNetworkPost;
