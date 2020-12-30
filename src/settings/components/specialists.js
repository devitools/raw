/**
 */
export default {
  input: {
    is: () => import('@devitools/ui/components/Specialist/Form/AppInput.vue'),
    input: ($event) => $event.target.value
  },
  email: {
    is: () => import('@devitools/ui/components/Specialist/Form/AppEmail.vue'),
    input: ($event) => $event.target.value
  },
  textarea: {
    is: () => import('@devitools/ui/components/Specialist/Form/AppTextarea.vue'),
    input: ($event) => $event.target.value
  },
  select: {
    is: () => import('@devitools/ui/components/Specialist/Form/AppSelect.vue'),
    input: ($event) => $event.target.value
  }
}
