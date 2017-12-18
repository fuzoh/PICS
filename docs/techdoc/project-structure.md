# Project structure

Here we descripe the folder structure :

- **.electron-vue** Contains the webpack configuration
- **build** Contains assets for the app-build (like app icons)
- **dist** The output folder for your builds (when you run `npm un build`)
- **docs** App documentation
- **nodes_modules** Where npm store all the required modules
- **src** App sources
  - **main** Main process sources
    - **appConfig** Here we store a template for the config file of the app (specific for each installaion of PICS)
    - **database** Contains the model to interact with the .json where we save the pics datas.
    - **picsProcessing** Here we found methods to interact with the exif metadatas of the pictures.
    - ***index.dev.js*** Just used in development -> inject the devtools and debug tools in the app
    - ***index.js*** The entry point of the app (main process)
  - **renderer** Renderer process sources (Vue.js part of the app)
    - **assets** Contains assets used in the wiew, like icons (this assets are processed by webpack)
    - **components** Here we found all the vue.js components
    - **router** Here we found the description of all the routes of the app
    - **store** Here we found the vuex store
    - ***App.vue*** Entry componnent of the vue.js app
    - ***globals.scss*** Global scss variables (colors)
    - ***main.js*** Entry point of the renderer process js (called by the index.html)
  - ***index.ejs*** Compilded into .html, this file will be loaded in the window of the app
- **static** Static assets for the app (not processed by webpack)
- ***.babelrc*** Babel transpiler configuration (copile ^es6 to es5 javascript)
- ***package.json*** Descripe the app dependencies

Note : all the files in the renderer folder, are compilet in a single javascript file loaded in the renderer by webpack.