<template>
  <div>
    <form class="grid">
      <div class="cell order-0">
        <h5>{{ title }}</h5>
      </div>
      <template v-for="(field, key) in fields">
        <div
          :key="key"
          class="cell"
          :class="`width-${field.form.attrs.width} height-${field.form.attrs.height} order-${field.form.attrs.order}`"
        >
          <component
            :is="$options.is[field.is]"
            :key="key"
            v-model="record[key]"
            :error="error[key]"
            v-bind="{ ...field.form.attrs, ...fieldLocales(key) }"
            v-on="field.form.listeners"
          />
        </div>
      </template>
    </form>

    <div class="grid">
      <div class="cell">
        <template v-for="(button, key) in buttons">
          <component
            :is="button.is"
            :key="key"
            :class="button.color"
            type="button"
            v-bind="button.attrs"
            v-on="button.listeners"
          >
            {{ $t(`domains.${domain}.actions.${key}.label`) }}
          </component>
        </template>
      </div>
    </div>

    <div>
      <pre>{{ record }}</pre>
    </div>
  </div>
</template>

<script>
import components from 'src/settings/components'

export default {
  name: 'AppForm',
  is: components,
  props: {
    schema: {
      type: Function,
      required: true,
    },
    actions: {
      type: Function,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      default: 'SCOPE_APP',
    }
  },
  data () {
    return {
      record: {},
      error: {},
      fields: {},
      buttons: {}
    }
  },
  computed: {
    validation () {
      return {}
    },
    title () {
      const key = `domains.${this.domain}.rotules.${this.scope}`
      return this.$te(key) ? this.$t(key) : ''
    }
  },
  watch: {
    validation: {
      deep: true,
      handler (validation) {
        Object.entries(validation).forEach(([key, value]) => {
          const ok = Object.values(value).reduce((accumulator, entry) => {
            if (entry) {
              accumulator = true
            }
            return accumulator
          })
          this.error[key] = !ok
        })
      },
    },
  },
  created () {
    this.initializeFields()
    this.initializeButtons()
    this.initializeRecord()
    this.initializeError()
  },
  methods: {
    /**
     */
    initializeFields () {
      // get the object of the schema
      const schema = this.schema()
      Object
        // extract the fields of the object
        .entries(schema)
        // through the fields of the schema
        .forEach(([key, field]) => {
          // through the listeners of the field
          for (const listener in field.form.listeners) {
            // eslint-disable-next-line no-prototype-builtins
            if (!field.form.listeners.hasOwnProperty(listener)) {
              continue
            }
            // extract a listener
            const handler = field.form.listeners[listener]
            // check if listener is a function...
            if (typeof handler !== 'function') {
              // if it isn't let it go
              continue
            }
            // update the listener with bonded handler
            field.form.listeners[listener] = handler.bind(this)
          }

          // update the modified field
          schema[key] = field
        })
      this.fields = schema
    },
    /**
     */
    initializeButtons () {
      const actions = this.actions()
      Object
        .entries(actions)
        .forEach(([key, action]) => {
          // through the listeners of the field
          for (const listener in action.listeners) {
            // eslint-disable-next-line no-prototype-builtins
            if (!action.listeners.hasOwnProperty(listener)) {
              continue
            }
            // extract a listener
            const handler = action.listeners[listener]
            // check if listener is a function...
            if (typeof handler !== 'function') {
              // if it isn't let it go
              continue
            }
            // update the listener with bonded handler
            action.listeners[listener] = handler.bind(this)
          }

          // update the modified field
          actions[key] = action
        })
      this.buttons = actions
    },
    /**
     */
    initializeRecord () {
      this.record = Object.entries(this.schema()).reduce(
        (accumulator, [key, field]) => {
          accumulator[key] = field?.form?.value
          return accumulator
        },
        {}
      )
    },
    /**
     */
    initializeError () {
      this.error = Object.entries(this.schema()).reduce(
        (accumulator, [key]) => {
          accumulator[key] = false
          return accumulator
        },
        {}
      )
    },
    /**
     * @param {string} key
     */
    fieldLocales (key) {
      const path = `domains.${this.domain}.fields.${key}`

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

