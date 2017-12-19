# Webpack

Webpack is a module bundler for the web. He compiles your source file into minified files, passing by loaders and plugins.

Loaders and plugins can be used by webpack to transpile/compile your files. In this app we use :
* **scss loader** Compile .scss in css files
* **babel** Compile ^es6 javascript to es5
* **vue-loader** Compile .vue single file componenet into javascript

Webpack provides also a dev server to develop with hot reload of your source files.

The `build` and `dev` commands are provided by webpack :

## `npm run dev` command

* Compiles all your sources
* Start a dev server
* start electron an load the page provided by the dev server
* Hot reload the page on changes

## `npm run build` command

* Compile all your sources and assets
* Download the electron binary
* Build the electron app
* Build archive with installer (.dmg on macOS, .exe on Windows)

## Webpack ressources

* [webpack doc](https://webpack.js.org/concepts/)
* [webpack loaders](https://webpack.js.org/loaders/)
* [webpack plugins](https://webpack.js.org/plugins/)

* [electron-vue doc](https://simulatedgreg.gitbooks.io/electron-vue/content/en/) a starter template to use electron with vue.js