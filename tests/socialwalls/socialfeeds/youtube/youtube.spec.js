import { test, expect } from '@playwright/test';
import YoutubeChannelPage from '../../../../pageobjects/socialwalls/socialfeeds/youtube/YoutubeChannelUrl.js';
import YoutubeShortsPage from '../../../../pageobjects/socialwalls/socialfeeds/youtube/YoutubeShorts.js';
import YoutubePlaylistPage from '../../../../pageobjects/socialwalls/socialfeeds/youtube/YoutubePlaylist.js';
import YoutubeKeywordsPage from '../../../../pageobjects/socialwalls/socialfeeds/youtube/YoutubeKeywords.js';
import YoutubeLocationPage from '../../../../pageobjects/socialwalls/socialfeeds/youtube/YoutubeLocation.js';

const APP_URL = 'https://app.socialwalls.com/';

const runYoutubeFeedTest = ({ tag, PageObject, method }) => {
  test(tag, async ({ page }, testInfo) => {

    await test.step('Navigate and inject token into localStorage', async () => {
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });

      console.log('✅ Page loaded:', APP_URL);
    });

    await test.step(`Run ${tag} feed creation flow`, async () => {
      const feedPage = new PageObject(page);
      await feedPage[method]();
    });

    // Wait for content gallery to load fully
    await test.step('Wait for content gallery to fully load', async () => {
      await page.waitForLoadState('load', { timeout: 60000 });
    });
  });
};
const youtubeFeeds = [
  { tag: '@SocialWallsYoutubeChannel Create Feed', PageObject: YoutubeChannelPage, method: 'youtubeChannelUrl' },
  { tag: '@SocialWallsYoutubeShorts Create Feed', PageObject: YoutubeShortsPage, method: 'youtubeShorts' },
  { tag: '@SocialWallsYoutubePlay Create Feed', PageObject: YoutubePlaylistPage, method: 'youtubePlaylist' },
  { tag: '@SocialWallsYoutubeKeywords Create Feed', PageObject: YoutubeKeywordsPage, method: 'youtubeKeywords' },
  { tag: '@SocialWallsYoutubeLocation Create Feed', PageObject: YoutubeLocationPage, method: 'youtubelocation' },

];

youtubeFeeds.forEach(runYoutubeFeedTest);

// Simple cleanup
test.afterEach(async ({ page }) => {
  try {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.context().clearCookies();
  } catch (error) {
    // Ignore cleanup errors
  }
});