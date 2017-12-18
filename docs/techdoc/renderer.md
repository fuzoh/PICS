# Renderer process

<div align="center">
  <img src="vuecomponents.png" width="80%"/>
</div>

## Green : *pics components*
* **App** is the entry component of the app, he includes all the vue.js app and all the components.
---
* **FirstStart** displays the welcome page when we start PICS for the first time
* **ConfigureApp** displays buttons to select library folder, and start the importation. *This component interact with the main process via ipc. Event sender : **openFolderDialog**, **startImportingPhotos**. Events listener : **dialogFilePath**, **inportingPhotosFinish**.*
---
* **Home** displays the home page of the app
  * **PicsNav** the nav bar, with the search fiels and all research filters. *This component interact with the main process via ipc. Event sender : **searchPics**.*
  * **PicsAside** displays the tree wiew and the "update library" button. *This component interact with the main process via ipc. Event sender : **updatePicsLibrary**, **getLibraryTree**. Events listener : **picsLibraryUpdated**, **libraryTree**.*
  * **PicsMain** display all the pics, separated by event titles. *This component interact with the main process via ipc. Event sender : **getLibraryTree**. Events listener : **libraryTree**.*
    * **PhotoEvent** Display the event title.
    * **PhotoCard** Display the picture and his name with a hover effect.

## Blue *element-ui components*

## Orange : *router*

## Red : *vuex state*