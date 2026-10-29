import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/AuthService.js';
import { UserService } from '../../services/UserService.js';

test('Delete User API Test', async ({ request }) => {
  const auth = new AuthService(request);
  const users = new UserService(request, auth);
  const user = users.createUserData();
  await users.register(user);
  await auth.login(user);

  const response = await test.step('Delete logged-in user', async () => {
    return await users.delete();
  });

  const responseBody = await response.text();
  await test.info().attach('Delete User Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(200);
});

test('Delete User - Without Login Expects 401', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Delete without login', async () => {
    return await users.delete();
  });

  const responseBody = await response.text();
  await test.info().attach('Delete Without Login Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(401);
});

test('Delete User - Wrong Password Login Expects 401', async ({ request }) => {
  const users = new UserService(request);
  const auth = new AuthService(request);
  const user = users.createUserData();
  await users.register(user);

  const response = await test.step('Login with wrong password', async () => {
    return await auth.login({
      ...user,
      password: 'WrongPassword999!'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Wrong Password Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(401);
});

test('Delete User - Invalid Endpoint Expects 404', async ({ request }) => {
  const users = new UserService(request);
  
  const response = await test.step('Delete invalid endpoint', async () => {
    return await users.invalidDeleteEndpoint();
  });

  const responseBody = await response.text();
  await test.info().attach('Invalid Endpoint Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(404);
});