<template>
  <div class="messages">
    <div class="error">
      <div v-for="error in errors" track-by="$index" class="alert alert-danger alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{ $t(error) }}
      </div>
    </div>
    <div v-if="warning" class="error">
      <div class="alert alert-warning alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{ $t(warning) }}
      </div>
    </div>
    <div v-if="info" class="error">
      <div class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{ $t(info) }}
      </div>
    </div>
    <div v-if="success" class="error">
      <div class="alert alert-success alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{ $t(success) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages {
  position: relative;
  z-index: 999;
  min-width: 10em;
  max-width: 280px;
}
.messages div {
  margin: 0;
}
.messages .alert {
  text-align: center;
  padding: .3em;
  padding-top: .1em;
  padding-bottom: .1em;
  z-index: 1000;
}
</style>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    errors () {
      return this.$store.getters.getErrors
    },
    warning () {
      return this.$store.getters.getWarning
    },
    info () {
      return this.$store.getters.getInfo
    },
    success () {
      return this.$store.getters.getSuccess
    }
  },
  methods: {

  },
  destroyed () {
    console.log('destroyed messages')
  }
}
</script>
