import { GOOGLE, PINTEREST } from "../pageobjects/utils/constant";

// constants.js
export const FEED_PATH = {
  INSTAGRAM: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/18`,
  LINKEDIN: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/10`,
  GOOGLE: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/4`,
  YOUTUBE: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/7`,
  TIKTOK: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/28`,
  PINTEREST: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/5`,
  VIMEO: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/8`
  
};
