# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static multi-page site for [ModbusScope](https://github.com/ModbusScope/ModbusScope), an open-core desktop app for Modbus TCP/RTU data logging. The site is built with [Eleventy (11ty)](https://www.11ty.dev/) and hosted via GitHub Pages at `modbusscope.github.io` (custom domain `modbusscope.com`), deployed by `.github/workflows/deploy.yml` on every push to `main`.

Source lives under `src/` (Eleventy's input directory); `npm run build` compiles it to `_site/` (gitignored, not committed) with the Nunjucks template engine (`htmlTemplateEngine: "njk"` in `.eleventy.js`). Pages live at clean URLs via folders: `src/index.html` (home), `src/features/index.html`, `src/pricing/index.html`, `src/downloads/index.html` — each is Nunjucks front matter (`title`, `description`, optional `keywords`/`ogTitle`/`ogDescription`) followed by its `<main>` content. `src/_includes/base.html` is the shared layout owning the full `<head>` (meta/OG/Twitter tags, JSON-LD) and the `<body>` shell; `src/_includes/header.html` and `footer.html` are compiled into every page at build time (active nav-link state is computed from `page.url`, not client-side JS). `src/assets/js/nav.js` only wires up the mobile hamburger toggle. `styles.css`, `robots.txt`, `sitemap.xml`, and `CNAME` live under `src/` too and are passthrough-copied unchanged.

`updater/version.json` stays at the repo root (outside `src/`) — it's the desktop app's update-check endpoint, so its public URL must not move. `.eleventy.js` reads it as global Eleventy data (`release.tag_name`, `release.monthYear`) for the version strings shown on the site, and passthrough-copies it to `_site/updater/version.json` so the served URL is unchanged.

## Commands

```sh
npm install        # install dev dependencies (Eleventy, linters, Playwright, link checker)
npm run build      # compile src/ to _site/
npm run lint       # run both html-validate and stylelint
npm run lint:html  # builds, then lints the generated _site/*.html documents
npm run lint:css   # lints src/styles.css
npm start          # build + serve the site locally at http://localhost:8080 (Eleventy dev server, live-reloads)
npm test           # serve the site, then run the link checker and Playwright smoke tests
```

Linting runs automatically in CI on every push and pull request (`.github/workflows/lint.yml`); the link checker and Playwright suite run in `.github/workflows/test.yml`; `.github/workflows/deploy.yml` builds and deploys `_site` to GitHub Pages on push to `main`.

`lint:html` validates the **built** `_site/*.html` output, not the `src/` template sources (which contain Nunjucks front matter/tags and aren't valid HTML on their own).

## CSS conventions

The stylesheet uses BEM naming. Class selectors must match `block__element--modifier` pattern. Examples that pass: `card`, `card__title`, `card--featured`. The `selector-class-pattern` rule in `.stylelintrc.json` enforces this.

## Automated version updates

A daily GitHub Actions workflow (`.github/workflows/update-version.yml`) compares `updater/version.json` against the latest GitHub release. When a new release is found, `scripts/update_version.sh` updates `updater/version.json` (tag, URL, date) — that's the only file it touches; every displayed version string (hero/get-started/downloads buttons, footer release line, JSON-LD `softwareVersion`) is templated from `release.tag_name`/`release.monthYear` and picks up the change on the next Eleventy build.

The workflow then opens a PR automatically. To trigger manually: `workflow_dispatch` is enabled.
