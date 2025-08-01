import { test, expect } from '@playwright/test';
import CreateWebsite from '../../createwebsite/CreateWebsite';

class ModernCard {
    constructor(page) {
        this.page = page;
        this.modernCardBtn = page.locator("//p[normalize-space()='Modern Card']");
        this.customization = page.locator("//a[@data-rr-ui-event-key='customization']");
        this.cardToggle = page.locator("(//input[@id='inherit_'])[1]");
        this.fontFamily = page.locator("//span[@class='sGFfonte-Inter']");
        this.selectRochester = page.locator("(//span[contains(@class,'sGFfonte-Rochester')][normalize-space()='Rochester'])[1]");
        this.fontColor = page.locator("//input[@id='font_color']");
        this.fontColorClose = page.locator("//label[@for='font_color']");
        this.fontSize = page.locator("//input[@id='font_size']");
        this.cardRadius = page.locator("//input[@id='radius_range' and @min='0']");
        this.cardColor = page.locator('#card_color');
        this.cardColorClose = page.locator("label[for='card_color']");
        this.moreActions = page.locator("//button[normalize-space()='More actions']");
        this.save = page.locator('#saveSetting');
        this.saveMsg = page.locator("//div[contains(text(),'Website updated successfully.')]");
    }

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

    async modernCard() {
        const createWebsite = new CreateWebsite(this.page);
        const dynamicName = 'ModernCard';

        await test.step("Create a website with name 'ModernCard'", async () => {
            await createWebsite.createWebsite(dynamicName);
        });

        await test.step("Click on 'Modern Card' button", async () => {
            await this.waitForElementAndClick(this.modernCardBtn);
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

        await test.step("Save settings and validate success", async () => {
            await this.save.waitFor({ state: 'visible', timeout: 10000 });
            await this.save.scrollIntoViewIfNeeded();
            await this.save.click();
            
            await this.saveMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.saveMsg).toHaveText('Website updated successfully.');
        });
    }
}

export default ModernCard;
