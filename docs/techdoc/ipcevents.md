# IPC events

A list of all the ipc interactions betwen main and renderer process.
For this list, we assume we take the point of view of the main process.

## Event listener

* **openFolderDialog**
  * Launch the opening of a native dialog for selecting a folder.
  * Trough electron *dialog* module.
  * On finish, aswer with the *dialogFilePath* event.
* **startImportingPhotos**
  * Launch the pictures importation.
  * Trough *database* and *metaDatas* modules.
  * On finish, aswer with the *inportingPhotosFinish* event.
* **updatePicsLibrary**
  * Launch the update of the library to represent the new folder state.
  * Trough *database* and *metaDatas* modules.
  * On finish, aswer with the *libraryTree* and *picsLibraryUpdated* events.
* **getLibraryTree**
  * Get all the pictures from the store.
  * Trough *database* module.
  * On finish, aswer with the *libraryTree* event.
* **searchPics**
  * Search a needle in the store.
  * Trough *database* module.
  * On finish, aswer with the *libraryTree* event.
* **editPicsDatas**
  * Update the pics metas in the database
  * Trough *database* module.
  * On finish, aswer with the *picsDetailsUpdated* event.

## Event sender

* **dialogFilePath**
  * Return the selectet path (from the native dialog).
* **inportingPhotosFinish**
  * Advise the importation process is finished.
* **libraryTree**
  * Return the compléte library tree with all the pics datas.
* **picsLibraryUpdated**
  * Advise the updating library process if finished.
* **picsDetailsUpdated**
  * Advise the pics datas are updated.