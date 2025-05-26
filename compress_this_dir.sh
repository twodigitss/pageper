#!/usr/bin/env bash
set -e
# Build the extension
bun run build

# Copy the manifest file to the dist folder
cp manifest.json ./dist

zip -r pageper_source_code.zip src public package* eslint.config.js build.sh vite.config.js index.html README.md compress_this_dir.sh BuildFromSource.md LICENSE manifest.json

# Go into production files
cd dist

# Package the extension (creates a .zip archive from the dist folder)
zip -r pageper_firefox.zip *

# Final message print
echo "Build and packaging complete at: pageper/dist/pageper_firefox.zip"
