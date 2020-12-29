<template>
  <div class="category container">
    <!--suppress RequiredAttributes -->
    <AppForm v-bind="provide" />
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
      ...Category.build().provide(),
      scope: this.scope
    }
  }
}
</script>
