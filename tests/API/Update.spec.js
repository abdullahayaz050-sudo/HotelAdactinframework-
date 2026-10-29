import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/AuthService.js';
import { UserService } from '../../services/UserService.js';

test('PUT User API Test', async ({ request }) => {
  const auth = new AuthService(request);
  const users = new UserService(request, auth);
  const user = users.createUserData();
  await users.register(user);
  await auth.login(user);

  const response = await test.step('Update logged-in user', async () => {
    return await users.update({
      fullname: 'Updated User',
      email: `updated-${user.email}`,
      username: `updated_${user.username}`
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Update User Success Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(200);
});

test('PUT User - Without Login Expects 401', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Update without login', async () => {
    return await users.update({
      fullname: 'Updated User',
      email: 'updateduser@example.com',
      username: 'updatedUser'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Update Without Login Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(401);
});

test('PUT User - Missing Required Fields Expects 400', async ({ request }) => {
  const auth = new AuthService(request);
  const users = new UserService(request, auth);
  const user = users.createUserData();
  await users.register(user);
  await auth.login(user);

  const response = await test.step('Update with missing fullname', async () => {
    return await users.update({
      email: 'incomplete@example.com',
      username: 'incompleteUser'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Missing Fields Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(400);
});

test('PUT User - Invalid Endpoint Expects 404', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Update invalid endpoint', async () => {
    return await users.invalidUpdateEndpoint({
      fullname: 'Updated User',
      email: 'updateduser@example.com',
      username: 'updatedUser'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Invalid Endpoint Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(404);
});