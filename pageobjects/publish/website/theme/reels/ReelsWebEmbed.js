import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class ReelsWebEmbed {
    constructor(page) {
        this.page = page;
        this.firstCard = page.locator("//div[@class='tb_rt_post_in tb_icon_animate ']").first();
        this.instagramIcon = this.firstCard.locator(".tb-instagram-default.tb__icon.tb_ico_default");
        this.authorName = this.firstCard.locator(".tb_mc_authorname");
        this.authorHandle = this.firstCard.locator(".tb_mc_username");
        this.heartIcon = this.firstCard.locator(".tb_social_action_ico__.tb__icon.tb-heart-outline");
        this.modalContent = page.locator(".tb_post_modal_content.tb-cTBfont-regular");
        this.modalPopup = page.locator(".tb_post_modal_modal_body");
        this.closePopup = page.locator(".tb_post_modal_close_btn");
    }

    async reelsWebEmbed() {
        await test.step('Generate embed code for Modern Card', async () => {
            const generateCode = new GenerateCode(this.page);
            await generateCode.generateCode();
        });

        await test.step('Check card border-radius', async () => {
            const topLeft = await this.firstCard.evaluate(el => getComputedStyle(el).borderTopLeftRadius);
            const topRight = await this.firstCard.evaluate(el => getComputedStyle(el).borderTopRightRadius);
            const bottomRight = await this.firstCard.evaluate(el => getComputedStyle(el).borderBottomRightRadius);
            const bottomLeft = await this.firstCard.evaluate(el => getComputedStyle(el).borderBottomLeftRadius);

            console.log(`Top-Left: ${topLeft}, Top-Right: ${topRight}, Bottom-Right: ${bottomRight}, Bottom-Left: ${bottomLeft}`);

            expect.soft(topLeft).toBe('27px');
            expect.soft(topRight).toBe('27px');
            expect.soft(bottomRight).toBe('27px');
            expect.soft(bottomLeft).toBe('27px');
        });

        await test.step("Hover first card and check if Instagram icon is present", async () => {
            await this.firstCard.hover();
            const isVisible = await this.instagramIcon.isVisible();
            console.log("Is Instagram icon visible after hover:", isVisible);
            expect.soft(isVisible).toBe(true);
        });
        await test.step('Click card and validate popup styles', async () => {
            await this.firstCard.click();
            await test.step('CTA Button Style ', async () => {
                const ctaButtonWebEmbed = new CtaButtonWebEmbed(this.page);
                await ctaButtonWebEmbed.ctaButtonWebEmbed();
            });
            await expect.soft(this.modalContent).toBeVisible();

            const fontSize = await this.modalContent.evaluate(el => getComputedStyle(el).fontSize);
            console.log("Font size:", fontSize);
            expect.soft(fontSize).toBe('38px');

            const fontFamily = await this.modalContent.evaluate(el => getComputedStyle(el).fontFamily);
            console.log("Font family:", fontFamily);
            expect.soft(fontFamily.toLowerCase()).toContain('rochester');

            const fontColor = await this.modalContent.evaluate(el => getComputedStyle(el).color);
            console.log("Font color:", fontColor);
            expect.soft(fontColor).toBe('rgb(204, 204, 170)');

            const popupBgColor = await this.modalPopup.evaluate(el => getComputedStyle(el).backgroundColor);
            console.log("Popup background color:", popupBgColor);
            expect.soft(popupBgColor).toBe('rgb(119, 0, 68)');
            await this.closePopup.click();
        });


        await this.page.waitForTimeout(10000);
    }
}

export default ReelsWebEmbed;
