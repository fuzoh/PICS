# Issues

Here we see a list of known issues, and possibilities to solve the problem. If you find new issues, you can open a issue in our [GitHub repo](https://github.com/bastiennicoud/PICS/issues).

## Bugs
* **Indice :** If there are two images that have exactly the same date (within seconds) in the same folder, only one image is preserved.  
**Cause :** The program delete the first by renaming the second with the same name.  
**Resolve :** Add an incremental value at the end of the file name, to preserve a unique file name.

* **Indice :** In rare cases, the images are displayed upside down in the application.  
**Cause :** the app does not take in charge the orientation of the picture stored in the metadata.  
**Resolve :** Read the orientation metadata, and turn the picture in the right direction at the rendering.

* **Indice :** When we open invalid jpeg sequence images, the app trow a javascript popup with the error.  
**Cause :** The application does not detect and manage invalid jpeg sequence.  
**Resolve :** Detect invalid sequence, and implement a system to magage this cases.

* **Indice :** When we have other files in our pictures library folder, the application will consider these files as folders (and display it at event sections in the app).  
**Cause :** The app curently not ignore other files that the desired folders.  
**Resolve :** Add rules to ignore the non desired files.

* **Indice :** On windows, when we import the folder in pics via the open folder dialog, if we select a windows library, the app wil dispaly an error, its only possible to select a folder.  
**Cause :** Windows library links are not considered as folders, the dialog only accept folders.  
**Resolve :** No actual solution.

* **Indice :** When we open the date-piecker (in the details view), the date-piecker will overflow on the right of the window.  
**Cause :** The element ui datepicker spawn centred below the input field (and owerflow on the right of the app).  
**Resolve :** Change CSS to display the datepicker on the left of the input.

* **Indice :** If we delete the folder containing the library, the applicattion will return an alert box, and start with an empty page.  
**Cause :** The app curently not check the existence of the library at the start.  
**Resolve :** Check the existence of the folder at each starts of the app.

* **Indice :** If we delete the metadatas.json condained in the library folder, the applicattion will return an alert box, and start with an empty page.  
**Cause :** The app curently not check the existence of the metadatas.json store file.
**Resolve :** Check the existence of the file at each starts of the app.

## Performances
* The app load in one time all the pictures in the view. If we have lots of image its cause frezze in the app or memory overload.  
**Resolve :** Implement a lazy loading system will resolve this.

* The pictires are not compressed in the view, so it cost a lot of memory and ressources to display it.  
**Resolve :** Displaying a thumbnail will resolve them.

## Features
* If we delete an image in a folder, the store will not be updated. Add a feature to do this.

* Export the metadatas in the picture exif-metas, actually the app store all the metadatas in the metadatas.json file. If you change the metas in the app, its not possible to recover this metas in the picture exif-metas. A new feature to export the json metas in the exif-mets of the pictures would be convenient.

* Add inputs validation in the details view, to prevent the non valid datas. => max length of the name, max length of the description.