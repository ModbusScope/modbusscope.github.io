# modbusscope.github.io

Landing page for [ModbusScope](https://github.com/ModbusScope/ModbusScope).

## About

This repository is the source for the [ModbusScope landing page](https://modbusscope.github.io/).

[ModbusScope](https://github.com/ModbusScope/ModbusScope) is an open-source desktop application
for real-time Modbus TCP/RTU data logging and visualization. It supports all register types,
custom expressions, statistical analysis, and CSV export. Available for Windows and Linux under GPLv3.

### Automated version updates

A daily GitHub Actions workflow (`.github/workflows/update-version.yml`) compares the version in
`updater/version.json` against the latest release on GitHub. When a new release is detected,
`scripts/update_version.sh` updates `updater/version.json` and patches all version strings in
`index.html`, then the workflow opens a pull request automatically.

## Development

### Install

```sh
npm install
```

### Linting

```sh
npm run lint          # run both html-validate and stylelint
npm run lint:html     # HTML only  (html-validate)
npm run lint:css      # CSS only   (stylelint)
```

Linting also runs automatically in CI on every push and pull request
(see `.github/workflows/lint.yml`).

### Linting rule overrides

The following rules differ from `stylelint-config-standard` defaults.

#### selector-class-pattern

| | Value |
| --- | --- |
| Default | `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$` (kebab-case only) |
| Override | `^[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$` |
| Reason | The stylesheet uses BEM naming (`nav__brand`, `feature-card__icon`, `badge--green`, etc.) |

New class selectors must follow the BEM pattern — examples that pass:
`card`, `card__title`, `card--featured`, `card__title--large`.
