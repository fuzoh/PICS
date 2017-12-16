/*
| PICS
|
| Entry point of the main process
*/



/* *****************************************
| IMPORTS
*/

// import modules
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import fs from 'fs'

// library to fetch a directory tree in a JSON
const dirTree = require('directory-tree')
// library to read the exif metadatas
import metaDatas from './picsProcessing/metaDatas'
// library to work with the database
import database from './database/picsModel'

// iporting the configuration
import picsConfig from './appConfig/baseAppConfig'
import { arch } from 'os';

// get the current user data path (depends from the OS) (ex Appdata on windows or home directory on linux)
let userPicsConfigPath = app.getPath('userData') + '/pics.json'

// sets the static folder path in production
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}



/* *****************************************
| First start of the app
*/

// check if a config file exists (use at the first start of the app)
if (fs.existsSync(userPicsConfigPath) === false) {

  // if not exist, create a new config file with the base template file
  if(!fs.existsSync(app.getPath('userData'))) {
    fs.mkdirSync(app.getPath('userData'))
  }
  fs.writeFileSync(userPicsConfigPath, JSON.stringify(picsConfig), 'utf8' )

  // sets the user config var in the app
  var userPicsConfig = picsConfig

} else {

  // if the config exists -> load the file in the app
  // load the config file of the user
  var userPicsConfig = JSON.parse(fs.readFileSync(userPicsConfigPath), 'utf8' )

}



/* *****************************************
| Loading app windows
*/

// mainWindow -> represents the new window
let mainWindow

// load specific route if its the first start
if (userPicsConfig.picsConfig.firstStart) {

  // startup procedure if its the first start of the app
  // load the firstStart route
  var winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#firstStart`
  : `file://${__dirname}/index.html#firstStart`

} else {

  // normal startup procedure
  // load the home route
  var winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

}

// Initializing the new window
function createWindow () {

  // set initials window options
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1140,
    webPreferences: {
      webSecurity: false
    }
  })

  // loads the content
  mainWindow.loadURL(winURL)

  // close the window on close event (cross on the window)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}



/* *****************************************
| App life events
*/

// call the create Window when the main proscess is ready
app.on('ready', createWindow)

// quit the app if all the window are closed (unless darwin platforms)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// create a new mainwindow if activate is call
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})






/* *****************************************
| All the ipc interactions events
*/

/*
| @event openFolderDialog
|
| Open a native dialog to select a folder
*/
ipcMain.on('openFolderDialog', (event, arg) => {

  // open a file dialog to select a folder
  dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {

    // send response with the path of the selected folder
    event.sender.send('dialogFilePath', path)

    if (path) {
      // sets the new path to the user config file and save it
      userPicsConfig.picsConfig.picsLibraryPath = path[0]
      userPicsConfig.picsConfig.picsMetadatasPath = path[0] + '/metadatas.json'
  
      // save the config
      fs.writeFileSync(userPicsConfigPath, JSON.stringify(userPicsConfig), 'utf8' )
      // create an empty store
      if (!fs.existsSync(userPicsConfig.picsConfig.picsMetadatasPath)) {
        database.createStore(userPicsConfig.picsConfig.picsMetadatasPath)
      }
      
    }

  })
})




/*
| @event startImportingPhotos
|
| Starts the importation of the pictures in the user library folder.
*/
ipcMain.on('startImportingPhotos', (event, args) => {

  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  // we rename all the pictures in the folder with the metadatas extension
  metaDatas.renamePics(database, userPicsConfig.picsConfig.picsLibraryPath, (success) => {

    // We get the actual state of the pics library directory tree
    let libraryTree = dirTree(userPicsConfig.picsConfig.picsLibraryPath, {exclude:/\.DS_Store|metadatas\.json/})

    // set the first start at false
    userPicsConfig.picsConfig.firstStart = false
      
    // save the config
    fs.writeFileSync(userPicsConfigPath, JSON.stringify(userPicsConfig), 'utf8' )

    // send an event to the renderer
    event.sender.send('inportingPhotosFinish', "importation OK")

  }, (error) => {
    console.error('Erreur')
  })

})



/*
| @event getLibraryTree
|
| Return a tree with all the pics in the user library
*/
ipcMain.on('getLibraryTree', (event, arg) => {
  // call the database
  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)
  let datas = database.getAllPics()
  // send response with the path of the selected folder
  event.sender.send('libraryTree', datas)
  console.log('getLibraryTree')

})



/*
| @event searchPics
|
| Search a needle in the picsModel and return the result in json to the view
*/
ipcMain.on('searchPics', (event, arg) => {
  console.log('Event: searchPics')

  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  database.searchPics(arg.needle, arg.modifiers, (searchResult) => {
    event.sender.send('libraryTree', searchResult)
  })
  
})



/*
| @event getPicsDetails
|
| Get all the details of the required
*/



/*
| @event editPicsDatas
|
| Edit the metadatas of the required pics
*/
ipcMain.on('editPicsDatas', (event, arg) => {
  console.log('Event: edition de limage')
  console.warn(arg)

  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  database.editPicsDatas(arg, (success) => {
    event.sender.send('picsDetailsUpdated', success)
  })
  
})