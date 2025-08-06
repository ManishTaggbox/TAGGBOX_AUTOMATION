import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class CollageWebEmbed {
    constructor(page) {
        this.page = page;

        // Core locators
        this.firstCard = page.locator("//div[@class='tb_gt_post_in tb_gt_post_ani']").first();
        this.shoppingIcon = this.firstCard.locator("//div[@class='tb_shop_ico tb__icon tb-bag']");
        this.instagramIcon = this.firstCard.locator("//div[@class='tb_gt_social__ico tb__icon tb-instagram']");
        this.authorName = page.locator("//a[normalize-space()='raisr_sanchi']");
        this.authorHandle = page.locator("//div[@class='tb_post_modal_author_handlename tb-cTBfont-']");
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

    async collageWebEmbed() {
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
        await test.step('Check Shopping Icon visibility', async () => {
            await expect.soft(this.shoppingIcon).toBeVisible();
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
            await test.step('Check author name styles', async () => {
                await expect.soft(this.authorName).toHaveText('raisr_sanchi');

                await this.validateFontStyles(this.authorName, {
                    fontFamily: 'rochester',
                    color: 'rgb(85, 238, 238)'
                }, 'Author');
            });

            await test.step('Check author handle styles', async () => {
                await expect.soft(this.authorHandle).toHaveText('@raisr_sanchi');

                await this.validateFontStyles(this.authorHandle, {
                    fontFamily: 'rochester',
                    color: 'rgb(85, 238, 238)'
                }, 'Handle font');
            });

            await expect.soft(this.modalContent).toBeVisible();

            const [modalStyles, popupStyles] = await Promise.all([
                this.getComputedStyles(this.modalContent, ['fontSize', 'fontFamily', 'color']),
                this.getComputedStyles(this.modalPopup, ['backgroundColor'])
            ]);

            console.log("Font size:", modalStyles.fontSize);
            console.log("Font family:", modalStyles.fontFamily);
            console.log("Font color:", modalStyles.color);
            console.log("Popup background color:", popupStyles.backgroundColor);

            expect.soft(modalStyles.fontSize).toBe('38px');
            expect.soft(modalStyles.fontFamily.toLowerCase()).toContain('rochester');
            expect.soft(modalStyles.color).toBe('rgb(204, 204, 170)');
            expect.soft(popupStyles.backgroundColor).toBe('rgb(119, 0, 68)');

            await this.closePopup.click();
        });

        await test.step("Navigate slider arrows: Next (3x) and Previous (3x)", async () => {

            await this.navigateSlider(this.nextArrow, 3, 'next');

            await this.navigateSlider(this.prevArrow, 3, 'previous');

            console.log("Completed 3 next and 3 previous arrow clicks");
        });

        await this.page.waitForTimeout(5000);
    }

    async navigateSlider(arrowElement, count, direction) {
        for (let i = 0; i < count; i++) {
            await arrowElement.click();
            await this.page.waitForTimeout(500);
        }
    }

}

export default CollageWebEmbed;