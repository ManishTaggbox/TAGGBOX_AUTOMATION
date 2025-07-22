const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');


class EditDetails
 {
    constructor(page) 
    {
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
    }

    async editDetails() 
    {
        await this.editBtn.click();
        await this.fullName.clear();
        await this.orgInput.clear();
        //await this.contact.clear();
        await expect(this.emailInput).toBeDisabled();
        await this.saveBtn.click();
        await expect(this.validationMsg).toBeVisible();
        await expect(this.validationMsg).toHaveText('Please enter valid name.');
        await this.fullName.fill('Shristy');
        await this.arrowIcon.first().click();
        await this.industryInput.click();
        await this.orgInput.fill('Taggbox');
        await this.arrowIcon.last().click();
        await this.designationInput.click();
        await this.contact.fill('9876543210');
        await this.saveBtn.click();
        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toHaveText('Profile Updated .');     
    }
}

module.exports = EditDetails;