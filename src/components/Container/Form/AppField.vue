<template>
  <div
    class="cell"
    :class="classNames"
  >
    <component
      :is="componentIs"
      :value="value"
      v-bind="bind"
      v-on="listeners"
      @input="input"
    />
  </div>
</template>

<script>
import specialists from 'src/settings/components/specialists'

export default {
  /**
   */
  name: 'AppField',
  /**
   */
  specialists: specialists,
  /**
   */
  props: {
    field: {
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
    },
    value: {
      type: [String, Number, Object],
      default: () => undefined
    }
  },
  /**
   */
  computed: {
    /**
     * @return {*}
     */
    componentIs () {
      const alias = this.field?.is ?? 'input'
      const specialist = this.$options.specialists[alias]
      return specialist.is
    },
    /**
     * @return {function($event: *): *}
     */
    componentInput () {
      const alias = this.field?.is ?? 'input'
      const specialist = this.$options.specialists[alias]
      return specialist.input
    },
    /**
     * @return {Record<string,unknown>}
     */
    bind () {
      const alias = this.field?.is ?? 'input'
      const specialist = this.$options.specialists[alias]

      const inherit = specialist?.attrs ?? {}
      const attrs = this.field?.form?.attrs ?? {}
      const locales = this.fieldLocales(this.name)

      const bind = { ...inherit, ...attrs, ...locales }
      if (bind.value !== void 0) {
        delete bind.value
      }
      return bind
    },
    /**
     * @return {Record<string,unknown>}
     */
    listeners () {
      return this.field?.form?.listeners ?? {}
    },
    /**
     * @return {string[]}
     */
    classNames () {
      const width = this.field?.form?.attrs?.width ?? '100'
      const height = this.field?.form?.attrs?.height ?? '1'
      const order = this.field?.form?.attrs?.order ?? 'auto'
      return [this.name, `width-${width}`, `height-${height}`, `order-${order}`]
    }
  },
  /**
   */
  methods: {
    /**
     * @param {*} $event
     */
    input ($event) {
      this.$emit('input', this.componentInput($event))
    },
    /**
     * @param {string} name
     * @return {*}
     */
    fieldLocales (name) {
      const path = `domains.${this.domain}.fields.${name}`

      const attrs = [
        'label',
        'placeholder',
        'options',
      ]

      const reducer = (locales, attr) => {
        const locale = `${path}.${attr}`
        if (!this.$te(locale)) {
          return locales
        }
        locales[attr] = this.$t(locale)
        return locales
      }

      return attrs.reduce(reducer, {})
    }
  }
}
</script>
