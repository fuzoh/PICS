# Renderer process

<div align="center">
  <img src="vuecomponents.png" width="80%"/>
</div>

## **Green :** *pics components*

* **App** is the entry component of the app, he includes all the vue.js app and all the components.

---

* **FirstStart** displays the welcome page when we start PICS for the first time

---

* **ConfigureApp** displays buttons to select library folder, and start the importation.  
*This component interact with the main process via ipc. Event sender : **openFolderDialog**, **startImportingPhotos**. Events listener : **dialogFilePath**, **inportingPhotosFinish**.*

---

* **Home** displays the home page of the app
  * **PicsNav** the nav bar, with the search fiels and all research filters.  
  *This component interact with the main process via ipc. Event sender : **searchPics**.*
  * **PicsAside** displays the tree wiew and the "update library" button.  
  *This component interact with the main process via ipc. Event sender : **updatePicsLibrary**, **getLibraryTree**. Events listener : **picsLibraryUpdated**, **libraryTree**.*
  * **PicsMain** display all the pics, separated by event titles.  
  *This component interact with the main process via ipc. Event sender : **getLibraryTree**. Events listener : **libraryTree**.*
    * **PhotoEvent** Display the event title.
    * **PhotoCard** Display the picture and his name with a hover effect.
    
---

* **PicsDetails** Display a big overview of the picture
  * **PicsMetas** Display fields to edit picture metadatas  
  *This component interact with the main process via ipc. Event sender : **editPicsDatas**. Events listener : **picsDetailsUpdated**.*

## **Blue :** *element-ui components*

* **el-tree** element component to display a tree view [component specs](http://element.eleme.io/#/en-US/component/tree).
* **el-date-picker** display a input field, with a full date-picker on click [component specs](http://element.eleme.io/#/en-US/component/datetime-picker).
* **el-tags** display a tag list and field to add tag to the list [component specs](http://element.eleme.io/#/en-US/component/tag).

In the app we use othe element-ui components (like : el-button, el-row, el-col, el-input), because their really simple component, and used many times in the app, we decided to not show it in the top diagram.

## **Orange :** *router*

* **vue-router** this componenet display the right child component, according to the current route used :
  * **/** => Home
  * **/picsDetails** => PicsDetails
  * **/firstStart** => FirstStart
  * **/configure** => ConfigureApp

## **Red :** *vuex state*

The vuex state defines global datas, accesible by all the components.
* **editedPics** store the current edited picture data