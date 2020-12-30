<template>
  <div class="category container">
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="provide" />
  </div>
</template>

<script>
import View from 'src/components/Controller/View'
import Category from 'src/domains/Category/Schema/Category'

/**
 */
export default {
  /**
   */
  name: 'Category',
  /**
   */
  extends: View,
  /**
   */
  schema: Category
}
</script>
