import { test, expect } from '@playwright/test';
import CreateWebsite from '../../createwebsite/CreateWebsite';

class CtaButton {
    constructor(page) {
        this.page = page;
    }

    get productCta() { return this.page.locator("//a[@data-rr-ui-event-key='cta']"); }
    get toggleBtn() { return this.page.locator("(//input[@id='inherit_'])[2]"); }
    get text() { return this.page.locator('#cta_title'); }
    get fontColor() { return this.page.locator('#cate_font_color'); }
    get fontColorClose() { return this.page.locator("label[for='cate_font_color']"); }
    get fontSize() { return this.page.locator("(//input[@id='radius_range'])[3]"); }
    get products() { return this.page.locator("//button[normalize-space()='Products']"); }
    get productTitleColor() { return this.page.locator('#pro_title_col'); }
    get productTitleColorClose() { return this.page.locator("label[for='pro_title_col']"); }
    get radius() { return this.page.locator("(//input[@name='range'])[7]"); }
    get priceColor() { return this.page.locator('#price_color'); }
    get priceColorClose() { return this.page.locator("label[for='price_color']"); }
    get priceRadius() { return this.page.locator("(//input[@name='range'])[8]"); }
    get button() { return this.page.locator("//button[normalize-space()='Button']"); }
    get btnText() { return this.page.locator('#btn_text'); }
    get btnFontColor() { return this.page.locator('#shop_btn_color'); }
    get btnFontColorClose() { return this.page.locator("label[for='shop_btn_color']"); }
    get btnBackgroundColor() { return this.page.locator('#shop_btn_bg'); }
    get btnBackgroundColorClose() { return this.page.locator("label[for='shop_btn_bg']"); }
    get btnFontSize() { return this.page.locator('#shop_btn_size'); }
    get hotspot() { return this.page.locator("//button[normalize-space()='Hotspot']"); }
    get hotspotBG() { return this.page.locator('#hotspot_bg'); }
    get hotspotBGClose() { return this.page.locator("label[for='hotspot_bg']"); }
    get hotspotFontColor() { return this.page.locator('#hotspot_text_color'); }
    get hotspotFontColorClose() { return this.page.locator("label[for='hotspot_text_color']"); }
    get saveSetting() { return this.page.locator('#saveSetting'); }
    get saveMsg() { return this.page.locator("//div[contains(text(),'Website updated successfully.')]"); }

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
