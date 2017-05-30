<!-- <template>
  <div v-if="!authenticated">
    <a href="#" @click='doLogin' class="btn btn-block btn-social btn-facebook btn-flat">
      <i class="fa fa-facebook"></i> {{ $t('Sign in using Facebook') }}
    </a>
  </div>
</template>

<style scoped>
.fb-login-button {
  margin-bottom: .3em;
}
</style>

<script>
import auth from './../auth'
export default {

  data () {
    return {
      email: '',
      password: '',
      authenticated: false
    }
  },
  computed: {

  },
  beforeCreate () {
    this.loadFbLoginApi()
  },
  methods: {
    loadFbLoginApi () {
      window.fbAsyncInit = function () {
        FB.init({
          appId      : FB_APP_ID,
          cookie     : true,  // enable cookies to allow the server to access
          // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.5' // use version 2.1
        })
      }

      console.log('Loading fb api')
        // Load the SDK asynchronously
      (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) return
          js = d.createElement(s);  js.id = id
          js.src = '//connect.facebook.net/en_US/sdk.js'
          fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    },
    doLogin () {
      var vm = this

      FB.login(function (response) {
        if (response.status === 'connected') {
          console.log('In response')
          auth.facebookLogin(response.authResponse, function () {
            vm.$router.push({ name: 'redirect' })
          })
        }
      })
    }
  }

}
</script> -->
