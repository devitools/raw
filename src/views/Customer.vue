<template>
  <div class="customer container">
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="provide" />
  </div>
</template>

<script>
import AppForm from 'src/components/Schema/AppForm'
import Customer from 'src/domains/Customer/Schema/Customer'

export default {
  name: 'Customer',
  components: {
    AppForm
  },
  props: {
    scope: {
      type: String,
      default: 'SCOPE_ADD',
    }
  },
  data: () => ({
    provide: {}
  }),
  created () {
    this.provide = {
      ...Customer.build().provide(),
      scope: this.scope
    }
  }
}
</script>
