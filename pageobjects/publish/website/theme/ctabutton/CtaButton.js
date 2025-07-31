import { test, expect } from '@playwright/test';
import CreateWebsite from '../../createwebsite/CreateWebsite';

class CtaButton {
    constructor(page) {
        this.page = page;
        this.productCta = page.locator("//a[@data-rr-ui-event-key='cta']");
        this.toggleBtn = page.locator("(//input[@id='inherit_'])[2]");
        this.text = page.locator('#cta_title');
        this.fontColor = page.locator('#cate_font_color');
        this.fontColorClose = page.locator("label[for='cate_font_color']");
        this.fontSize = page.locator("(//input[@id='radius_range'])[3]");
        this.products = page.locator("//button[normalize-space()='Products']");
        this.productTitleColor = page.locator('#pro_title_col');
        this.productTitleColorClose = page.locator("label[for='pro_title_col']");
        this.radius = page.locator("(//input[@name='range'])[7]");
        this.priceColor = page.locator('#price_color');
        this.priceColorClose = page.locator("label[for='price_color']");
        this.priceRadius = page.locator("(//input[@name='range'])[8]");
        this.button = page.locator("//button[normalize-space()='Button']");
        this.btnText = page.locator('#btn_text');
        this.btnFontColor = page.locator('#shop_btn_color');
        this.btnFontColorClose = page.locator("label[for='shop_btn_color']");
        this.btnBackgroundColor = page.locator('#shop_btn_bg');
        this.btnBackgroundColorClose = page.locator("label[for='shop_btn_bg']");
        this.btnFontSize = page.locator('#shop_btn_size');
        this.hotspot = page.locator("//button[normalize-space()='Hotspot']");
        this.hotspotBG = page.locator('#hotspot_bg');
        this.hotspotBGClose = page.locator("label[for='hotspot_bg']");
        this.hotspotFontColor = page.locator('#hotspot_text_color');
        this.hotspotFontColorClose = page.locator("label[for='hotspot_text_color']");
        this.saveSetting = page.locator('#saveSetting');
        this.saveMsg = page.locator("//div[contains(text(),'Website updated successfully.')]");
    }

    async moveSlider(locator, offset = 90) {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        const box = await locator.boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(box.x + box.width / 2 + offset, box.y + box.height / 2, { steps: 10 });
            await this.page.mouse.up();
        }
    }

    async fillColor(inputLocator, closeLocator, hexColor) {
        await inputLocator.waitFor({ state: 'visible' });
        await inputLocator.click();
        await inputLocator.press('Control+A');
        await inputLocator.press('Backspace');
        await inputLocator.type(hexColor);
        await closeLocator.waitFor({ state: 'visible' });
        await closeLocator.click();
    }

    async ctaButton() {
        const createWebsite = new CreateWebsite(this.page);
        const dynamicName = 'ModernCard';

        await test.step("Create a website with name 'ModernCard'", async () => {
            await createWebsite.createWebsite(dynamicName);
        });

        await test.step("Configure Product CTA section", async () => {
            await this.page.waitForTimeout(3000);
            await this.productCta.waitFor({ state: 'visible' });
            await this.productCta.click();

            await this.toggleBtn.waitFor({ state: 'visible' });
            await this.toggleBtn.click();

            await this.text.waitFor({ state: 'visible' });
            await this.text.clear();
            await this.text.fill('Taggbox Product');

            await this.fillColor(this.fontColor, this.fontColorClose, '#e66c6c');
            await this.moveSlider(this.fontSize, 30);
        });

        await test.step("Configure Product styles", async () => {
            await this.products.waitFor({ state: 'visible' });
            await this.products.scrollIntoViewIfNeeded();
            await this.products.click();

            await this.fillColor(this.productTitleColor, this.productTitleColorClose, '#d867e0');
            await this.moveSlider(this.radius, 20);

            await this.fillColor(this.priceColor, this.priceColorClose, '#34eb6b');
            await this.moveSlider(this.priceRadius, 20);
        });

        await test.step("Configure Button styles", async () => {
            await this.button.waitFor({ state: 'visible' });
            await this.button.scrollIntoViewIfNeeded();
            await this.button.click();

            await this.btnText.waitFor({ state: 'visible' });
            await this.btnText.clear();
            await this.btnText.fill('Shop Me');

            await this.fillColor(this.btnFontColor, this.btnFontColorClose, '#7aa2ff');
            await this.fillColor(this.btnBackgroundColor, this.btnBackgroundColorClose, '#a80af7');
            await this.moveSlider(this.btnFontSize, 30);
        });

        await test.step("Configure Hotspot styles", async () => {
            await this.hotspot.waitFor({ state: 'visible' });
            await this.hotspot.scrollIntoViewIfNeeded();
            await this.hotspot.click();

            await this.fillColor(this.hotspotBG, this.hotspotBGClose, '#b92ae0');
            await this.fillColor(this.hotspotFontColor, this.hotspotFontColorClose, '#b4f53b');
        });

        await test.step("Save settings and verify success message", async () => {
            await this.saveSetting.waitFor({ state: 'visible' });
            await this.saveSetting.scrollIntoViewIfNeeded();
            await this.saveSetting.click();

            await this.saveMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.saveMsg).toHaveText('Website updated successfully.');
        });
    }
}

export default CtaButton;
