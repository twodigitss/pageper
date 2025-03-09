#!/usr/bin/env bash
set -e

# Clone repository if not already present
if [ ! -d "pageper" ]; then
  git clone https://github.com/twodigitss/pageper.git
fi

# Go into the repository
cd pageper

# Install dependencies
npm install

# Build the extension
npm run build

# Copy the manifest file to the dist folder
cp manifest.json ./dist

# Go into production files
cd dist

# Package the extension (creates a .zip archive from the dist folder)
zip -r pageper_firefox.zip *

# Final message print
echo "Build and packaging complete at: pageper/dist/pageper_firefox.zip"
