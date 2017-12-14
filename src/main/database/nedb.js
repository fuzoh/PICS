/*
| nedb
|
| Provides helpers to quickly interact with the database store.
*/


// IMPORTS
import fs from 'fs'
import path from 'path'
let neDB = require('nedb')


// EXPORT
export default {
  /*
  | getStore
  |
  | Load the neDB store
  | @param string path to the store
  | @return neDbStore
  */
  getStore (storePath) {
    let db = new neDB({filename: storePath})
    db.loadDatabase()
    return db
  },
  /*
  | storeLibrary
  |
  | Save in the database all the pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  storeNewPics (libraryStorePath, newPicsDatas, success, error) {

    // get the store
    let db = this.getStore(libraryStorePath)
    console.log('storeNewPics called')
    console.warn(newPicsDatas)

    db.insert({tutu: 'toto'})
    success()


  },
  /*
  | storeLibrary
  |
  | Save in the database all the pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  updateLibrary () {

  },
  /*
  | getAllPics
  |
  | Return all the tree of the pics library
  | @param function success callback
  */
  getAllPics (libraryStorePath, success) {
    let db = this.getStore(libraryStorePath)
    db.find({children: {path: '/Users/bastien/Sites/node.dev/MyPhotos/Mobile1/Mobile1_2017-7-18_17-7-0.jpg'}}, (err, data) => {
      console.info(data)
    })
    db.find({}, (err, data) => {
      success(data)
    })
  },
  /*
  | storeLibrary
  |
  | Save in the database all the pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  editField () {

  },
  /*
  | storeLibrary
  |
  | Save in the database all the pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  searchAll (needle, haystack) {

  },
  /*
  | storeLibrary
  |
  | Save in the database all the pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  searchFilter (needle, haystack, filter) {

  }
}