# Project Guide

Keep is a theme installed in a Hexo site, not a standalone site. Follow existing behavior and configuration contracts, and keep changes focused.

## Layout

- `_config.yml`: theme defaults and option descriptions.
- `layout/`: EJS templates and page-specific assets; `layout/layout.ejs` is the outer template.
- `source/css/`: Stylus styles; import new files from `source/css/style.styl`.
- `source/js/`: browser code; shared setup is in `main.js` and `utils.js`, with page and post code in `page/` and `post/`.
- `scripts/`: Hexo events, helpers, filters, generators, and tags, not browser code.
- `languages/`: `en`, `zh-CN`, and `zh-TW` strings. `docs/` and the root README contain usage guides.

## Changes

- Follow `.editorconfig`, `.prettierrc`, and `.stylelintrc.js`. Use 2-space indentation; do not reformat unrelated code.
- For configuration changes, check `_config.yml`, its EJS/Hexo/browser consumers, and relevant docs. Preserve existing defaults and meanings. `scripts/events/init-config.js` merges site data before generation; `scripts/helpers/export-config.js` exports theme settings and browser strings to `KEEP`. Keep server and browser values consistent.
- For page behavior, check asset loading in `layout/_partial/scripts.ejs`. Initialize PJAX interactions on both first load and page transitions.
- Update all three `languages/*.yml` files for user-facing strings. Escape dynamic EJS output for its HTML context.
- Use native HTML controls and no `aria-*` attributes for new or changed UI. Do not edit third-party minified files in `source/js/libs/` or fonts in `source/font/`.

## Verification

- `package.json` has no standalone `test`, `build`, or read-only `lint` script. For changed JavaScript, use `npx prettier --check <file>`; for changed Stylus, use `npx stylelint <file>`. `npm run format` and `npm run lint:style` modify files, so check their scope first.
- For rendering, configuration, or interaction changes, run `hexo generate` in a configured Hexo site and inspect affected pages and feature switches. Use `hexo server` when browser behavior needs checking.
- Before delivery, run `git diff --check`, review `git status` and the diff, and report what was and was not verified. If committing, use a Conventional Commit type from `.commitlintrc.js` and stage only task files.
