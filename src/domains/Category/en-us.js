export const rotules = {
  SCOPE_ADD: 'Add Category'
}

export const fields = {
  name: {
    label: 'Name',
    placeholder: 'Type a cute name'
  },
  type: {
    label: 'Type',
    options: [
      {
        value: 1,
        label: 'Cute'
      },
      {
        value: 2,
        label: 'Cool'
      }
    ]
  },
  description: {
    label: 'Description'
  }
}

export const actions = {
  save: {
    label: 'Save'
  }
}

export default {
  rotules,
  fields,
  actions
}
