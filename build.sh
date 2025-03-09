#!/usr/bin/env bash

set -e

# Clone repository if not already present
if [ ! -d "pageper" ]; then
  git clone https://github.com/twodigitss/pageper.git
fi

cd pageper

# Install dependencies
npm install

# Build the extension
npm run build

cp manifest.json ./dist

# Go into production files
cd dist

# Package the extension (creates a tar.gz archive from the dist folder)
zip -r pageper_firefox.zip *

echo "Build and packaging complete at: pageper/dist/pageper_firefox.zip"
