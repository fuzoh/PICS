# Main process

Here we see all the main process modules :

<div align="center">
  <img src="mainArch.png" width="90%"/>
</div>

## **Yellow :** *entry point*
* **main** correspond to the `main/index.js` file. Is the entry point of the app :
  * It initializes the app window and spawn the renderer process.
  * It listens ipc Channels, and call the appropriates modules.

## **Blue :** *electron modules*
* **app** This modules represent the app, he provides methods to interact with app lifecycle events and others.
* **browserWindow** Provides methods to create a new window with is renderer process.
* **ipcMain** Provides event listener and sender to communicate between renderer and main process.
* **dialog** Provides an api to interact with natives dialog box (import dialog or save dialog).

## **Grey :** *home made modules*
* **metaDatas** Provides methods to import the pictures, read his metadatas and rename the pictures.
* **database** Provides methods to interact with the persistant or in memory store. Like the search method.

## **Red :** *comunity modules*
* **exifParser** Read the exif metadatas from .jpeg files, and allows method to work with this metas.
* **directoryTree** Allow method to generate a .json representation of a directory structure.

## **Green :** *node.js modules*
* **fs** Provides methods to interact with the file system. (reading, writing files)