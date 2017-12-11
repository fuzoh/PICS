import fs from 'fs'

const parser = require('exif-parser')
const jimp = require('jimp')

export default {
  // parse de metadatas of all the library tree passed in props and rename the files with the date found in metas
  renamePics (tree) {

    console.log(tree)

    for (let children of tree.children) {

      console.warn('doosier')

      for (let pics of children.children) {

        console.log('traitement de l\'image')

        // gets the date from the metas
        fs.readFile(pics.path, function(err, buffer) {

          let metas = parser.create(buffer).parse().tags

          console.log(metas.DateTimeOriginal)

          let date = new Date(metas.DateTimeOriginal * 1000)

          console.log(date)

        });

        // creating a thumbnail for better display perfs


      }

    }

  }
}