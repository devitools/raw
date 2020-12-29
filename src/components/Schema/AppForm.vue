<template>
  <form>
    <template v-for="(field, key) in fields">
      <div
        :key="key"
        class="field"
        :class="`width-${field.form.attrs.width} height-${field.form.attrs.height}`"
        :style="{ order: field.form.attrs.order }"
      >
        <component
          :is="$options.is[field.is]"
          :key="key"
          v-model="record[key]"
          :error="error[key]"
          v-bind="field.form.attrs"
          v-on="field.form.listeners"
        />
      </div>
    </template>

    <div class="field">
      <template v-for="(button, key) in buttons">
        <button
          :key="key"
          :class="button.color"
          type="button"
          v-bind="button.attrs"
          v-on="button.listeners"
        >
          {{ button.attrs.label }}
        </button>
      </template>
    </div>

    <div class="field">
      <pre>{{ record }}</pre>
    </div>
  </form>
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
    initializeRecord () {
      this.record = Object.entries(this.schema()).reduce(
        (accumulator, [key, field]) => {
          accumulator[key] = field?.form?.value
          return accumulator
        },
        {}
      )
    },
    initializeError () {
      this.error = Object.entries(this.schema()).reduce(
        (accumulator, [key]) => {
          accumulator[key] = false
          return accumulator
        },
        {}
      )
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: grid;
  grid-template-columns: repeat(20, 5%);
}

form > .field {
  grid-column: auto/span 20;
  padding: 5px;
  order: 100;
}

form .field.width-5 {
  grid-column: auto/span 1;
}

form .field.width-10 {
  grid-column: auto/span 2;
}

form .field.width-15 {
  grid-column: auto/span 3;
}

form .field.width-20 {
  grid-column: auto/span 4;
}

form .field.width-25 {
  grid-column: auto/span 5;
}

form .field.width-30 {
  grid-column: auto/span 6;
}

form .field.width-35 {
  grid-column: auto/span 7;
}

form .field.width-40 {
  grid-column: auto/span 8;
}

form .field.width-45 {
  grid-column: auto/span 9;
}

form .field.width-50 {
  grid-column: auto/span 10;
}

form .field.width-55 {
  grid-column: auto/span 11;
}

form .field.width-60 {
  grid-column: auto/span 12;
}

form .field.width-65 {
  grid-column: auto/span 13;
}

form .field.width-70 {
  grid-column: auto/span 14;
}

form .field.width-75 {
  grid-column: auto/span 15;
}

form .field.width-80 {
  grid-column: auto/span 16;
}

form .field.width-85 {
  grid-column: auto/span 17;
}

form .field.width-90 {
  grid-column: auto/span 18;
}

form .field.width-95 {
  grid-column: auto/span 19;
}

form .field.width-100 {
  grid-column: auto/span 20;
}

form .field.height-1 {
  grid-row: auto/span 1;
}

form .field.height-2 {
  grid-row: auto/span 2;
}

form .field.height-3 {
  grid-row: auto/span 3;
}

form .field.height-4 {
  grid-row: auto/span 4;
}

form .field.height-5 {
  grid-row: auto/span 5;
}

@media (max-width: 700px) {
  form:not(.no-break) .field:not(.no-break) {
    grid-column: auto/span 20 !important;
    grid-row: auto/span 1;
  }
}
</style>

