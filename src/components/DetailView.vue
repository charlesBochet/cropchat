<template>
  <div class="mdl-grid" v-if="this.cat">
    <div class="mdl-cell mdl-cell--8-col">
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
  import { find } from 'lodash'
  export default {
    data () {
      return {
        cat: null
      }
    },
    mounted () {
      if (navigator.onLine) {
        this.cat = find(this.$root.cat, (cat) => cat['.key'] === this.$route.params.id)
      } else {
        this.cat = JSON.parse(localStorage.getItem('cats'))[this.$route.params.id]
      }
    }
  }
</script>
<style scoped>
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
