/* *****************************************
| PICS
|
| Entry point of the main process
*/



/* *****************************************
| IMPORTS
*/

// electron modules
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
// node fs module
import fs from 'fs'

// library to fetch a directory tree in a JSON
const dirTree = require('directory-tree')

// library to read the exif metadatas
import metaDatas from './picsProcessing/metaDatas'

// imort the model to interact with persitent pics store
import database from './database/picsModel'

// iporting the base app configuration
import picsConfig from './appConfig/baseAppConfig'



/* *****************************************
| Sets global values and check the environment
*/

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

  // check if the userdata folder exists
  if(!fs.existsSync(app.getPath('userData'))) {
    fs.mkdirSync(app.getPath('userData'))
  }

  // write the fresh config file
  fs.writeFileSync(userPicsConfigPath, JSON.stringify(picsConfig), 'utf8' )

  // sets the user config var in the app
  var userPicsConfig = picsConfig

} else {

  // if the config exists -> load the config file of the user
  var userPicsConfig = JSON.parse(fs.readFileSync(userPicsConfigPath), 'utf8' )

}



/* *****************************************
| Loading app window
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
|
| Used when the user call an action who require "low level" actions on the system (writing files, natives functions)
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
      // create an empty store if not exist
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

  
  // load the store from the persistent storage
  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  // check if a store already exists in the library (imported configuration)
  if (database.db.datas.length < 1) {

    // if we have no elements in the store

    // start importing all the pictures in the folder
    // rename all the pictures and store metadatas on the database
    metaDatas.renamePics(database, userPicsConfig.picsConfig.picsLibraryPath, (success) => {

        // set the first start at false
      userPicsConfig.picsConfig.firstStart = false
          
      // save the config
      fs.writeFileSync(userPicsConfigPath, JSON.stringify(userPicsConfig), 'utf8' )

      // Send a notification to the user to stop the loader in the wiew
      event.sender.send('inportingPhotosFinish', "importation OK")

    })

  } else {

    // if a store already exists (imported config)
    // not necesary to import the pics
    event.sender.send('inportingPhotosFinish', "importation OK")

  }



})



/*
| @event updatePicsLibrary
|
| Starts the importation of the pictures in the user library folder.
*/
ipcMain.on('updatePicsLibrary', (event, args) => {

  // load the store from the persistent storage
  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  // rename all the pictures and store metadatas on the database
  metaDatas.updatePicsLibrary(database, userPicsConfig.picsConfig.picsLibraryPath, (msg) => {

    // get the new state of the pics store
    let datas = database.getAllPics()
    // send the new tree to the renderer
    event.sender.send('libraryTree', datas)
    // Send a success notification to the user
    event.sender.send('picsLibraryUpdated', msg)

  })

})



/*
| @event getLibraryTree
|
| Return a tree with all the pics in the user library
*/
ipcMain.on('getLibraryTree', (event, arg) => {

  // load the store if not loaded
  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  // gets all the pcs
  let datas = database.getAllPics()

  // send response with the path of the selected folder
  event.sender.send('libraryTree', datas)

})



/*
| @event searchPics
|
| Search a needle in the picsModel and return the result in json to the view
*/
ipcMain.on('searchPics', (event, arg) => {

  // load the store if not loaded
  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  // launch the search in all the pics with user needle and filters
  database.searchPics(arg.needle, arg.filters, (searchResult) => {

    // when the search finishes sent to renderer the response
    event.sender.send('libraryTree', searchResult)

  })
  
})



/*
| @event editPicsDatas
|
| Edit the metadatas of the required pics
*/
ipcMain.on('editPicsDatas', (event, newPicsDatas) => {

  // load the store if not loaded
  database.getStore(userPicsConfig.picsConfig.picsMetadatasPath)

  // persits in the store the new pics datas specified by the user
  database.editPicsDatas(newPicsDatas, (success) => {

    event.sender.send('picsDetailsUpdated', success)
    
  })
  
})