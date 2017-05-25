<template>
  <div>
    <h1>{{$t('Settings')}}</h1>
    <label class="label label-warning">{{$t('Page is under-construction')}}</label>
    <br>
    <form class="form">
      <div class="input-group">
        <span class="input-group-addon" id="oldpass-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
        <input name="oldpassword" class="form-control" v-model="oldPass" aria-describedby="oldpass-addon1" type="password" :placeholder="$t('Old Password')" :value="oldPass" />
      </div>
      <div class="input-group">
        <span class="input-group-addon" id="newPass1-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
        <input name="newpassword1" class="form-control" v-model="newPass1" aria-describedby="newPass1-addon1" type="password" :placeholder="$t('New Password')" :value="newPass1" />
        <input name="newpassword2" class="form-control" v-model="newPass2" aria-describedby="newPass1-addon1" type="password" :placeholder="$t('Confirm Password')" :value="newPass2" />
      </div>
      <button class="btn btn-primary btn-block" type="button">{{ $t('Change Password') }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newPass1: '',
      newPass2: '',
      oldPass: ''
    }
  },
  methods: {
    checkOldPassword () {
      var email = this.$store.getters.getEmail
      if (!email) {
        this.$store.commit('setError', 'No email in the store, please logout and login again')
      }
      // var creds = {'email': email, password: this.oldPass}
    }
  }
}
</script>
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
.input-group {
  margin: .2em;
}
</style>
