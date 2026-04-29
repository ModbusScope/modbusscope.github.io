#!/usr/bin/env bash
set -euo pipefail

TAG_NAME="$1"
HTML_URL="$2"
PUBLISHED_AT="$3"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Update updater/version.json
jq \
  --arg tag  "$TAG_NAME" \
  --arg url  "$HTML_URL" \
  --arg date "$PUBLISHED_AT" \
  '.tag_name = $tag | .html_url = $url | .published_at = $date' \
  "$REPO_ROOT/updater/version.json" > "$REPO_ROOT/updater/version.json.tmp"
mv "$REPO_ROOT/updater/version.json.tmp" "$REPO_ROOT/updater/version.json"

# Derive "Month YYYY" for footer
MONTH_YEAR=$(date -d "$PUBLISHED_AT" '+%B %Y')

# Update "Download vX.Y.Z" (two occurrences in index.html)
sed -i "s/Download v[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*/Download v${TAG_NAME}/g" \
  "$REPO_ROOT/index.html"

# Update footer: "Latest release: vX.Y.Z (Month YYYY)"
sed -i "s/Latest release: v[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]* ([^)]*)/Latest release: v${TAG_NAME} (${MONTH_YEAR})/g" \
  "$REPO_ROOT/index.html"

# Update softwareVersion in JSON-LD structured data
sed -i "s/\"softwareVersion\": \"[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\"/\"softwareVersion\": \"${TAG_NAME}\"/g" \
  "$REPO_ROOT/index.html"

echo "Updated to ${TAG_NAME}"
