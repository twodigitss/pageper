# 📰 <strong>Pageper Startpage</strong>

<strong>Pageper</strong> is a minimalist looking startpage that aims to be as <strong>simple</strong> and customizable <strong>as possible</strong>.<br>
This Project was born as a small side project trying to learn how to use ReactJS. 
<br><br>

<div style="display:grid; place-items: center;">
<img src="./public/demo.png" style="border: 3px solid black;">
</div>
<br><br>

## <strong>How to install 💻</strong>

> ### 🧩 Through Firefox Extensions. <br>
Is on the works (:
<br><br>

> ### 📦 Manual with Node Package Manager (npm).<br>
1. Clone this repo with: <br> 
```bash 
git clone https://github.com/twodigitss/pageper.git
```
2. Go inside the cloned directory with: <br> 
```bash
cd pageper
```
3. Make a static version of the project with: <br> 
```bash
npm run build
```
4. If for some reason you had a problem with building, install dependencies with:<br> 
```bash
npm install
```
5. You must have gotten a new directory called `dist`. This directory contains the static files needed. 
```bash
cd dist
```
6. Make sure the following lines are linking the files correctly in `index.html` (the src property must have a dot before the slash) like this.<br>
```html
<script type="module" crossorigin src="./assets/index-CcEXDJ21.js"></script>
<link rel="stylesheet" crossorigin href="./assets/index-C3egy6RG.css">
```

7. Make a reference to the file in `Home -> new windows and tabs -> homepage and new windows`.
Select `Custom Url` and select the path of the file. <br> 
The custom url should look like this:
`file:///home/your_home/pageper/dist/index.html`<br><br>


> NOTE: You cannot access directly to files on firefox. For such, set the next options with its corresponding value in `about:config`. Extra note: the only important property is the first, i did include the other third when i was searching how to open local files in firefox. try with the first property first, and if it doesn't work, enable the rest. but i am sure with the first is enough.

<br>

| Property                             | value  |
|--------------------------------------|--------|
|security.fileuri.strict_origin_policy | false  |
|browser.search.openintab              | true   |
|browser.urlbar.openintab              | true   |
|browser.tabs.loadBookmarksInTabs      | true   |

    
<br>

## <strong>Get started 🚀</strong>

This Startpage is <strong>managed</strong> through a <strong>`JSON` file</strong> that contains configuration you set on it, like your username and bookmarks. <br>

You have a <strong>example configuration file</strong> located in `src/config/template.json` to start with. <br>
You can copy the file and locate it wherever you feel like/
<br>i put the file there to use it as fallback, <strong>so create a copy of the file</strong>.

<strong>You can set</strong> your username in the "username" default value <i>(obviously dont replace the "username" key, do replace the "Default" text)</i>. <br>

<strong>To add bookmarks</strong> (or modify them), you edit values on the json file, is as easy as opening a new set of values <strong>inside</strong> the `bookmark` category. The code should look like this:<br>
```json
    "username": "your_name_here",
    "bookmarks" : {
        "title_of_your_new_category" : {
            "website_name1" : "link_of_the_website",
            "website_name2" : "link_of_the_2nd_website",
            "website_name3" : "link_of_the_3rd_website"
        }
    }
```
Once you have <strong>finished</strong> editing your configuration, go to the extension (or the running page) and <strong>hit the settings icon</strong>. You will see a couple of options, click on <strong>"Upload Configuration"</strong> and the page will reload automatically once the file has done processing. 

<strong>If nothing shows or default configuration overrides, you probably have a syntax error in your json file</strong>.<br>
For more information, search about JSON Syntax

Thats pretty much everything for now. Enjoy (:
<br>

## <strong>Got a error? ⚠️</strong>
Open a issue or discution in this repository (:<br>
I am as active as i can

# Build Instructions for Pageper Startpage

This document provides step-by-step instructions to build the Pageper Firefox extension from source.

## Prerequisites

Ensure you have the following installed on your system:

* git (v2.46.0)
* tar (GNU tar, v1.35) 
* Node.js (v22.8.0)
* npm (v10.8.2) (comes installed with Node.js)

<!--
Note: This project has been tested on Linux only.
While it is expected to work on macOS and Windows (using Git Bash or WSL), these platforms have not been verified yet.
-->

## Operating System and Build Environment Requirements

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

# Submission to Mozilla Add-ons (AMO)

1. Navigate to Firefox Add-ons Developer Hub.

2. Click Submit a New Add-on.

3. Choose On Your Own and upload pageper_firefox.zip.

4. Provide the required details and submit for review.

5. For any issues, refer to the repository documentation or contact the maintainer.

