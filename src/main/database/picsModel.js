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
  | folderExists
  |
  | Return true if the folder exists
  | @param string folderName
  */
  folderExists (folderName) {

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
    if (!this.folderExists(folderDatas.title)) {
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
  | Search the nnedle in all the pics Store, we can pass filters to restrict the search query
  | @return array all the datas in the store
  */
  searchPics (needle, filters, complete) {
    
    // To store all the results of the search query
    let queryResults = []

    console.warn('searchPics called')
    console.log('Needle' + needle)
    console.warn(filters)

    // loop in all the pics folders
    for (let event of this.db.datas) {

      // loop all the pics
      for (let pics of event.children) {

        let match = 0
        let usedFilters = 0

        // If the starred filter is activated
        if (filters.starred === true) {
          console.log('Filtre les images avec star')
          usedFilters++

          // if the picture is starred
          if (pics.starred === 1 ) {
            
            let starredFilter = 0

            // If the name filter is activated
            if (filters.name === true) {
              starredFilter++
              console.log('Filtre par noms')
              if (pics.name.search(needle) != -1) {
                match++
              }
            }

            // If the places filter is activated
            if (filters.places === true) {
              starredFilter++
              console.log('Filtre par places')
              if (pics.places.search(needle) != -1) {
                match++
              }
            }

            // If the description filter is activated
            if (filters.description === true) {
              starredFilter++
              console.log('Filtre par description')
              if (pics.description.search(needle) != -1) {
                match++
              }
            }

            // If the tags filter is activated
            if (filters.tags === true) {
              starredFilter++
              if (pics.tags.length > 0) {
                for (let tag of pics.tags) {
                  if (tag.search(needle) != -1) {
                    match++
                  }
                }
              }
            }

            // If the people filter is activated
            if (filters.peoples === true) {
              starredFilter++
              if (pics.peoples.length > 0) {
                for (let people of pics.peoples) {
                  if (people.search(needle) != -1) {
                    match++
                  }
                }
              }
            }

            // if we have use no filter
            if (starredFilter < 1) {
              match++
            }

          }
        
        } else {

          // If the name filter is activated
          if (filters.name === true) {
            usedFilters++
            console.log('Filtre par noms')
            if (pics.name.search(needle) != -1) {
              match++
            }
          }

          // If the places filter is activated
          if (filters.places === true) {
            usedFilters++
            console.log('Filtre par places')
            if (pics.places.search(needle) != -1) {
              match++
            }
          }

          // If the description filter is activated
          if (filters.description === true) {
            usedFilters++
            console.log('Filtre par description')
            if (pics.description.search(needle) != -1) {
              match++
            }
          }

          // If the people filter is activated
          if (filters.peoples === true) {
            usedFilters++
            if (pics.peoples.length > 0) {
              for (let people of pics.peoples) {
                if (people.search(needle) != -1) {
                  match++
                }
              }
            }
          }

          // If the tags filter is activated
          if (filters.tags === true) {
            usedFilters++
            if (pics.tags.length > 0) {
              for (let tag of pics.tags) {
                if (tag.search(needle) != -1) {
                  match++
                }
              }
            }
          }

        }


        // if we dont have use filters
        if (usedFilters < 1) {
          console.warn('No filters')

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
            for (let tag of pics.tags) {
              if (tag.search(needle) != -1) {
                match++
              }
            }
          }
          if (pics.peoples.length > 0) {
            for (let people of pics.peoples) {
              if (people.search(needle) != -1) {
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
      name: 'Résultats de la recherche',
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
  editPicsDatas (newPicsDatas, success) {
    console.info('editPicsDatas called !')

    let folderIndex = 0
    let picsIndex = 0

    // iterates all the folders in the database, an get the right
    for (let i = 0; this.db.datas.length > i; i++) {
      if (this.db.datas[i].title === newPicsDatas.title) {
        folderIndex = i
      }
    }

    // iterates all the pics on the folder and get the right
    for (let i =0; this.db.datas[folderIndex].children.length > i; i++) {
      if (this.db.datas[folderIndex].children[i].filename === newPicsDatas.filename) {
        picsIndex = i
      }
    }

    // if the date is not specified
    if (newPicsDatas.date == null) {
      // sed an error message to the renderer
      success({message: "Aucunne date n'a été renseignée.", type: 'warning'})
      
    } else {

      // chek if the date has changes
      if (this.db.datas[folderIndex].children[picsIndex].date != newPicsDatas.date) {
        // if its not the same is nesesary to rename the file
  
        // create the new file name an the new path
        let newFileName = `${newPicsDatas.title}_${newPicsDatas.date}`
        let newFilePath = `${path.dirname(newPicsDatas.path)}/${newFileName + newPicsDatas.extension}`
  
        // save it to the pics datas
        newPicsDatas.filename = newFileName
        newPicsDatas.path = newFilePath
  
        // rename the pics
        fs.renameSync(this.db.datas[folderIndex].children[picsIndex].path, newPicsDatas.path)
      }
  
      // update the datas of the pics in the database store
      this.db.datas[folderIndex].children[picsIndex] = newPicsDatas
  
      // persists the store on the json file
      this.saveStore()
  
      // call the success callback with a success message
      success({message: 'Les données ont bien étés enregistrées.', type: 'success'})
      
    }
  }
}