import fs from 'fs'
import path from 'path'

const dirTree = require('directory-tree')
const parser = require('exif-parser')

export default {
  /*
  | renamePics
  |
  | Gets the date of all the pics and rename it
  | @param object path
  | @param function success callback
  | @param function error callback
  */
  renamePics (database, libraryStorePath, path, success, error) {

    // intialize a var tou count the files with no dates
    var noDateIndex = 0

    // get the tree of the folder (excluding config files)
    let tree = dirTree(path, {exclude:/\.DS_Store|metadatas\.json/, extensions:/\.jpg$|\.JPG$|\.jpeg$|\.JPEG$/}, (item, PATH) => {
      
      // call this block for all jpeg files

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
        var formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()+1}-${date.getSeconds()}`
      } else {
        // if the date is invalid
        noDateIndex++
        var formatDate = `nodate_${noDateIndex}`
      }

      // Create the new file name
      let newPicsName = `${PATH.dirname(item.path)}/${eventName}_${formatDate}${PATH.extname(item.path)}`

      // Create the new pics metasdatas to save in the database
      let newPicsMetas = {
        path: newPicsName,
        filename: `${eventName}_${formatDate}`,
        extension: PATH.extname(item.path),
        title: eventName,
        name: eventName,
        date: formatDate,
        places: eventName,
        width: metas.ExifImageWidth,
        height: metas.ExifImageHeight,
        panoramic: false,
        stars: 0,
        tags: [],
        parent: eventName,
        type: 'pics'
      }

      // Datas for the current folder
      let folderDatas = {
        path: PATH.dirname(item.path),
        title: eventName,
        type: 'directory'
      }

      // Event datas (the folder)
      database.updateFolder(folderDatas)

      database.storeNewPics(newPicsMetas)

      fs.renameSync(item.path, newPicsName)

    })
    database.saveStore()
    success(tree)
  }
}