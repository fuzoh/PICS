// *********************************
// PICS
// entry point of the application


// import electron base components
import { app, BrowserWindow } from 'electron'

// import starting module
//import start from './start.js'

// sets the static folder path in production
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}



// Importing the configuration
import fs from 'fs'
import picsConfig from './appConfig/baseAppConfig'

// get the current user data path (depends from the OS)
let userPicsConfigPath = app.getPath('userData') + '/pics.json'



// check if a config file exists (user at the first start of the app)
if (!fs.existsSync(userPicsConfigPath)) {
  // if not exist, create a new config file with the base template file
  fs.writeFileSync(userPicsConfigPath, JSON.stringify(picsConfig))
}



// load the config file of the user
let userPicsConfig = JSON.parse(fs.readFileSync(userPicsConfigPath))

console.log(userPicsConfig.picsConfig.firstStart)



// mainWindow -> represents the new window
let mainWindow

// load specific route if its the first start
if (userPicsConfig.picsConfig.firstStart) {
  
  // load the firstStart route
  var winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#firstStart`
  : `file://${__dirname}/index.html#firstStart`
  
} else {
  
  // load the home route
  var winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
  
}


// this function create a new window
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

  // close the window
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

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