import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  username: ''
}
const mutations = {
  record(state, username) {
    state.username = username
  }
}

const store = new Vuex.Store({
  state,
  mutations,
})

export default store
