import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import plugins from './plugin/index'

Vue.use(Vuex)

let mutations = {
  'ipc/theme' (state, pl) {
    //
  }
}

export default new Vuex.Store({
  mutations,
  modules,
  plugins,
  strict: process.env.NODE_ENV !== 'production'
})
