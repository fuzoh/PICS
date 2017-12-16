import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editedpics: {}
  },
  mutations: {
    PICS_SET_EDITED: (state, pics) => {
      state.editedpics = pics
    },
    PICS_UNSET_EDITED: (state) => {
      state.editedpics = {}
    },
  },
  getters: {
    editedpics: state => state.editedpics,
  }
})
