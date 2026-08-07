require('dotenv').config();
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../src/App');
const config = require('../src/config');
const User = require('../src/models/User');

let server;
let baseUrl;
const testUser = {
  name: 'Test User',
  email: `test-${Date.now()}@example.com`,
  password: 'secret123',
};

before(async () => {
  assert.ok(config.mongodbUri, 'MONGODB_URI is missing in .env');
  await mongoose.connect(config.mongodbUri);
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) server.close();
  if (testUser.id) await User.deleteOne({ _id: testUser.id });
  await mongoose.disconnect();
});

test('MongoDB connection is open', () => {
  assert.strictEqual(mongoose.connection.readyState, 1);
});

test('GET / returns API banner', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.success, true);
});

test('GET /api/health returns health info', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.success, true);
});

test('POST /api/users creates a user', async () => {
  const res = await fetch(`${baseUrl}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser),
  });
  assert.strictEqual(res.status, 201);
  const body = await res.json();
  assert.strictEqual(body.success, true);
  assert.ok(body.data._id, 'created user should have an _id');
  testUser.id = body.data._id;
});

test('GET /api/users lists users', async () => {
  const res = await fetch(`${baseUrl}/api/users`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.data), 'data should be an array');
  assert.ok(body.data.some((u) => u.email === testUser.email), 'created user should be listed');
});

test('GET /api/users/:id returns the created user', async () => {
  const res = await fetch(`${baseUrl}/api/users/${testUser.id}`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.data.email, testUser.email);
});

test('GET /api/users/:id returns 404 for unknown id', async () => {
  const res = await fetch(`${baseUrl}/api/users/64b000000000000000000000`);
  assert.strictEqual(res.status, 404);
});

test('unknown route returns 404 JSON', async () => {
  const res = await fetch(`${baseUrl}/api/nope`);
  assert.strictEqual(res.status, 404);
  const body = await res.json();
  assert.strictEqual(body.success, false);
});
