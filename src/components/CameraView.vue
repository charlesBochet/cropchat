<template>
    <transition name="fade">
        <div class="camera-modal">
            <video ref="video" class="camera-stream"/>
            <div class="camera-modal-container">
                <span @click="capture" class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                  <i class="material-icons">camera</i>
                </span>
            </div>
        </div>
    </transition>
</template>
<script>
  export default {
    data () {
      return {
        mediaStream: null
      }
    },
    mounted () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          this.mediaStream = mediaStream
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
        })
        .catch(error => console.error('getUserMedia() error:', error))
    },
    methods: {
      capture () {
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
        const imageCapture = new window.ImageCapture(mediaStreamTrack)

        return imageCapture.takePhoto().then(blob => {
          console.log(blob)
          this.$router.push('/')
        })
      }
    }
  }
</script>
<style scoped>
    .camera-modal {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background-color: white;
        z-index: 10;
    }
    .camera-modal-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        align-items: center;
        margin-bottom: 24px;
    }
    .take-picture-button {
        display: flex;
    }
    .camera-stream {
        width: 100%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease;
    }
    .fade-enter {
        transform: translate(0, 100%);
    }
    .fade-leave-to {
        transform: translate(0, 100%);
    }
</style>
