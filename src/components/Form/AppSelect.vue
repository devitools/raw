<template>
  <div :class="{ error }">
    <label
      class="form-label"
      :for="name"
    >
      {{ label }}
    </label>
    <select
      :id="name"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :type="type"
      :name="name"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event)"
      @keypress="$emit('keypress', $event)"
      @keydown="$emit('keydown', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>
