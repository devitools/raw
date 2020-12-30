const rotules = {
  SCOPE_ADD: 'Adicionar Categoria'
}

const fields = {
  name: {
    label: 'Nome',
    placeholder: 'Digite um nome fofo'
  },
  type: {
    label: 'Tipo',
    options: [
      {
        value: 1,
        label: 'Fofo'
      },
      {
        value: 2,
        label: 'Legal'
      }
    ]
  },
  description: {
    label: 'Descrição'
  }
}

const actions = {
  save: {
    label: 'Salvar'
  }
}

module.exports = {
  rotules,
  fields,
  actions
}
