import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';


const PRICE_URL = 'https://app.taggbox.com/price';

class Price 
{
    constructor(page) 
    {
        this.page = page;
        this.editBtn = page.locator('.fa-regular.fa-pen-to-square');
    }
    

     async priceCheck() {
        await test.step('Step 1: Wait for edit button to be visible and enabled', async () => {
            await this.editBtn.waitFor({ state: 'visible', timeout: 10000 });
            await expect(this.editBtn).toBeEnabled();
        });
 
        await test.step('Step 2: Click the edit button', async () => {
            await this.editBtn.click();
        });
 
        await test.step('Step 3: Navigate to price page', async () => {
            await this.page.goto(PRICE_URL, { waitUntil: 'networkidle' });
        });
 
        await test.step('Step 4: Take screenshot and compare with baseline', async () => {
            await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
            expect.soft(await this.page.screenshot()).toMatchSnapshot('screenshot.png');
        });
    }
}

export default Price;
