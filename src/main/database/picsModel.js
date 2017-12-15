/*
| nedb
|
| Provides helpers to quickly interact with the database store.
*/


// IMPORTS
import fs from 'fs'
import path from 'path'
//let neDB = require('nedb')


// EXPORT
export default {
  db: {
    storePath: '',
    loaded: false,
    datas: []
  },
  /*
  | getStore
  |
  | Load the neDB store
  | @param string path to the store
  | @return neDbStore
  */
  createStore (storePath) {
    //console.error(this.db)
    fs.writeFileSync(storePath, JSON.stringify(this.db.datas), 'utf8' )
  },
  /*
  | getStore
  |
  | Load the neDB store
  | @param string path to the store
  | @return neDbStore
  */
  getStore (storePath) {
    //console.error(this.db)
    if (!this.db.loaded) {
      this.db.storePath = storePath
      this.db.datas = JSON.parse(fs.readFileSync(storePath, 'utf8'))
      this.db.loaded = true
      console.log(this.db)
    }
  },
  /*
  | saveStore
  |
  | Load the neDB store
  | @param string path to the store
  | @return neDbStore
  */
  saveStore () {
    fs.writeFileSync(this.db.storePath, JSON.stringify(this.db.datas), 'utf8')
  },
  /*
  | unloadStore
  |
  | Load the neDB store
  | @param string path to the store
  | @return neDbStore
  */
  unloadStore () {
    this.saveStore()
    this.db = {
      storePath: '',
      loaded: false,
      datas: []
    }
  },
  /*
  | newFolder
  |
  | Save in the database a new pics
  | @param object folderDatas new pics informations
  | @param function success callback
  | @param function error callback
  */
  findFolder (folderName) {

    for (let el of this.db.datas) {

      if (el.title == folderName) {
        return true
      }

    }

    return false

  },
  /*
  | newFolder
  |
  | Save in the database a new pics
  | @param object folderDatas new pics informations
  | @param function success callback
  | @param function error callback
  */
  insertFolder (folderDatas) {

    this.db.datas.push(folderDatas)

  },
  /*
  | newFolder
  |
  | Save in the database a new pics
  | @param object folderDatas new pics informations
  | @param function success callback
  | @param function error callback
  */
  updateFolder (folderDatas) {

    if (!this.findFolder(folderDatas.title)) {
      this.insertFolder(folderDatas)
    }

  },
  /*
  | storeNewPics
  |
  | Save in the database a new pics
  | @param object newPicsDatas new pics informations
  | @param function success callback
  | @param function error callback
  */
  storeNewPics (newPicsDatas) {

    //this.db.datas.

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
      success(jsonDatas)
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