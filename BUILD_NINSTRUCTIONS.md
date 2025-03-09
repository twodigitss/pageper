# <strong>Build Instructions for Pageper Startpage</strong>

This document provides step-by-step instructions to build the Pageper Firefox extension from source.

# <strong>Prerequisites</strong>

<!--
Note: This project has been tested on Linux only.
While it is expected to work on macOS and Windows (using Git Bash or WSL), these platforms have not been verified yet.
-->

### Operating System and Build Environment Requirements

This project has been tested and is supported on the following platforms:

- **Linux:** (e.g., Ubuntu 20.04+ or similar distributions)
- **macOS:** (Mojave and later)
- **Windows:** (Using Git Bash or Windows Subsystem for Linux (WSL) is recommended for Unix-like tooling)

### Software Requirements

- **Node.js:** Version 22.8.0 or higher (LTS recommended)
- **npm:** (Comes bundled with Node.js; ensure version 9 or higher)
- **Git:** Version 2.30 or higher is recommended
- **tar Utility:** Required for packaging the extension (typically available by default on Linux and macOS; for Windows, use Git Bash or install a compatible tar tool)

### Additional Notes

- Firefox Extension Testing: Use the latest version of Mozilla Firefox for loading and testing your extension.
- Ensure that your environment’s PATH variable includes the necessary executables for Node.js, npm, Git, and tar.
<br> 

# <strong> Building</strong>

## Clone the Repository
```bash
git clone https://github.com/twodigitss/pageper.git
cd pageper
```
## Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

## Build the Extension

To create a production-ready build, run:
```bash
npm run build
```
This will generate the necessary files in the `dist/` directory.

## Package the Extension

To package the extension for Firefox, you need to create a .zip file of the dist/ directory. Run:
```bash
tar -czvf pageper_firefox.zip -C dist .
```

## Verify the Extension

Before submitting, you can test the extension in Firefox Developer Edition:

1. Open Firefox and go to `about:debugging`.

2. Click This Firefox.

3. Click Load Temporary Add-on.

4. Select the manifest.json file inside the dist/ folder.
