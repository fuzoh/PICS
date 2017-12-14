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
  db: {},
  /*
  | getStore
  |
  | Load the neDB store
  | @param string path to the store
  | @return neDbStore
  */
  getStore (storePath) {
    console.error(this.db)
    if (!this.db.inMemoryOnly) {
      this.db = new neDB({filename: storePath, autoload: true})
      this.db.loadDatabase()
    }
  },
  /*
  | storeLibrary
  |
  | Save in the database all the pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  storeNewPics (newPicsDatas, success, error) {

    // get the store
    //console.warn(this.db)
    console.log('storeNewPics called')
    console.warn(newPicsDatas)

    this.db.insert(newPicsDatas)
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
  getAllPics (success) {
    this.db.find({}, (err, data) => {
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