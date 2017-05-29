import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import messages from './modules/messages'
import countries from './modules/countries'
import associations from './modules/associations'
import donations from './modules/donations'
import accounts from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    countries,
    user,
    messages,
    associations,
    donations,
    accounts
  },
  strict: true
})
