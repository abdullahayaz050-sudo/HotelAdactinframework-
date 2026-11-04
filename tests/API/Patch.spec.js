import { test, expect } from '@playwright/test';

const baseUrl = 'https://api-testing-postman.vercel.app/api/v1';

test('PATCH replace account returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/replace-account`, {
    data: { fullname: 'Updated User' }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH replace account without login returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/replace-account`, {
    data: { fullname: 'No Login User' }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH replace account with invalid token returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/replace-account`, {
    headers: { Authorization: 'Bearer invalid-token' },
    data: { fullname: 'Invalid Token User' }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH replace account with empty data returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/replace-account`, {
    data: {}
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH replace account with partial data returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/replace-account`, {
    data: { email: 'patched@example.com' }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH replace account with invalid email returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/replace-account`, {
    data: { email: 'invalid-email-format' }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH invalid account endpoint returns 404', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/invalid-patch-endpoint`, {
    data: { fullname: 'Updated User' }
  });

  expect(response.status()).toBe(404);
});

test('PATCH all users endpoint returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/all-users`, {
    data: { name: 'Test User' }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH register endpoint returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/register`, {
    data: {
      fullname: 'Patched User',
      email: 'patched@example.com',
      username: 'patched_user',
      password: 'Password123!'
    }
  });

  expect([404, 405]).toContain(response.status());
});

test('PATCH login endpoint returns method not allowed', async ({ request }) => {
  const response = await request.patch(`${baseUrl}/users/login`, {
    data: {
      email: 'patched@example.com',
      password: 'Password123!'
    }
  });

  expect([404, 405]).toContain(response.status());
});