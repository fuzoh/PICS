# Webpack

Webpack is a module bundler for the web. He compile your source file into minified files, passing by loaders and plugunis.

Loaders and plugins can be used by webpack to transpile/compile your files. In this app we use :
* **scss loader** Compile .scss in css files
* **babel** Compile ^es6 javascript to es5
* **vue-loader** Compile .vue single file componenet into javascript

Webpack provides also a dev server to develop with hot reload of your source files.

The build and de commands are provided by webpack :

## npm run dev command

* Compiles all your sources
* Start a dev server
* start electron an load the page provided by the dev server
* Hot reload the page on changes

## npm run build command

* Compile all your sources
* Download the electron binary
* Build the electron app
* Build archive with installer (.dmg on macOS, .exe on Windows)