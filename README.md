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
3. Install dependencies with:<br> 
```bash
npm install
```
4. Make a static version of the project with: <br> 
```bash
npm run build
```
5. You must have gotten a new directory called `dist`. This directory contains the static files needed. 
```bash
cd dist
```

6. Make a reference to the file in `Home -> new windows and tabs -> homepage and new windows`.
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
