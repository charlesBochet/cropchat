// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// import Vuefire from 'vuefire'
import store from './store'
// import firebase from './service/firebase'
import VueResource from 'vue-resource'
import vuexI18n from 'vuex-i18n'
import VueEvents from 'vue-events'

import Vodal from 'vodal'
Vue.component(Vodal.name, Vodal)

// import translations
import Spanish from '../translations/locales/es'
import French from '../translations/locales/fr'
import Arabic from '../translations/locales/ar'

require('expose-loader?$!expose-loader?jQuery!jquery')
require('bootstrap-webpack')
require('font-awesome/fonts/fontawesome-webfont.svg')
require('../static/font-awesome-8500ab3a5a.js')
import 'vodal/common.css'
import 'vodal/rotate.css'

Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('es', Spanish)
Vue.i18n.add('fr', French)
Vue.i18n.add('ar', Arabic)

Vue.use(VueResource)
// Vue.use(Vuefire)

Vue.use(VueEvents)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // firebase: {
  //   cat: firebase.database.ref('cat').orderByChild('created_at')
  // },
  // router,
  template: '<App/>',
  components: { App }
})
