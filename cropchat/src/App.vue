<template>
  <div class="">
    <div :dir='currentLangDirection' id='wrapper' v-bind:class='getWidthClass'>
      <div class='langs btn-group btn-group-xs' role='group'>
        <button type='button' @click="setLang('en')" :class=" lang === 'en' || lang === '' ? 'btn btn-success' : 'btn btn-default'">English</button>
        <button type='button' @click="setLang('es')" :class=" lang === 'es' ? 'btn btn-success' : 'btn btn-default'">Español</button>
        <button type='button' @click="setLang('fr')" :class=" lang === 'fr' ? 'btn btn-success' : 'btn btn-default'">Français</button>
        <button type='button' @click="setLang('ar')" :class=" lang === 'ar' ? 'btn btn-success' : 'btn btn-default'">العربية</button>
        <span class='hidden'>{{currentState}}</span>
      </div>
      <div class='loading' v-if="$store.getters.getLoading">
        <h1><i class='fa fa-spinner fa-spin fa-fw'></i> {{$t('Loading')}}...</h1>
      </div>

      <div class='content' v-else >
        <message-items></message-items>
        <div class='top-container'>
          <div class='top-menu'>
            <button v-if="($store.getters.getCurrentPage != 'login' && $store.getters.getCurrentPage != '' && $store.getters.getCurrentPage != 'home' && $store.getters.getCurrentState != '' && $store.getters.getCurrentPage != 'signup')" class='btn btn-plain btn-back' @click='goToPrevPage'>
              <i v-if="langDirection == 'rtl'" class='fa fa-angle-right fa-fw'></i>
              <i v-else class='fa fa-angle-left fa-fw'></i>
            </button>
          </div>
        </div>

        <div class=''>
          <div class='login-area' v-if="$store.getters.getCurrentState == 'login' || $store.getters.getCurrentState == ''">
            <div  v-if="$store.getters.getCurrentPage == 'login' || $store.getters.getCurrentPage == ''">
              <login-form></login-form>
            </div>
            <div v-if="$store.getters.getCurrentPage == 'signup'">
              <signup-form></signup-form>
            </div>
            <div v-if="$store.getters.getCurrentPage == 'share'">
              <share-page></share-page>
            </div>

          </div>

          <div class='loggedin-area' v-else >
            <div class='logout-area'>
              <span class='hidden'>{{getMyBalance}}</span>
              <logout-button></logout-button>
            </div>

            <div class=''>
              <div v-if="$store.getters.getCurrentPage == 'home' || $store.getters.getCurrentPage == ''" >
                <home-page></home-page>
              </div>

              <div v-if="$store.getters.getCurrentPage == 'share'">
                <share-page></share-page>
              </div>

              <div v-if="$store.getters.getCurrentPage == 'associations'">
                <associations-page></associations-page>
              </div>

              <div v-if="$store.getters.getCurrentPage == 'asso_details'">
                <association-page></association-page>
              </div>

              <div v-if="$store.getters.getCurrentPage == 'donations'">
                <donations-page></donations-page>
              </div>

              <div v-if="$store.getters.getCurrentPage == 'solidarity'">
                <solidarity-account-page></solidarity-account-page>
              </div>

              <div v-if="$store.getters.getCurrentPage == 'settings'">
                <settings-page></settings-page>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div class='bottom-menu'>
        <label :class="$store.getters.getAppMode == 'test' ? 'test-mode version': 'version'">
          <span @click="updateVNCC">Version: {{$store.getters.getVersion}}</span>
          <span style="color: #EEE">{{$store.getters.getVNCC}}</span>
          <a target='_blank' :href='helpLink'> <i class='fa fa-question-circle-o fa-fw'></i>
            {{$t('Help')}}
          </a>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Logout from './components/Logout.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Messages from './components/Messages.vue'
import Share from './components/Share.vue'
import Associations from './components/Associations.vue'
import Association from './components/Association.vue'
import Donations from './components/Donations.vue'
import SolidarityAccount from './components/SolidarityAccount.vue'
import Settings from './components/Settings.vue'

import * as urls from './api_variables'
import axios from 'axios'
var jwtToken = localStorage.getItem('user_token')

const http = axios.create({
  headers: { 'Authorization': `Bearer ${jwtToken}` }
})

