<template>
  <div class="AppForm">
    <div class="grid">
      <div class="cell order-0">
        <h5>{{ title }}</h5>
      </div>
    </div>

    <form class="grid">
      <template v-for="(field, key) in fields">
        <AppField
          :key="key"
          v-model="record[key]"
          :name="key"
          :error="error[key]"
          :domain="domain"
          :field="field"
        />
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
import AppField from 'src/components/Container/Form/AppField'

export default {
  /**
   */
  name: 'AppForm',
  /**
   */
  components: { AppField },
  /**
   */
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
      default: 'SCOPE_ADD',
    }
  },
  /**
   */
  data () {
    return {
      record: {},
      error: {},
      fields: {},
      buttons: {}
    }
  },
  /**
   */
  computed: {
    /**
     */
    validation () {
      return {}
    },
    title () {
      const key = `domains.${this.domain}.rotules.${this.scope}`
      return this.$te(key) ? this.$t(key) : ''
    }
  },
  /**
   */
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
      const getter = (field) => {
        return field.form.listeners
      }
      const setter = (field, listener, handler) => {
        field.form.listeners[listener] = handler
      }
      this.fields = this.applyBind(schema, getter, setter)
    },
    /**
     */
    initializeButtons () {
      const actions = this.actions()
      const getter = (action) => {
        return action.listeners
      }
      const setter = (action, listener, handler) => {
        action.listeners[listener] = handler
      }
      this.buttons = this.applyBind(actions, getter, setter)
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
     * @param {Record<string,unknown>} object
     * @param {function(element: unknown): Record<string,Function>[]} getter
     * @param {function(element: unknown, listener: string, handler: Function): void} setter
     */
    applyBind (object, getter, setter) {
      Object
        // extract the fields of the object
        .entries(object)
        // through the fields of the schema
        .forEach(([key, element]) => {
          const listeners = getter(element)
          // through the listeners of the field
          for (const listener in listeners) {
            // eslint-disable-next-line no-prototype-builtins
            if (!listeners.hasOwnProperty(listener)) {
              continue
            }
            // extract a listener
            const handler = listeners[listener]
            // check if listener is a function...
            if (typeof handler !== 'function') {
              // if it isn't let it go
              continue
            }
            // update the listener with bonded handler
            setter(element, listener, handler.bind(this))
          }

          // update the modified field
          object[key] = element
        })

      return object
    }
  }
}
</script>

