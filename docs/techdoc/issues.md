# Issues

## Bugs
* If there are two images that have exactly the same date (within seconds) in the same folder, only one image is preserved. => The program delete the first by renaming the second with the same name.
* In rare cases, the images are displayed upside down in the application. => the app does not take charge the orientation of the picture stored in the metadata.

## Performances
* The app load in one time all the pictures in the view. If we have lots of image its cause frezze in the app or memory overload. => Implement a lazy loading system will resolve this.
* The pictires are not compressed in the view, so it cost a lot of memory and ressources to display it. => Displaying a thumbnail will resolve them.

## Features
* If we delete an image in a folder, the store will not be updated. Add a feature to do this.