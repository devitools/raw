<template>
  <div class="AppNotification">
    <transition-group name="list">
      <template v-for="message in messages">
        <div
          :key="message.id"
          class="AppNotification__message"
          :class="`AppNotification__message--${message.type}`"
        >
          <div>{{ message.text }}</div>
          <template v-if="message.closable">
            <span @click="unregister(message.id)">&times;</span>
          </template>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  /**
   */
  name: 'AppNotification',
  /**
   */
  data: () => ({
    messages: []
  }),
  /**
   */
  created () {
    const info = (text) => this.register({ text })
    const success = (text, delay = 6) => this.register({ type: 'success', text, delay })
    const error = (text, delay = 6) => this.register({ type: 'error', text, delay })
    const warning = (text, delay = 6) => this.register({ type: 'warning', text, delay })
    Vue.prototype.$notification = { info, success, error, warning }
  },
  /**
   */
  methods: {
    /**
     * @param {Record<string,*>} options
     */
    register (options) {
      const { delay } = options
      const id = (new Date()).getTime().toString(36)
      this.messages.push({ closable: true, ...options, id })

      if (typeof delay !== 'number') {
        return
      }

      const remove = () => this.unregister(id)
      window.setTimeout(remove, delay * 1000)
    },
    /**
     * @param {string} id
     */
    unregister (id) {
      const index = this.messages.findIndex((message) => message.id === id)
      if (index < 0) {
        return
      }
      this.messages.splice(index, 1)
    }
  }
}
</script>

<style
  lang="scss"
  scoped
>
.AppNotification {
  position: absolute;
  z-index: 100001;
  margin: 10px;
  top: 0;
  right: 0;

  .AppNotification__message {
    min-width: 200px;
    padding: 10px;
    margin: 0 0 10px 0;
    background-color: #383838;
    color: #F0F0F0;
    font-size: 1em;
    border-radius: 2px;
    box-shadow: 0 0 10px -1px rgba(56, 56, 56, 0.7);
    position: relative;

    &.AppNotification__message--success {
      background-color: #21BA45;
      color: #ffffff;
    }

    &.AppNotification__message--error {
      background-color: #C10015;
      color: #ffffff;
    }

    &.AppNotification__message--warning {
      background-color: #F2C037;
      color: #ffffff;
    }

    > div {
      margin: 0 30px 0 10px;
    }

    > span {
      display: block;
      font-size: 1.6em;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      padding: 3px 10px;
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.4s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }
}
</style>
