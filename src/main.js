// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuefire from 'vuefire'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import { database } from '@/services/firebase'
import VueAnalytics from 'vue-analytics'

Vue.use(Vuefire)
Vue.use(VueResource)
Vue.use(VueAnalytics, {
  id: 'UA-101944993-1',
  router
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    cat: database.ref('cat').orderByChild('created_at')
  },
  router,
  template: '<App/>',
  components: { App }
})
