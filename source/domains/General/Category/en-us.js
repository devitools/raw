const rotules = {
  SCOPE_ADD: 'Add Category'
}

const fields = {
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

const actions = {
  save: {
    label: 'Save'
  }
}

module.exports = {
  rotules,
  fields,
  actions
}
