<template>
  <div class="customer container">
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="provide" />
  </div>
</template>

<script>
import View from 'src/components/Controller/View'
import Customer from 'src/domains/Customer/Schema/Customer'

export default {
  name: 'Customer',
  /**
   */
  extends: View,
  /**
   */
  schema: Customer
}
</script>
