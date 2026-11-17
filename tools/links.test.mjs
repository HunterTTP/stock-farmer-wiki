import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { target } from './links.mjs';

test('resolves relative and base-absolute links, skips external ones', () => {
  const dist = mkdtempSync(join(tmpdir(), 'links-'));
  mkdirSync(join(dist, 'farming', 'crops'), { recursive: true });
  mkdirSync(join(dist, 'levels'), { recursive: true });
  writeFileSync(join(dist, 'farming', 'crops', 'index.html'), '');
  writeFileSync(join(dist, 'levels', 'index.html'), '');
  const page = join(dist, 'farming', 'crops', 'index.html');
  const options = { distDirectory: dist, basePath: '/wiki' };
  assert.equal(target('https://example.com', page, options), null);
  assert.equal(target('#top', page, options), null);
  assert.equal(target('../../levels/', page, options).missing, false);
  assert.equal(target('../../levels/#xp', page, options).missing, false);
  assert.equal(target('../fruit-trees/', page, options).missing, true);
  assert.equal(target('/wiki/levels/', page, options).missing, false);
  assert.equal(target('/levels/', page, options).missing, true);
});
