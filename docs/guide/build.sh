#!/bin/sh
# Renders guide-ka.pdf and guide-en.pdf from the HTML sources next to this script.
# Needs Google Chrome (or Chromium) and the Noto Sans / Noto Sans Georgian fonts.
set -e
cd "$(dirname "$0")"
chrome=$(command -v google-chrome || command -v chromium || command -v chromium-browser)
for lang in ka en; do
  "$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="guide-$lang.pdf" "file://$PWD/guide-$lang.html"
done
