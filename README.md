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
Each entry documents the default value, the current override, the reason,
and how to restore the default when the code is updated.

---

**`selector-class-pattern`**

| | Value |
|---|---|
| Default | `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$` (kebab-case only) |
| Override | `^[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$` |
| Reason | The stylesheet uses BEM naming (`nav__brand`, `feature-card__icon`, `badge--green`, etc.) |
| To restore | Rename all BEM classes to plain kebab-case, then remove the rule from `.stylelintrc.json` |

New class selectors must follow the BEM pattern — examples that pass:
`card`, `card__title`, `card--featured`, `card__title--large`.

---

**`color-function-notation`**

| | Value |
|---|---|
| Default | `"modern"` — requires `rgb(0 0 0 / 8%)` syntax |
| Override | `"legacy"` — accepts `rgba(0, 0, 0, 0.08)` syntax |
| Reason | `styles.css` uses the legacy four-argument `rgba()` form (~26 occurrences) |
| To restore | Replace every `rgba(r, g, b, a)` in `styles.css` with `rgb(r g b / a%)`, then set rule to `"modern"` |

---

**`alpha-value-notation`**

| | Value |
|---|---|
| Default | `"percentage"` — requires `8%` for alpha values |
| Override | `"number"` — accepts `0.08` decimal form |
| Reason | Paired with `color-function-notation: "legacy"`; CSS uses decimal alpha values |
| To restore | Do this together with the `color-function-notation` migration above, then set to `"percentage"` |

---

**`media-feature-range-notation`**

| | Value |
|---|---|
| Default | `"context"` — requires `(width <= 575px)` modern range syntax |
| Override | `"prefix"` — accepts `(max-width: 575px)` legacy prefix syntax |
| Reason | All media queries in `styles.css` use `min-width`/`max-width` prefix notation |
| To restore | Convert all `(max-width: X)` to `(width <= X)` and `(min-width: X)` to `(width >= X)` in `styles.css`, then remove the override |

---

**`custom-property-empty-line-before`**

| | Value |
|---|---|
| Default | `"never"` — disallows empty lines immediately before a custom property |
| Override | `null` (disabled) |
| Reason | `:root` uses blank lines to visually separate groups of custom properties |
| To restore | Remove the blank lines between groups in `:root`, then remove the override |

---

**`no-descending-specificity`**

| | Value |
|---|---|
| Default | `"error"` — disallows lower-specificity selectors after higher-specificity ones for the same property |
| Override | `null` (disabled) |
| Reason | `.hero .btn-primary` and `.get-started .btn-primary` are flagged as conflicting but target elements in completely different parent contexts — the rule produces a false positive here |
| To restore | Re-enable, then reorder the selectors to satisfy the rule or refactor into a shared modifier class |
