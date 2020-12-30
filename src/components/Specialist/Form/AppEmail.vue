<template>
  <div :class="{ error }">
    <label
      class="form-label"
      :for="name"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
      @keypress="$emit('keypress', $event)"
      @keydown="$emit('keydown', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'AppEmail',
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
      default: 'email'
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style scoped>

</style>
