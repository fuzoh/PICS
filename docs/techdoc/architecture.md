# Application architecture

Our app is build in two differents parts :

The electrons **main** and **renderer** process.

* The main communicates with native api (filesystem, system dialogs) and the .json "database" (where we store all the pics datas). He is also responsible for performing research queries in the pics store.

* The renderer runs the vue.js application, he display the interface to the user, and react to his interaction. For view updates, the renderer sends request to the main to get new datas (like the pictures, or the search results) and display it to the user.

The next pages describe in details the main modules and renderer components.


---

**Just a note :** PICS creates a configuration file for each install of the app. In this file, we save app infos :
* App version
* App first start (just a value to detect if is the firsts start of the app => display the welocme page. Or a normal start => display the home page)
* library path (store te path to the library the user specify)
* library metas path (path to the .json store ot the app)

Actualy, is not possible to change this configuration file in the app, example : to change the library folder. If you vant to change library path, just delete this file and restart the app, PICS will restarts on the welcome page.

This file is located :
* Windows in `~/AppData/pics/pics.json`
* mac OS in `~/Library/Application Support/pics/pics.json`