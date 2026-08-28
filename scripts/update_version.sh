#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

RELEASE=$(curl -fsSL https://api.github.com/repos/ModbusScope/ModbusScope/releases/latest)
TAG_NAME=$(echo "$RELEASE"    | jq -r '.tag_name')
HTML_URL=$(echo "$RELEASE"    | jq -r '.html_url')
PUBLISHED_AT=$(echo "$RELEASE" | jq -r '.published_at')

# Update updater/version.json
jq \
  --arg tag  "$TAG_NAME" \
  --arg url  "$HTML_URL" \
  --arg date "$PUBLISHED_AT" \
  '.tag_name = $tag | .html_url = $url | .published_at = $date' \
  "$REPO_ROOT/updater/version.json" > "$REPO_ROOT/updater/version.json.tmp"
mv "$REPO_ROOT/updater/version.json.tmp" "$REPO_ROOT/updater/version.json"

echo "Updated to ${TAG_NAME}"
