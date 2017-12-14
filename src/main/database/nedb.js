// ****************************
// database neDB
// this files inject in the app all the methods to work with neDB
// 
// neDB is a simple JavaScript based noSQL databse system, more infos [https://github.com/louischatriot/nedb]

// divers notes sur neDB

// importe needb
var Datastore = require('nedb')

// crée une nouvelle base persistante (crée guitars a la racine)
db = new Datastore({filename : 'guitars'})

// loading the datastore
db.loadDatabase()

// insert a record
db.insert({name : "fender jazz bass", year:1977});

// find a record
db.find({year : 1977}, function (err,docs){
  console.log(docs);
});



import fs from 'fs'
import path from 'path'

let neDB = require('nedb')

export default {
  searchAll (needle, haystack) {

  },
  searchFilter (needle, haystack, filter) {
    
  }
}