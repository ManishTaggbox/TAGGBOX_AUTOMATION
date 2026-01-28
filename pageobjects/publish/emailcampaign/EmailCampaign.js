import { test, expect } from '@playwright/test';

class EmailCampaign {
    constructor(page) {
        this.page = page;
        this.addChannel = page.locator('.my-3.btn.btn-primary.btn-md');
        this.selectPublish = page.locator("(//button[@id='rule-action'])[1]");
        this.selectEmailCampaign = page.locator("//span[normalize-space()='Email Campaign']");
        this.publishbtn = page.locator('#web_save_btn')
        this.emptyChannelNameErrorMsg = page.locator('.invalid-feedback');
        this.enterChannelName = page.locator('#g_name');
        this.sucessMsg = page.locator("//div[contains(text(),'Email Campaign created successfully.')]");

        // Edit Email Campaign 
        this.edit = page.locator('.flex-column.f-center.px-3.py-0.card-body');
        this.spacing = page.locator("//input[@id='mail_range']");
        this.layout = page.locator("//p[normalize-space()='2X3 Grid']");
        this.saveAndPublish = page.locator("//button[@id='mail_save_btn']");
        this.fillGridError = page.locator('#mail_select_e');
        this.cards = page.locator("//div[@class='position-relative mb-1 cursor-pointer mail_media_'] ");
        this.saveAndPublishMsg = page.locator("//div[contains(text(),'Email campaign updated successfully.')]");

        //Email 
        this.email = page.locator("//button[@class='text-gray-700 fs-6 GetShareCode btn btn-link']");
        this.add = page.locator("//button[normalize-space()='Add']");
        this.validEmail = page.locator("//div[@class='invalid-feedback d-block']");
        this.enterEmail = page.locator("//input[@placeholder='example@example.com']");
        this.shareCode = page.locator("//button[normalize-space()='Share Code']");
        this.emailSentMsg = page.locator("//div[contains(text(),'Code successfully shared.')]");

        //Preview 
        this.previewbtn = page.locator("//a[@id='left-tabs-example-tab-preview']");
        this.padding = page.locator("//span[contains(@class, 'media_col')]");

        //delete
        this.editClick = page.locator("//i[@class='fa-regular fa-ellipsis-vertical me-0']");
        this.delete = page.locator("//a[normalize-space()='Delete']");
        this.yesDeleteIT = page.locator("//button[normalize-space()='Yes, Delete it']")
        this.emailCampaignDeleteMsg = page.locator("//div[contains(text(),'Email campaign deleted successfully.')]");
    }

    async emailCampaign() {
        await test.step("Step 1: Create Email Campaign", async () => {
            await this.createEmailCampaign();
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 2: Edit Email Campaign", async () => {
            await this.editEmailCapaign();
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 3: Email Send Code Email Campaign", async () => {
            await this.emailSend();
            await this.page.waitForTimeout(2000);

        });
        await test.step("Step 4: Check Preview Email Campaign ", async () => {
            await this.preview();


        });
    }

    async createEmailCampaign() {
        await test.step("Step 1.1: Click 'Add Channel' button", async () => {
            await this.addChannel.waitFor({ state: 'visible', timeout: 15000 });
            await this.addChannel.click();
        });

        await test.step("Step 1.2: Select 'Publish' option", async () => {
            await this.selectPublish.waitFor({ state: 'visible', timeout: 15000 });
            await this.selectPublish.click();
        });

        await test.step("Step 1.3: Select 'Email Campaign' option", async () => {
            await this.selectEmailCampaign.waitFor({ state: 'visible', timeout: 15000 });
            await this.selectEmailCampaign.click();
        });

        await test.step("Step 1.4: Try to publish without entering channel name", async () => {
            await this.publishbtn.waitFor({ state: 'visible', timeout: 15000 });
            await this.publishbtn.click();

            await this.emptyChannelNameErrorMsg.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.emptyChannelNameErrorMsg).toHaveText('Please enter a name');
        });

        await test.step("Step 1.5: Enter channel name and publish", async () => {
            await this.enterChannelName.waitFor({ state: 'visible', timeout: 15000 });
            await this.enterChannelName.fill('EmailCampaign');

            await this.publishbtn.waitFor({ state: 'visible', timeout: 15000 });
            await this.publishbtn.click();
        });

