<template>
  <div class="login-area-wrapper">
      <form class="form">
      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Country')" id="country-addon1"> {{$t('Donation Destination')}}</span>
        <select class="form-control" aria-describedby="nationality-addon1" @change="updateAPI" v-model="country">
          <option v-for="(ctry, i) in $store.getters.getTopCountries" :selected="true" :value="ctry">{{ctry.name}}</option>
        </select>
      </div>
      <div dir="ltr" class="input-group" :title="$t('Email')">
        <span class="input-group-addon" id="email-addon1"> <i class="fa fa-envelope fa-fw" aria-hidden="true"></i> </span>
        <input name="mail" class="form-control" v-model="login.mail" @input="updateEmail" aria-describedby="email-addon1" type="email" :placeholder="$t('Email')" :value="login.email" />
      </div>

      <div dir="ltr" class="input-group" :title="$t('Password')">
        <span class="input-group-addon" id="password-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
        <input name="password" class="form-control" v-model="login.password"  @input="updatePassword" aria-describedby="password-addon1" type="password" :placeholder="$t('Password')" :value="login.password" />
      </div>

      {{ $t("If you don't have an account yet") }} <a class="" @click="goToSignupPage" > {{ $t('Sign up here') }}</a>

      <button class="btn btn-primary btn-block login-btn" @click="loginUser" > <i class="fa fa-paper-plane" aria-hidden="true"></i> {{ $t('Login') }}</button>
      {{ $t('Remember me') }} <input name="remember_me" v-model="rememberMe" @click="setRememberMe" :checked="rememberMe" aria-describedby="password-addon1" type="checkbox" :value="rememberMe" />
    </form>

    <video-frame></video-frame>
    
  </div>
</template>

<style scoped>
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

a {
  cursor: pointer;
}
.login-btn {
  margin-top: .1em;
  margin-bottom: .2em;
}
.fb-login-button {
}
.login-area-wrapper {
  margin: auto;
}
.input-group {
  margin-top: .1em;
}
.btn-xs {
  margin-top: .2em;
}
</style>

<script>
import FBLogin from './FBLogin.vue'
import VideoFrame from './Vids.vue'

import * as urls from '../api_variables'

export default {

  data () {
    return {
      login: {
        mail: '',
        password: ''
      },
      rememberMe: localStorage.getItem('rememberMe'),
      facebookLogin: false,
      country: {name: 'Spain', db: 'mhs', code: 'ES'}
    }
  },
  computed: {

  },
  methods: {
    goToLoginPOSPage (e) {
      e.preventDefault()
      this.$store.commit('setCurrentPage', 'loginPOS')
      this.$store.commit('resetMessages')
    },
    setRememberMe () {
      localStorage.setItem('rememberMe', this.rememberMe)
    },
    updateAPI () {
      this.$store.commit('setAPI', this.country.db)
      localStorage.setItem('country', JSON.stringify(this.country))
      localStorage.setItem('country_code', this.country.code)
    },
    goToSignupPage (e) {
      e.preventDefault()
      this.$store.commit('resetMessages')
      this.$store.commit('setCurrentPage', 'signup')
      this.$store.commit('setCurrentState', '')
    },
    updateEmail (e) {
      this.$store.commit('updateEmail', this.login.mail)
    },
    updatePassword (e) {
      this.$store.commit('updatePassword', this.login.password)
    },
    setMessage (response) {
      if (!response) {
        return
      }

      var vm = this
      setTimeout(() => { vm.$store.commit('resetMessages') }, 5000)

      if (response.errors) {
        this.$store.commit('setErrors', response.errors)
      } else if (response.error) {
        this.$store.commit('setError', response.error)
      } else if (response.warning) {
        this.$store.commit('setWarning', response.warning)
      } else if (response.info) {
        this.$store.commit('setInfo', response.info)
      } else if (response.success) {
        this.$store.commit('setSuccess', response.success)
      }

      this.$store.commit('setLoading', false)
    },
    setUserToken (token) {

    },
    loginUser (e) {
      e.preventDefault()
      console.log('COUNTRY: ' + this.country)
      if (this.$store.getters.getAppMode !== 'test') {
        this.$store.commit('setAPI', this.country.db)
      }
      this.$store.commit('setLoading', true)
      let country = localStorage.getItem('country')
      if (!country) {
        localStorage.setItem('country', JSON.stringify({name: 'Spain', db: 'mhs', code: 'ES'}))
      }
      var creds = this.login
      // var setMyToken = this.setUserToken
      var setReponseMessage = this.setMessage
      this.$store.commit('resetMessages')
      let url = urls.API_URL.CurrentUrl + urls.LOGIN_URL
      var vm = this
      this.$http.post(url, creds)
        .then((resp) => {
          // return the success code
          var data = {}

          if (resp.status === 200) {
            if (resp.data) {
              data = resp.data
              if (data.token) {
                localStorage.setItem('user_token', data.token)
                setReponseMessage({'success': 'Login successfully!'})
                vm.$events.$emit('loginEvent', {token: data.token, user: creds.mail, rememberMe: vm.rememberMe})
                vm.$events.$emit('acountUpdate', {})
              }
            }
          }
        }, (err) => {
          setReponseMessage(err.data)

          console.log('Error')
          console.log(err)
        })
    }
  },
  components: {
    'fb-login': FBLogin,
    'video-frame': VideoFrame
  }

}
</script>
