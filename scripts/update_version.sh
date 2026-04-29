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

# Replace all X.Y.Z version occurrences in index.html
sed -i "s/[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*/${TAG_NAME}/g" \
  "$REPO_ROOT/index.html"

# Update the month/year suffix in the footer release line
sed -i "s/Latest release: v${TAG_NAME} ([^)]*)/Latest release: v${TAG_NAME} (${MONTH_YEAR})/g" \
  "$REPO_ROOT/index.html"

echo "Updated to ${TAG_NAME}"
