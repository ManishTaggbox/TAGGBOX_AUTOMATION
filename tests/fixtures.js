// fixtures.js
import { test as base, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils.js';

const env = process.env.ENV || 'live'; // default to live if not provided

const loginPayload = {
  live: {
    emailId: 'manish.s+51@taggbox.com',
    password: 'Taggbox@123',
    loginType: 'web',
  },
  test: {
    emailId: 'sushil+51@taggbox.com',
    password: 'Taggbox@123',
    loginType: 'web',
  }
};

export const test = base.extend({
  apiContext: [async ({ }, use) => {
    const apiCtx = await request.newContext();
    await use(apiCtx);
  }, { scope: 'worker' }],

  token: [async ({ apiContext }, use) => {
    const apiUtils = new APiUtils(apiContext, loginPayload);
    const token = await apiUtils.getToken();
    console.log(`✅ [${env.toUpperCase()}] Token received:`, token);
    await use(token);
  }, { scope: 'worker' }],

  wallId: [async ({ apiContext, token }, use) => {
    const apiUtils = new APiUtils(apiContext, loginPayload);
    const wallId = await apiUtils.getWallId(token);
    console.log(`✅ [${env.toUpperCase()}] Wall ID received:`, wallId);
    await use(wallId);
  }, { scope: 'worker' }],
});

export const expect = test.expect;
