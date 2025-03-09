#!/usr/bin/env :bash

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

# Package the extension (creates a tar.gz archive from the dist folder)
tar -czvf pageper_firefox.zip -C dist .

echo "Build and packaging complete: pageper_firefox.zip"