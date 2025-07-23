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
  AIRBNB: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/23`,
  TRIPADVISOR: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/35`,
  AMAZON: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/34`,
  ALIEXPRESS: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/37`,
  BOOKINGCOM: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/38`,
  RSS: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/12`,
  SLACK: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/20`,
  UPLOAD: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}`,
  REQUESTNETWORK: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}`,
  TWITTER: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/1`,
  FACEBOOK: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/3`,
  REVIEWHUB: (wallId) => `https://app.taggbox.com/content/addfeed/${wallId}/29`,
  MODERATION: (wallId) => `https://app.taggbox.com/content/moderation/${wallId}`,

};
