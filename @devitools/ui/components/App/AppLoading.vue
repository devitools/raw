<template>
  <div
    v-show="visible"
    class="AppLoading"
  >
    <div class="loader"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  /**
   */
  name: 'AppLoading',
  /**
   */
  data: () => ({
    visible: false
  }),
  /**
   */
  created () {
    let timeout = undefined

    const show = (delay = 1) => {
      if (timeout) {
        window.clearTimeout(timeout)
      }
      const handler = () => this.setVisible(true)
      timeout = window.setTimeout(handler, delay)
    }

    const hide = () => {
      if (timeout) {
        window.clearTimeout(timeout)
      }
      const handler = () => this.setVisible(false)
      timeout = window.setTimeout(handler, 1)
    }

    Vue.prototype.$loading = { show, hide }
  },
  /**
   */
  methods: {
    /**
     * @param {boolean} visible
     */
    setVisible (visible) {
      this.visible = visible
    }
  }
}
</script>

<style
  lang="scss"
  scoped
>
.AppLoading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(0 0 0 / 0.6);
  position: absolute;
  top: 0;
  z-index: 100000;
  width: 100vw;

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
