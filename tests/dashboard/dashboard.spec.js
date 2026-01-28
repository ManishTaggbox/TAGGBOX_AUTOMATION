import { test, expect } from '../dashboardfixtures.js';
import { FEED_PATH } from '../../utils/constants.js';

import Gallery from '../../pageobjects/dashboard/Gallery.js';
import Channel from '../../pageobjects/dashboard/Channel.js';
import DashboardPageLinks from '../../pageobjects/dashboard/DashboardPageLinks.js';
import Intercom from '../../pageobjects/dashboard/Intercom.js';
import RecentPosts from '../../pageobjects/dashboard/RecentPosts.js';
import MostActiveCreators from '../../pageobjects/dashboard/MostActiveCreators.js';
import Reputation from '../../pageobjects/dashboard/Reputation.js';

const DASHBOARD_URL = 'https://app.taggbox.com/home';

// Helper function to setup authentication and navigate
async function setupPage(page, token, url = DASHBOARD_URL)
{
    await page.addInitScript(token => localStorage.setItem('token', token), token);
    await page.goto(url);
}

test.describe('Dashboard Tests', () =>
{
    test('@HomeAddChannelWithNoGallery - Adding channel with no gallery present', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const channel = new Channel(page);
        await channel.addChannelWithNoGallery();
    });

    test('@HomePageLinksCheck - Checking page links present on the home page', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const links = new DashboardPageLinks(page);
        await links.dashboardPageLinks();
    });

    // test('@HomeIntercomCheck - Checking if intercom is working properly', async ({ page, token }) => 
    // {
    //     await setupPage(page, token);
    //     const intercom = new Intercom(page);
    //     await intercom.intercom();
    // });

    test('@HomeAddGallery - Adding new gallery', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const gallery = new Gallery(page);
        await gallery.addGallery();
    });

    test('@HomeRecentPosts - Checking data for "Recent Posts" section', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const recentPosts = new RecentPosts(page);
        await recentPosts.recentPosts();
    });

    test('@HomeMostActiveCreators - Checking data for "Most Active Creators" section', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const activeCreators = new MostActiveCreators(page);
        await activeCreators.activeCreators();

        // Delete created feed here
        await activeCreators.deleteFeed();
    });

    test('@HomeReputation - Checking data for "Reputation" section', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const reputation = new Reputation(page);
        await reputation.reputationData();

        // Delete created feed here
        await reputation.deleteFeed();
    });

    test('@DashboardAddChannel - Adding new channel', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const channel = new Channel(page);
        await channel.addChannel();
    });

    test('@HomeDeleteGallery - Deleting existing gallery', async ({ page, token }) => 
    {
        await setupPage(page, token);
        const gallery = new Gallery(page);
        await gallery.deleteGallery();
    });   
});
