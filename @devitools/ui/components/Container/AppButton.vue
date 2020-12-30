<template>
  <component
    :is="$options.is"
    :id="`${domain}-${name}`"
    :class="classNames"
    type="button"
    v-bind="button.attrs"
    v-on="button.listeners"
  >
    {{ label }}
  </component>
</template>

<script>
export default {
  /**
   */
  name: 'AppButton',
  /**
   */
  is: 'button',
  /**
   */
  props: {
    button: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: true
    }
  },
  /**
   */
  computed: {
    /**
     * @return {string}
     */
    label () {
      const keys = [
        `domains.${this.domain}.actions.${this.name}.label`,
        `app.schema.actions.${this.name}.label`
      ]
      for (const key of keys) {
        if (!this.$te(key)) {
          continue
        }
        return this.$t(key)
      }
      return ''
    },
    /**
     * @return {string}
     */
    classNames () {
      return `btn btn-${this.button.color}`
    }
  }
}
</script>

<style scoped>

</style>
