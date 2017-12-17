/* *****************************************
| vuex store
|
| initialize the vuex store for the app
| This store is a global store reachable by all the vue components of the app
*/



/* *****************************************
| IMPORTS
*/
import Vue from 'vue'
import Vuex from 'vuex'


// initialize vue x
Vue.use(Vuex)


// export the new store
export default new Vuex.Store({
  // declare a store key
  state: {
    editedpics: {}
  },
  // declare the mutations
  // this methods a ready to update the store state
  mutations: {
    PICS_SET_EDITED: (state, pics) => {
      state.editedpics = pics
    },
    PICS_UNSET_EDITED: (state) => {
      state.editedpics = {}
    },
  },
  // getters to get the state of a specific key on the store
  getters: {
    editedpics: state => state.editedpics,
  }
})
