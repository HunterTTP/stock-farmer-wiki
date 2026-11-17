import { test } from 'node:test';
import assert from 'node:assert/strict';
import { problems } from './check.mjs';

const rules = (text) => problems(text).map((p) => p.rule);

test('clean player text passes', () => {
  assert.deepEqual(rules('Wheat grows in 10 s and sells for $0.10. The Chicken Coop holds 2 chickens (6 fully upgraded).'), []);
  assert.deepEqual(rules("import DataTable from '../../components/DataTable.astro';"), []);
  assert.deepEqual(rules('Prices are $1–$5 and sizes 2×2 tiles.'), []);
});

test('each unsafe pattern is caught', () => {
  const cases = [
    ['Write to someone@example.com', 'an email address'],
    ['Saved under /Users/someone/game', 'a local file path'],
    ['token ghp_abcdefghijklmnopqrstuvwxyz123456', 'a key or token'],
    ['See GameEngine.swift', 'a source file name'],
    ['The `GameState` keeps it', 'a code identifier in backticks'],
    ['The `lastStockPullAt` field', 'a code identifier in backticks'],
    ['TODO: write this', 'an unfinished-work marker'],
    ['---\ntitle: X\ndraft: true\n---', 'a page marked as a draft'],
    ['Crops grow — fast', 'an em dash (use a comma, full stop or parentheses)'],
    ['Open Admin mode to cheat', 'a debug or admin feature'],
    ['Built with xtool', 'internal tooling'],
  ];
  for (const [text, rule] of cases) assert.ok(rules(text).includes(rule), `${rule} for: ${text}`);
});

test('reports the line number', () => {
  const [found] = problems('fine\nalso fine\nTODO here');
  assert.equal(found.line, 3);
});
