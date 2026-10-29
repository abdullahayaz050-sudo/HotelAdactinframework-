import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService.js';

test('Create User API Test', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Register a new user', async () => {
    return await users.register();
  });

  const responseBody = await response.text();
  await test.info().attach('Register User Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(201);
});

test('Create User - Missing Required Field Expects 400', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Register user without password', async () => {
    return await users.register({
      fullname: 'Abdullah Ayaz',
      email: 'abdullah_missing@example.com',
      username: 'abdullah_missing'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Missing Field Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(400);
});

test('Create User - Invalid Email Format Expects 409', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Register user with invalid email', async () => {
    return await users.register({
      fullname: 'Abdullah Ayaz',
      email: 'invalid-email-format',
      username: 'abdullah_email_test',
      password: 'Password123!'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Invalid Email Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(409);
});