<template>
  <div :class="{ error }">
    <label
      class="form-label"
      :for="name"
    >
      {{ label }}
    </label>
    <textarea
      :id="name"
      class="form-control"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :value="value"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
      @keypress="$emit('keypress', $event)"
      @keydown="$emit('keydown', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'AppTextarea',
  props: {
    value: {
      type: String,
      default: ''
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
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    rows: {
      type: [Number, String],
      default: 3
    }
  }
}
</script>

<style scoped>

</style>
