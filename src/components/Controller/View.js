import AppForm from 'src/components/Container/Form/AppForm'

/**
 * @component {View}
 */
export default {
  /**
   */
  name: 'View',
  /**
   */
  components: {
    AppForm
  },
  /**
   */
  schema: undefined,
  /**
   */
  props: {
    scope: {
      type: String,
      default: 'SCOPE_ADD',
    }
  },
  /**
   */
  data: () => ({
    provide: {}
  }),
  /**
   */
  methods: {
    /**
     * @return {Record<string,unknown>}
     */
    build () {
      return this.$options.schema.build().provide()
    }
  },
  /**
   */
  created () {
    this.provide = {
      ...this.build(),
      scope: this.scope
    }
  }
}
