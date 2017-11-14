// *****************************************
// PICS
// entry point of the main proscess
//
// Bastien Nicoud
//

// *****************************************
// Imports
//

// import electron modules and file system
import { app, BrowserWindow } from 'electron'
import fs from 'fs'
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
  fs.writeFileSync(userPicsConfigPath, JSON.stringify(picsConfig))

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






// tests ipc
let {ipcMain, dialog} = require('electron')

ipcMain.on('open-dialog', (event, arg) => {
  console.log(arg)
  dialog.showOpenDialog({
    properties: ['openDirectory'],
  }, (path) => {
    console.log(path)
  })
})