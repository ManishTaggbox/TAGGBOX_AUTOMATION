const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class EditDetails {
    constructor(page) {
        this.page = page;
        this.editBtn = page.locator('//button[text()="Edit Profile"]'); 
        this.fullName = page.locator('//input[@name="fname"]');
        this.orgInput = page.locator('//input[@name="organization"]');
        this.contact = page.locator('//input[@type="tel"]');
        this.emailInput = page.locator('//input[@name="email"]');
        this.saveBtn = page.locator('//button[text()="Save Changes"]');
        this.validationMsg = page.locator('//div[text()="Please enter valid name."]');
        this.industryInput = page.locator('//div[text()="E-Commerce"]');
        this.designationInput = page.locator('//div[text()="Social Media Manager"]');
        this.successMsg = page.locator('//div[text()="Profile Updated ."]');
        this.arrowIcon = page.locator('.css-8mmkcg');
        this.editIcon = page.locator('//button[@class="btn-active-primary my-1 btn btn-icon btn-sm"]');
        this.browse = page.locator('(//input[@type="file"])[1]');
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

    async editDetails() {
        await test.step("Step 1: Click on Edit Profile button", async () => {
            await this.editBtn.click();
        });

        await test.step("Step 2: Clear the full name input field", async () => {
            await this.fullName.clear();
        });

        await test.step("Step 3: Clear the organization input field", async () => {
            await this.orgInput.clear();
        });

        //await test.step("Step 4: Clear the contact input field", async () => {
        //    await this.contact.clear();
        //});

        await test.step("Step 4: Verify email input field is disabled", async () => {
            await expect.soft(this.emailInput).toBeDisabled();
        });

        await test.step("Step 5: Click on Save Changes button without required fields", async () => {
            await this.saveBtn.click();
        });

        await test.step("Step 6: Verify validation message is visible", async () => {
            await expect.soft(this.validationMsg).toBeVisible();
        });

        await test.step("Step 7: Verify validation message text is 'Please enter valid name.'", async () => {
            await expect.soft(this.validationMsg).toHaveText('Please enter valid name.');
        });

        await test.step("Step 8: Fill full name field with 'Shristy'", async () => {
            await this.fullName.fill('Manish Somani');
        });

        await test.step("Step 9: Click on first arrow icon to open industry dropdown", async () => {
            await this.arrowIcon.first().click();
        });

        await test.step("Step 10: Select 'E-Commerce' from industry dropdown", async () => {
            await this.industryInput.click();
        });

        await test.step("Step 11: Fill organization field with 'Taggbox'", async () => {
            await this.orgInput.fill('Taggbox');
        });

        await test.step("Step 12: Click on last arrow icon to open designation dropdown", async () => {
            await this.arrowIcon.last().click();
        });

        await test.step("Step 13: Select 'Social Media Manager' from designation dropdown", async () => {
            await this.designationInput.click();
        });

        await test.step("Step 14: Fill contact field with '9876543210'", async () => {
            await this.contact.fill('9876543110');
        });

        await test.step("Step 15: Click on first edit icon to open profile picture upload", async () => {
            await this.editIcon.first().click();
        });

        await test.step("Step 16: Upload profile picture 'testImg.png'", async () => {
            await this.uploadFile(this.browse, '../../videos/testImg.png');
        });

        await test.step("Step 17: Wait for 5 seconds for file upload to complete", async () => {
            await this.page.waitForTimeout(5000);
        });

        await test.step("Step 18: Click on Save Changes button to submit form", async () => {
            await this.saveBtn.click();
        });

        await test.step("Step 19: Verify success message is visible", async () => {
            await expect.soft(this.successMsg).toBeVisible();
        });

        await test.step("Step 20: Verify success message text is 'Profile Updated .'", async () => {
            await expect.soft(this.successMsg).toHaveText('Profile Updated .');
        });
    }
}

module.exports = EditDetails;