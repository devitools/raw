export const rotules = {
  SCOPE_ADD: 'Adicionar Categoria'
}

export const fields = {
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

export const actions = {
  save: {
    label: 'Salvar'
  }
}

export default {
  rotules,
  fields,
  actions
}
