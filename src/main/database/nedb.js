// ****************************
// database neDB
// this files inject in the app all the methods to work with neDB
// 
// neDB is a simple JavaScript based noSQL databse system, more infos [https://github.com/louischatriot/nedb]

let neDB = require('nedb')
let DB = neDB()

module.exports = {
  // initialize the database
  startDB: () => {
    let DB
  }
}