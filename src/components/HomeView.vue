<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="picture in this.getCats()" class="image-card" @click="displayDetails(picture['.key'])">
          <div class="image-card__picture">
            <img :src="picture.url" />
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ picture.comment }}</span>
          </div>
        </div>
      </div>
    </div>
    <router-link class="add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/post">
      <i class="material-icons">add</i>
    </router-link>
    <router-link class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/camera">
      <i class="material-icons">camera_alt</i>
    </router-link>
  </div>
</template>
<script>
  export default {
    methods: {
      displayDetails (id) {
        this.$router.push({name: 'detail', params: { id: id }})
      },
      getCats () {
        if (navigator.onLine) {
          this.saveCatsToCache()
          return this.$root.cat
        } else {
          return JSON.parse(localStorage.getItem('cats'))
        }
      },
      saveCatsToCache () {
        this.$root.$firebaseRefs.cat.orderByChild('created_at').once('value', (snapchot) => {
          let cachedCats = []
          snapchot.forEach((catSnapchot) => {
            let cachedCat = catSnapchot.val()
            cachedCat['.key'] = catSnapchot.key
            cachedCats.push(cachedCat)
          })
          localStorage.setItem('cats', JSON.stringify(cachedCats))
        })
      }
    },
    mounted () {
      this.saveCatsToCache()
    }
  }
</script>
<style scoped>
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .take-picture-button {
    position: fixed;
    right: 24px;
    bottom: 90px;
    z-index: 5;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>
