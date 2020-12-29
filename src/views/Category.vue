<template>
  <div class="category container">
    <h1>Category</h1>
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="category" />
  </div>
</template>

<script>
import AppForm from 'src/components/Schema/AppForm'
import Category from 'src/domains/Category/Schema/Category'

export default {
  name: 'Category',
  components: {
    AppForm
  },
  data: () => ({
    category: {}
  }),
  created () {
    const category = new Category()
    this.category = category.provide()
  }
}
</script>
