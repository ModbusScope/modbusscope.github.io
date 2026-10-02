# modbusscope.github.io

Landing page for [ModbusScope](https://github.com/ModbusScope/ModbusScope).

## About

This repository is the source for the [ModbusScope landing page](https://modbusscope.github.io/).

[ModbusScope](https://github.com/ModbusScope/ModbusScope) is an open-core desktop application
for real-time Modbus TCP/RTU data logging and visualization. It supports all register types,
custom expressions, statistical analysis, and CSV export. Available for Windows and Linux.

### Automated version updates

A daily GitHub Actions workflow (`.github/workflows/update-version.yml`) compares the version in
`updater/version.json` against the latest release on GitHub. When a new release is detected,
`scripts/update_version.sh` updates `updater/version.json`; every version string shown on the site
is templated from that file at build time, so no other files need patching. The workflow then opens
a pull request automatically.

## Development

See [CLAUDE.md](CLAUDE.md) for commands and conventions.
