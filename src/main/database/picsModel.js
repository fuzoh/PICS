/*
| picsModel
|
| Provides functions to quickly interact with the datas store
*/


/*
| Library imports
*/
import fs from 'fs'
import path from 'path'


/*
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
  | createStore
  |
  | Create a new json file in the specified directory
  |
  | @param string storePath path to the store
  */
  createStore (storePath) {
    // create a new store file on the spécified paths
    fs.writeFileSync(storePath, JSON.stringify(this.db.datas), 'utf8' )
  },



  /*
  | getStore
  |
  | Load the datas from the persistent json store
  |
  | @param string storePath path to the store
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
  | Save the actual state of the in memory store to the persistent json store
  */
  saveStore () {
    // write the store in the specified store path
    fs.writeFileSync(this.db.storePath, JSON.stringify(this.db.datas), 'utf8')
  },



  /*
  | unloadStore
  |
  | Unload the in memory store
  */
  unloadStore () {
    // persists the store
    this.saveStore()
    // reset the db object
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
  | insertFolder
  |
  | Save a new folder in the store
  | @param object folderDatas new folder informations
  */
  insertFolder (folderDatas) {

    // push in the store the new folder element
    this.db.datas.push(folderDatas)

  },



  /*
  | updateFolder
  |
  | Call the insert method if the specified folder dont exists in the store
  | @param object folderDatas new folder informations
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

    // loop in all the pics folders
    for (let event of this.db.datas) {

      // loop all the pics
      for (let pics of event.children) {

        // to store if the pics have matches
        let match = 0
        // to store if filters is used
        let usedFilters = 0
        // to store if the panoramic filter is used
        let panoramicFilterUsed = 0



        /*
        | The search conditions
        |
        | In the following conditions, we test all the possibilities of filtering, and the possible match with the query
        */

        // If the starred filter is activated
        if (filters.starred === true) {
          
          // add 1 used filter on the counter
          usedFilters++

          // if the picture is starred
          if (pics.starred === 1 ) {
            
            // to store if filters with the panoramic filter is used
            let starredFilter = 0

            // If the name filter is activated
            if (filters.name === true) {
              starredFilter++
              if (pics.name.search(needle) != -1) {
                match++
              }
            }

            // If the places filter is activated
            if (filters.places === true) {
              starredFilter++
              if (pics.places.search(needle) != -1) {
                match++
              }
            }

            // If the description filter is activated
            if (filters.description === true) {
              starredFilter++
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

            // if the panoramic filter is activated
            if (filters.panoramic === true) {
              starredFilter++
              panoramicFilterUsed++
              if (pics.panoramic === true) {
                match++
              }
            }

            // if we have no use filters and no needle, we search in all propertys
            if (starredFilter < 1 && needle == '') {
              
              // we match all the starred pics
              match++

            } else if (starredFilter < 1) {

              // if we have use no filter
              // but we have a needle -> search in all the propertys

              // search in the name
              if (pics.name.search(needle) != -1) {
                match++
              }
              // search in the places
              if (pics.places.search(needle) != -1) {
                match++
              }
              // search in the description
              if (pics.description.search(needle) != -1) {
                match++
              }
              // search in the tags
              if (pics.tags.length > 0) {
                for (let tag of pics.tags) {
                  if (tag.search(needle) != -1) {
                    match++
                  }
                }
              }
              // search in peoples
              if (pics.peoples.length > 0) {
                for (let people of pics.peoples) {
                  if (people.search(needle) != -1) {
                    match++
                  }
                }
              }

            }

          }

        // if the panoramic filter is activated
        } else if ((filters.panoramic === true) && (panoramicFilterUsed < 1)) {

          // one more filter is used
          usedFilters++

          // test if the pics is panoramic
          if (pics.panoramic === true) {

            // to store how filters is used with the panoramic filter
            let panoramicFilters = 0

            // If the name filter is activated
            if (filters.name === true) {
              panoramicFilters++
              if (pics.name.search(needle) != -1) {
                match++
              }
            }

            // If the places filter is activated
            if (filters.places === true) {
              panoramicFilters++
              if (pics.places.search(needle) != -1) {
                match++
              }
            }

            // If the description filter is activated
            if (filters.description === true) {
              panoramicFilters++
              if (pics.description.search(needle) != -1) {
                match++
              }
            }

            // If the tags filter is activated
            if (filters.tags === true) {
              panoramicFilters++
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
              panoramicFilters++
              if (pics.peoples.length > 0) {
                for (let people of pics.peoples) {
                  if (people.search(needle) != -1) {
                    match++
                  }
                }
              }
            }

            // if we have no use filters and no needle, we search in all propertys
            if (panoramicFilters < 1 && needle == '') {
              
              // we match all the starred pics
              match++

            } else if (panoramicFilters < 1) {

              // if we have use no filter
              // but we have a needle -> search in all the propertys

              // search in the name
              if (pics.name.search(needle) != -1) {
                match++
              }
              // search in the places
              if (pics.places.search(needle) != -1) {
                match++
              }
              // search in the description
              if (pics.description.search(needle) != -1) {
                match++
              }
              // search in the tags
              if (pics.tags.length > 0) {
                for (let tag of pics.tags) {
                  if (tag.search(needle) != -1) {
                    match++
                  }
                }
              }
              // search in peoples
              if (pics.peoples.length > 0) {
                for (let people of pics.peoples) {
                  if (people.search(needle) != -1) {
                    match++
                  }
                }
              }

            }

          }

        // if we dont use the star or the panoramic filter
        } else {

          // If the name filter is activated
          if (filters.name === true) {
            usedFilters++
            if (pics.name.search(needle) != -1) {
              match++
            }
          }

          // If the places filter is activated
          if (filters.places === true) {
            usedFilters++
            if (pics.places.search(needle) != -1) {
              match++
            }
          }

          // If the description filter is activated
          if (filters.description === true) {
            usedFilters++
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


        // if no filter is used
        if (usedFilters < 1) {

          // search in the name
          if (pics.name.search(needle) != -1) {
            match++
          }
          // search in the places
          if (pics.places.search(needle) != -1) {
            match++
          }
          // search in the description
          if (pics.description.search(needle) != -1) {
            match++
          }
          // search in the tags
          if (pics.tags.length > 0) {
            for (let tag of pics.tags) {
              if (tag.search(needle) != -1) {
                match++
              }
            }
          }
          // search in peoples
          if (pics.peoples.length > 0) {
            for (let people of pics.peoples) {
              if (people.search(needle) != -1) {
                match++
              }
            }
          }
        }

        // If the the search query have a match with this pics
        if (match >= 1) {
          // Add it to the array of results
          queryResults.push(pics)
        }


      }
    }

    // create a template with the results of the search
    let template = [{
      title: 'Résultats de la recherche',
      name: 'Résultats de la recherche',
      children: queryResults
    }]

    // call the complete callback, with the result of the search
    complete(template)
  },



  /*
  | editPicsDatas
  |
  | Store in the database the new pics datas
  | @param object newPicsDatas the new pics datas
  | @param function success callback
  */
  editPicsDatas (newPicsDatas, success) {
    
    // to store the index of the desired pics
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