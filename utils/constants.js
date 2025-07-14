import { GOOGLE } from "../pageobjects/utils/constant";

// constants.js
export const FEED_PATH = {
  INSTAGRAM: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/18`,
  LINKEDIN: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/10`,
  GOOGLE: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/4`
};
