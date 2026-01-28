import { test, expect } from '../fixtures.js';
import AddNewGallery from '../../pageobjects/content/AddUpdateDeleteGallery.js';

// Constants
const CONTENT_GALLERY_URL = 'https://app.taggbox.com/content';

// Helper function for common setup
async function setupProfilePage(page, token) 
{
    await test.step("Setup: Set authentication token and navigate to profile", async () => 
    {
        await page.addInitScript(t => localStorage.setItem('token', t), token);
        await page.goto(CONTENT_GALLERY_URL);
    });
}

test.describe('Add, Update, Delete Gallery Tests', () => 
{
    test('@AddUpdateDeleteGallery - Verify by adding, renaming and delete gallery', async ({ page, token }) => 
    {
        await setupProfilePage(page, token);
        
        const addNewGallery = new AddNewGallery(page);
        await addNewGallery.addNewGallery();
    });
});