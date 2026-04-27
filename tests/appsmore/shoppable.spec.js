import { test56 as test, expect } from '../taggboxfixture.js';
import { FEED_PATH } from '../../utils/constants.js';

import ShoppableDisable from '../../pageobjects/appsmore/ShoppableDisable.js';
import ShoppableEnable from '../../pageobjects/appsmore/ShoppableEnable.js';

const DASHBOARD_URL = FEED_PATH.DASHBOARD_URL;

// Helper function to setup authentication and navigate
async function setupPage(page, token, url = DASHBOARD_URL)
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

    test('@ShoppableEnable - Conditions related to enabling shoppable features', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const shoppableEnable = new ShoppableEnable(page);
        await shoppableEnable.shoppableEnableConditions();
    });
   
});
