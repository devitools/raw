<template>
  <div class="customer container">
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="provide" />
  </div>
</template>

<script>
import View from '@devitools/ui/components/Controller/View'
import Customer from 'source/domains/Customer/Schema/Customer'

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
