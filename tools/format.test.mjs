import { test } from 'node:test';
import assert from 'node:assert/strict';
import { money, duration } from '../src/lib/format.js';

test('money', () => {
  assert.equal(money(0), 'Free');
  assert.equal(money(0.1), '10 silver');
  assert.equal(money(1.56), '1 gold 56 silver');
  assert.equal(money(436), '436 gold');
  assert.equal(money(1250.63), '1,250 gold 63 silver');
  assert.equal(money(1000), '1,000 gold');
  assert.equal(money(26000), '26,000 gold');
  assert.equal(money(4.35), '4 gold 35 silver');
  assert.equal(money(2570.8), '2,570 gold 80 silver');
});

test('duration', () => {
  assert.equal(duration(10), '10 s');
  assert.equal(duration(80.2), '1 min 21 s');
  assert.equal(duration(3600), '1 h');
  assert.equal(duration(7500), '2 h 5 min');
  assert.equal(duration(0), '0 s');
});
