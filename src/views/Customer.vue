<template>
  <div class="customer container">
    <h1>Customer</h1>
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="customer" />
  </div>
</template>

<script>
import AppForm from '@/components/Schema/AppForm'
import Customer from 'src/domains/Customer/Schema/Customer'
// @ is an alias to /src

export default {
  name: 'Customer',
  components: {
    AppForm
  },
  data: () => ({
    customer: {}
  }),
  created () {
    const customer = new Customer()
    this.customer = customer.provide()
  }
}
</script>
