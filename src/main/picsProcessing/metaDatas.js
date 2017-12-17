/*
| metaDatas
|
| Provides functions to quickly interact with the pics metas
*/

/*
| Library imports
*/
import fs from 'fs'
import path from 'path'
const dirTree = require('directory-tree')
const parser = require('exif-parser')

/*
| Export the metaDatas object
*/
export default {
  /*
  | renamePics
  |
  | Gets the date of all the pics and rename it
  | @param picsModel database an instance of pics model
  | @param object path
  | @param function success callback
  */
  renamePics (database, path, success) {

    // intialize a var tou count the files with no dates
    var noDateIndex = 0

    // get the tree of the folder (excluding config files)
    let tree = dirTree(path, {exclude:/\.DS_Store|metadatas\.json/, extensions:/\.jpg$|\.JPG$|\.jpeg$|\.JPEG$/}, (item, PATH) => {
      
      // call this block for all jpeg files
      // other types of files are not suported by the application

      // read the file
      let buffer = fs.readFileSync(item.path)

      // gets his metas
      let metas = parser.create(buffer).parse().tags

      // pars the original pics date (from the metas)
      let date = new Date(metas.DateTimeOriginal * 1000)

      // get the dirname
      let eventName = PATH.dirname(item.path).split(PATH.sep).pop()

      // get the date
      if (date.getDate()) {
        // if the date is valid
        var formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()+1}-${date.getSeconds()}`
      } else {
        // if the date is invalid
        noDateIndex++
        var formatDate = `nodate_${noDateIndex}`
      }

      // Create the new file name
      let newPicsName = `${PATH.dirname(item.path)}/${eventName}_${formatDate}${PATH.extname(item.path)}`

      // Check if the pics is a panorama
      let panorama = metas.ExifImageWidth > 2.5*metas.ExifImageHeight ? true : false

      // Create the new pics metasdatas to save in the database
      let newPicsMetas = {
        path: newPicsName,
        filename: `${eventName}_${formatDate}`,
        extension: PATH.extname(item.path),
        title: eventName,
        name: eventName,
        date: formatDate,
        places: eventName,
        description: '',
        width: metas.ExifImageWidth,
        height: metas.ExifImageHeight,
        panoramic: panorama,
        starred: 0,
        tags: [],
        peoples: [],
        parent: eventName,
        type: 'pics'
      }

      // Datas for the current folder
      let folderDatas = {
        path: PATH.dirname(item.path),
        title: eventName,
        name: eventName,
        type: 'directory',
        children: []
      }

      // Check if the folder for this already exists and update it if not
      database.updateFolder(folderDatas)

      // store the new pics in the store
      database.storeNewPics(newPicsMetas)

      // rename the pics
      fs.renameSync(item.path, newPicsName)

    })

    // save the store in persistent memory
    database.saveStore()

    // call success with the generated directory tree
    success(tree)
  },



  /*
  | updatePicsLibrary
  |
  | Check if the store is up to date with the library folder structure
  | @param picsModel database an instance of pics model
  | @param object path the path to the pics library
  | @param function success callback
  */
  updatePicsLibrary (database, path, success) {

    // use the directory tree library to iterates all the folders and all the pics
    let tree = dirTree(path, {exclude:/\.DS_Store|metadatas\.json/, extensions:/\.jpg$|\.JPG$|\.jpeg$|\.JPEG$/}, (item, PATH) => {

      // We enter in this callback for all .jpeg files detected


      // ********************
      // Firs we create the folder if not exists

      // get the path of parent directory of the current pics
      let eventPath = PATH.dirname(item.path)

      // get the dirname of the parent directory
      let eventName = PATH.dirname(item.path).split(PATH.sep).pop()

      // create a new folder with this template
      let folderDatas = {
        path: eventPath,
        title: eventName,
        name: eventName,
        type: 'directory',
        children: []
      }

      // check if the folder with this template exists and add it if not
      database.updateFolder(folderDatas)



      // ****************
      // get the index in the store of the current pics folder

      // find the index of the corresponding folder
      let folderIndex = database.db.datas.findIndex(x => x.title==eventName)


      // *****************
      // check if this pics already exists in the db
      let picsIndex = database.db.datas[folderIndex].children.findIndex(x => x.path==item.path)

      // if this pics not exists in the store
      if (picsIndex == -1) {

        // *******************
        // gets the datas from the pics and creating the record in the store

        // we get all the meta-datas from the pics
        // read the file
        let buffer = fs.readFileSync(item.path)
  
        // gets his metas
        let metas = parser.create(buffer).parse().tags
  
        // pars the original pics date (from the metas)
        let date = new Date(metas.DateTimeOriginal * 1000)
  
        // get the date fot the new file name
        if (date.getDate()) {

          // if the date is valid
          var formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()+1}-${date.getSeconds()}`

        } else {

          // if the date is invalid
          // base no date name
          var formatDate = `nodate_1`

          // check if a file with nodate exists
          for (let i = 1; fs.existsSync(`${eventPath}/${eventName}_nodate_${i + PATH.extname(item.path)}`) == true; i++) {

            // create a file name with the next index available in this folder
            formatDate = `nodate_${i+1}`

          }
        }

        // Create the new file name
        let newPicsName = `${PATH.dirname(item.path)}/${eventName}_${formatDate}${PATH.extname(item.path)}`

        // Check if the pics is a panorama
        let panorama = metas.ExifImageWidth > 2.5*metas.ExifImageHeight ? true : false

        // Create the new pics metasdatas to save in the database
        let newPicsMetas = {
          path: newPicsName,
          filename: `${eventName}_${formatDate}`,
          extension: PATH.extname(item.path),
          title: eventName,
          name: eventName,
          date: formatDate,
          places: eventName,
          description: '',
          width: metas.ExifImageWidth,
          height: metas.ExifImageHeight,
          panoramic: panorama,
          starred: 0,
          tags: [],
          peoples: [],
          parent: eventName,
          type: 'pics'
        }

        // store the new pics in the store
        database.storeNewPics(newPicsMetas)

        // rename the pics
        fs.renameSync(item.path, newPicsName)

      }

    })

    // save the store in persistent memory
    database.saveStore()

    // call success with the generated directory tree
    success({message: 'La librairie a bien été mise a jour.', type: 'success'})

  }
}