#!/usr/bin/env node
// Public-safe pattern check, run before every build and in CI: fails on anything that must never be on the public site
// (personal or account details, file paths, code names, unfinished-work markers) and on the style rules the pages must keep.
// Usage: node tools/check.mjs [file-or-folder ...]   (default: the pages, the data and the README)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const RULES = [
  ['an email address', /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}/i],
  ['a local file path', /\/Users\/|\/home\/|\/mnt\/|\b[A-Z]:\\/],
  ['a key or token', /ghp_[A-Za-z0-9]{20,}|github_pat_|gho_[A-Za-z0-9]{20,}|\bsk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[abprs]-[A-Za-z0-9-]+/],
  ['a source file name', /\b[\w-]+\.(swift|kt|kts|gradle|py|xcodeproj|xcassets|plist)\b/i],
  ['a code identifier in backticks', /`[^`\s]*(?:[a-z][A-Z]|_[a-z])[^`\s]*`/],
  ['an unfinished-work marker', /\b(TODO|FIXME|XXX|TBD)\b/],
  ['a page marked as a draft', /^draft:\s*true\b/m],
  ['an em dash (use a comma, full stop or parentheses)', /—/],
  ['a debug or admin feature', /\bAdmin( mode)?\b|\bdebug (menu|mode|screen)s?\b|\bcheat codes?\b/i],
  ['internal tooling', /\b(xtool|Xcode Cloud|worktree|PARITY\.md|AGENTS\.md|Codex|Claude)\b/i],
];

/** Each rule a text breaks, with the line it is on. */
export function problems(text) {
  const found = [];
  const lines = text.split('\n');
  for (const [name, pattern] of RULES) {
    // Front matter rules look at the whole text; the rest line by line so the report can point at the line.
    if (pattern.flags.includes('m')) {
      if (pattern.test(text)) found.push({ line: 0, rule: name });
      continue;
    }
    lines.forEach((line, index) => {
      if (pattern.test(line)) found.push({ line: index + 1, rule: name, text: line.trim().slice(0, 120) });
    });
  }
  return found;
}

const CHECKED = new Set(['.md', '.mdx', '.json']);

function filesUnder(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path).flatMap((name) => filesUnder(join(path, name))).filter((file) => CHECKED.has(extname(file)));
}

function main() {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['src/content/docs', 'src/data', 'README.md'].map((p) => join(root, p));
  let failures = 0;
  for (const file of targets.flatMap(filesUnder)) {
    for (const problem of problems(readFileSync(file, 'utf8'))) {
      failures += 1;
      console.error(`${relative(root, file)}:${problem.line}: ${problem.rule}${problem.text ? `: ${problem.text}` : ''}`);
    }
  }
  if (failures) {
    console.error(`check: ${failures} problem(s); nothing was built.`);
    process.exit(1);
  }
  console.log('check: no problems');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
