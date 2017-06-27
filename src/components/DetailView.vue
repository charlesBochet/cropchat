<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col" v-if="this.cat">
      <div class="picture">
        <img :src="this.cat.url" />
      </div>
      <div class="info">
        <span>{{ this.cat.info }}</span>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
      <div class="comment">
        <span>{{ this.cat.comment }}</span>
      </div>
      <div class="actions">
        <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/post">
          ANSWER
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default {
    data: {
      cat: null
    },
    mounted () {
      this.cat = _.find(this.$root.cats, (cat) => cat['.key'] === this.$route.params.id)
      console.log(this.cat)
    }
  }
</script>
<style scoped
  .picture > img {
    color: #fff;
    width:100%;
  }
  .info {
    text-align: right;
    padding: 5px;
    color: #555;
    font-size: 10px;
  }
  .comment {
    padding: 10px;
    color: #555;
  }
  .actions {
    text-align: center;
  }
</style>
