<template>
  <div class="associations-list">
    <label class="label label-warning">{{ $t('Page is under-construction')}}</label>
    <div class="association-box">
      <div class="">
        <div class="btn-group donation-section" role="group" aria-label="donation-section">
          <button type="button" @click="donationAmount=200" :class="'btn btn-default' + (donationAmount == 200 ? ' active' : '')">&euro 2</button>
          <button type="button" @click="donationAmount=400" :class="'btn btn-default' + (donationAmount == 400 ? ' active' : '')">&euro 4</button>
          <button type="button" @click="donationAmount=600" :class="'btn btn-default' + (donationAmount == 600 ? ' active' : '')">&euro 6</button>
          <button type="button" @click="donationAmount=800" :class="'btn btn-default' + (donationAmount == 800 ? ' active' : '')">&euro 8</button>
          <button type="button" @click="donationAmount=1000" :class="'btn btn-default' + (donationAmount == 1000 ? ' active' : '')">&euro 10</button>
          <button :disabled="donationAmount < 200" @click="submitDonation" class="btn btn-primary pull-right donate-btn" type="button" name="donate">{{$t('Donate')}}</button>
        </div>

      </div>

      <img class="assoc-logo-large" :src="assoc.logo_url" :alt="assoc.short_description">
      <h4>{{assoc.name}}</h4>
      <p>{{assoc.description}}</p>

      <ul class="list-group">
        <li class="list-group-item" :title="$t('address')"><i class="fa fa-map fa-fw"></i>  <span class="assoc-labels">{{assoc.address}}</span></li>
        <li class="list-group-item" :title="$t('city')"><i class="fa fa-map-marker fa-fw"></i>  <span class="assoc-labels">{{assoc.city}}</span></li>
        <li class="list-group-item" :title="$t('twitter')"><i class="fa fa-twitter fa-fw"></i>  <span class="assoc-labels"><a target="_blank" :href="'https://twitter.com/'+assoc.twitter_username">@{{assoc.twitter_username}}</a></span></li>
        <li class="list-group-item" :title="$t('Total Donations')"><i class="fa fa-line-chart fa-fw"></i>  <span class="assoc-labels">&euro {{assoc.total_donations/100}}</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
import * as urls from '../api_variables'
import axios from 'axios'

export default {
  data () {
    return {
      donationAmount: 0
    }
  },
  methods: {
    submitDonation () {
      if (!this.assoc.id) {
        this.$store.commit('setError', 'Invalid association id')
        return
      }
      console.log('donationAmount: ' + this.donationAmount)
      if (this.donationAmount < 200) {
        this.$store.commit('setError', '2 euros are the least amount you can donate')
        return
      }
      var donationUrl = urls.API_URL.CurrentUrl + urls.DONATATION_URL // + '?Amount='+this.donationAmount+'&association_id='+this.assoc.id
      var instance = axios.create({
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      })
      var vm = this
      var donationData = {
        'association_id': this.assoc.id,
        'amount': this.donationAmount
      }

      instance.post(donationUrl, donationData).then(resp => {
        console.log('donation successful')
        var successMessage = resp.data.message
        console.log(successMessage)
        if (successMessage) {
          vm.$store.commit('setSuccess', successMessage)
          return
        }
        vm.$events.$emit('acountUpdate', {})
        vm.$store.commit('setSuccess', 'Donation successful')
        vm.donationAmount = 0
      }).catch(err => {
        console.log('donation error')
        console.log(err)
        vm.$store.commit('setLoading', false)
        vm.$store.commit('setError', 'Sorry, your donation to this association failed')
      })
    }
  },
  computed: {
    assoc () {
      return this.$store.getters.getSelectedAssociation
    }
  }
}
</script>
<style scoped>
.associations-list {

}
.association-box {
  box-shadow: 1px 1px 1px #999;
}
.assoc-logo-large {
  float: left;
  margin: .3em;
  width: 100%;
  box-shadow: 1px 1px 1px #000;
}
.assoc-labels {
  font-weight: bolder;
  text-align: right;
  margin-left: .5em;
}
.donation-section button {
  padding-left: .5em;
  padding-right: .5em;
}
.donation-section button .donate-btn {
  padding-left: 2em;
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
