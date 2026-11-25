# Working in this checkout

Read `../stock-farm-research/agents/README.md` first when the sibling research checkout is present; tool shims import this file. Everything here is public.

If `../stock-farm-research` is missing (a cloud agent with only this repo), edit only player-facing docs in `src/content/docs/`, run `npm test && npm run build`, never push `main`, and hand back your branch or changed page list.

The public player wiki. Pages live in `src/content/docs/`; `src/data/` and `public/sprites/` are generated from the game's catalogs and never edited by hand.

- Never commit, push, or publish here during normal development: page drafts stay uncommitted until the beta release publish script commits and deploys them.
- Never type a number that a data table or `<Fact>` owns. Write in concise player words (style guide in `../stock-farmer-ios/docs/WIKI.md` when present; no code names, paths, em dashes, or unreleased/internal features).
- See [README.md](README.md) for local checks (`npm test`, `npm run build`). List every page you changed when handing back.
