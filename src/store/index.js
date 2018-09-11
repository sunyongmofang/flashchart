import Vue from 'vue'
import Vuex from 'vuex'

import flashchart from './modules/flashchart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flashchart
  }
})
