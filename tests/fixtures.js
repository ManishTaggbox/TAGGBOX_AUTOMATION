
import { test as base, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils.js';

const loginPayload = {
  emailId: 'manish.s+51@taggbox.com',
  password: 'Taggbox@123',
  loginType: 'web',
};

export const test = base.extend({
  token: [async ({}, use) => {
    const apiCtx = await request.newContext();
    const apiUtils = new APiUtils(apiCtx, loginPayload);
    const token = await apiUtils.getToken();
    await use(token);
  }, { scope: 'worker' }],
});

export const expect = test.expect;
