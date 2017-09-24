<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col image-container">
      <transition-group name="fade">
        <div key="1" v-if="isImageLoading" class="mdl-spinner mdl-js-spinner is-active"></div>
        <img key="2" v-if="!isImageLoading" class="cat-image" v-show="catUrl !== null" :src="this.catUrl"/>
      </transition-group>
      </div>
      <div class="mdl-cell">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            <span>POST IMAGE</span>
          </a>
          <a @click.prevent="loadCatImageFromCatAPI" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            <i class="material-icons">refresh</i>
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import parse from 'xml-parser'

  export default {
    data () {
      return {
        'catUrl': null,
        'isImageLoading': true,
        'title': ''
      }
    },
    mounted () {
      this.loadCatImageFromCatAPI()
    },
    methods: {
      postCat () {
        this.$root.$firebaseRefs.cat.push(
          {
            'url': this.catUrl,
            'comment': this.title,
            'info': 'Posted by Charles on Tuesday',
            'created_at': -1 * new Date().getTime()
          }
        ).then(
          this.$router.push('/')
        )
      },
      loadCatImageFromCatAPI () {
        this.isImageLoading = true
        this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
          const catUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
          let img = new Image()
          img.src = catUrl
          img.onload = () => {
            this.isImageLoading = false
            this.catUrl = catUrl
          }
        })
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
  .image-container {
    min-height: 280px;
    min-width: 280px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .cat-image {
    max-height: 280px;
    max-width: 100%;
    width: auto;
  }
</style>
