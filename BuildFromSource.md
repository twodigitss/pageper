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
- **git:** Version 2.30 or higher is recommended
- **zip:** Required for packaging the extension. Version 3.0 or higher

### Additional Notes

- Ensure that your environment’s PATH variable includes the necessary executables for Node.js, npm, git, and zip.
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

>Note: You can run the project with `npm run build` for a local development.

<br>

This will generate the necessary files in the `dist/` directory.

```bash
cd dist
```

## Package the Extension

To package the extension for Firefox, you need to create a .zip file of the dist/ directory. Run:
```bash
zip -r pageper_firefox.zip *
```


## Verify the Extension

Before submitting, you can test the extension in Firefox Developer Edition:

1. Open Firefox and go to `about:debugging`.

2. Click This Firefox.

3. Click Load Temporary Add-on.

4. Select the manifest.json file inside the dist/ folder.


## Extra notes
> If you want to open the index.html file directly as a static page in firefox, you cannot access directly to files on firefox. For such, set the next options with its corresponding value in `about:config`. 

>Extra note: the only important property is the first, i did include the other third when i was searching how to open local files in firefox. try with the first property first, and if it doesn't work, enable the rest. but i am sure with the first is enough.

<br>

| Property                             | value  |
|--------------------------------------|--------|
|security.fileuri.strict_origin_policy | false  |
|browser.search.openintab              | true   |
|browser.urlbar.openintab              | true   |
|browser.tabs.loadBookmarksInTabs      | true   |