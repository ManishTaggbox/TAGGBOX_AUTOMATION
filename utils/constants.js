import { GOOGLE, PINTEREST, TUMBLR } from "../pageobjects/utils/constant";

// constants.js
export const FEED_PATH = {
  INSTAGRAM: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/18`,
  LINKEDIN: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/10`,
  GOOGLE: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/4`,
  YOUTUBE: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/7`,
  TIKTOK: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/28`,
  PINTEREST: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/5`,
  VIMEO: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/8`,
  FLICKR: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/6`,
  TUMBLR: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/11`,
  YELP: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/19`,
  AIRBNB: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/23`
  
};
