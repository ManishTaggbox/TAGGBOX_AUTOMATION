import { test as base, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils.js';
import { TestUtils } from '../utils/TestUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'live';
console.log(`🔧 Environment from .env: ${env}`);

const loginPayload = {
  live: {
    emailId: 'manish.s+53@taggbox.com',
    password: 'Taggbox@123',
    loginType: 'web',
  },
  test: {
    emailId: 'manish.s+53@taggbox.com',
    password: 'Taggbox@123',
    loginType: 'web',
  }
};

// ✅ Select the correct utility class based on environment
const getUtils = (apiContext) => {
  if (env === 'test') {
    return new TestUtils(apiContext, loginPayload[env]);
  }
  return new APiUtils(apiContext, loginPayload[env]);
};

export const test = base.extend({
  apiContext: [async ({ }, use) => {
    const apiCtx = await request.newContext();
    await use(apiCtx);
  }, { scope: 'worker' }],

  token: [async ({ apiContext }, use) => {
    const utils = getUtils(apiContext); // ✅ picks correct class
    const token = await utils.getToken();
    console.log(`✅ [${env.toUpperCase()}] Token received:`, token);
    await use(token);
  }, { scope: 'worker' }],

  wallId: [async ({ apiContext, token }, use) => {
    const utils = getUtils(apiContext); // ✅ picks correct class
    const wallId = await utils.getWallId(token);
    console.log(`✅ [${env.toUpperCase()}] Wall ID received:`, wallId);
    await use(wallId);
  }, { scope: 'worker' }],
});

export const expect = test.expect;