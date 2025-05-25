#!/usr/bin/env bash
set -e
# Build the extension
bun run build

# Copy the manifest file to the dist folder
cp manifest.json ./dist

# Go into production files
cd dist

# Package the extension (creates a .zip archive from the dist folder)
zip -r pageper_firefox.zip *

# Final message print
echo "Build and packaging complete at: pageper/dist/pageper_firefox.zip"
