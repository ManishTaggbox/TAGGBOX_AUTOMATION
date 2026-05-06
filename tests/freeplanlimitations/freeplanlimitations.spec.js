import {test57 as test, expect } from '../taggboxfixture.js';
import GalleryLimit from '../../pageobjects/freeplanlimitations/GalleryLimit.js';
import AutoPilotDisabled from '../../pageobjects/freeplanlimitations/AutoPilotDisabled.js';
import CollaboratorDisabled from '../../pageobjects/freeplanlimitations/CollaboratorDisabled.js';

import { FEED_PATH } from '../../utils/constants.js';

const DASHBOARD_URL = FEED_PATH.DASHBOARD_URL;

// Helper function to setup authentication and navigate
async function setupPage(page, token, url = DASHBOARD_URL) 
{
    await page.addInitScript(token => localStorage.setItem('token', token), token);
    await page.goto(url);
}

test.describe('Free Plan Limitations Tests', () =>
{
    test('@GalleryLimit - Verify free user can create 1 gallery', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const galleryLimit = new GalleryLimit(page);
        await galleryLimit.verifyGalleryLimit();
    });

    test('@AutoPilotDisabled - Verify auto pilot is disabled for free users', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const autoPilotDisabled = new AutoPilotDisabled(page);
        await autoPilotDisabled.verifyAutoPilotDisabled();
    });

    test('@CollaboratorDisabled - Verify collaborators are disabled for free users', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const collaboratorDisabled = new CollaboratorDisabled(page);
        await collaboratorDisabled.verifyCollaboratorDisabled();
    });
        
});