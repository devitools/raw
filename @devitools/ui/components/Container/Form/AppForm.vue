<template>
  <div class="AppForm">
    <div class="grid">
      <div class="cell order-0">
        <h5>{{ title }}</h5>
      </div>
    </div>

    <form class="grid">
      <template v-for="(schema, key) in schemata">
        <AppCell
          :key="key"
          v-model="record[key]"
          :name="key"
          :error="error[key]"
          :domain="domain"
          :schema="schema"
        />
      </template>
    </form>

    <div class="grid">
      <div class="cell">
        <template v-for="(button, key) in buttons">
          <AppButton
            :key="key"
            :domain="domain"
            :name="key"
            :button="button"
          />
        </template>
      </div>
    </div>

    <div>
      <pre>{{ record }}</pre>
    </div>
  </div>
</template>

<script>
import AppCell from '@devitools/ui/components/Container/Form/AppCell'
import AppButton from '@devitools/ui/components/Container/Shared/AppButton'

export default {
  /**
   */
  name: 'AppForm',
  /**
   */
  components: { AppButton, AppCell },
  /**
   */
  props: {
    fields: {
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
      schemata: {},
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
    this.initializeSchemata()
    this.initializeButtons()
    this.initializeRecord()
    this.initializeError()
  },
  methods: {
    /**
     */
    initializeSchemata () {
      // get the object of the schema
      const schemata = this.fields()
      const getter = (field) => {
        return field.form.listeners
      }
      const setter = (field, listener, handler) => {
        field.form.listeners[listener] = handler
      }
      this.schemata = this.applyBind(schemata, getter, setter)
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
      this.record = Object.entries(this.fields()).reduce(
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
      this.error = Object.entries(this.fields()).reduce(
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
        // extract the elements of the object
        .entries(object)
        // through the elements
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

