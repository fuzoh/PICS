// baseAppConfig.js
// this file provide the base config of the app
// it is the template of the pics.json file (saved in the application data folder)


// *****************************************
// picsConfig {}
//
// appName           the name of the app
// appVerson         actual version of PICS
// firstStart        define if is the first start of the app
// picsLibraryPath   the path of the folder that contains all the photos of the user
// picsMetadatasPath the path of the neeDB database backup file (contains all the datas on the photos)
//

module.exports.picsConfig = {
  "appName": 'PICS',
  "appVersion": '1.1.1',
  "firstStart": true,
  "picsLibraryPath" : "",
  "picsMetadatasPath" : "",
}