// *********************************
// PICS
// entry point of the application


// import electron base components
import { app, BrowserWindow } from 'electron'

// sets the static folder path in production
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// mainWindow -> represents the new window
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// this function create a new window
function createWindow () {

  // set initials window options
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000
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