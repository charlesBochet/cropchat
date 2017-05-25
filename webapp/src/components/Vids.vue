<template>
  <div class="vid-area">
    <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.2493%;"><iframe :src="videoLink" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      youtube_link_prefix: 'https://www.youtube.com/embed/',
      youtube_link_sufix: '?wmode=transparent&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;enablejsapi=1',
      videos: [
        // {id: '8PMJNUjaivw'},
        // {id: 'Zx1_6F-nCaw'},
        // {id: 'WWVMXLSS1cA'},
        // {id: 'Nek1FT5vs4o'},
        // {id: 'rs40yxHjTxQ'},
        // {id: 'h5EofwRzit0'},
        // {id: 'bwLLbLSMMMo'},
        // {id: '2g0t41bYVCA'},
        // {id: 'KDXOzr0GoA4'},
        // {id: 'nBI0bDH8W28'}
        {id: 'fFIODvFNxJQ'},
        {id: 'Du0L6F2uquc'},
        {id: 'uGpufaTRlCM'}
      ],
      currentVidID: {id: '8PMJNUjaivw'},
      videoLink: ''
    }
  },
  beforeMount () {
    var rn = parseInt(Math.random(1) * 10) - 1
    var lastVidIndex = localStorage.getItem('last_vid')

    if (rn === this.videos.length) {
      rn = rn - 1
    }
    if (parseInt(lastVidIndex) === rn) {
      rn = parseInt(Math.random(1) * 10) - 1
      rn === this.videos.length ? rn = 0 : console.log('no change in rn')
    }

    localStorage.setItem('last_vid', rn)
    var randomVideo = this.videos[rn]

    if (randomVideo !== undefined) {
      this.currentVidID = randomVideo
    } else {
      this.currentVidID = this.videos[0]
    }

    this.videoLink = this.youtube_link_prefix + this.currentVidID.id + this.youtube_link_sufix
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
</style>
