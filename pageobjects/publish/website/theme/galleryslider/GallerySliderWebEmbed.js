import { test, expect } from '@playwright/test';
import GenerateCode from '../themeutils/GenerateCode';
import CtaButtonWebEmbed from '../ctabutton/CtaButtonWebEmbed';

class GallerySliderWebEmbed {
    constructor(page) {
        this.page = page;
        this.firstCard = page.locator("//div[@class='tb_cst_post_in tb_cst_media_post']").first();
       
    }

    async gallerySliderWebEmbed() {
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

      


        await this.page.waitForTimeout(10000);
    }
}

export default GallerySliderWebEmbed;
