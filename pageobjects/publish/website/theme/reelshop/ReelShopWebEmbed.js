import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class ReelShopWebEmbed {
    constructor(page) {
        this.page = page;
        this.firstCard = page.locator("//div[@class='tb_rtp_post_in tb_icon_animate ']").first();
        this.instagramIcon = this.firstCard.locator(".tb-instagram-default.tb__icon.tb_ico_default");
        this.authorName = this.firstCard.locator(".tb_mc_authorname");
        this.authorHandle = this.firstCard.locator(".tb_mc_username");
        this.modalContent = page.locator(".tb_post_modal_content.tb-cTBfont-regular");
        this.modalPopup = page.locator(".tb_post_modal_modal_body");
        this.closePopup = page.locator(".tb_post_modal_close_btn");
    }

    // Helper method to get computed styles efficiently
    async getComputedStyles(element, properties) {
        return await element.evaluate((el, props) => {
            const styles = getComputedStyle(el);
            const result = {};
            props.forEach(prop => {
                result[prop] = styles[prop];
            });
            return result;
        }, properties);
    }

    async validateModalStyles(modalContent, modalPopup) {
        const [modalStyles, popupStyles] = await Promise.all([
            this.getComputedStyles(modalContent, ['fontSize', 'fontFamily', 'color']),
            this.getComputedStyles(modalPopup, ['backgroundColor'])
        ]);

        console.log("Font size:", modalStyles.fontSize);
        console.log("Font family:", modalStyles.fontFamily);
        console.log("Font color:", modalStyles.color);
        console.log("Popup background color:", popupStyles.backgroundColor);

        expect.soft(modalStyles.fontSize).toBe('38px');
        expect.soft(modalStyles.fontFamily.toLowerCase()).toContain('rochester');
        expect.soft(modalStyles.color).toBe('rgb(204, 204, 170)');
        expect.soft(popupStyles.backgroundColor).toBe('rgb(119, 0, 68)');
    }

    async reelShopWebEmbed() {
        await test.step('Generate embed code for Modern Card', async () => {
            const generateCode = new GenerateCode(this.page);
            await generateCode.generateCode();
        });

        await test.step('Check card border-radius', async () => {
            const borderStyles = await this.getComputedStyles(this.firstCard, [
                'borderTopLeftRadius',
                'borderTopRightRadius', 
                'borderBottomRightRadius',
                'borderBottomLeftRadius'
            ]);

            console.log(`Top-Left: ${borderStyles.borderTopLeftRadius}, Top-Right: ${borderStyles.borderTopRightRadius}, Bottom-Right: ${borderStyles.borderBottomRightRadius}, Bottom-Left: ${borderStyles.borderBottomLeftRadius}`);

           
            Object.values(borderStyles).forEach(radius => {
                expect.soft(radius).toBe('27px');
            });
        });

        await test.step('Click card and validate popup styles', async () => {
            await this.firstCard.click();
            
            await test.step('CTA Button Style ', async () => {
                const ctaButtonWebEmbed = new CtaButtonWebEmbed(this.page);
                await ctaButtonWebEmbed.ctaButtonWebEmbed();
            });
            
            await expect.soft(this.modalContent).toBeVisible();

            await this.validateModalStyles(this.modalContent, this.modalPopup);
            
            await this.closePopup.click();
        });

        await this.page.waitForTimeout(5000);
    }
}

export default ReelShopWebEmbed;