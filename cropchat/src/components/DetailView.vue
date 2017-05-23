<template>
  <div class="mdl-grid">
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
        <a class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/#/post">
          ANSWER
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../service/firebase'

export default {
  mounted () {
    firebase.database.ref('cat/' + this.$route.params.id).once('value').then(snapshot => {
      this.cat = snapshot.val()
    })
  },
  data () {
    return {
      'cat': {}
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
</style>
