import { test, expect } from '../shoppablefixtures.js';
import { FEED_PATH } from '../../utils/constants.js';

import ShoppableDisable from '../../pageobjects/apps&more/ShoppableDisable.js';


const APP_URL = 'https://app.taggbox.com/home';

// Helper function to setup authentication and navigate
async function setupPage(page, token, url = APP_URL)
{
    await page.addInitScript(token => localStorage.setItem('token', token), token);
    await page.goto(url);
}

test.describe('Shoppable Conditions Tests', () =>
{
    test('@ShoppableDisable - Conditions related to disabling shoppable features', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const shoppableDisable = new ShoppableDisable(page);
        await shoppableDisable.shoppableDisableConditions();
    });
   
});
