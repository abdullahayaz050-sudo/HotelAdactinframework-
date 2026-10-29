import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/AuthService.js';
import { UserService } from '../../services/UserService.js';

test('Login User API Test', async ({ request }) => {
  const users = new UserService(request);
  const auth = new AuthService(request);
  const user = users.createUserData();
  const registerResponse = await users.register(user);
  expect(registerResponse.status()).toBe(201);

  const response = await test.step('Login the created user', async () => {
    return await auth.login(user);
  });

  const responseBody = await response.text();
  await test.info().attach('Login Success Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(200);
});

test('Login User - Incorrect Password Expects 401', async ({ request }) => {
  const users = new UserService(request);
  const auth = new AuthService(request);
  const user = users.createUserData();
  await users.register(user);

  const response = await test.step('Login with incorrect password', async () => {
    return await auth.login({
      ...user,
      password: 'WrongPassword999!'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Incorrect Password Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(401);
});

test('Login User - Missing Field Expects 400', async ({ request }) => {
  const auth = new AuthService(request);
  
  const response = await test.step('Login without password', async () => {
    return await auth.login({
      email: 'haristester@example.com',
      username: 'haristester'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Missing Field Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(400);
});

test('Login User - Unregistered Email Expects 404', async ({ request }) => {
  const auth = new AuthService(request);
  const id = randomUUID().replaceAll('-', '');
  
  const response = await test.step('Login unregistered user', async () => {
    return await auth.login({
      email: `unregistered-${id}@example.com`,
      username: `unregistered_${id}`,
      password: 'Password123!'
    });
  });

  const responseBody = await response.text();
  await test.info().attach('Unregistered User Response', {
    body: responseBody,
    contentType: 'application/json',
  });

  expect(response.status()).toBe(404);
});