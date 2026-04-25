# modbusscope.github.io

Landing page for [ModbusScope](https://github.com/ModbusScope/ModbusScope).

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

---

**`selector-class-pattern`**

| | Value |
|---|---|
| Default | `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$` (kebab-case only) |
| Override | `^[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$` |
| Reason | The stylesheet uses BEM naming (`nav__brand`, `feature-card__icon`, `badge--green`, etc.) |

New class selectors must follow the BEM pattern — examples that pass:
`card`, `card__title`, `card--featured`, `card__title--large`.
