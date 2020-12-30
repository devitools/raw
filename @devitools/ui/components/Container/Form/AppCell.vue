<template>
  <div
    class="cell"
    :class="classNames"
  >
    <div class="AppLabel">
      <label class="form-label">
        {{ label }}
      </label>
    </div>
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
  name: 'AppCell',
  /**
   */
  specialists: specialists,
  /**
   */
  props: {
    schema: {
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
      const alias = this.schema?.form?.is ?? 'input'
      const specialist = this.$options.specialists[alias]
      return specialist.is
    },
    /**
     * @return {function($event: *): *}
     */
    componentInput () {
      const alias = this.schema?.form?.is ?? 'input'
      const specialist = this.$options.specialists[alias]
      return specialist.input
    },
    /**
     * @return {Record<string,unknown>}
     */
    bind () {
      const alias = this.schema?.form?.is ?? 'input'
      const specialist = this.$options.specialists[alias]

      const inherit = specialist?.attrs ?? {}
      const attrs = this.schema?.form?.attrs ?? {}
      const locales = this.locales(this.name)

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
      return this.schema?.form?.listeners ?? {}
    },
    /**
     * @return {string[]}
     */
    classNames () {
      const width = this.schema?.form?.attrs?.width ?? '100'
      const height = this.schema?.form?.attrs?.height ?? '1'
      const order = this.schema?.form?.attrs?.order ?? 'auto'
      const classNames = [this.name, `width-${width}`, `height-${height}`, `order-${order}`]
      if (this.error) {
        classNames.push('error')
      }
      return classNames
    },
    /**
     * @return {string}
     */
    label () {
      const paths = [
        `domains.${this.domain}.fields.${this.name}.label`,
        `domains.${this.domain}.fields.${this.name}`
      ]
      for (const path of paths) {
        if (!this.$te(path)) {
          continue
        }
        return this.$t(path)
      }
      return ''
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
    locales (name) {
      const path = `domains.${this.domain}.fields.${name}`

      const attrs = [
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
