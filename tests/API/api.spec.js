import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService.js';

test('Get All Users API Test', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Get all users', async () => {
    return await users.getAllUsers();
  });

  const responseBody = await response.text();
  await test.info().attach('API Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(200);
});

test('Get All Users - Invalid Endpoint Test', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Get invalid endpoint', async () => {
    return await users.getInvalidEndpoint();
  });

  const responseBody = await response.text();
  await test.info().attach('Error Response Body', {
    body: responseBody,
    contentType: 'text/plain',
  });

  expect(response.status()).toBe(404);
});

test('Get All Users - Invalid Method Test (POST)', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Post to users endpoint', async () => {
    return await users.postAllUsers({ name: 'Test User' });
  });

  const responseBody = await response.text();
  await test.info().attach('Invalid Method Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);
});