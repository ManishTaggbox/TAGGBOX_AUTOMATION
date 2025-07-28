import { test, expect } from '@playwright/test';
const path = require('path');
const fs = require('fs');

class Shoponbio {
    constructor(page) {
        this.page = page;
        this.addChannel = page.locator('.my-3.btn.btn-primary.btn-md');
        this.selectPublish = page.locator("(//button[@id='rule-action'])[1]");
        this.selectShoponbio = page.locator("//span[normalize-space()='Shopon bio']");
        this.publishbtn = page.locator('#web_save_btn')
        this.emptyChannelNameErrorMsg = page.locator('.invalid-feedback');
        this.enterChannelName = page.locator('#g_name');
        this.sucessMsg = page.locator("//div[contains(text(),'Shopon created successfully.')]");

        //Edit 
        this.image = page.locator('.f-center.position-absolute.rounded-circle.h-20px.w-20px.p-0.fs-10.btn.btn-primary');
        this.fileInput = page.locator('input[type="file"]').first();
        this.bio = page.locator('#shopon_desc');
        this.dark = page.locator("label[aria-label='Dark Mode']");
        this.save = page.locator('#save_bio_btn');
        this.saveMsg = page.locator("//div[contains(text(),'Shopon updated successfully.')]")
        this.url = page.locator("//a[@id='shopon_url']");

         //delete
        this.editClick = page.locator("//i[@class='fa-regular fa-ellipsis-vertical me-0']");
        this.delete = page.locator("//a[normalize-space()='Delete']");
        this.yesDeleteIT = page.locator("//button[normalize-space()='Yes, Delete it']")
        this.shoponbioDeleteMsg = page.locator("//div[contains(text(),'Shopon deleted successfully.')]")

}

