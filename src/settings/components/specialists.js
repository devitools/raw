/**
 */
export default {
  input: {
    is: () => import('src/components/Specialist/Form/AppInput.vue'),
    input: ($event) => $event.target.value
  },
  email: {
    is: () => import('src/components/Specialist/Form/AppEmail.vue'),
    input: ($event) => $event.target.value
  },
  textarea: {
    is: () => import('src/components/Specialist/Form/AppTextarea.vue'),
    input: ($event) => $event.target.value
  },
  select: {
    is: () => import('src/components/Specialist/Form/AppSelect.vue'),
    input: ($event) => $event.target.value
  }
}
