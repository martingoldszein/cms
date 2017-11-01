import Vue from 'vue'
import Vuex from 'vuex'

import obra from './obra'
import publicacion from './publicacion'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    obra: obra,
    publicacion: publicacion,
    user: user,
    shared: shared
  }
})
