# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static multi-page site for [ModbusScope](https://github.com/ModbusScope/ModbusScope), an open-source desktop app for Modbus TCP/RTU data logging. The site is hosted via GitHub Pages at `modbusscope.github.io` (custom domain `modbusscope.com`). There is no build step — every page is a plain static HTML file plus `styles.css`.

Pages live at clean URLs via folders: `index.html` (home), `features/index.html`, `pricing/index.html`, `downloads/index.html`. Shared header/footer markup lives in `partials/header.html` and `partials/footer.html` (HTML fragments, not full documents) and is injected into every page at runtime by `assets/js/include.js`, which fetches them into `<div id="site-header">`/`<div id="site-footer">` placeholders, wires up the mobile hamburger menu, and marks the active nav link. Because injection happens via `fetch()`, pages must be served over HTTP (e.g. `npm start`), not opened via `file://`.

## Commands

```sh
npm install        # install dev dependencies (linters, Playwright, link checker)
npm run lint       # run both html-validate and stylelint
npm run lint:html  # HTML only
npm run lint:css   # CSS only
npm start          # serve the site locally at http://localhost:8080
npm test           # serve the site, then run the link checker and Playwright smoke tests
```

Linting runs automatically in CI on every push and pull request (`.github/workflows/lint.yml`); the link checker and Playwright suite run in `.github/workflows/test.yml`.

`lint:html` lints an explicit list of full documents (`index.html` and each `*/index.html` page) — `partials/*.html` are fragments (no doctype/html/head) and must never be added to that list.

## CSS conventions

The stylesheet uses BEM naming. Class selectors must match `block__element--modifier` pattern. Examples that pass: `card`, `card__title`, `card--featured`. The `selector-class-pattern` rule in `.stylelintrc.json` enforces this.

## Automated version updates

A daily GitHub Actions workflow (`.github/workflows/update-version.yml`) compares `updater/version.json` against the latest GitHub release. When a new release is found, `scripts/update_version.sh`:

1. Updates `updater/version.json` (tag, URL, date).
2. Replaces all `X.Y.Z` version strings in `index.html`, `partials/footer.html`, and `downloads/index.html` via `sed`.
3. Updates the "Latest release" line in `partials/footer.html` with the new month/year.

The workflow then opens a PR automatically. To trigger manually: `workflow_dispatch` is enabled.
