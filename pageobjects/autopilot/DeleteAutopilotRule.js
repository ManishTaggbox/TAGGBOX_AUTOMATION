import { test, expect } from '@playwright/test';

class DeleteAutopilotRule {
    constructor(page) {
        this.page = page;
        this.delete = page.locator('#delete_0');
        this.deleteRule = page.locator("//button[normalize-space()='Delete']");
        this.successMsg = page.locator("//div[contains(text(),'User rule deleted.')]");
    }

    async deleteAutopilotRule() {
          await this.page.waitForTimeout(4000);
        let ruleCount = 0;

        while (await this.delete.isVisible().catch(() => false)) {
            ruleCount++;

            await test.step(`🗑️ Delete rule #${ruleCount}`, async () => {
                await this.delete.click();

                await this.deleteRule.waitFor({ state: 'visible', timeout: 5000 });
                await this.deleteRule.click();

                await expect(this.successMsg).toHaveText('User rule deleted.', { timeout: 5000 });

                // Optional: wait for DOM to update
                await this.page.waitForTimeout(3000);
            });
        }

        if (ruleCount === 0) {
            console.log('✅ No rules found to delete.');
        } else {
            console.log(`✅ Deleted ${ruleCount} rule(s).`);
        }
    }
}

export default DeleteAutopilotRule;
