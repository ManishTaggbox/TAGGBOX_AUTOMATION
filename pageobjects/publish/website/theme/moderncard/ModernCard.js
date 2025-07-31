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
        this.saveMsg = page.locator("//div[contains(text(),'Website updated successfully.')]")
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

    //  await test.step('Click Publish and Website menu', async () => {
    //         await this.card.waitFor({ state: 'visible', timeout: 10000 });
    //         await this.card.click();
    //         await this.page.waitForTimeout(2000);
    //     });

    async modernCard() {
        const createWebsite = new CreateWebsite(this.page);
        const dynamicName = 'ModernCard';

        await test.step("Create a website with name 'ModernCard'", async () => {
            await createWebsite.createWebsite(dynamicName);
        });

        await test.step("Click on 'Modern Card' button", async () => {
            await this.modernCardBtn.waitFor({ state: 'visible' });
            await this.modernCardBtn.click();
        });

        await test.step("Click on 'Customization' tab", async () => {
            await this.customization.waitFor({ state: 'visible' });
            await this.customization.click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Toggle card style", async () => {
            await this.page.waitForTimeout(2000);
            await this.cardToggle.waitFor({ state: 'visible' });
            await this.cardToggle.click();
        });

        await test.step("Open font family dropdown", async () => {
            await this.fontFamily.waitFor({ state: 'visible' });
            await this.fontFamily.click();
        });

        await test.step("Select 'Rochester' font", async () => {
            await this.selectRochester.waitFor({ state: 'visible' });
            await this.selectRochester.click();
        });

         await test.step(`Set font color to`, async () => {
            await this.fontColor.click();
            await this.fontColor.press('Control+A');  // or 'Meta+A' on Mac
            await this.fontColor.press('Backspace');
            await this.fontColor.type('#cca591');
            await this.fontColorClose.click();

        });

        await test.step(`Move font size slider px`, async () => {
            await this.moveSlider(this.fontSize, 20);
            await this.page.waitForTimeout(2000);
        });

        await test.step(`Move card radius slider px`, async () => {
            await this.moveSlider(this.cardRadius, 10);
            await this.page.waitForTimeout(2000);
        });

        await test.step(`Set card color to  and save settings`, async () => {
           await this.cardColor.click();
            await this.cardColor.press('Control+A');  // or 'Meta+A' on Mac
            await this.cardColor.press('Backspace');
            await this.cardColor.type('#704c60');
            await this.cardColorClose.click();

        });
        await test.step('Scroll and click Save to apply changes', async () => {
            await this.save.scrollIntoViewIfNeeded();
            await this.save.click();
        });

        await test.step("Wait for success message and validate", async () => {
            await this.saveMsg.waitFor({ state: 'visible', timeout: 20000 });
            await expect.soft(this.saveMsg).toHaveText('Website updated successfully.');
        });


    }
}

export default ModernCard;
