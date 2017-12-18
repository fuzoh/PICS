# Issues

## Bugs
* If there are two images that have exactly the same date (within seconds) in the same folder, only one image is preserved. => The program delete the first by renaming the second with the same name.
* In rare cases, the images are displayed upside down in the application. => the app does not take charge the orientation of the picture stored in the metadata.
* When we open invalid jpeg sequence images, the app trow a javascript popup with the error.
* When we have other files in our pictures library folder, the application will consider these files as folders (and display it at event sections in the app).
* On windows, when we import the folder in pics via the open folder dialog, if we select a windows library, the app wil dispaly an error, its only possible to select a folder.
* When we open the date-piecker (in the details view), the date-piecker will overflow on the right of the window.

## Performances
* The app load in one time all the pictures in the view. If we have lots of image its cause frezze in the app or memory overload. => Implement a lazy loading system will resolve this.
* The pictires are not compressed in the view, so it cost a lot of memory and ressources to display it. => Displaying a thumbnail will resolve them.

## Features
* If we delete an image in a folder, the store will not be updated. Add a feature to do this.
* Export the metadatas in the files, actually the app store all the metadatas in the metadatas.json file. If you change the metas in the app, its not possible to recover this metas in the picture exif-metas. A new feature to export the json metas in the exif-mets of the pictures would be convenient.
* Add inputs validation in the details view, to prevent the non valid datas. => max length of the name, max length of the description.