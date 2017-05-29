<template>
  <div class="signup-area-wrapper">

    <div class="modal-wrapper">
      <div class="modal-inner">
        <vodal :show="showTerms" :width="250" :height="300" animation="rotate" @hide="showTerms = false">
            <terms-modal :selected_country="signup.POS_country"></terms-modal>
        </vodal>
      </div>
    </div>

    <h1>{{$t('Sign up')}}</h1>

    <form class="form">
      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('First name')" id="fname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
        <input name="first_name" class="form-control" v-model="signup.first_name" aria-describedby="fname-addon1" type="text" :placeholder="$t('First name')" :value="signup.first_name" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Last name')" id="lname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
        <input name="last_name" class="form-control" v-model="signup.last_name" aria-describedby="lname-addon1" type="text" :placeholder="$t('Last name')" :value="signup.last_name" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Birthday')" id="birthday-addon1"> <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i> </span>
        <input name="birthday" class="form-control" v-model="signup.birthday" aria-describedby="birthday-addon1" type="date" :placeholder="$t('Birthday')" :value="signup.birthday" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Gender')" id="gender-addon1"> <i class="fa fa-venus-mars fa-fw" aria-hidden="true"></i> </span>
        <div class="form-control" aria-describedby="gender-addon1">
            <label><input type="radio" name="gender" checked value="M" v-model="signup.gender">{{$t('Male')}}</label>
            <label><input type="radio" name="gender" value="F" v-model="signup.gender">{{$t('Female')}}</label>
        </div>

      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Nationality')" id="nationality-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
        <select class="form-control" aria-describedby="nationality-addon1" v-model="signup.nationality">
          <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signup.nationality = country.code" :value="country.code">{{$t(country.name)}}</option>
        </select>

      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" title="Country of residence" id="country_of_residence-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
        <select class="form-control" aria-describedby="country_of_residence-addon1" v-model="signup.country_of_residence">
          <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signin.country_of_residence = country.code" :value="country.code"> {{$t(country.name)}}</option>
        </select>

      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" title="Email" id="email-addon1"> <i class="fa fa-envelope fa-fw" aria-hidden="true"></i> </span>
        <input name="mail" class="form-control" v-model="signup.mail" @input="updateEmail" aria-describedby="email-addon1" type="email" :placeholder="$t('Email')" :value="signup.email" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" title="Password" id="password-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
        <input name="password" class="form-control" v-model="signup.password"  @input="updatePassword" aria-describedby="password-addon1" type="password" :placeholder="$t('Password')" :value="signup.password" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Terms and conditions')" id="terms-addon1"> <input name="accept_terms" v-model="acceptTerms" @click="toggleTermsModal" :checked="acceptTerms" type="checkbox" :value="acceptTerms" /> </span>
        <label class="form-control" for="accept_terms"  aria-describedby="terms-addon1">{{$t('Terms and conditions')}}</label>
      </div>

      {{$t('If you already have an account')}} <a class="" @click="goToLoginPage" > {{$t('Login here')}}</a>

      <button class="btn btn-primary btn-block signup-btn" @click="signupUser" :disabled="!acceptTerms" > <i class="fa fa-paper-plane" aria-hidden="true"></i> {{$t('Sign up')}}</button>

    </form>

    <button class="btn btn-default btn-xs btn-block" @click="goToSignupPOSPage">{{$t('Signup as Establishment')}}</button>

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
.signup-btn {
  margin-top: .5em;
}
.signup-area-wrapper {
  margin: 1em auto;
}
.input-group {
  margin-bottom: .3em;
}
.btn-xs {
  margin-top: .2em;
}
.modal-wrapper {
  position: relative;
  z-index: 1001;
}
</style>

<script>
import * as urls from '../api_variables'
import Terms from './Terms.vue'

export default {

  data () {
    return {
      signup: {
        first_name: '',
        last_name: '',
        status: 'USER',
        birthday: '',
        gender: '',
        nationality: 'ES',
        country_of_residence: 'ES',
        mail: '',
        password: ''
      },
      readTerms: false,
      acceptTerms: false,
      showTerms: false
    }
  },
  computed: {

  },
  methods: {
    toggleTermsModal (e) {
      e.preventDefault()
      this.showTerms = !this.showTerms
    },
    goToSignupPOSPage (e) {
      e.preventDefault()
      this.$store.commit('setCurrentPage', 'signupPOS')
      this.$store.commit('resetMessages')
    },
    goToLoginPage (e) {
      e.preventDefault()
      this.$store.commit('setCurrentPage', 'login')
      this.$store.commit('resetMessages')
    },
    updateNationality (e) {
      e.preventDefault()
      console.log(e.log)
      this.signup.nationality = e.code
    },
    updateEmail (e) {
      e.preventDefault()
      this.$store.commit('updateEmail', this.signup.mail)
    },
    updatePassword (e) {
      e.preventDefault()
      this.$store.commit('updatePassword', this.signup.password)
    },
    setMessage (response) {
      if (!response) {
        return
      }
      console.log('setting repsonse message')
      console.log(response)
      if (response.errors) {
        this.$store.commit('setErrors', response.errors)
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
      console.log('setting token:')
      this.$store.commit('setToken', token)
      console.log('setting current_state')
      this.$store.commit('setCurrentState', 'loggedin')
    },
    signupUser (e) {
      e.preventDefault()
      var vm = this
      this.$store.commit('setLoading', true)
      var creds = this.signup
      console.log(creds)
      // to solve the API date parsing problem I've to append this
      creds.birthday += 'T15:04:05+00:00'
      console.log(creds.birthday)
      // var setMyToken = this.setUserToken
      var setReponseMessage = this.setMessage
      var goToLoginPage = () => {
        vm.$store.commit('setCurrentPage', 'login')
        vm.$store.commit('setCurrentState', 'login')
        vm.$store.commit('resetMessages')
      }
      this.$store.commit('resetMessages')

      let url = urls.API_URL.CurrentUrl + urls.SIGNUP_URL
      this.$http.post(url, creds)
        .then((resp) => {
          // return the success code
          var data = {}
          console.log(resp)
          if (resp.status === 200) {
            if (resp.data) {
              data = resp.data
              if (data.message) {
                setReponseMessage({'success': 'Signed up successfully!'})
                goToLoginPage()
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
    'terms-modal': Terms
  }

}
</script>
