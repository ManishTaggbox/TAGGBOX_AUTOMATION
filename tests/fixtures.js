// fixtures.js
import { test as base, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'live';
console.log(`🔧 Environment from .env: ${env}`);

const loginPayload = {
  live: {
    // emailId: 'manish.s+51@taggbox.com',
    // password: 'Taggbox@123',
    // loginType: 'web',
    emailId: 'shristy+01@taggbox.com',
    password: 'Test@123',
    loginType: 'web',
  },
  test: {
    emailId: 'Shristy+51@taggbox.com',
    password: 'Taggbox@123',
    loginType: 'web',
  }
};

// THIS IS THE KEY FIX: Select the specific environment payload
const currentLoginPayload = loginPayload[env];
console.log(`🔧 Using login payload for ${env}:`, JSON.stringify(currentLoginPayload, null, 2));

export const test = base.extend({
  apiContext: [async ({ }, use) => {
    const apiCtx = await request.newContext();
    await use(apiCtx);
  }, { scope: 'worker' }],

  token: [async ({ apiContext }, use) => {
    const apiUtils = new APiUtils(apiContext, loginPayload[env]);
    const token = await apiUtils.getToken();
    console.log(`✅ [${env.toUpperCase()}] Token received:`, token);
    await use(token);
  }, { scope: 'worker' }],

  wallId: [async ({ apiContext, token }, use) => {
    const apiUtils = new APiUtils(apiContext, loginPayload[env]);
    const wallId = await apiUtils.getWallId(token);
    console.log(`✅ [${env.toUpperCase()}] Wall ID received:`, wallId);
    await use(wallId);
  }, { scope: 'worker' }],
});

export const expect = test.expect;