export default {
  mounted () {
    /** ** ** ** ** ** *** *** IVENTS *** *** ** ** ** ** ** ** ** ** **/
    this.$events.emit('testEvent')
    this.$events.listen('logoutEvent', eventData => {
      console.log('LOGING OUT EVENT')
      console.log(eventData)
    })

    this.$events.listen('checkDonationMeterics', eventData => {
      this.getDonationMetrics()
    })

    this.$events.listen('loginEvent', eventData => {
      console.log('LOGIN EVENT')
      console.log(eventData)
      localStorage.setItem('user_email', eventData.user)
      localStorage.setItem('user_token', eventData.token)
      this.$store.commit('setToken', eventData.token)
      localStorage.setItem('rememberMe', eventData.rememberMe)
      this.$store.commit('setCurrentState', 'loggedin')
      this.$store.commit('setCurrentPage', 'home')
    })

    this.$events.listen('acountUpdate', eventData => {
      console.log('acountUpdate EVENT')
      if (!this.$store.getters.getLogin) {
        console.log('not loggedin, returning')
        return
      }
      var vm = this
      let url = urls.API_URL.CurrentUrl + urls.WALLET_BALANCE_URL
      console.log('http')
      console.log(http)
      http.get(url).then(resp => {
        if (!resp.data) {
          console.log('no response data')
          return
        }
        console.log('response data')
        console.log(resp.data)
        if (resp.data.balance) {
          console.log('no balance data')
          vm.$store.commit('setCurrency', resp.data.balance.Currency)
          vm.$store.commit('setBalance', resp.data.balance.Amount)
          vm.$events.$emit('acountUpdate', {})
        }
      }).catch(err => {
        console.log('axios failed')
        console.log(err.data)
      })
    })
  },
  beforeCreate () {
    console.log('beforeCreate')
    var vm = this
    setTimeout(() => { vm.$store.commit('resetMessages') }, 5000)

    var rememberMe = localStorage.getItem('rememberMe')

    if (!rememberMe) {
      this.$store.commit('setCurrentState', 'login')
      this.$store.commit('setCurrentPage', 'login')
      return 'login'
    }
    if (rememberMe != null) {
      // read the saved token from localStorage
      var jwtToken = localStorage.getItem('user_token')
      var email = localStorage.getItem('user_email')
      // if found user is loggedin
      if (jwtToken) {
        // check if the currentState is empty
        if (this.$store.getters.getCurrentState === '') {
          if (email) {
            this.$store.commit('updateEmail', email)
          } else {
            this.$store.commit('updateEmail', 'User')
          }
          this.$store.commit('setCurrentState', 'loggedin')
          this.$store.commit('setToken', jwtToken)
          return 'loggedin'
        }
      } else { // no token means not signed in
        this.$store.commit('setCurrentState', 'login')
        localStorage.setItem('country_code', 'ES')
        return 'login'
      }

      return this.$store.getters.getCurrentState
    }
  },
  beforeMount () {
    this.$events.listen('testEvent', eventData => {
      console.log('testEvent')
      console.log(eventData)
    })
  },
  beforeUpdate () {

  },
  data () {
    return {
      langDirection: '',
      helpLink: 'https://github.com/YoQuieroAyudar/fundraising-API-user-widget/wiki/Help',
      lang: 'en'
    }
  },
  methods: {
    updateVNCC () {
      this.$store.commit('incrementVNCC')
    },
    getDonationMetrics () {
      if ((this.$store.getters.getCurrentPage !== 'home') && (this.$store.getters.getCurrentPage !== '')) {
        return
      }
      var vm = this
      let url = urls.API_URL.CurrentUrl + urls.DONATION_URL

      http.get(url).then(resp => {
        console.log('call success')
        console.log(resp.data)
        if (resp.data) {
          if (resp.data.total_donations) {
            vm.$store.commit('setDonationTotal', resp.data)
            vm.loadingDonationMetrics = true
          }
        }
      }).catch(err => {
        console.log('call error')
        console.log(err.status + ': ' + err.statusText)
      })
      // this.$http.get(url).then(resp => {
      //   console.log('call success')
      //   console.log(resp.data)
      //   if (resp.data) {
      //     if (resp.data.total_donations) {
      //       vm.$store.commit('setDonationTotal', resp.data)
      //       vm.loadingDonationMetrics = true
      //     }
      //   }
      // }, err => {
      //   console.log('call error')
      //   console.log(err.status + ': ' + err.statusText)
      // })
    },
    setLang (lang) {
      this.$i18n.set(lang)
      localStorage.setItem('user_locale', lang)
      this.langDirection = this.getLangDir()
      this.helpLink = this.setHelpUrl(lang)
      this.lang = lang
    },
    getLang () {
      return localStorage.getItem('user_locale')
    },
    // getWalletBalance () {},
    goSharePage (e) {
      e.preventDefault()
      this.$store.commit('setCurrentPage', 'share')
    },
    goToPrevPage (e) {
      e.preventDefault()
      // this.$store.commit('goToPreviousPage')
      if (!(this.$store.getters.getCurrentState === 'login' || this.$store.getters.getCurrentState === '')) {
        this.$store.commit('setCurrentPage', 'home')
        return
      }
      this.$store.commit('setCurrentPage', '')
    },
    goToNextPage (e) {
      e.preventDefault()
      this.$store.commit('goToNextPage')
    },
    getLangDir () {
      var lang = localStorage.getItem('user_locale')
      console.log('lang ' + lang)
      console.log('dir ' + this.langDirection)
      if (lang !== 'ar') {
        return 'ltr'
      }
      return 'rtl'
    },
    setHelpUrl (lang) {
      var url = 'https://github.com/YoQuieroAyudar/fundraising-API-user-widget/wiki/'
      if (lang === 'ar') {
        return url + 'مساعدة'
      } else if (lang === 'fr') {
        return url + 'Aide'
      } else if (lang === 'es') {
        return url + 'Ayuda'
      } else {
        return url + 'Help'
      }
    }
  },
  computed: {
    currentLangDirection () {
      return this.getLangDir()
    },
    currentState () {
      return this.$store.getters.getCurrentState
    },
    getMyBalance () {
      // var vm = this
      // setTimeout(() => {vm.getWalletBalance()}, 20000)
      return this.$store.getters.getBalance
    },
    getWidthClass () {
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
      if (width > 479) {
        return 'desktop-max'
      }
      return 'mobile-full-page'
    },
    loggedin () {
      var token = localStorage.getItem('user_token')
      if (token) {
        this.$store.commit('setToken', token)
        this.current_state = 'loggedin'
      }
      return this.$store.getters.getLogin
    },
    isLoggedIn () {
      return this.$store.getters.getLogin
    }
  },
  components: {
    'home-page': Home,
    'share-page': Share,
    'login-form': Login,
    'signup-form': Signup,
    'logout-button': Logout,
    'message-items': Messages,
    'associations-page': Associations,
    'association-page': Association,
    'donations-page': Donations,
    'solidarity-account-page': SolidarityAccount,
    'settings-page': Settings
  }
}