    getAbsolutePath(relativePath) {
        const fullPath = path.resolve(__dirname, relativePath);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`❌ File not found: ${fullPath}`);
        }
        return fullPath;
    }

    async uploadFile(input, filePath) {
        const fullPath = this.getAbsolutePath(filePath);
        await input.setInputFiles(fullPath);
    }


    async shoponbio() {
        await test.step("Step 1: Create Shoponbio", async () => {
            await this.createShoponbio();
            await this.page.waitForTimeout(2000);
        });
        await test.step("Step 2: Edit Shoponbio", async () => {
            await this.editShoponbio();
            await this.page.waitForTimeout(4000);
        });
         await test.step("Step 3: Url Check", async () => {
            await this.redirectToUrl();
            await this.page.waitForTimeout(2000);
        });

    }

    async createShoponbio() {
        await test.step("Step 1.1: Click 'Add Channel' button", async () => {
            await this.addChannel.waitFor({ state: 'visible', timeout: 5000 });
            await this.addChannel.click();
        });

        await test.step("Step 1.2: Select 'Publish' option", async () => {
            await this.selectPublish.waitFor({ state: 'visible', timeout: 5000 });
            await this.selectPublish.click();
        });

        await test.step("Step 1.3: Select 'shoponbio' option", async () => {
            await this.selectShoponbio.waitFor({ state: 'visible', timeout: 5000 });
            await this.selectShoponbio.click();
        });

        await test.step("Step 1.4: Try to publish without entering channel name", async () => {
            await this.publishbtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.publishbtn.click();

            await this.emptyChannelNameErrorMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.emptyChannelNameErrorMsg).toHaveText('Please enter a name');
        });

        await test.step("Step 1.5: Enter channel name and publish", async () => {
            await this.enterChannelName.waitFor({ state: 'visible', timeout: 5000 });
            await this.enterChannelName.fill('Shoponbio');

            await this.publishbtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.publishbtn.click();
        });

        await test.step("Step 1.6: Wait for success message and validate", async () => {
            await this.sucessMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.sucessMsg).toHaveText('Shopon created successfully.');
        });
    }

    async editShoponbio() {
        await test.step("Step 1: Click on Image", async () => {
            await this.image.waitFor({ state: 'visible', timeout: 5000 });
            await this.image.click();
        });

        await test.step("Step 2: Upload image", async () => {
            await this.uploadFile(this.fileInput, '../../../videos/testImg.png');
            await this.page.waitForTimeout(8000);
        });

        await test.step("Step 3: Fill Bio text", async () => {
            const textBio = "Your standout solution to establish trust, enhance engagement, and drive revenue through authentic content galleries curated by smart AI technology.User-Generated Content, Analytics & AI: Transforming your social commerce marketing.Create AI-powered shoppable galleries from users' content  #Taggbox.";
            await this.bio.waitFor({ state: 'visible', timeout: 5000 });
            await this.bio.fill(textBio);
        });

        await test.step("Step 4: Click on Dark mode toggle", async () => {
            await this.dark.waitFor({ state: 'visible', timeout: 5000 });
            await this.dark.click();
        });

        await test.step("Step 5: Click Save", async () => {
            await this.save.waitFor({ state: 'visible', timeout: 5000 });
            await this.save.click();
        });

        await test.step("Step 6: Validate success message", async () => {
            await this.saveMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.saveMsg).toHaveText('Shopon updated successfully.');
        });
    }

    async redirectToUrl() {
        await test.step("Step 1: Get URL and open in mobile context", async () => {
            const urlText = await this.url.textContent();
            console.log("URL Text is:", urlText);

            const mobileContext = await this.page.context().browser().newContext({
                viewport: { width: 375, height: 667 },
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X)...',
                isMobile: true,
                hasTouch: true,
                colorScheme: 'dark'  
            });

            const mobilePage = await mobileContext.newPage();

            try {
                await mobilePage.goto(urlText.trim(), { waitUntil: 'load', timeout: 10000 });
                await mobilePage.waitForTimeout(6000);

                await test.step("Step 2: Validate description text", async () => {
                    const textPresent = mobilePage.locator("//div[@class='tb_sob_des tb_sob_des_m']");
                    await expect.soft(textPresent).toBeVisible();
                });

                await test.step("Step 3: Validate title", async () => {
                    const title = mobilePage.locator("//div[@class='tb_sob_title']");
                    await expect.soft(title).toHaveText("Shoponbio");
                });

                await test.step("Step 4: Validate dark theme applied", async () => {
                    const html = mobilePage.locator("//html[@theme='dark']");
                    const isDark = await html.count() > 0;
                    if (isDark) {
                        console.log("✅ Dark theme is applied.");
                        expect.soft(true).toBeTruthy();
                    } else {
                        console.log("❌ Dark theme is not applied.");
                        expect.soft(false).toBeTruthy();
                    }
                });

                await test.step("Step 5: Click cart icon", async () => {
                    await mobilePage.locator("//div[@class='tb-bag-fill tb__icon']").click();
                });

            } catch (e) {
                console.error("Error occurred:", e);
                throw e;
            } finally {
                await mobileContext.close();
            }
        });
    }

    async deleteShoponbio() {
        await test.step("Step 1: Click Edit on the Shoponbio", async () => {
            await this.page.waitForTimeout(3000);
            await this.editClick.waitFor({ state: 'visible', timeout: 5000 });
            await this.editClick.click();
        });

        await test.step("Step 2: Click Delete button", async () => {
            await this.delete.waitFor({ state: 'visible', timeout: 5000 });
            await this.delete.click();
        });

        await test.step("Step 3: Confirm deletion", async () => {
            await this.yesDeleteIT.waitFor({ state: 'visible', timeout: 5000 });
            await this.yesDeleteIT.click();
        });

        await test.step("Step 4: Validate success message", async () => {
            await this.shoponbioDeleteMsg.waitFor({ state: 'visible', timeout: 5000 });
            await expect.soft(this.shoponbioDeleteMsg).toHaveText("Shopon deleted successfully.");
        });
    }

}
export default Shoponbio;
