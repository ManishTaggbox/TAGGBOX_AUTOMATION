import { test as base, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils.js';
import { TestUtils } from '../utils/TestUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'live';
console.log(`🔧 Environment from .env: ${env}`);
const password = process.env.ACCOUNT_PASSWORD;
const loginType = process.env.LOGIN_TYPE || 'web';

const accounts = {
  51: {
    live: { emailId: process.env.ACCOUNT_51_EMAIL, password, loginType },
    test: { emailId: process.env.ACCOUNT_51_EMAIL, password, loginType },
  },
  52: {
    live: { emailId: process.env.ACCOUNT_52_EMAIL, password, loginType },
    test: { emailId: process.env.ACCOUNT_52_EMAIL, password, loginType },
  },
  53: {
    live: { emailId: process.env.ACCOUNT_53_EMAIL, password, loginType },
    test: { emailId: process.env.ACCOUNT_53_EMAIL, password, loginType },
  },
  54: {
    live: { emailId: process.env.ACCOUNT_54_EMAIL, password, loginType },
    test: { emailId: process.env.ACCOUNT_54_EMAIL, password, loginType },
  },
  55: {
    live: { emailId: process.env.ACCOUNT_55_EMAIL, password, loginType },
    test: { emailId: process.env.ACCOUNT_55_EMAIL, password, loginType },
  },
  56: {
    live: { emailId: process.env.ACCOUNT_56_EMAIL, password, loginType },
    test: { emailId: process.env.ACCOUNT_56_EMAIL, password, loginType },
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
export const test56 = base.extend(buildFixtures(56));
export const expect = base.expect;