</script>

<style scoped>
#wrapper {
  position: relative;
  margin: auto;
  border: 1px solid #555;
  height: 500px;
  padding: 0.5em;
  overflow: hidden;
}
.mobile-full-page {
  max-width: 100%;
}
.desktop-max {
  max-width: 300px;
}
h1, h2, h3, h4, h5 {
  font-weight: bold;
}
h1 {
  font-size: 1.6em;
}
h2{
  font-size: 1.45em;
}
h3{
  font-size: 1.3em;
}
h4 {
  font-size: 1.15em;
}
h5 {
  font-size: 1em;
}
#wrapper .content {
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: .4em;
}
a {
  cursor: pointer;
}
#wrapper .top-container {
  position: relative;
  box-shadow: 1px 2px 2px #CCC;
  padding: 0;
  margin: .2em;
}
#wrapper .top-menu {
  position: relative;
}
#wrapper .btn-plain {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: #000;
  background-color: #fff;
}
#wrapper .bottom-menu {
  position: absolute;
  height: 1.5em;
  padding: .3em;
  margin: .85em;
  bottom: 0;
  left: 0;
  max-width: 290px;
  width: 92%;
}
#wrapper .bottom-menu .test-mode {
  color: #FFF;
  background-color: darkgreen;
}
#wrapper .bottom-menu .version {
  text-align: center;
  margin: 0;
  padding: .1em;
  width: 100%;
}
#wrapper #title {
  text-align: center;
  margin: auto;
}
#wrapper .page-title {
  border: 1px solid #888;
}
.langs {
  z-index: 999;
  margin-top: -1em;
  clear: both;
}
.btn-back {
  margin: .3em;
  padding: .3em;
  color: #000;
  background: #AAA;
}
</style>
