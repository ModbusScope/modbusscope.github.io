# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static landing page for [ModbusScope](https://github.com/ModbusScope/ModbusScope), an open-source desktop app for Modbus TCP/RTU data logging. The site is hosted via GitHub Pages at `modbusscope.github.io`. There is no build step — `index.html` and `styles.css` are the site.

## Commands

```sh
npm install        # install dev dependencies (linters only)
npm run lint       # run both html-validate and stylelint
npm run lint:html  # HTML only
npm run lint:css   # CSS only
```

Linting runs automatically in CI on every push and pull request.

## CSS conventions

The stylesheet uses BEM naming. Class selectors must match `block__element--modifier` pattern. Examples that pass: `card`, `card__title`, `card--featured`. The `selector-class-pattern` rule in `.stylelintrc.json` enforces this.

## Automated version updates

A daily GitHub Actions workflow (`.github/workflows/update-version.yml`) compares `updater/version.json` against the latest GitHub release. When a new release is found, `scripts/update_version.sh`:

1. Updates `updater/version.json` (tag, URL, date).
2. Replaces all `X.Y.Z` version strings in `index.html` via `sed`.
3. Updates the footer "Latest release" line with the new month/year.

The workflow then opens a PR automatically. To trigger manually: `workflow_dispatch` is enabled.
