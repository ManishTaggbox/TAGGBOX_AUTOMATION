import { test, expect } from '@playwright/test';
import CreateWebsite from '../../createwebsite/CreateWebsite';

class ReelShop {
    constructor(page) {
        this.page = page;
    }

    get reelShopBtn() { return this.page.locator("//p[normalize-space()='Reel Shop']"); }
    get customization() { return this.page.locator("//a[@data-rr-ui-event-key='customization']"); }
    get cardToggle() { return this.page.locator("(//input[@id='inherit_'])[1]"); }
    get fontFamily() { return this.page.locator("//span[@class='sGFfonte-Open Sans']"); }
    get selectRochester() { return this.page.locator("(//span[contains(@class,'sGFfonte-Rochester')][normalize-space()='Rochester'])[1]"); }
    get fontColor() { return this.page.locator("//input[@id='font_color']"); }
    get fontColorClose() { return this.page.locator("//label[@for='font_color']"); }
    get fontSize() { return this.page.locator("//input[@id='font_size']"); }
    get cardRadius() { return this.page.locator("//input[@id='radius_range' and @min='0']"); }
    get cardColor() { return this.page.locator('#card_color'); }
    get cardColorClose() { return this.page.locator("label[for='card_color']"); }
    get authorColor() { return this.page.locator('#author_color'); }
    get authorColorClose() { return this.page.locator("label[for='author_color']"); }
    get socialActions() { return this.page.locator('#social_actions'); }
    get moreActions() { return this.page.locator("//button[normalize-space()='More actions']"); }
    get autoslide() { return this.page.locator('#Autoslide_'); }
    get save() { return this.page.locator('#saveSetting'); }
    get saveMsg() { return this.page.locator("//div[contains(text(),'Website updated successfully.')]"); }

    async waitForElementAndClick(locator, stepName = '') {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.click();
    }

    async waitForElementAndType(locator, text, stepName = '') {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.click();
        await locator.press('Control+A');
        await locator.press('Backspace');
        await locator.type(text);
    }

    async moveSlider(locator, offset = 90) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        const box = await locator.boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(box.x + box.width / 2 + offset, box.y + box.height / 2, { steps: 10 });
            await this.page.mouse.up();
        }
    }

    async reelShop() {
        const createWebsite = new CreateWebsite(this.page);
        const dynamicName = 'ReelShop';

        await test.step("Create a website with name 'ReelShop'", async () => {
            await createWebsite.createWebsite(dynamicName);
        });

        await test.step("Click on 'ReelShop ' button", async () => {
            await this.waitForElementAndClick(this.reelShopBtn);
        });

        await test.step("Click on 'Customization' tab", async () => {
            await this.waitForElementAndClick(this.customization);
            await this.page.waitForTimeout(5000); // Allow UI to stabilize
        });

        await test.step("Toggle card style", async () => {
            await this.waitForElementAndClick(this.cardToggle);
        });

        await test.step("Open font family dropdown and select 'Rochester' font", async () => {
            await this.waitForElementAndClick(this.fontFamily);
            await this.waitForElementAndClick(this.selectRochester);
        });

        await test.step("Set font color to #cca591", async () => {
            await this.waitForElementAndType(this.fontColor, '#cca591');
            await this.waitForElementAndClick(this.fontColorClose);
        });

        await test.step("Adjust font size slider", async () => {
            await this.moveSlider(this.fontSize, 20);
        });

        await test.step("Adjust card radius slider", async () => {
            await this.moveSlider(this.cardRadius, 10);
        });

        await test.step("Set card color to #704c60", async () => {
            await this.waitForElementAndType(this.cardColor, '#704c60');
            await this.waitForElementAndClick(this.cardColorClose);
        });
        await test.step("Set Author color to #704c60", async () => {
            await this.authorColor.scrollIntoViewIfNeeded();
            await this.waitForElementAndType(this.authorColor, '#5eed05');
            await this.waitForElementAndClick(this.authorColorClose);
            await this.waitForElementAndClick(this.socialActions);
        });
        await test.step("Enable autoslide feature", async () => {
            await this.moreActions.waitFor({ state: 'visible', timeout: 10000 });
            await this.moreActions.scrollIntoViewIfNeeded();
            await this.moreActions.click();
            await this.waitForElementAndClick(this.autoslide);
        });

        await test.step("Save settings and validate success", async () => {
            await this.save.waitFor({ state: 'visible', timeout: 10000 });
            await this.save.scrollIntoViewIfNeeded();
            await this.save.click();

            await this.saveMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.saveMsg).toHaveText('Website updated successfully.');
        });
    }
}

export default ReelShop;