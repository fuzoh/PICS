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
  renamePics (path, success) {

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
      let event = PATH.dirname(item.path).split(PATH.sep).pop()
      // get the date
      if (date.getDate()) {
        var formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()+1}-${date.getSeconds()}`
      } else {
        // if the date is invalid
        noDateIndex++
        var formatDate = `nodate_${noDateIndex}`
      }
      // Create the new file name
      let newPicsName = `${PATH.dirname(item.path)}/${event}_${formatDate}${PATH.extname(item.path)}`

      // rename the picture
      fs.renameSync(item.path, newPicsName)

    })
    success(tree)
  }
}