// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuefire from 'vuefire'
import store from './store'
// import firebase from './service/firebase'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuefire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // firebase: {
  //   cat: firebase.database.ref('cat').orderByChild('created_at')
  // },
  router,
  template: '<App/>',
  components: { App }
})
