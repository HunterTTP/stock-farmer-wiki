#!/usr/bin/env node
// After a build: every internal link and image in dist/ must point at a file that exists. Fails the build on any that don't.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE } from '../site.config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const base = BASE.replace(/\/$/, '');

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  });
}

/** The file a link resolves to, or null for links that leave the site. */
export function target(href, page, { distDirectory = dist, basePath = base } = {}) {
  if (/^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(href) || href.startsWith('//')) return null;
  const path = decodeURI(href.split('#')[0].split('?')[0]);
  if (!path) return null;
  let file;
  if (path.startsWith('/')) {
    if (!path.startsWith(basePath + '/') && path !== basePath) return { missing: true, why: 'outside the site base' };
    file = join(distDirectory, path.slice(basePath.length));
  } else {
    file = join(dirname(page), path);
  }
  if (path.endsWith('/')) file = join(file, 'index.html');
  return { file, missing: !existsSync(file) && !existsSync(join(file, 'index.html')) };
}

function main() {
  if (!existsSync(dist)) {
    console.error('links: no dist/ folder; build first');
    process.exit(1);
  }
  let broken = 0;
  for (const page of htmlFiles(dist)) {
    const html = readFileSync(page, 'utf8');
    for (const [, href] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const found = target(href, page);
      if (found?.missing) {
        broken += 1;
        console.error(`${relative(dist, page)}: broken link ${href}${found.why ? ` (${found.why})` : ''}`);
      }
    }
  }
  if (broken) {
    console.error(`links: ${broken} broken link(s)`);
    process.exit(1);
  }
  console.log('links: all internal links resolve');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
