import { test } from 'node:test';
import assert from 'node:assert/strict';
import { money, duration } from '../src/lib/format.js';

test('money', () => {
  assert.equal(money(0), 'Free');
  assert.equal(money(0.1), '$0.10');
  assert.equal(money(1.5), '$1.50');
  assert.equal(money(1000), '$1,000');
  assert.equal(money(26000), '$26,000');
  assert.equal(money(12.345), '$12.35');
});

test('duration', () => {
  assert.equal(duration(10), '10 s');
  assert.equal(duration(80.2), '1 min 21 s');
  assert.equal(duration(3600), '1 h');
  assert.equal(duration(7500), '2 h 5 min');
  assert.equal(duration(0), '0 s');
});
