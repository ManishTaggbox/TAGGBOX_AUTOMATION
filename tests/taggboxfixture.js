import { test as base, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils.js';
import { TestUtils } from '../utils/TestUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'live';
console.log(`🔧 Environment from .env: ${env}`);

// ✅ All accounts in one place
const accounts = {
  51: {
    live: { emailId: 'manish.s+51@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
    test: { emailId: 'manish.s+51@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
  },
  52: {
    live: { emailId: 'manish.s+52@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
    test: { emailId: 'manish.s+52@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
  },
  53: {
    live: { emailId: 'manish.s+53@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
    test: { emailId: 'manish.s+53@taggbox.com',  password: 'Taggbox@123', loginType: 'web' },
  },
  54: {
    live: { emailId: 'manish.s+54@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
    test: { emailId: 'manish.s+54@taggbox.com',  password: 'Taggbox@123', loginType: 'web' },
  },
  55: {
    live: { emailId: 'manish.s+55@taggbox.com', password: 'Taggbox@123', loginType: 'web' },
    test: { emailId: 'manish.s+55@taggbox.com',  password: 'Taggbox@123', loginType: 'web' },
  },
};

// ✅ Factory: picks correct utility class based on env
const getUtils = (apiContext, accountIndex) => {
  const payload = accounts[accountIndex][env];
  if (env === 'test') {
    return new TestUtils(apiContext, payload);
  }
  return new APiUtils(apiContext, payload);
};

// ✅ Helper to build a fixture set for a given account index
const buildFixtures = (accountIndex) => ({
  apiContext: [async ({ }, use) => {
    const apiCtx = await request.newContext();
    await use(apiCtx);
  }, { scope: 'worker' }],

  token: [async ({ apiContext }, use) => {
    const utils = getUtils(apiContext, accountIndex);
    const token = await utils.getToken();
    console.log(`✅ [${env.toUpperCase()}] [Account +${accountIndex}] Token received:`, token);
    await use(token);
  }, { scope: 'worker' }],

  wallId: [async ({ apiContext, token }, use) => {
    const utils = getUtils(apiContext, accountIndex);
    const wallId = await utils.getWallId(token);
    console.log(`✅ [${env.toUpperCase()}] [Account +${accountIndex}] Wall ID received:`, wallId);
    await use(wallId);
  }, { scope: 'worker' }],
});

// ✅ Export a separate test instance per account
export const test51 = base.extend(buildFixtures(51));
export const test52 = base.extend(buildFixtures(52));
export const test53 = base.extend(buildFixtures(53));
export const test54 = base.extend(buildFixtures(54));
export const test55 = base.extend(buildFixtures(55));

export const expect = base.expect;