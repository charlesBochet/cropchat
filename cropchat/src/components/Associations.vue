<template>
  <div class="associations-list">
    <h1 @click="getAssociationsFromAPI">{{ $t('Charities') }} <i class="fa fa-refresh fa-fw"></i></h1>
    <label class="label label-warning"> {{ $t('Page is under-construction') }} </label>
    <div class="association-box"
      @click="selectAssociation(assoc.id)"
      v-for="assoc in this.$store.getters.getAssociations">

      <img class="assoc-logo" :src="assoc.logo_url" :alt="$t(assoc.short_description)">
      <h4>{{assoc.name}}</h4>
      <p>{{assoc.description}}</p>
      <p><strong>{{$t(assoc.country)}}</strong></p>

    </div>
  </div>
</template>

<script>
import * as urls from '../api_variables'

import axios from 'axios'
var jwtToken = localStorage.getItem('user_token')

const http = axios.create({
  headers: { 'Authorization': `Bearer ${jwtToken}` }
})

export default {
  beforeMount () {
    console.log('beforeUpdate')
    this.associations = this.$store.getters.getAssociations
    if (this.associations.length === 0) {
      console.log('associations length = 0')
      console.log('Getting new list')
      this.getAssociationsFromAPI()
      this.associations = this.$store.getters.getAssociations
    }
  },
  data () {
    return {
      associations: []
    }
  },
  methods: {
    selectAssociation (assocId) {
      console.log(assocId)
      this.$store.commit('selectAssoById', assocId)
      this.$store.commit('setCurrentPage', 'asso_details')
    },
    getAssociationsFromAPI () {
      // var jwtToken = localStorage.getItem('user_token')
      var vm = this
      let country = localStorage.getItem('country_code')
      if (country == null) {
        country = 'ES'
      }
      console.log('Searching for ' + country)
      let url = urls.API_URL.CurrentUrl + urls.ASSO_SEARCH_URL + '?country=' + country

      http.post(url, {POS_id: 1, country: country}).then(resp => {
        console.log(resp.status)
        console.log(resp.statusText)
        console.log(resp)
        if (resp.data) {
          vm.$store.commit('setAssoList', resp.data)
        } else {
          vm.$store.commit('setErrors', [{error: 'Unable to set associations list'}])
        }
      }).catch(err => {
        if (!err.data) {
          vm.$store.commit('setError', {error: 'Error while loading associations list'})
          return
        }
        if (err.data.errors) {
          vm.$store.commit('setErrors', err.data.errors)
        }
      })

      // this.$http.headers.common['Authorization'] = 'Bearer ' + jwtToken
      // this.$http.post(url, {POS_id: 1, country: country})
      //     .then(resp => {
      //       console.log(resp.status)
      //       console.log(resp.statusText)
      //       console.log(resp)
      //       if (resp.data) {
      //         vm.$store.commit('setAssoList', resp.data)
      //       } else {
      //         vm.$store.commit('setErrors', [{error: 'Unable to set associations list'}])
      //       }
      //     }, err => {
      //       if (!err.data) {
      //         vm.$store.commit('setError', {error: 'Error while loading associations list'})
      //         return
      //       }
      //       if (err.data.errors) {
      //         vm.$store.commit('setErrors', err.data.errors)
      //       }
      //     })
    }
  },
  computed: {

  }
}
</script>
<style scoped>
.associations-list {

}
.association-box {
  box-shadow: 0 1px 8px #999;
  margin: .2em;
  margin-bottom: .4em;
  cursor: pointer;
  padding: .2em;
}
.assoc-logo {
  float: left;
  margin: .3em;
  width: 4em;
  box-shadow: 1px 1px 1px #000;
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
</style>
