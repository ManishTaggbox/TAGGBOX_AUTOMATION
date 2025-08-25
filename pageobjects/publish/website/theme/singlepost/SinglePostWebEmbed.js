import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class SinglePostWebEmbed {
    constructor(page) {
        this.page = page;

        // Core locators
        this.firstCard = page.locator("//div[@class='tb_spt_post_container']").first();
        this.card = page.locator("//div[@class='tb_spt_post_media_wrapp']").first();
        this.shoppingIcon = this.card.locator("//div[@class='tb_shop_ico tb__icon tb-bag']");
        this.instagramIcon = this.card.locator("//div[@class='tb-instagram-default tb__icon tb_ico_default']");
        this.authorName = page.locator("//div[@class='tb_spt_authorname']");
        this.authorHandle = page.locator("//div[@class='tb_spt_username']");
        this.modalContent = page.locator(".tb_post_modal_content.tb-cTBfont-regular");
        this.modalPopup = page.locator(".tb_post_modal_modal_body");
        this.closePopup = page.locator(".tb_post_modal_close_btn");
        this.nextArrow = page.locator("//div[@aria-label='Next slide']");
        this.prevArrow = page.locator("//div[@aria-label='Go to last slide']");
    }

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

    async validateFontStyles(element, expectedStyles, description) {
        const styleProps = ['fontFamily', 'color'];
        if (expectedStyles.fontSize) styleProps.push('fontSize');

        const styles = await this.getComputedStyles(element, styleProps);

        console.log(`${description} font-family:`, styles.fontFamily);
        console.log(`${description} color:`, styles.color);
        if (styles.fontSize) console.log(`${description} size:`, styles.fontSize);

        expect.soft(styles.fontFamily.toLowerCase()).toContain(expectedStyles.fontFamily.toLowerCase());
        expect.soft(styles.color).toBe(expectedStyles.color);
        if (expectedStyles.fontSize) {
            expect.soft(styles.fontSize).toBe(expectedStyles.fontSize);
        }
    }

    async singlePostWebEmbed() {
        await test.step('Generate embed code for Modern Card', async () => {
            const generateCode = new GenerateCode(this.page);
            await generateCode.generateCode();
        });

        await test.step('📲 Resize page to mobile size (no new browser)', async () => {
            await this.page.setViewportSize({ width: 375, height: 812 }); // iPhone view
        });

      
     
        await this.page.waitForTimeout(5000);
    }

}

export default SinglePostWebEmbed;