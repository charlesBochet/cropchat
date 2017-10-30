<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img :src="this.catUrl"/>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input"/>
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postCat(catUrl, title)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A CAT
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import parse from 'xml-parser'
  import postCat from '@/mixins/postCat'

  export default {
    mixins: [postCat],
    data () {
      return {
        'catUrl': null
      }
    },
    mounted () {
      this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
        this.catUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
      })
    }
  }
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>
