// ****************************
// database neDB
// this files inject in the app all the methods to work with neDB
// 
// neDB is a simple JavaScript based noSQL databse system, more infos [https://github.com/louischatriot/nedb]

// divers notes sur neDB

// importe needb
// var Datastore = require('nedb')

// // crée une nouvelle base persistante (crée guitars a la racine)
// db = new Datastore({filename : 'guitars'})

// // loading the datastore
// db.loadDatabase()

// // insert a record
// db.insert({name : "fender jazz bass", year:1977});

// // find a record
// db.find({year : 1977}, function (err,docs){
//   console.log(docs);
// });



import fs from 'fs'
import path from 'path'

let neDB = require('nedb')

export default {
  getStore (storePath) {
    let db = new neDB({filename: storePath})
    db.loadDatabase()
    return db
  },
  storeLibrary (libraryStorePath, filesTree, success) {
    let db = this.getStore(libraryStorePath)
    
    db.insert(
      {
        _id: 'Cambioula',
        name: 'toto',
        children: [{
          _id: 'Cambioula-im-ddd',
          name: 'Pas de titre',
          description: 'Une longue description',
          stars: 4,
          tags: ['tutu', 'toto', 'tutu']
        },{
          _id: 'Cambiofsfdula-im-ddd',
          name: 'Pas de titre',
          description: 'Une longue description',
          stars: 4,
          tags: ['tutu', 'toto', 'tutu']
        }]
      })
    db.insert(
      {
        _id: 'Metissages',
        name: 'toto',
        children: [{
          _id: 'Cambioula-im-ddd',
          name: 'Pas de titre',
          description: 'Une longue description',
          stars: 4,
          tags: ['tutu', 'toto', 'tutu']
        },{
          _id: 'Cambiofsfdula-im-ddd',
          name: 'Pas de titre',
          description: 'Une longue description',
          stars: 4,
          tags: ['tutu', 'toto', 'tutu']
        }]
      })
    
    // tests de recherche :

    db.find({}, (err, data) => {
      console.log(err)
      console.log(data)
    })

  },
  updateLibrary () {

  },
  editField () {

  },
  searchAll (needle, haystack) {

  },
  searchFilter (needle, haystack, filter) {

  }
}