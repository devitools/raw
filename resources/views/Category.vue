<template>
  <div class="category container">
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="provide" />
  </div>
</template>

<script>
import View from '@devitools/ui/components/Controller/View'
import Category from 'source/domains/General/Category/Schema/Category'

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
