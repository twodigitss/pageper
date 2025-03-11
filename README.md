# 📰 <strong>Pageper Startpage</strong>

<strong>Pageper</strong> is a minimalist looking startpage that aims to be as <strong>simple</strong> and customizable <strong>as possible</strong>.<br>
This Project was born as a small side project trying to learn how to use ReactJS ⚛️. 
<br><br>

<div style="display:grid; place-items: center;">
<img src="./public/demo.png" style="border: 3px solid black; border-radius:15px">
</div>
<br><br>

## <strong> 🖥️ How to install?</strong>

### 🧩 Through Firefox Extensions. <br>
<strong>This is the recommended way</strong> of installation.<br>
Pageper is <strong>now available</strong> at Firefox Addons Store. check it out! (:   
* https://addons.mozilla.org/en-US/firefox/addon/pageper/
<br><br>

### 📦 From source with node package manager (npm).<br>
I made a Markdown file for building from source.<br>
* [Building instructions from source and requisites](/BuildFromSource.md)

Or you can run the auto-build script that atomate this whole process.<br>
* [Auto building script](/build.sh)

    
<br>

## 🚀 <strong>Get started! </strong>

This Startpage is <strong>managed</strong> through a <strong>`JSON` file</strong> that contains configuration you set on it, like your username and bookmarks. <br>

You have a <strong>example configuration file </strong>📄 located in `src/config/template.json` to start with. <br>
You can copy the file and locate it wherever you feel like/
<br>
<i>(i put the file there to use it as fallback, <strong>so create a copy of that file for your settings, please.</strong>)</i>.

<strong>You can set</strong> your username 👤 in the "username" default value <i>(obviously dont replace the "username" key, do replace the "Default" text)</i>. <br>

<strong>To add bookmarks 📔</strong> (or modify them), you edit values on the json file, is as easy as opening a new set of values <strong>inside</strong> the `bookmark` category. The code should look like this:<br>
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
Once you have <strong>finished</strong> editing your configuration, go to the extension (or the running page) and <strong>hit the settings icon ⚙️</strong>. You will see a couple of options, click on <strong>"Upload Configuration"</strong>, select your config file and the page will reload automatically once the file has done processing. 

<strong>If nothing shows or default configuration overrides, you probably have a syntax error in your json file</strong>.<br>
For more information, search about JSON Syntax

Thats pretty much everything for now. Enjoy (:

    
<br>

## <strong>⚠️ Got a error? </strong>
Open a issue or discution in this repository (:<br>
If its possible, add the output log of the console from `Inspect(Q) -> Console`.<br> 
I am as active as i can.
