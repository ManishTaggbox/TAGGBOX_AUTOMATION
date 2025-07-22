const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');


class VerifyDetails
 {
    constructor(page) 
    {
        this.page = page;
        this.name = page.locator("//h6[normalize-space()='Manish Somani']"); 
        this.email = page.locator('//p[text()="manish+51@taggbox.com"]');
        this.fullName = page.locator('//span[text()="Manish Somani "]');
        this.emailAddress = page.locator('//span[text()="manish.s+51@taggbox.com"]');
        this.verifyTag = page.locator('//span[text()="Verified"]');
     
    }

    async verifyDetails() 
    {
        await expect(this.name).toBeVisible();
        await expect(this.name).toHaveText('Shristy');
        await expect(this.email).toBeVisible();
        await expect(this.email).toHaveText('shristy+51@taggbox.com');
        await expect(this.fullName).toBeVisible();
        await expect(this.fullName).toHaveText('Shristy');
        await expect(this.emailAddress).toBeVisible();
        await expect(this.emailAddress).toHaveText('shristy+51@taggbox.com');
        await expect(this.verifyTag).toBeVisible();
        await expect(this.verifyTag).toHaveText('Verified');

    }
}

module.exports = VerifyDetails;