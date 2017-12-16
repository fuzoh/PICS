/*
| nedb
|
| Provides helpers to quickly interact with the database store.
*/


/* *****************************************
| Library imports
*/
import fs from 'fs'
import path from 'path'


/* *****************************************
| Export the database object
*/
export default {
  /*
  | db
  |
  | We save all the datas infos in this key
  */
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
  */
  createStore (storePath) {
    // create a new store file on the spécified paths
    fs.writeFileSync(storePath, JSON.stringify(this.db.datas), 'utf8' )
  },



  /*
  | getStore
  |
  | Load the neDB store
  | @param string path to the store
  */
  getStore (storePath) {
    // chek if the store is actually loaded in the memory
    if (!this.db.loaded) {
      // if not
      // sets the store path
      this.db.storePath = storePath
      // load the store from persistent support
      this.db.datas = JSON.parse(fs.readFileSync(storePath, 'utf8'))
      // sets the current loaded status of the db
      this.db.loaded = true
    }
  },



  /*
  | saveStore
  |
  | Save the store
  */
  saveStore () {
    // write the store in the specified store path
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
    // persists the store
    this.saveStore()
    // reset the db
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

    // iterates on all the elements in the store
    for (let el of this.db.datas) {

      // check matches
      if (el.title == folderName) {
        return true
      }
    }
    // no match
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

    // push in the store the new folder element
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

    // if the folder dont exists -> insert the folder in the database
    if (!this.findFolder(folderDatas.title)) {
      this.insertFolder(folderDatas)
    }

  },



  /*
  | storeNewPics
  |
  | Save in the database a new pics
  | @param object newPicsDatas new pics informations
  */
  storeNewPics (newPicsDatas) {

    // get the index of the right parent (matching the name)
    let index = this.db.datas.findIndex(x => x.title==newPicsDatas.title)
    // puts the new pics in the right parent
    this.db.datas[index].children.push(newPicsDatas)

  },



  /*
  | getAllPics
  |
  | Return all the tree of the pics library
  | @return array all the datas in the store
  */
  getAllPics () {
    return this.db.datas
  },



  /*
  | searchPics
  |
  | Search the nnedle in all the pics Store, we can pass modifiers to restrict the search query
  | @return array all the datas in the store
  */
  searchPics (needle, modifier, complete) {
    
    // To store all the results of the search query
    let queryResults = []

    //console.warn(this.db.datas)

    // loop in all the pics folders
    for (let event of this.db.datas) {

      // loop all the pics
      for (let pics of event.children) {

        let match = 0

        //console.log(pics)

        // if we have no modifiers
        if (modifier == '') {
          console.warn('No modifier')

          if (pics.name.search(needle) != -1) {
            match++
          }
          if (pics.places.search(needle) != -1) {
            match++
          }
          if (pics.description.search(needle) != -1) {
            match++
          }
          if (pics.tags.length > 0) {
            for (let tag of pics.tag) {
              if (tag.search(needle) != -1) {
                match++
              }
            }
          }
        }

        if (match >= 1) {
          queryResults.push(pics)
        }
      }
    }

    let template = [{
      title: 'Résultats de la recherche',
      children: queryResults
    }]


    complete(template)
  },



  /*
  | editPicsDatas
  |
  | Store in the database the new pics datas
  | @param string libraryStorePath path to the store
  | @param object filesTree the directory tree of the pics library
  | @param function success callback
  */
  editPicsDatas (success) {
    console.info('editPicsDatas called !')
    success('OK')
  }
}