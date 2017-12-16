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

      // Check if the folder for this already exists
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
  }
}