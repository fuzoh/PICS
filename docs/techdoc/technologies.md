# Technologic choices

To build PICS application we had the choice among several technologies. The specs don't require big performances and a multi-platform app would be an advantage. So we decided to use electron.

## Electron

Electron is a framework that allows you to create desktop applications with web technologies. Such as HTML, CSS and Javascript with node.js.

Advantages :
* Multi-platform
* Use all the api provided by node.js
* Use web technologies (all the javascript frameworks you like)
* A simple api to interact with natives OS modules (notification, application menu, touch bar...)
Disadvantages :
* High level and interpreted languages => restricted performances
* Big application build (Electron embeds : node.js engine, chrome engine and native electron modules)

## Vue.js with element-ui

To work with the view in a simple way, we decided to use Vue.js. This framework provides a new way to work with the html DOM, and allows you to split our web pages into little components, reusable and maintainable (like React or Ember.js).
Element-ui is a user interface framework built for vue.js, he provides base components to build your app like datepicker or input fields, with a flat design and desktop app compatible design.

Advantages :
* Work with the DOM in a very simple way
* Split your app in components
* Use declarative rendering with directives
* Lighter and more performant than React or Angular
Disadvantages :
* Provides just the "engine" to interact with the DOM and watch events, instead of bigger frameworks like React who provides forms validation and other features.

## Why we choose this tools

* Electron :
  * Multi-platform
  * Big community

* Vue.js
  * Split the app in components
  * Simplicity
  * Less than 30kb
  * electron-vue : a boilerplate to start quickly a project with electron, vue.js and webpack to compile assets.

* Element-ui
  * Components compatible with the desktop "design rules"