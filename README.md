# Stock Farmer Wiki

The player wiki for Stock Farmer, a farming game for iPhone, iPad and Android: https://hunterttp.github.io/stock-farmer-wiki/

This repository is generated. Each update is published together with a beta of the game, and the site is built and deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`. It takes no contributions: issues are off and pull requests are closed without review.

## Building it locally

Needs Node 22 or later.

```sh
npm ci
npm run build     # pattern check, site build and link check; output in dist/
npm run dev       # local preview
npm test          # self-tests of the checks
```

- `src/content/docs/` holds the pages, `src/assets/` the screenshots.
- `src/data/` holds tables generated from the game's catalogs. They are replaced on every publish and never edited by hand.
- `public/sprites/` holds the game's own pictures of the items in those tables, one small picture each, written with the tables. They are replaced on every publish and never edited by hand.
- `site.config.mjs` is the one place the site's address is set.
