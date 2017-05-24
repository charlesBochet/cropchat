<template>
  <div class="logout-area">
    <nav class="navbar navbar-default">
      <div class="navbar-right">
        <div class="container">
          <button class="btn btn-danger btn-xs pull-right" :title="$t('Logout')" @click="logoutUser">{{$t('Logout')}}</button>
          <button class="btn btn-default btn-xs pull-right" :title="$t('Settings')" @click="goToSettingsPage"> <i class="fa fa-cog fa-fw"></i> </button>
          <label :class="balanceLabelClasses" :title="$t('Wallet Balance')" @click="goToSolidarityAccount"> {{$store.getters.getBalance}} {{$t($store.getters.getCurrency)}} </label>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    goToSettingsPage (e) {
      this.$store.commit('setCurrentPage', 'settings')
    },
    goToSolidarityAccount (e) {
      e.preventDefault()
      this.$store.commit('setCurrentPage', 'solidarity')
      this.$store.commit('resetMessages')
    },
    logoutUser (e) {
      e.preventDefault()
      this.$store.commit('logout')
      this.$store.commit('setCurrentState', 'login')
      this.$store.commit('setCurrentPage', 'login')
      this.$store.commit('resetMessages')
      this.$store.commit('resetAssoList')
      // localStorage.removeItem('country')
      // localStorage.removeItem('user_token')
      // localStorage.removeItem('rememberMe')
      localStorage.clear()
      this.$store.commit('setAPI', 'mhs')
      this.$events.emit('logoutEvent')
    }
  },
  computed: {
    walletBalance () {
      return this.$store.getters.getBalance
    },
    balanceLabelClasses () {
      var cs = 'label pull-right balance-label label-'
      this.walletBalance > 0 ? cs += 'success' : cs += 'warning'
      return cs
    },
    getUserEmail () {
      var email = this.$store.state.user.user.email
      email = email.split('@')
      if (email.length > 1) {
        return email[1]
      }
      return this.$store.state.user.user.email
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
.logout-area button {
  margin-left: .2em;
}
.balance-label {
  padding: .15em;
  padding-left: .5em;
  padding-right: .5em;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