        await test.step("Step 1.6: Wait for success message and validate", async () => {
            await this.sucessMsg.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.sucessMsg).toHaveText('Email Campaign created successfully.');
        });
    }

    async editEmailCapaign() {
        // await test.step("Step 0: Click on Edit button", async () => {
        //     await this.edit.waitFor({ state: 'visible', timeout: 5000 });
        //     await this.edit.click();
        // });

        await test.step("Step 1: Move spacing slider", async () => {
            await this.spacing.waitFor({ state: 'visible', timeout: 15000 });
            const box = await this.spacing.boundingBox();
            if (box) {
                await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                await this.page.mouse.down();
                await this.page.mouse.move(box.x + box.width / 2 + 90, box.y + box.height / 2, { steps: 10 });
                await this.page.mouse.up();
            }
            await this.page.waitForTimeout(2000);
        });

        await test.step("Step 2: Click layout and publish button", async () => {
            await this.layout.waitFor({ state: 'visible', timeout: 15000 });
            await this.layout.click();
            await this.saveAndPublish.waitFor({ state: 'visible', timeout: 15000 });
            await this.saveAndPublish.scrollIntoViewIfNeeded();
            await this.saveAndPublish.click();
        });

        await test.step("Step 3: Validate fill grid error", async () => {
            await this.fillGridError.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.fillGridError).toHaveText("*Please select posts and fill the grid to continue");
        });

        await test.step("Step 4: Select up to 6 cards", async () => {
            await this.cards.first().waitFor({ state: 'visible', timeout: 15000 });
            const count = await this.cards.count();
            const maxClicks = Math.min(count, 6);
            for (let i = 0; i < maxClicks; i++) {
                await this.cards.nth(i).click();
                await this.page.waitForTimeout(1000);
            }
        });

        await test.step("Step 5: Save and validate success message", async () => {
            await this.saveAndPublish.waitFor({ state: 'visible', timeout: 15000 });
            await this.saveAndPublish.scrollIntoViewIfNeeded();
            await this.saveAndPublish.click();

            await this.saveAndPublishMsg.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.saveAndPublishMsg).toHaveText("Email campaign updated successfully.");
        });
    }
    async emailSend() {
        await test.step("Step 1: Open Email Tab", async () => {
            await this.email.waitFor({ state: 'visible', timeout: 15000 });
            await this.email.scrollIntoViewIfNeeded();
            await this.email.click();
        });

        await test.step("Step 2: Click Add without input to trigger validation", async () => {
            await this.add.waitFor({ state: 'visible', timeout: 15000 });
            await this.add.click();

            await this.validEmail.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.validEmail).toHaveText("Enter valid email.");
        });

        await test.step("Step 3: Enter first email and click Add", async () => {
            await this.enterEmail.waitFor({ state: 'visible', timeout: 15000 });
            await this.enterEmail.fill("manish.s@taggbox.com");
            await this.add.click();
        });

        await test.step("Step 4: Enter second email and click Add", async () => {
            await this.enterEmail.fill("manish.s+1@taggbox.com");
            await this.add.click();
        });

        await test.step("Step 5: Click Share Code and verify success", async () => {
            await this.shareCode.waitFor({ state: 'visible', timeout: 15000 });
            await this.shareCode.click();

            await this.emailSentMsg.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.emailSentMsg).toHaveText("Code successfully shared.");
        });
    }


    async preview() {
        await test.step("Step 1: Click preview tab", async () => {

            await this.previewbtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.previewbtn.click();
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 2: Check padding values", async () => {

            const locatorStrategies = [
                "span.col.media_col",
                ".col.media_col",
                "//span[contains(@class, 'col') and contains(@class, 'media_col')]",
                "//span[@class='col media_col']",
                ".media_col"
            ];

            let paddingElement = null;
            let elementCount = 0;


            for (const strategy of locatorStrategies) {
                try {
                    const locator = this.page.locator(strategy);
                    elementCount = await locator.count();
                    console.log(`Strategy "${strategy}" found ${elementCount} elements`);

                    if (elementCount > 0) {

                        await locator.first().waitFor({ state: 'visible', timeout: 15000 });
                        paddingElement = locator.first();
                        console.log(`Successfully found element using strategy: ${strategy}`);
                        break;
                    }
                } catch (error) {
                    console.log(`Strategy "${strategy}" failed: ${error.message}`);
                    continue;
                }
            }

            if (!paddingElement || elementCount === 0) {
                console.log("No padding elements found with any strategy. Available elements:");

                const allSpans = await this.page.locator('span').count();
                console.log(`Total span elements on page: ${allSpans}`);


                const mediaColElements = await this.page.locator('[class*="media_col"]').count();
                console.log(`Elements with 'media_col' in class: ${mediaColElements}`);

                throw new Error("No suitable padding elements found on the page");
            }

            console.log(`Found ${elementCount} padding elements using working strategy`);


            const paddings = await Promise.all([
                paddingElement.evaluate(el => getComputedStyle(el).paddingTop).catch(() => "0px"),
                paddingElement.evaluate(el => getComputedStyle(el).paddingRight).catch(() => "0px"),
                paddingElement.evaluate(el => getComputedStyle(el).paddingBottom).catch(() => "0px"),
                paddingElement.evaluate(el => getComputedStyle(el).paddingLeft).catch(() => "0px")
            ]);


            const sides = ["Top", "Right", "Bottom", "Left"];
            for (let i = 0; i < sides.length; i++) {
                console.log(`Padding ${sides[i]}: ${paddings[i]}`);
            }

            const expectedPadding = "8.5px";
            const isPaddingCorrect = paddings.every(padding => padding === expectedPadding);

            if (isPaddingCorrect) {
                console.log("Test case passed: All padding values are correct");
                expect(isPaddingCorrect).toBe(true);
            } else {
                console.log(`Test case failed: Expected ${expectedPadding}, but got ${paddings.join(', ')}`);

                expect.soft(isPaddingCorrect).toBe(true);
            }
        });
    }

    async deleteEmailCampaign() {
        await test.step("Step 1: Click Edit on the campaign", async () => {
            await this.page.waitForTimeout(3000);
            await this.editClick.waitFor({ state: 'visible', timeout: 15000 });
            await this.editClick.click();
        });

        await test.step("Step 2: Click Delete button", async () => {
            await this.delete.waitFor({ state: 'visible', timeout: 15000 });
            await this.delete.click();
        });

        await test.step("Step 3: Confirm deletion", async () => {
            await this.yesDeleteIT.waitFor({ state: 'visible', timeout: 15000 });
            await this.yesDeleteIT.click();
        });

        await test.step("Step 4: Validate success message", async () => {
            await this.emailCampaignDeleteMsg.waitFor({ state: 'visible', timeout: 15000 });
            await expect.soft(this.emailCampaignDeleteMsg).toHaveText("Email campaign deleted successfully.");
        });
    }


}
export default EmailCampaign;
