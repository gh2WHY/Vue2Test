import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import tableColumn from './modules/tableColumn'
Vue.use(Vuex)
const state = {}
const getters = {}
const mutations = {}
const actions = {}

const debug = process.env.NODE_ENV === 'development'
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    tableColumn
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store
