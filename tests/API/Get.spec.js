import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService.js';

test('Validate User API Response', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Get all users', async () => {
    return await users.getAllUsers();
  });

  const responseBody = await response.text();
  await test.info().attach('Get Users Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  const body = JSON.parse(responseBody);
  expect(response.status()).toBe(200);
  expect(body.data.length).toBeGreaterThan(0);
});

test('Get All Users - Invalid Endpoint Expects 404', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Get invalid endpoint', async () => {
    return await users.getInvalidEndpoint();
  });

  const responseBody = await response.text();
  await test.info().attach('Invalid Endpoint Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(404);
});

test('Get All Users - Invalid Method Expects 404 or 405', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Post to users endpoint', async () => {
    return await users.postAllUsers({ name: 'test' });
  });

  const responseBody = await response.text();
  await test.info().attach('Invalid Method Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect([404, 405]).toContain(response.status());
});
