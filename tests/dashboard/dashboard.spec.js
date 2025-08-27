import { test, expect } from '../dashboardfixtures.js';
import { FEED_PATH } from '../../utils/constants.js';

import Gallery from '../../pageobjects/dashboard/Gallery.js';
import Channel from '../../pageobjects/dashboard/Channel.js';
import DashboardPageLinks from '../../pageobjects/dashboard/DashboardPageLinks.js';
import Intercom from '../../pageobjects/dashboard/Intercom.js'

const DASHBOARD_URL = 'https://app.taggbox.com/home';

// Helper function to setup authentication and navigate
async function setupPage(page, token, url = DASHBOARD_URL)
{
    await page.addInitScript(token => localStorage.setItem('token', token), token);
    await page.goto(url);
}

test.describe('Dashboard Tests', () =>
{
    test('@AddChannelWithNoGallery - Adding channel with no gallery present', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const channel = new Channel(page);
        await channel.addChannelWithNoGallery();
    });

    test('@DashboardPageLinksCheck - Checking page links present on the home page', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const links = new DashboardPageLinks(page);
        await links.dashboardPageLinks();
    });

    test('@IntercomCheck - Checking if intercom is working properly', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const intercom = new Intercom(page);
        await intercom.intercom();
    });

    test('@AddGallery - Adding new gallery', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const gallery = new Gallery(page);
        await gallery.addGallery();
    });

    test('@AddChannel - Adding new channel', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const channel = new Channel(page);
        await channel.addChannel();
    });

    test('@DeleteGallery - Deleting existing gallery', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const gallery = new Gallery(page);
        await gallery.deleteGallery();
    });

   
});
