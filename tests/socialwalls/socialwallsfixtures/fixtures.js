import APiUtils from '../utils/ApiUtils.js';
import { test as base, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'live';
console.log(`🔧 Environment from .env: ${env}`);

const loginPayload = {
  live: {
    emailId: 'manish.s+51@taggbox.com',
    password: 'Taggbox@123',
    countryCode: 'IN',
  },
  test: {
    emailId: 'Shristy+51@taggbox.com',
    password: 'Taggbox@123',
    countryCode: 'IN',
  }
};

const currentLoginPayload = loginPayload[env];
console.log(`🔧 Using login payload for ${env}:`, JSON.stringify(currentLoginPayload, null, 2));

export const test = base.extend({
  apiContext: [async ({ }, use) => {
    const apiCtx = await request.newContext();
    await use(apiCtx);
  }, { scope: 'worker' }],

  token: [async ({ apiContext }, use) => {
    const apiUtils = new APiUtils(apiContext, currentLoginPayload);  
    const token = await apiUtils.getToken();
    console.log(`✅ [${env.toUpperCase()}] Token received:`, token);
    await use(token);
  }, { scope: 'worker' }],
});

export const expect = test.expect;
