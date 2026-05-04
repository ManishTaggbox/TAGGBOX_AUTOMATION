import { test, expect } from '@playwright/test';

class DeleteWebsite {
    constructor(page) {
        this.page = page;
        //delete
        this.yesDeleteIT = page.locator("//button[normalize-space()='Yes, delete it!']")
        this.websiteDeleteMsg = page.locator("//div[contains(text(),'Website deleted successfully.')]")
    }

    get editClick() { return this.page.locator("(//i[@class='fa-regular fa-ellipsis-vertical me-0'])[1]"); }
    get delete() { return this.page.locator("//a[normalize-space()='Delete']"); }

    async deleteWebsite() {
        await test.step("Delete all websites in loop", async () => {
            let websiteCount = 0;

            while (true) {
                // ✅ Pehle success message hide hone ka wait karo (pichli delete ke baad)
                await this.websiteDeleteMsg.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});

                // ✅ Page stable hone do
                await this.page.waitForLoadState('networkidle').catch(() => {});
                await this.page.waitForTimeout(1500);

                // ✅ Check karo aur website hai ya nahi
                const isVisible = await this.editClick.isVisible().catch(() => false);

                if (!isVisible) {
                    console.log(`✅ Sab websites delete ho gayi! Total deleted: ${websiteCount}`);
                    break;
                }

                websiteCount++;
                console.log(`🗑️ Deleting website #${websiteCount}...`);

                // Step 1: Click Edit (3 dots)
                await this.editClick.waitFor({ state: 'visible', timeout: 5000 });
                await this.editClick.click();

                // Step 2: Click Delete
                await this.delete.waitFor({ state: 'visible', timeout: 5000 });
                await this.delete.click();

                // Step 3: Confirm deletion
                await this.yesDeleteIT.waitFor({ state: 'visible', timeout: 5000 });
                await this.yesDeleteIT.click();

                // Step 4: Success message aane ka wait karo
                await this.websiteDeleteMsg.waitFor({ state: 'visible', timeout: 20000 });
                await expect.soft(this.websiteDeleteMsg).toHaveText("Website deleted successfully.");

                console.log(`✅ Website #${websiteCount} deleted successfully!`);

                // ✅ Success message disappear hone ka wait karo TABHI next iteration
                await this.websiteDeleteMsg.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
                await this.page.waitForLoadState('networkidle').catch(() => {});
            }
        });
    }
}

export default DeleteWebsite;