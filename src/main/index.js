// *****************************************
// PICS
// entry point of the main proscess
//
// Bastien Nicoud
//

// *****************************************
// Imports
//

// import modules
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import fs from 'fs'

const dirTree = require('directory-tree');

// importing pics app modules
//import { importPics } from './filesystem/importation'

// iporting the configuration
import picsConfig from './appConfig/baseAppConfig'



// get the current user data path (depends from the OS) (ex Appdata on windows or home directory on linux)
let userPicsConfigPath = app.getPath('userData') + '/pics.json'

// sets the static folder path in production
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}



// *****************************************
// First Start
//

// check if a config file exists (use at the first start of the app)
if (!fs.existsSync(userPicsConfigPath)) {

  // if not exist, create a new config file with the base template file
  fs.writeFileSync(userPicsConfigPath, JSON.stringify(picsConfig), { encoding: 'utf8' })

}



// *****************************************
// Loadign datas of the app
//

// load the config file of the user
let userPicsConfig = JSON.parse(fs.readFileSync(userPicsConfigPath))


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
    height: 600,
    useContentSize: true,
    width: 1000,
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



// *****************************************
// app life events
//

// call the create Window when the main proscess is ready
app.on('ready', createWindow)

// quit the app if all the window are closed (on darwin platforms)
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






// *****************************************
// All the ipc interactions
//

// this channel listen to open a dialog
ipcMain.on('openFolderDialog', (event, arg) => {

  // open a file dialog to select a folder
  dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {
    
    // send response with the path of the selected folder
    event.sender.send('dialogFilePath', path)

    // sets the new path to the user config file and save it
    userPicsConfig.picsConfig.picsLibraryPath = path[0]
    userPicsConfig.picsConfig.picsMetadatasPath = path[0] + '/metadatas.json'

    // save the config
    fs.writeFileSync(userPicsConfigPath, JSON.stringify(userPicsConfig), { encoding: 'utf8' })

  })
})


// launching the importation of photos
ipcMain.on('startImportingPhotos', (event, args) => {

  // recuperer le doosier contenant les photos
  // recuperer le tree complet (sans les fichier .DS_store ou autres desktop.ini)
  // créer les enregistrements neeDB en fonction du tree juste avec les données voulues
  // sauvegarder l'état de needb
  // créer les version compressées des images (fichiers cachés sur tous les OS ?)
  // renvoyer l'état de l'importation

  console.log('Starting importation')

  // get the complete directory tree of the specified folder
  let libraryTree = dirTree(userPicsConfig.picsConfig.picsLibraryPath)

  console.log(libraryTree)
  let libraryTreeJson = JSON.stringify(libraryTree)
  //console.log(libraryTreeJson)

  //console.log(libraryMetadatasPath)
  //fs.writeFileSync(libraryMetadatasPath, libraryTreeJson)
  fs.writeFile(userPicsConfig.picsConfig.picsMetadatasPath, libraryTreeJson, { encoding: 'utf8' }, (err) => {
    if (err) throw err;
    console.log('The json tree file as benn saved');
  });


  event.sender.send('inportingPhotosFinish', "importation OK")
  console.log('importation ok !')

})


// this channel listen to open a dialog
ipcMain.on('getLibraryTree', (event, arg) => {

  let libraryTree = JSON.parse(fs.readFileSync(userPicsConfig.picsConfig.picsMetadatasPath))
  // send response with the path of the selected folder
  event.sender.send('libraryTree', libraryTree)
})